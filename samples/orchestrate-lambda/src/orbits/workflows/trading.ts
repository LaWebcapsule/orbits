import { Workflow } from '@orbi-ts/core';
import { WaitForInput } from '@orbi-ts/fuel'
import { BuyStockAction } from '../actions/buy-stock';
import { CheckStockPriceAction } from '../actions/check-stock-price';
import { GenerateBuySellRecommendationAction } from '../actions/generate-buy-sell-recommendation';
import { SellStockAction } from '../actions/sell-stock';
import { StockTransaction } from '../types/stocks';

export class TradingWorkflow extends Workflow {
    declare IResult: Workflow['IResult'] & StockTransaction;

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

        const waitForConfirmation = await this.do(
            `confirm-${buyOrSellRecommendation}?`,
            new WaitForInput().setArgument({
                inputs: { approve: { type: 'bag', options: [true, false] } },
            })
        );

        if (waitForConfirmation.inputs.approve) {
            return (
                await this.do(
                    `${buyOrSellRecommendation}-stock`,
                    new (buyOrSellRecommendation === 'sell'
                        ? SellStockAction
                        : BuyStockAction)().setArgument({
                        price: stockPrice.stock_price,
                    })
                )
            ).stockData;
        }

        this.internalLog('No action to be done');
    }
}
