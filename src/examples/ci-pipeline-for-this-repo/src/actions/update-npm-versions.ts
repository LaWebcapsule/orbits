import {Action, ActionState, Executor} from "@wbce/orbits-core"
import {DockerExecutor, PublicRegistry} from "@wbce/orbits-fuel"
import {Cli} from "@wbce/services"
import { readFileSync, writeFileSync } from "fs"


export class UpdateNpmVersions extends Action{

    executor = new DockerExecutor({
        registry : new PublicRegistry('node','16.14.2')
    })

    IArgument : {
        versions : {
            relativePackageDir : string,
            version? : string,
            type : string,//'patch' or 'fix' or ...
            notes? : string
        }[]
    }

    cli = new Cli()

    defaultDelays: { 1?: number | undefined; 2?: number | undefined } = {
        [ActionState.EXECUTING_MAIN] : 3*60*1000
    }

    init(){
        console.log(process.env);
        return this.cli.command("git",  ["config", "--global", "user.name", process.env['git_user']!] ).then(()=>{
            return this.cli.command("git",  ["config", "--global", "user.password", process.env['git_pwd']!] )
        }).then(()=>{
            return this.cli.command("git",  ["config", "--global", "user.email", 'test_mail@mail.com'] )
        })
    }


    main(){
        //we could also modify the files directly via the github api in order to save one clone operation.
        console.log("update start ************************")
        return this.cli.command("git", ["clone", "https://github.com/LaWebcapsule/orbits-fork.git", "/tmp/orbits"]).then(()=>{
            process.chdir("/tmp/orbits")
            this.cli.command("ls", ["-al"]);
        }).then(()=>{
            let changeVersion = Promise.resolve();
            for(const version of this.argument.versions){
                changeVersion = changeVersion.then(()=>{
                    process.chdir(`/tmp/orbits/${version.relativePackageDir}`);
                    console.log("version updating **********************")
                    return this.cli.command("npm", ["version", version.type])
                })
            }
            return changeVersion;
        }).then(()=>{
            let commitMessage = "ci(sem-vers): update ${this.argument.versions.length} packages.json\n";
            for(const version of this.argument.versions){
                commitMessage += ` ${version.relativePackageDir} : ${version.type}\n`
                commitMessage += version.notes
            }
            return this.cli.command("git", ["commit", "-a", "-m", commitMessage])
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