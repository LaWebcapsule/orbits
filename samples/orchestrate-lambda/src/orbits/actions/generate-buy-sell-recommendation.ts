import { Action, ActionState } from "@orbi-ts/core";
import { API_ADDRESS } from '../../const';


export class GenerateBuySellRecommendationAction extends Action {

    declare IArgument: {
        price: number;
    };

    declare IResult: {
        buyOrSellRecommendation: string;
    }

    async main(){
        this.internalLog(`url ${JSON.stringify(API_ADDRESS)} is generateBuySellRecommendation`);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock_price: this.argument.price })
        };
        const response = await fetch(API_ADDRESS + 'generateBuySellRecommendation', requestOptions);
        const buyOrSellRecommendation = await response.toString();
        this.setResult({buyOrSellRecommendation});
        return ActionState.SUCCESS;
    };

}