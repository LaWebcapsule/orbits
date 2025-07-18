# CDK8S deployment example

A practical example demonstrating how to manage and coordinates micro-services with orbits. 

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory : 
```bash
cd samples/orchestrate-lambda
```
- Install node.js dependencies : 
`npm i``

### Setup lamndas in aws

You'll need to deploy lambdas in aws
- First of all you'll need an aws account with propers rights.
- Go to this directorys :
```bash
cd samples/orchestrate-lambda/deploy-lambdas
```
- Follow README.md instructions to get API's URL
- Define in .env 
```bash
API_ADDRESS=your-api-url
```

## Execution

- Define your mongo_url : 
```bash export ORBITS_DB__MONGO__URL=your-mongo-url```
- Run your workflow : 
```bash npx tsx src/orbits/orbi.ts```
This command will:
- Execute the trading workflow


## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   ├── orbi.ts # Main orchestration script
│   │   ├── actions/ 
│   │   │   ├── buyStock.ts
│   │   │   ├── check-stock-price.ts
│   │   │   ├── generate-buy-sell-recommendation.ts
│   │   │   └── sellStock.ts
│   │   ├── types/
│   │   │   └── stocks.ts
│   │   └── workflows/
│   │       └── trading.ts
│   ├── init-env.ts
├── package.json
└── README.md
```
