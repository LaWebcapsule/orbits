import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";




export class FrontStack extends Stack{

    //cf
    //https://github.com/harveyramer/deploy-angular-with-cdk/blob/master/static-site.ts
    //for a more complete stack.

    bucket : Bucket;
    cdn : CloudFrontWebDistribution;
    constructor(parent : App, name : string, props){
        super(parent, name, props);

        this.bucket = new Bucket(this, 'site-bucket', {
            bucketName: name,
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "error.html",
            publicReadAccess: true,
            removalPolicy : RemovalPolicy.DESTROY
        })

        this.cdn = new CloudFrontWebDistribution(this, 'site-distribution', {
            originConfigs: [
              {
                s3OriginSource: {
                  s3BucketSource: this.bucket,
                },
                behaviors: [{ isDefaultBehavior: true }],
              },
            ],
        });

    }

}