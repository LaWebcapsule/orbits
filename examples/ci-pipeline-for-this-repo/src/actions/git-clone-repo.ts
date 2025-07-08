import { Action } from '@orbi-ts/core';
import { DockerExecutor, PublicRegistry } from '@orbi-ts/fuel';
import { Cli } from '@orbi-ts/services';

export class GitCloneAction extends Action {
    //this action is only a basis for other action and is not registered as an action itself
    executor = new DockerExecutor({
        registry: new PublicRegistry('node', '16.14.2'),
        dockerConfig: {
            env: {
                git_user: 'ci_orbits',
                git_pwd: process.env['git_pwd'],
            },
        },
    });

    cli = new Cli();

    init() {
        return this.cli
            .command('git', [
                'config',
                '--global',
                'user.name',
                process.env['git_user']!,
            ])
            .then(() =>
                this.cli.command('git', [
                    'config',
                    '--global',
                    'user.password',
                    process.env['git_pwd']!,
                ])
            )
            .then(() =>
                this.cli.command('git', [
                    'config',
                    '--global',
                    'user.email',
                    'ci_orbits@ci.com',
                ])
            );
    }

    gitClone() {
        return this.cli
            .command('git', [
                'clone',
                `https://${process.env['git_user']}:${process.env['git_pwd']}@github.com/LaWebcapsule/orbits-fork.git`,
                '/tmp/orbits',
            ])
            .then(() => process.chdir(`/tmp/orbits/`));
    }
}
