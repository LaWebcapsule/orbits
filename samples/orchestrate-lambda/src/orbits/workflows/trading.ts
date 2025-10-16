import { ResolveAction, Sleep, Workflow } from '@orbi-ts/core';
import { ResolveInputsAction } from '@orbi-ts/fuel';
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
            'generate-recommandation',
            new GenerateBuySellRecommendationAction().setArgument({
                price: stockPrice.stock_price,
            })
        );

        const buyOrSellRecommendation =
            resultGenerateBuySellRecommendationAction.buyOrSellRecommendation;
        this.internalLog(
            `Got recommendation based on price: ${buyOrSellRecommendation}`
        );

        const resolveApproveAction = await this.do(
            `confirm?`,
            new Sleep().setArgument({time: 1000})
        );

        if (true || resolveApproveAction.approve) {
            const action =
                buyOrSellRecommendation === 'sell'
                    ? new SellStockAction()
                    : new BuyStockAction();
            action.setArgument({ price: stockPrice.stock_price });
            return (await this.do(`${buyOrSellRecommendation}-stock`, action))
                .stockData;
        }
        else{
            throw new Error("User invalidate the recommandation.")
        }

        this.internalLog('No action to be done');
    }
}
