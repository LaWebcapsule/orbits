import { Action, Workflow } from '@wbce/orbits-core';
import { CdkHelper, WaitForNewCommits } from '@wbce/orbits-fuel';

const defaultEnv = {
    account: '123456789',
    region: 'eu-west-3',
};

/* 


export class OnCommitsAction extends Workflow{
    define(){
        this.name("wait")
            .next(()=>{
                const waitForNewCommits = new WaitForNewCommits();
                return waitForNewCommits
            })
            .next((commits)=>{
                //return Action.build()
            }).next((deploy)=>{

            })

    }
}

export class CiPipeline extends Workflow{

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
} */
