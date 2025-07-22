import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { App, Stack } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'

export class ApiLambdaCrudDynamoDBStack extends Stack {
  constructor(app: App, id: string) {
    super(app, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
      },
      depsLockFilePath: join(__dirname, 'lambdas', 'package-lock.json'),
      runtime: Runtime.NODEJS_LATEST,
    }

    const checkStockPrice = new NodejsFunction(this, 'checkStockPriceFunction', {
      entry: join(__dirname, 'lambdas', 'check-stock-price.ts'),
      ...nodeJsFunctionProps,
    });
    const generateBuySellRecommend = new NodejsFunction(this, 'generateBuySellRecommendFunction', {
      entry: join(__dirname, 'lambdas', 'generate-buy-sell-recommend.ts'),
      ...nodeJsFunctionProps,
    });
    const buyStock = new NodejsFunction(this, 'buyStockFunction', {
      entry: join(__dirname, 'lambdas', 'buy-stock.ts'),
      ...nodeJsFunctionProps,
    });
    const sellStock = new NodejsFunction(this, 'sellStockFunction', {
      entry: join(__dirname, 'lambdas', 'sell-stock.ts'),
      ...nodeJsFunctionProps,
    });

    // Integrate the Lambda functions with the API Gateway resource
    const generateBuySellRecommendIntegration = new LambdaIntegration(generateBuySellRecommend);
    const checkStockPriceIntegration = new LambdaIntegration(checkStockPrice);

    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, 'stockApi', {
      restApiName: 'Stock Trading State Machine',
      // In case you want to manage binary types, uncomment the following
      // binaryMediaTypes: ["*/*"],
    });

    const checkStockPriceApi = api.root.addResource('checkStockPrice');
    checkStockPriceApi.addMethod('GET', checkStockPriceIntegration);
    addCorsOptions(checkStockPriceApi);

    const generateBuySellRecommendApi = api.root.addResource('generateBuySellRecommendation');
    generateBuySellRecommendApi.addMethod('POST', generateBuySellRecommendIntegration);
    addCorsOptions(generateBuySellRecommendApi);

    const buyStockApi = api.root.addResource('buyStock');
    buyStockApi.addMethod('POST', new LambdaIntegration(buyStock));
    addCorsOptions(buyStockApi);

    const sellStockApi = api.root.addResource('sellStock');
    sellStockApi.addMethod('POST', new LambdaIntegration(sellStock));
    addCorsOptions(sellStockApi);

    // const singleItem = items.addResource('{id}');
    // singleItem.addMethod('GET', getOneIntegration);
    // singleItem.addMethod('PATCH', updateOneIntegration);
    // singleItem.addMethod('DELETE', deleteOneIntegration);
    // addCorsOptions(singleItem);
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    // In case you want to use binary media types, uncomment the following line
    // contentHandling: ContentHandling.CONVERT_TO_TEXT,
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    // In case you want to use binary media types, comment out the following line
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}

const app = new App();
new ApiLambdaCrudDynamoDBStack(app, 'OrchestrateLambdaFunctionsStack');
app.synth();
