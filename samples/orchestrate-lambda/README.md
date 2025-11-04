# CDK8S deployment example

A practical example demonstrating how to manage and coordinates micro-services with orbits.

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory:

```bash
cd samples/orchestrate-lambda
```

- Install node.js dependencies:
  `npm i``

### Setup lambdas in aws

You'll need to deploy lambdas in aws

- First of all you'll need an aws account with propers rights.
- Go to this directory:

```bash
cd ./deploy-lambdas
```

- Follow README.md instructions to get API's URL

#### Configure environment values

- Copy the environment template:

```bash
cp .base.env .env
```

- Edit .env file with the api url retrieved previously

## Execution

- Load environment variables:

```bash
export $(cat .env | xargs)
```

- Define your mongo_url:

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

- Run your workflow:

```bash
npx tsx src/orbits/orbi.ts
```

or via the cli:

```bash
orbits-cli actions run TradingWorkflow -f src/orbits/orbi.ts --local-worker
```

This command will execute the trading workflow

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
│   │   └── update-one.ts # not used
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
