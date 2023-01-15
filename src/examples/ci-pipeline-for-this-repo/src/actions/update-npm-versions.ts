import {Action, ActionState, Executor} from "@wbce/orbits-core"
import {DockerExecutor, PublicRegistry} from "@wbce/orbits-fuel"
import {Cli} from "@wbce/services"
import { readFileSync, writeFileSync } from "fs"


export class UpdateNpmVersions extends Action{

    executor = new DockerExecutor({
        registry : new PublicRegistry('node')
    })

    IArgument : {
        versions : {
            packageJsonPath : string,
            vName : string
        }[]
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
            process.chdir("/tmp/orbits")
        }).then(()=>{
            for(const version of this.argument.versions){
                this.changeVersion(version.packageJsonPath, version.vName);
            }
        }).then(()=>{
            let commitMessage = "ci(sem-vers): update ${this.argument.versions.length} packages\n";
            for(const version of this.argument.versions){
                commitMessage += ` ${version.packageJsonPath}--> ${version.vName}\n`
            }
            return this.cli.command("git", ["commit", "-a", "-m"])
        })
        .then(()=>{
            return this.cli.command("git", ["push"]);
        }).then(()=>{
            return ActionState.SUCCESS
        })
    }

    /* watcher() {
        //this action is never in progress.
        //So the watcher will be called if and only if the main() method didn't quit programatically
        //(i.e. some process interruptions).
        //So this watcher only has to check if the preceding commit was pushed or not. 
        
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