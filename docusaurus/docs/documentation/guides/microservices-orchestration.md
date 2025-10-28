---
sidebar_position: 5
---

# Microservices Orchestration Example

A practical example to help you orchestrate micro-services using Orbits.

## Scope

In this example, we revisit the classic case of orchestrating a banking transaction. For more context on why and how Orbits can be used to orchestrate microservices, you can check out the [full blog post](/blog/workflows-orchestrate-microservices) on the reason and utility of using orbits to orchestrate microservices.

This well-known example originates from both [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/sample-lambda-orchestration.html) and [Temporal](https://temporal.io/blog/temporal-replaces-state-machines-for-distributed-applications). Interested readers can refer to these agents to compare the syntax and implementation experience each solution offers.

## Installation

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory :

```bash
cd samples/orchestrate-lambda
```

- Install node.js dependencies :
  `npm i``

### Setup lambdas in aws

You'll need to deploy lambdas in aws

- First of all you'll need an aws account with propers rights.
- Go to this directory :

```bash
cd ./deploy-lambdas
```

- Follow README.md instructions to get API's URL

### Configure environment values

- Copy the environment template:

```bash
cp .base.env .env
```

- Edit .env file with the api url retrieved previously

## Project Structure

```bash
├── deploy-lambdas/ # Submodule for Lambda deployment
│   ├── lambdas/
│   │   ├── buy-stock.ts # Buy stock Lambda
│   │   ├── check-stock-price.ts # Check stock price Lambda
│   │   ├── generate-buy-sell-recommend.ts # Recommendation Lambda
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── sell-stock.ts # Sell stock Lambda
│   │   ├── tsconfig.ts
│   │   └── update-one.ts  # not used
│   ├── cdk.json
│   ├── index.js
│   ├── index.ts # lambda CDK stack definition
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── src/
│   ├── orbits/
│   │   ├── orbi.ts # Main orchestration script
│   │   ├── actions/
│   │   │   ├── buy-stock.ts # Buy stock API call action
│   │   │   ├── check-stock-price.ts # Check stock price API call action
│   │   │   ├── generate-buy-sell-recommendation.ts # Generate a recommendation based on price API call action
│   │   │   └── sell-stock.ts # Sell stock API call action
│   │   ├── types/
│   │   │   └── stocks.ts # Transaction and Stock type
│   │   └── workflows/
│   │       └── trading.ts # Trading workflow
│   └── const.ts # Utils const
├── .base.env # Environment template
├── .env # Your environment variables (git-ignored)
├── package.json
└── README.md
```

## The Trading Workflow

```ts title="src/orbits/workflows/trading.ts"
export class TradingWorkflow extends Workflow {
    declare IResult: StockTransaction;

    async define() {
        const resultCheckStockPrice = await this.do(
            'check-stock-price',
            new CheckStockPriceAction()
        );
        const stockPrice = resultCheckStockPrice.stockPrice;

        const resultGenerateBuySellRecommendationAction = await this.do(
            'check-stock-price',
            new GenerateBuySellRecommendationAction().setArgument({
                price: stockPrice.stock_price,
            })
        );

        const buyOrSellRecommendation =
            resultGenerateBuySellRecommendationAction.buyOrSellRecommendation;

        if (buyOrSellRecommendation === 'sell') {
            const resultSellStockData = await this.do(
                'sell-stock',
                new SellStockAction().setArgument({
                    price: stockPrice.stock_price,
                })
            );
            return resultSellStockData.stockData;
        } else {
            const resultBuyStockData = await this.do(
                'buy-stock',
                new BuyStockAction().setArgument({
                    price: stockPrice.stock_price,
                })
            );
            return resultBuyStockData.stockData;
        }
    }
}
```

This central workflow orchestrates each step by calling autonomous **Actions**, while maintaining branching logic and intermediate states.

## BuyStockAction

```ts
export class BuyStockAction extends Action {
    async main() {
        const response = await fetch(API_ADDRESS + 'buyStock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock_price: this.argument.price }),
        });
        this.result.stockData = await response.json();
        return ActionState.SUCCESS;
    }
}
```

This action:

- Takes a typed input (price)
- Calls a remote API in an encapsulated manner
- Returns a state - ActionState.SUCCESS, ready to be recorded and resumed
- Handles errors by default via a state - ActionState.ERROR

This structuring makes the action not only easy to test in isolation but also reusable in different workflows, while simplifying its instrumentation for monitoring or debugging.

## Running the sample

### Run the Script

- Load environment variables:

```bash
export $(cat .env | xargs)
```

- Define your mongo_url :

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

- Run your workflow :

```bash
npx tsx src/orbits/orbi.ts
```

This command will:

- Execute the trading workflow

## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **🧩 [Cross-account cdk examples](./cross-account-cdk.md)** - Show how to use infrastructure templates in conjonction with orbits
2. **⚙️ [Core concepts](../core-concepts/readme.md)** - Master the fundamental architecture principles and design patterns that power Orbits
3. **🛤️ [Guides](../guides/readme.md)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::
