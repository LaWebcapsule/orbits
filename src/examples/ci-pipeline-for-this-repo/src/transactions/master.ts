import { Action, Transaction } from "@wbce/orbits-core";
import { WaitForNewCommits } from "@wbce/orbits-fuel/dist/src/git-actions/gitactions";
import { Commit } from "@wbce/orbits-fuel/dist/src/git-actions/gitrepo";
import { PublishNpmPackage } from "../actions/publish-npm-package";
import { UpdateNpmVersions } from "../actions/update-npm-versions";


export class MasterWorkflow extends Transaction{
    IBag : {
        lastCommit : Commit,
        releasesToPublish : {
            relativePackageDir : string,
            version? : string,
            type : 'major' | 'minor' | 'patch',
            notes? : string
        }[]
    } & Transaction['IBag']

    semanticReleaseConfiguration = {

    }

    mapPackageDirectory = {
        '@wbce/orbits-core': 'src/core/actions',
        '@wbce/orbits-fuel': 'src/helpers',
        '@wbce/services': 'src/packages/services'
    }

    define(){
        this.name("wait for new commits step")
        .next(()=>{
            this.bag.releasesToPublish = [];
            /*const waitForNewCommits = new WaitForNewCommits()
            waitForNewCommits.setArgument({
                branches : [{
                    name : 'master',
                    lastCommit : this.bag.lastCommit
                }],
                repoName: 'LaWebcapsule/orbits'
            }) */
            return;//waitForNewCommits
        }).next(()=>{
            //const lastCommit = commits.pop();
            //this.bag.lastCommit = lastCommit;
            //Note : we could use semantic release to publish new versions
            //but because of this : https://dev.to/antongolub/the-chronicles-of-semantic-release-and-monorepos-5cfc
            //we only use semantic release to give us the new versions names of the different packages.
            for(const key in this.mapPackageDirectory){
                this.bag.releasesToPublish.push({
                    type : 'patch',
                    relativePackageDir : this.mapPackageDirectory[key]
                })
            }
            const updateVersions = new UpdateNpmVersions();
            updateVersions.setArgument({
                versions : this.bag.releasesToPublish
            })
            return updateVersions
        }).next(()=>{
            const publishActions = [];
            const toPublish = [{
                relativePackageDir : 'src/core/actions'
            },{
                relativePackageDir : 'src/helpers'
            }, {
                relativePackageDir : 'src/packages/services'
            }]
            for(const version of toPublish){
                const publish = new PublishNpmPackage()
                publish.setArgument({
                    packagePath : version.relativePackageDir
                })
                publishActions.push({
                   publish 
                })
            }
            return publishActions;   
        })
        //.onErrorGoTo("wait for new commits step")
        //.onSuccessGoTo("wait for new commits step")
    }
}