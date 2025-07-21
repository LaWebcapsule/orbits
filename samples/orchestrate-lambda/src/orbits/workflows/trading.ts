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
        const stockPrice = resultCheckStockPrice.stockPrice;
        this.internalLog(`Retrieved a stock price: ${JSON.stringify(stockPrice)}`)

        const resultGenerateBuySellRecommendationAction = await this.do("check-stock-price", new GenerateBuySellRecommendationAction().setArgument(
            {
                price:stockPrice.stock_price
            })); 

        const buyOrSellRecommendation = resultGenerateBuySellRecommendationAction.buyOrSellRecommendation
        this.internalLog(`Got recommendation based on price: ${buyOrSellRecommendation}`)

        if (buyOrSellRecommendation === 'sell') {
             const resultSellStockData = await this.do("sell-stock", new SellStockeAction().setArgument({
                price:stockPrice.stock_price
            }));
            return resultSellStockData.stockData;
        } else {
             const resultBuyStockData = await this.do("buy-stock", new BuyStockAction().setArgument({
                price:stockPrice.stock_price
            }));
            return resultBuyStockData.stockData;
        }

    };
}
