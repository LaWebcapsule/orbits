import { Action, ActionState, Executor } from "@wbce/orbits-core";
import { DockerExecutor, PublicRegistry } from "@wbce/orbits-fuel";
import { Cli } from "@wbce/services";
import { readFileSync, writeFileSync } from "fs";




export class PublishNpmPackage extends Action{

    executor = new DockerExecutor({
        registry : new PublicRegistry('node','16.14.2')
    })

    IArgument : {
        packagePath : string
    }

    cli = new Cli()

    defaultDelays: { 1?: number | undefined; 2?: number | undefined } = {
        [ActionState.EXECUTING_MAIN] : 3*60*1000
    }

    init(){
        return this.cli.command("git",  ["config", "--global", "user.name", process.env['git_user']!] ).then(()=>{
            return this.cli.command("git",  ["config", "--global", "user.password", process.env['git_pwd']!] )
        })
    }


    main(){
        //we could also modify the files directly via the github api in order to save one clone operation.
        return this.cli.command("git", ["clone", "https://github.com/semantic-release/semantic-release.git", "/tmp/orbits"]).then(()=>{
            return process.chdir(`/tmp/orbits/${this.argument.packagePath}`)
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

    changeVersion(pathToPackageJson, versionName){
        const packageJson = JSON.parse(readFileSync(pathToPackageJson, {encoding: "utf-8"}))
        packageJson.version = versionName
        writeFileSync(JSON.stringify(packageJson), pathToPackageJson);
    }

}