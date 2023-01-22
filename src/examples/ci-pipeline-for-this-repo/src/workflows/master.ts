import { Workflow } from "@wbce/orbits-core";
import { Commit } from "@wbce/orbits-fuel";
import { PublishNpmPackage } from "../actions/publish-npm-package";
import { UpdateNpmVersions } from "../actions/update-npm-versions";


export class MasterWorkflow extends Workflow{

    IBag : {
        lastCommit : Commit,
        releasesToPublish : {
            relativePackageDir : string,
            packageName : string,
            version? : string,
            type : 'major' | 'minor' | 'patch',
            notes? : string
        }[]
    } & Workflow['IBag']

    semanticReleaseConfiguration = {
        //Coming soon : use semantic release.
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
                /* const waitForNewCommits = new WaitForNewCommits()
                waitForNewCommits.setArgument({
                    branches : [{
                        name : 'master',
                        lastCommit : this.bag.lastCommit
                    }],
                    repoName: 'LaWebcapsule/orbits'
                }) */
                return;//waitForNewCommits
            })
            /* .next(()=>{
                //const lastCommit = commits.pop();
                //this.bag.lastCommit = lastCommit;
                //Note : we could use semantic release to publish new versions
                //but because of this : https://dev.to/antongolub/the-chronicles-of-semantic-release-and-monorepos-5cfc
                //we only use semantic release to give us the new versions names of the different packages.
                for(const key in this.mapPackageDirectory){
                    this.bag.releasesToPublish.push({
                        type : 'patch',
                        packageName : key,
                        relativePackageDir : this.mapPackageDirectory[key]
                    })
                }
                const updateVersions = new UpdateNpmVersions();
                updateVersions.setArgument({
                    versions : this.bag.releasesToPublish
                })
                return updateVersions
            })

        //the following syntax is a bit audacious
        //Our problem is :
        // - because of dependencies (orbits-fuel depends on orbits-core depends on services)
        //   we have to wait one package has been published to be able to publish the second
        // - not all package has to be published all the times
        // So in the case we want to publish all the three packages in this repo, we need three steps
        // But in the case we want to publish only one package, we only need one step
        // As a consequence, we are dynamically adding step
        //based on some conditions.
        //This is useful but can quickly cause errors if the way of Workflow works is not fully understood
        //Workflow are sequential. And as by default the steps have no names, the 'id' of a step is just its number
        //in the workflow sequence.
        // So the condition for doing this is that
        //once you are at step "B" the former step "A" doesn't disappear.
        //However, if you are at step "B", the following steps "C", "D" can still be modified.
        //In our case, this means that the 'bag.releasesToPublish' array cannot be modified
        //during the publishing following steps.
        const dependencyOrder = ['@wbce/services', '@wbce/orbits-core', '@wbce/orbits-fuel']
        for(const wbcePackage of dependencyOrder){
            const newReleaseOfPackage = this.bag.releasesToPublish?.find(r=>r.packageName === wbcePackage);
            if(newReleaseOfPackage){
                this.next(()=>{
                    const publish = new PublishNpmPackage()
                    publish.setArgument({
                        packagePath : newReleaseOfPackage.relativePackageDir
                    })
                    return publish;
                })
            }
        }
         */
        //Infinite loop : we are always watching for new commits
        this.onErrorGoTo("wait for new commits step")
            .onSuccessGoTo("wait for new commits step")
    }
}