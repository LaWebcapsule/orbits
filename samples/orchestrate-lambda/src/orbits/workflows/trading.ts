import { Workflow } from '@orbi-ts/core';
import { BuyStockAction } from '../actions/buy-stock';
import { CheckStockPriceAction } from '../actions/check-stock-price';
import { GenerateBuySellRecommendationAction } from '../actions/generate-buy-sell-recommendation';
import { SellStockAction } from '../actions/sell-stock';
import { StockTransaction } from '../types/stocks';

export class TradingWorkflow extends Workflow {
    declare IResult: StockTransaction;

    async define() {
        const resultCheckStockPrice = await this.do(
            'check-stock-price',
            new CheckStockPriceAction()
        );
        const stockPrice = resultCheckStockPrice.stockPrice;
        this.internalLog(
            `Retrieved a stock price: ${JSON.stringify(stockPrice)}`
        );

        const resultGenerateBuySellRecommendationAction = await this.do(
            'check-stock-price',
            new GenerateBuySellRecommendationAction().setArgument({
                price: stockPrice.stock_price,
            })
        );

        const buyOrSellRecommendation =
            resultGenerateBuySellRecommendationAction.buyOrSellRecommendation;
        this.internalLog(
            `Got recommendation based on price: ${buyOrSellRecommendation}`
        );

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
