import { Workflow } from "@orbi-ts/core";
import { CheckStockPriceAction } from "../actions/check-stock-price";
import { StockPriceResultObj, StockTransaction } from "../types/stocks";
import { GenerateBuySellRecommendationAction } from "../actions/generate-buy-sell-recommendation";
import { SellStockeAction } from "../actions/sellStock";
import { BuyStockAction } from "../actions/buyStock";

export class TradingWorkflow extends Workflow{

    declare IResult:StockTransaction

    async define(){
        const resultCheckStockPrice = await this.do("check-stock-price", new CheckStockPriceAction());
        const stockPrice: StockPriceResultObj = resultCheckStockPrice.stockPrice as StockPriceResultObj;
        console.log(`Retrieved a stock price: ${JSON.stringify(stockPrice)}`)

        const resultGenerateBuySellRecommendationAction = await this.do("check-stock-price", new GenerateBuySellRecommendationAction().setArgument(
            {
                price:stockPrice.stock_price
            })); 

        const buyOrSellRecommendation : string = resultGenerateBuySellRecommendationAction.buyOrSellRecommendation
        console.log(`Got recommendation based on price: ${buyOrSellRecommendation}`)

        let result: StockTransaction = {
            id: '',
            price: '',
            type: 'sell',
            qty: '',
            timestamp: ''
        };
        if (buyOrSellRecommendation === 'sell') {
             const resultSellStockData = await this.do("sell-stock", new SellStockeAction().setArgument({
                price:stockPrice.stock_price
            }));
            result = resultSellStockData.stockData;
        } else {
             const resultBuyStockData = await this.do("buy-stock", new BuyStockAction().setArgument({
                price:stockPrice.stock_price
            }));
            const sellStockData: StockTransaction = resultBuyStockData.stockData;
            result = sellStockData;
        }

        return result;
    };
}
