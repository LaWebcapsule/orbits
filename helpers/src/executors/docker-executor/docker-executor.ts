import { Executor, Action, ActionApp, ActionState } from '@wbce/orbits-core';
import { utils } from '@wbce/services';
import { exec } from 'child_process';
import Docker from 'dockerode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class DockerExecutor extends Executor {
    registry: {
        url: string;
        tag: string;
        getCredentials: (...any) => Promise<Docker.AuthConfig | void>;
    };
    dockerfile: any;
    dockerConfig: { [key: string]: any; env: { [key: string]: string } } = {
        env: {},
    };

    constructor(opts: {
        registry?: DockerExecutor['registry'];
        dockerfile?: DockerExecutor['dockerfile'];
        dockerConfig?: DockerExecutor['dockerConfig'];
    }) {
        super();
        this.registry = opts.registry || this.registry;
        this.dockerfile = opts.dockerfile || this.dockerfile;
        this.dockerConfig = opts.dockerConfig || this.dockerConfig;
    }

    install() {}

    scope = [ActionState.SLEEPING, ActionState.PAUSED];

    resume(action: Action) {
        if (this.isInsideDocker()) {
            return action._resume();
        }
        if (this.scope && !this.scope.includes(action.dbDoc.state)) {
            return action._resume();
        }
        const docker = new Docker({ socketPath: '/var/run/docker.sock' });
        return this.registry
            .getCredentials()
            .then(
                (credentials) =>
                    new Promise((resolve, reject) => {
                        const opts = {};
                        credentials ? (opts['authconfig'] = credentials) : null;
                        docker.pull(
                            `${this.registry.url}:${this.registry.tag}`,
                            opts,
                            (err, res) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    docker.modem.followProgress(
                                        res,
                                        (err, res) =>
                                            err ? reject(err) : resolve(res),
                                        (event) =>
                                            ActionApp.activeApp.logger.info(
                                                event
                                            )
                                    );
                                }
                            }
                        );
                    })
            )
            .then(() => this.calculatePath())
            .then((appPaths) => {
                const envVariables = [];
                for (const k in this.dockerConfig.env) {
                    envVariables.push(`${k}=${this.dockerConfig.env[k]}`);
                }
                envVariables.push(
                    `wbce_id=${this.registry.url}:${this.registry.tag}`
                );
                const executionContext = this.calculateExecutionContext();
                const dockerConfig = {
                    WorkingDir: `/app`,
                    NetworkMode: 'host',
                    Env: envVariables,
                    User: '1000:0',
                    // we belong to the lords!... and also we are not the king because of:
                    // https://docs.npmjs.com/cli/v7/using-npm/scripts#user
                    // maybe use AddGroup ?
                    // or maybe we should be a simple and normal user... But which one ?
                    // maybe node would not work with all images
                    Binds: [
                        '/var/run/docker.sock:/var/run/docker.sock',
                        `${
                            appPaths.primaryRootFolder || appPaths.rootFolder
                        }:/app:ro`,
                        `${
                            appPaths.primaryCurrentFolder ||
                            appPaths.currentFolder
                        }/${executionContext.entrypoint}:/${
                            executionContext.entrypoint
                        }:ro`,
                    ], //deprecated
                    HostConfig: {
                        Binds: [
                            '/var/run/docker.sock:/var/run/docker.sock',
                            `${
                                appPaths.primaryRootFolder ||
                                appPaths.rootFolder
                            }:/app:ro`,
                            `${
                                appPaths.primaryCurrentFolder ||
                                appPaths.currentFolder
                            }/${executionContext.entrypoint}:/${
                                executionContext.entrypoint
                            }:ro`,
                        ],
                    },
                    ...this.dockerConfig,
                };
                dockerConfig['env'] = undefined; //'env' is a shortcut to construct Env. So we delete if after
                let cmd = [
                    ...executionContext.command,
                    `/app/${appPaths.relativeEntrypointPathFromRoot}/${executionContext.entrypoint}`,
                    appPaths.relativeImportPathFromEntrypoint,
                    action._id.toString(),
                ];
                return docker.run(
                    `${this.registry.url}:${this.registry.tag}`,
                    cmd,
                    process.stdout,
                    dockerConfig
                );
            })
            .then(function (data) {
                const output = data[0];
                const container = data[1];
                return container.remove();
            })
            .catch((err) => {
                // note : we do not manage here the error, we just quit properly
                action.internalLogError(err);
            });
    }

    calculateExecutionContext() {
        let isTs = __filename.slice(-3) === '.ts';
        let isTsNode = isTs;
        if (!isTsNode) {
            for (const arg of process.argv) {
                if (arg.slice(-3) === '.ts') {
                    // can be tricky. We don't have better for now. Maybe force to use an env variable ?
                    isTsNode = true;
                }
            }
        }
        if (isTsNode) {
            return {
                type: 'typescript',
                command: ['npx', 'tsx'],
                entrypoint: `docker-entrypoint.${isTs ? 'ts' : 'js'}`,
            };
        } else {
            return {
                type: 'javascript',
                command: ['node', '--require', 'source-map-support/register'],
                entrypoint: 'docker-entrypoint.js',
            };
        }
    }

    calculatePath(): Promise<{
        rootFolder: string; //the app root folder, e.g. /app
        primaryRootFolder?: string; //the root folder above the mount points, for example : /myuser/orbits/app
        currentFolder: string; //the current directory
        primaryCurrentFolder?: string; //the current directory above the mount point
        bootstrapPath: string; //the location of the index file
        relativeEntrypointPathFromRoot: string; //how to pass to 'rootFolder' until 'entrypoint'
        relativeImportPathFromEntrypoint: string; //how to pass to 'entrypoint' to bootstap path
    }> {
        const stackPaths = utils.getStackTracePaths();
        console.log("here!!!!!!")
        console.log(stackPaths);
        const rootFolder = stackPaths[0].substring(
            0,
            stackPaths[0].indexOf('node_modules')
        );
        const bootstrapPath = ActionApp.activeApp.bootstrapPath;
        const relativeEntrypointPathFromRoot = __dirname.replace(
            rootFolder,
            ''
        );
        let relativeImportPathFromEntrypoint = bootstrapPath.replace(
            rootFolder,
            ''
        );
        relativeImportPathFromEntrypoint = path.relative(
            relativeEntrypointPathFromRoot,
            relativeImportPathFromEntrypoint
        );
        const result = {
            rootFolder,
            bootstrapPath,
            currentFolder: __dirname,
            relativeEntrypointPathFromRoot,
            relativeImportPathFromEntrypoint,
        };
        return this.getDockerMounts().then((mounts) => {
            if (!mounts) {
                return result;
            }
            for (const mount of mounts) {
                if (result.rootFolder.startsWith(mount.Destination)) {
                    result['primaryRootFolder'] = result.rootFolder.replace(
                        mount.Destination,
                        mount.Source
                    );
                    result['currentFolder'] = result.currentFolder.replace(
                        mount.Destination,
                        mount.Source
                    );
                    return result;
                }
            }
            return result;
        });
    }

    getDockerMounts() {
        //necesary if we want to do Docker inside Docker
        //indeed, the mount point to create when we launch a new Docker
        //has to refer to the mount point of the first host
        return new Promise<string>((resolve, reject) => {
            exec(
                "cat /proc/self/cgroup | grep 'docker' | tail -n1",
                (err, res, err2) => {
                    if (err || err2) {
                        reject(err || err2);
                    }
                    const resSplitted = res.split('/');
                    let dockerId = resSplitted[resSplitted.length - 1];
                    dockerId = dockerId.substring(0, dockerId.length - 1);
                    resolve(dockerId);
                }
            );
        })
            .then((res) => {
                if (!res) {
                    throw new Error('not in Dind mode');
                }
                const docker = new Docker({
                    socketPath: '/var/run/docker.sock',
                });
                const container = docker.getContainer(res);
                return docker.getContainer(res).inspect();
            })
            .then((data) => data.Mounts)
            .catch((err) => {
                //we don't care of an error in this case
                console.log(err);
                return;
            });
    }

    isInsideDocker() {
        return (
            process.env['wbce_id'] ===
            `${this.registry.url}:${this.registry.tag}`
        );
    }
}
