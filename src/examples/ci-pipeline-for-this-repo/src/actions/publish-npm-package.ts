import { Action, ActionState, Executor } from "@wbce/orbits-core";
import { DockerExecutor, PublicRegistry } from "@wbce/orbits-fuel";
import { Cli } from "@wbce/services";
import { readFileSync, writeFileSync } from "fs";
import { GitCloneAction } from "./git-clone-repo";




export class PublishNpmPackage extends GitCloneAction{

    executor = new DockerExecutor({
        registry : new PublicRegistry('node','16.14.2'),
        dockerConfig : {
            env : {
                'git_user' : 'ci_wbce',
                'git_pwd': process.env['git_pwd'],
                'NPM_TOKEN': process.env['NPM_TOKEN']
            }
        }
    })


    IArgument : {
        packagePath : string
    }

    cli = new Cli()

    defaultDelays: { 1?: number | undefined; 2?: number | undefined } = {
        [ActionState.EXECUTING_MAIN] : 3*60*1000
    }



    main(){
        //we could also modify the files directly via the github api in order to save one clone operation.
        return this.gitClone().then(()=>{
            process.chdir(this.argument.packagePath);
            return this.cli.command("npm", ["install"]);
        }).then(()=>{
            return this.cli.command("npm", ["config", "set","_authToken", process.env['NPM_TOKEN']!  ])
        }).then(()=>{
            return this.cli.command("npm", ["run", "publish"]);
        }).then(()=>{
            return ActionState.SUCCESS
        })
    }

    /* watcher() {
        //this action is never in progress.
        //So the watcher will be called if and only if the main() method didn't quit programatically
        //(i.e. some process interruptions).
        //So this watcher only has to check if the preceding version was published. 
        
        return this.githubApi.getLastCommitsOnBranch().then((commits)=>{
            for(const commit of commits){
                if(commit.message === ...){
                    return true;
                }
            }
        }).then((isPushed)=>{
            return isPushed ? ActionState.SUCCESS : ActionState.SLEEPING;
        });
    } */


}