import { Transaction } from "@wbce/orbits-core";
import { WaitForNewCommits } from "@wbce/orbits-fuel/dist/src/git-actions/gitactions";
import { Commit } from "@wbce/orbits-fuel/dist/src/git-actions/gitrepo";
import semanticRelease from "semantic-release";


export class MasterWorkflow extends Transaction{
    IBag : {
        lastCommit : Commit
    } & Transaction['IBag']

    semanticReleaseConfiguration = {

    }

    define(){
        this.name("wait for new commits step")
        .next(()=>{
            const waitForNewCommits = new WaitForNewCommits()
            waitForNewCommits.setArgument({
                branches : [{
                    name : 'master',
                    lastCommit : this.bag.lastCommit
                }],
                repoName: 'LaWebcapsule/orbits'
            })
            return waitForNewCommits
        }).next(([commits])=>{
            const lastCommit = commits.pop();
            this.bag.lastCommit = lastCommit;
            return semanticRelease(this.semanticReleaseConfiguration, {}).then((result)=>{

            })
        }).next(()=>{
          return   
        })
        .onErrorGoTo("wait for new commits step")
        .onSuccessGoTo("wait for new commits step")
    }
}