import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { CODE_PATH } from '../constants';

export interface LambdaStackProps extends StackProps {}

export class LambdaStack extends Stack {
    constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const fn = new NodejsFunction(this, 'Lambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: CODE_PATH,
        });

        const apiGw = new apigw.LambdaRestApi(this, 'Hello API', {
            handler: fn,
            proxy: false,
        });

        const hello = apiGw.root.addAgent('hello');
        hello.addMethod('GET');

        const cachePolicy = new cloudfront.CachePolicy(
            this,
            'HelloApiCachePolicy',
            {
                cachePolicyName: 'HelloApiGatewayCachePolicy',
                comment: 'Cache Hello API Gateway responses for 1 minute',
                minTtl: cdk.Duration.minutes(1),
                defaultTtl: cdk.Duration.minutes(1),
                queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
            }
        );

        const apiUrl = apiGw.url.replace(/^https?:\/\//, '');
        const [domainName, path] = apiUrl.split('/');

        const distribution = new cloudfront.Distribution(
            this,
            'HelloDistribution',
            {
                defaultBehavior: {
                    origin: new origins.HttpOrigin(domainName, {
                        originPath: `/${path}${hello.path}`,
                    }),
                    cachePolicy,
                },
            }
        );

        new cdk.CfnOutput(this, 'CfDomainName', {
            value: distribution.domainName,
            description: 'Cloudfront domain name',
        });

        new cdk.CfnOutput(this, 'CfId', {
            value: distribution.distributionId,
            description: 'Cloudfront distribution id',
        });
    }
}
