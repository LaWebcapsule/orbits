import { Executor, Action, ActionApp } from "@wbce/orbits-core";
import {o} from "@wbce/services";
import Docker from "dockerode";
import path from "path";


export class DockerExecutor extends Executor{
    registry : {
        url : string,
        tag: string,
        getCredentials : (...any)=>Promise<Docker.AuthConfig | void>
    };
    dockerfile : any;
    dockerConfig = {
        env : {}
    }

    constructor(opts : {
        registry? : DockerExecutor['registry'],
        dockerfile? : DockerExecutor['dockerfile'],
        dockerConfig? : DockerExecutor['dockerConfig']
    }){
        super();
        this.registry = opts.registry || this.registry;
        this.dockerfile = opts.dockerfile || this.dockerfile;
        this.dockerConfig = opts.dockerConfig || this.dockerConfig;
    }


    install(){
        const docker = new Docker();
        /* return this.getHashFile().then((hash: string)=>{
            this.imageName = hash;
            return new Promise((resolve, reject)=>{
                docker.buildImage(this.dockerfile, {t: this.imageName}, function(err, response){
                    if(err){
                        reject(err)
                    }
                    else{
                        docker.modem.followProgress(response, (err, res) => err ? reject(err) : resolve(res))
                    }
                })
            })
        }).then(()=>{
            return this.registry.getCredentials()
        }).then((credentials)=>{
            docker.getImage(this.imageName).push({
                tag: this.imageName,
                authconfig : credentials
            })
        }) */
    }

    resume(action: Action) {
        if(this.isInsideDocker()){
            return action._resume();
        }
        if(this.scope && !(this.scope.find(state => state === action.dbDoc.state))){
            return action._resume();
        }
        const docker = new Docker({socketPath: '/var/run/docker.sock'});
        let imageName : string;
        return this.registry.getCredentials().then((credentials)=>{
                return new Promise((resolve, reject)=>{
                    const opts = {};
                    credentials ? opts['authconfig'] = credentials : null;
                    docker.pull(`${this.registry.url}:${this.registry.tag}`, opts, (err, res)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            docker.modem.followProgress(res, 
                                (err, res) => err ? reject(err) : resolve(res), 
                                (event)=>console.log(event)
                            )
                        }
                    })
                }) 
            }).then((image)=>{
                const envVariables = [];
                for(const k in this.dockerConfig.env){
                    envVariables.push(`${k}=${this.dockerConfig.env[k]}`)
                }
                envVariables.push(`wbce_id=${this.registry.url}:${this.registry.tag}`);
                const appPaths = this.calculatePath();
                const executionContext = this.calculateExecutionContext();
                const dockerConfig = {
                    "WorkingDir" : `/app`,
                    "NetworkMode": "host",
                    "Env": envVariables,
                    "User" : "1000:0",//we belong to the lords!... and also we are not the king because of:
                    //https://docs.npmjs.com/cli/v7/using-npm/scripts#user
                    //maybe use AddGroup ?
                    //or maybe we should be a simple and normal user... But which one ?
                    //maybe 1000 would not work with all images,
                    "Binds" : [
                        '/var/run/docker.sock:/var/run/docker.sock',
                        `${appPaths.rootFolder}:/app:ro`,
                        `${__dirname}/${executionContext.entrypoint}:/${executionContext.entrypoint}:ro`
                    ]
                };
                let cmd = [...executionContext.command, `/app/${appPaths.relativeEntrypointPathFromRoot}/${executionContext.entrypoint}`, appPaths.relativeImportPathFromEntrypoint,  action._id.toString()]
                //cmd = ['ls', '-al']
                return docker.run(`${this.registry.url}:${this.registry.tag}`, cmd, process.stdout, dockerConfig)
            }).then(function(data) {
                const output = data[0];
                const container = data[1];
                return container.remove();
            }).catch((err)=>{
                console.log(err);
                //note : we do not manage here the error, we just quit properly
                action.internalLogError(err);
            });
    }

    calculateExecutionContext(){
        let isTs = __filename.slice(-3) === '.ts'
        let isTsNode = isTs;
        if(!isTsNode){
            for(const arg of process.argv){
                if(arg.slice(-3) === '.ts'){//can be tricky. We don't have better for now. Maybe force to use an env variable ?
                    isTsNode = true;
                }
            }
        }
        if(isTsNode){
            return {
                type : 'typescript',
                command : ['npx', 'ts-node-dev'],
                entrypoint : `docker-entrypoint.${isTs ? 'ts' : 'js'}`
            }
        }
        else{
            return {
                type : 'javascript',
                command : ['node', '--require', 'source-map-support/register'],
                entrypoint : 'docker-entrypoint.js',
            }
        }
    }

    calculatePath(){
        const stackPaths = o.getStackTracePaths();
        const rootFolder = stackPaths[0].substring(0, stackPaths[0].indexOf('node_modules'));
        const bootstrapPath = ActionApp.boostrapPath;
        const relativeEntrypointPathFromRoot = __dirname.replace(rootFolder, '');
        let relativeImportPathFromEntrypoint = bootstrapPath.replace(rootFolder, '');
        relativeImportPathFromEntrypoint = path.relative(relativeEntrypointPathFromRoot, relativeImportPathFromEntrypoint);
        console.log(relativeImportPathFromEntrypoint);
        return {
            rootFolder,
            bootstrapPath,
            relativeEntrypointPathFromRoot,
            relativeImportPathFromEntrypoint
        }

    }

    isInsideDocker(){
        return process.env['wbce_id'] === `${this.registry.url}:${this.registry.tag}`;
    }




}