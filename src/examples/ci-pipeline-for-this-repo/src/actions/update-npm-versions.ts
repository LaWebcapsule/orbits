import {Action, ActionState, Executor} from "@wbce/orbits-core"
import {DockerExecutor, PublicRegistry, Commit} from "@wbce/orbits-fuel"
import {Cli} from "@wbce/services"
import { exec } from "child_process"
import { readFileSync, writeFileSync } from "fs"
import { GitCloneAction } from "./git-clone-repo"


export class UpdateNpmVersions extends GitCloneAction{


    IArgument : {
        versions : {
            relativePackageDir : string,
            version? : string,
            type : string,//'patch' or 'fix' or ...
            notes? : string
        }[]
    }

    IResult: Commit

    static defaultDelays: { 1?: number | undefined; 2?: number | undefined } = {
        [ActionState.EXECUTING_MAIN] : 3*60*1000
    }

    main(){
        //we could also modify the files directly via the github api in order to save one clone operation.
        console.log("update start ************************")
        return this.gitClone().then(()=>{
            let changeVersion = Promise.resolve();
            for(const version of this.argument.versions){
                changeVersion = changeVersion.then(()=>{
                    process.chdir(`/tmp/orbits/${version.relativePackageDir}`);
                    return this.cli.command("npm", ["version", version.type])
                })
            }
            return changeVersion;
        }).then(()=>{
            let commitMessage = `ci(sem-vers): update ${this.argument.versions.length} packages.json\n`;
            for(const version of this.argument.versions){
                commitMessage += ` ${version.relativePackageDir} : ${version.type}\n`
                commitMessage += version.notes || '';
            }
            return this.cli.command("git", ["commit", "-a", "-m", commitMessage])
        })
        .then(()=>{
            return this.cli.command("git", ["push"]);
        }).then(()=>{
            return this.getLastCommit();
        }).then((commit)=>{
            this.result = commit;
            return ActionState.SUCCESS
        })
    }

    getLastCommit(){
        return new Promise<Commit>((resolve, reject)=>{
            exec('git log --pretty="%H %ad" --date iso-strict -n 1', (err, res, err2)=>{
                //normal output :
                //a39bf724b6756c306650a643c93489eefaadd2ba 2023-01-23T14:58:51+01:00
                if(err){
                    reject(err)
                }
                else if(err2){
                    reject(err2)
                }
                else{
                    res = res.slice(0, -1);//we remove the last character, which is \n
                    const data = res.split(' ');
                    resolve({
                        sha : data[0],
                        createdAt : new Date(data[1])
                    } as Commit)
                }
            })
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

}