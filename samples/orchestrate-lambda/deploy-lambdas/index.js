"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCorsOptions = exports.ApiLambdaCrudDynamoDBStack = void 0;
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path_1 = require("path");
class ApiLambdaCrudDynamoDBStack extends aws_cdk_lib_1.Stack {
    constructor(app, id) {
        super(app, id);
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
                ],
            },
            depsLockFilePath: (0, path_1.join)(__dirname, 'lambdas', 'package-lock.json'),
            runtime: aws_lambda_1.Runtime.NODEJS_LATEST,
        };
        const checkStockPrice = new aws_lambda_nodejs_1.NodejsFunction(this, 'checkStockPriceFunction', {
            entry: (0, path_1.join)(__dirname, 'lambdas', 'check-stock-price.ts'),
            ...nodeJsFunctionProps,
        });
        const generateBuySellRecommend = new aws_lambda_nodejs_1.NodejsFunction(this, 'generateBuySellRecommendFunction', {
            entry: (0, path_1.join)(__dirname, 'lambdas', 'generate-buy-sell-recommend.ts'),
            ...nodeJsFunctionProps,
        });
        const buyStock = new aws_lambda_nodejs_1.NodejsFunction(this, 'buyStockFunction', {
            entry: (0, path_1.join)(__dirname, 'lambdas', 'buy-stock.ts'),
            ...nodeJsFunctionProps,
        });
        const sellStock = new aws_lambda_nodejs_1.NodejsFunction(this, 'sellStockFunction', {
            entry: (0, path_1.join)(__dirname, 'lambdas', 'sell-stock.ts'),
            ...nodeJsFunctionProps,
        });
        // Integrate the Lambda functions with the API Gateway resource
        const generateBuySellRecommendIntegration = new aws_apigateway_1.LambdaIntegration(generateBuySellRecommend);
        const checkStockPriceIntegration = new aws_apigateway_1.LambdaIntegration(checkStockPrice);
        // Create an API Gateway resource for each of the CRUD operations
        const api = new aws_apigateway_1.RestApi(this, 'stockApi', {
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
        buyStockApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(buyStock));
        addCorsOptions(buyStockApi);
        const sellStockApi = api.root.addResource('sellStock');
        sellStockApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(sellStock));
        addCorsOptions(sellStockApi);
        // const singleItem = items.addResource('{id}');
        // singleItem.addMethod('GET', getOneIntegration);
        // singleItem.addMethod('PATCH', updateOneIntegration);
        // singleItem.addMethod('DELETE', deleteOneIntegration);
        // addCorsOptions(singleItem);
    }
}
exports.ApiLambdaCrudDynamoDBStack = ApiLambdaCrudDynamoDBStack;
function addCorsOptions(apiResource) {
    apiResource.addMethod('OPTIONS', new aws_apigateway_1.MockIntegration({
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
        passthroughBehavior: aws_apigateway_1.PassthroughBehavior.NEVER,
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
    });
}
exports.addCorsOptions = addCorsOptions;
const app = new aws_cdk_lib_1.App();
new ApiLambdaCrudDynamoDBStack(app, 'OrchestrateLambdaFunctionsStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFBeUg7QUFDekgsdURBQWlEO0FBQ2pELDZDQUF5QztBQUN6QyxxRUFBb0Y7QUFDcEYsK0JBQTJCO0FBRTNCLE1BQWEsMEJBQTJCLFNBQVEsbUJBQUs7SUFDbkQsWUFBWSxHQUFRLEVBQUUsRUFBVTtRQUM5QixLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWYsTUFBTSxtQkFBbUIsR0FBd0I7WUFDL0MsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRTtvQkFDZixTQUFTLEVBQUUsb0RBQW9EO2lCQUNoRTthQUNGO1lBQ0QsZ0JBQWdCLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQztZQUNqRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxhQUFhO1NBQy9CLENBQUE7UUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQzFFLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixDQUFDO1lBQ3pELEdBQUcsbUJBQW1CO1NBQ3ZCLENBQUMsQ0FBQztRQUNILE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxrQ0FBa0MsRUFBRTtZQUM1RixLQUFLLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQztZQUNuRSxHQUFHLG1CQUFtQjtTQUN2QixDQUFDLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzVELEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQztZQUNqRCxHQUFHLG1CQUFt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QUcsR0FBRyxJQUFJLGlCQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3ZFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElSZXNvdXJjZSwgTGFtYmRhSW50ZWdyYXRpb24sIE1vY2tJbnRlZ3JhdGlvbiwgUGFzc3Rocm91Z2hCZWhhdmlvciwgUmVzdEFwaSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IFJ1bnRpbWUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IEFwcCwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiwgTm9kZWpzRnVuY3Rpb25Qcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuXG5leHBvcnQgY2xhc3MgQXBpTGFtYmRhQ3J1ZER5bmFtb0RCU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoYXBwLCBpZCk7XG5cbiAgICBjb25zdCBub2RlSnNGdW5jdGlvblByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xuICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbXG4gICAgICAgICAgJ2F3cy1zZGsnLCAvLyBVc2UgdGhlICdhd3Mtc2RrJyBhdmFpbGFibGUgaW4gdGhlIExhbWJkYSBydW50aW1lXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgZGVwc0xvY2tGaWxlUGF0aDogam9pbihfX2Rpcm5hbWUsICdsYW1iZGFzJywgJ3BhY2thZ2UtbG9jay5qc29uJyksXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU19MQVRFU1QsXG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tTdG9ja1ByaWNlID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdjaGVja1N0b2NrUHJpY2VGdW5jdGlvbicsIHtcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJ2xhbWJkYXMnLCAnY2hlY2stc3RvY2stcHJpY2UudHMnKSxcbiAgICAgIC4uLm5vZGVKc0Z1bmN0aW9uUHJvcHMsXG4gICAgfSk7XG4gICAgY29uc3QgZ2VuZXJhdGVCdXlTZWxsUmVjb21tZW5kID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdnZW5lcmF0ZUJ1eVNlbGxSZWNvbW1lbmRGdW5jdGlvbicsIHtcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJ2xhbWJkYXMnLCAnZ2VuZXJhdGUtYnV5LXNlbGwtcmVjb21tZW5kLnRzJyksXG4gICAgICAuLi5ub2RlSnNGdW5jdGlvblByb3BzLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ1eVN0b2NrID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdidXlTdG9ja0Z1bmN0aW9uJywge1xuICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCAnbGFtYmRhcycsICdidXktc3RvY2sudHMnKSxcbiAgICAgIC4uLm5vZGVKc0Z1bmN0aW9uUHJvcHMsXG4gICAgfSk7XG4gICAgY29uc3Qgc2VsbFN0b2NrID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdzZWxsU3RvY2tGdW5jdGlvbicsIHtcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJ2xhbWJkYXMnLCAnc2VsbC1zdG9jay50cycpLFxuICAgICAgLi4ubm9kZUpzRnVuY3Rpb25Qcm9wcyxcbiAgICB9KTtcblxuICAgIC8vIEludGVncmF0ZSB0aGUgTGFtYmRhIGZ1bmN0aW9ucyB3aXRoIHRoZSBBUEkgR2F0ZXdheSByZXNvdXJjZVxuICAgIGNvbnN0IGdlbmVyYXRlQnV5U2VsbFJlY29tbWVuZEludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKGdlbmVyYXRlQnV5U2VsbFJlY29tbWVuZCk7XG4gICAgY29uc3QgY2hlY2tTdG9ja1ByaWNlSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24oY2hlY2tTdG9ja1ByaWNlKTtcblxuICAgIC8vIENyZWF0ZSBhbiBBUEkgR2F0ZXdheSByZXNvdXJjZSBmb3IgZWFjaCBvZiB0aGUgQ1JVRCBvcGVyYXRpb25zXG4gICAgY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgJ3N0b2NrQXBpJywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdTdG9jayBUcmFkaW5nIFN0YXRlIE1hY2hpbmUnLFxuICAgICAgLy8gSW4gY2FzZSB5b3Ugd2FudCB0byBtYW5hZ2UgYmluYXJ5IHR5cGVzLCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZ1xuICAgICAgLy8gYmluYXJ5TWVkaWFUeXBlczogW1wiKi8qXCJdLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2tTdG9ja1ByaWNlQXBpID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2NoZWNrU3RvY2tQcmljZScpO1xuICAgIGNoZWNrU3RvY2tQcmljZUFwaS5hZGRNZXRob2QoJ0dFVCcsIGNoZWNrU3RvY2tQcmljZUludGVncmF0aW9uKTtcbiAgICBhZGRDb3JzT3B0aW9ucyhjaGVja1N0b2NrUHJpY2VBcGkpO1xuXG4gICAgY29uc3QgZ2VuZXJhdGVCdXlTZWxsUmVjb21tZW5kQXBpID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2dlbmVyYXRlQnV5U2VsbFJlY29tbWVuZGF0aW9uJyk7XG4gICAgZ2VuZXJhdGVCdXlTZWxsUmVjb21tZW5kQXBpLmFkZE1ldGhvZCgnUE9TVCcsIGdlbmVyYXRlQnV5U2VsbFJlY29tbWVuZEludGVncmF0aW9uKTtcbiAgICBhZGRDb3JzT3B0aW9ucyhnZW5lcmF0ZUJ1eVNlbGxSZWNvbW1lbmRBcGkpO1xuXG4gICAgY29uc3QgYnV5U3RvY2tBcGkgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnYnV5U3RvY2snKTtcbiAgICBidXlTdG9ja0FwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oYnV5U3RvY2spKTtcbiAgICBhZGRDb3JzT3B0aW9ucyhidXlTdG9ja0FwaSk7XG5cbiAgICBjb25zdCBzZWxsU3RvY2tBcGkgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnc2VsbFN0b2NrJyk7XG4gICAgc2VsbFN0b2NrQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzZWxsU3RvY2spKTtcbiAgICBhZGRDb3JzT3B0aW9ucyhzZWxsU3RvY2tBcGkpO1xuXG4gICAgLy8gY29uc3Qgc2luZ2xlSXRlbSA9IGl0ZW1zLmFkZFJlc291cmNlKCd7aWR9Jyk7XG4gICAgLy8gc2luZ2xlSXRlbS5hZGRNZXRob2QoJ0dFVCcsIGdldE9uZUludGVncmF0aW9uKTtcbiAgICAvLyBzaW5nbGVJdGVtLmFkZE1ldGhvZCgnUEFUQ0gnLCB1cGRhdGVPbmVJbnRlZ3JhdGlvbik7XG4gICAgLy8gc2luZ2xlSXRlbS5hZGRNZXRob2QoJ0RFTEVURScsIGRlbGV0ZU9uZUludGVncmF0aW9uKTtcbiAgICAvLyBhZGRDb3JzT3B0aW9ucyhzaW5nbGVJdGVtKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29yc09wdGlvbnMoYXBpUmVzb3VyY2U6IElSZXNvdXJjZSkge1xuICBhcGlSZXNvdXJjZS5hZGRNZXRob2QoJ09QVElPTlMnLCBuZXcgTW9ja0ludGVncmF0aW9uKHtcbiAgICAvLyBJbiBjYXNlIHlvdSB3YW50IHRvIHVzZSBiaW5hcnkgbWVkaWEgdHlwZXMsIHVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmVcbiAgICAvLyBjb250ZW50SGFuZGxpbmc6IENvbnRlbnRIYW5kbGluZy5DT05WRVJUX1RPX1RFWFQsXG4gICAgaW50ZWdyYXRpb25SZXNwb25zZXM6IFt7XG4gICAgICBzdGF0dXNDb2RlOiAnMjAwJyxcbiAgICAgIHJlc3BvbnNlUGFyYW1ldGVyczoge1xuICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogXCInQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sWC1BbXotVXNlci1BZ2VudCdcIixcbiAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiBcIidmYWxzZSdcIixcbiAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IFwiJ09QVElPTlMsR0VULFBVVCxQT1NULERFTEVURSdcIixcbiAgICAgIH0sXG4gICAgfV0sXG4gICAgLy8gSW4gY2FzZSB5b3Ugd2FudCB0byB1c2UgYmluYXJ5IG1lZGlhIHR5cGVzLCBjb21tZW50IG91dCB0aGUgZm9sbG93aW5nIGxpbmVcbiAgICBwYXNzdGhyb3VnaEJlaGF2aW9yOiBQYXNzdGhyb3VnaEJlaGF2aW9yLk5FVkVSLFxuICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiBcIntcXFwic3RhdHVzQ29kZVxcXCI6IDIwMH1cIlxuICAgIH0sXG4gIH0pLCB7XG4gICAgbWV0aG9kUmVzcG9uc2VzOiBbe1xuICAgICAgc3RhdHVzQ29kZTogJzIwMCcsXG4gICAgICByZXNwb25zZVBhcmFtZXRlcnM6IHtcbiAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiB0cnVlLFxuICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IHRydWUsXG4gICAgICB9LFxuICAgIH1dXG4gIH0pXG59XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbm5ldyBBcGlMYW1iZGFDcnVkRHluYW1vREJTdGFjayhhcHAsICdPcmNoZXN0cmF0ZUxhbWJkYUZ1bmN0aW9uc1N0YWNrJyk7XG5hcHAuc3ludGgoKTtcbiJdfQ==