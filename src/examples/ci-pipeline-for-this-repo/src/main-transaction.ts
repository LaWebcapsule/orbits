import { Action, Transaction } from "@wbce/orbits-core";
import { CdkHelper } from "@wbce/orbits-fuel";
import { App } from "aws-cdk-lib";
import { WaitForNewCommits } from "@wbce/orbits-fuel/dist/src/git-actions/gitactions";

const defaultEnv = {
    account : '123456789',
    region : 'eu-west-3'
}

const publicUrl = {

}



export class OnCommitsAction extends Transaction{
    define(): void | Promise<void> {
        this.name("wait")
            .then(()=>{
                const waitForNewCommits = new WaitForNewCommits();
                waitForNewCommits.setArgument({

                })
                return waitForNewCommits
            })
            .then((commits)=>{
                return Action.build()
            }).then((deploy)=>{

            })

    }
}

export class CiPipeline extends Transaction{

    define(){
        const stackName = 'my-first-pipe';
        console.log("ciPipeline define")
        this.name("init")
            .next(()=>{

        }).name("mainLoop")
        .next(()=>{
            //cdk bootstrap
            const waitForNewPR = new GitHub();
        }).next(()=>{
            const RunTestAction ;

        }).next(()=>{
            //copy file to s3
            const myStack = new FrontStack(new App(), stackName, {
                env : defaultEnv
            });
            const s3Client = new S3Client({region: 'eu-west-3'});
            const cdkHelper = new CdkHelper({region : 'eu-west-3'});
            return cdkHelper.describePhysicalResource(myStack.bucket, myStack).then((res)=>{
                const command = new PutObjectCommand({
                    Body : 'test!',
                    Bucket: res.StackResourceDetail.PhysicalResourceId,
                    Key: 'test'
    
                })
                return s3Client.send(command);
            }).then(()=>{
                return Action.resolve();
            }).catch(err=>{
                console.log(err);
                throw err;
            }) 
        })
        return Promise.resolve();
    }    
}