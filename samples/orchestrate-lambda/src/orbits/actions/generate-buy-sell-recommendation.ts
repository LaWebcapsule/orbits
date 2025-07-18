import { Action, ActionState } from "@orbi-ts/core";
import { API_ADDRESS } from '../../init-env';


export class GenerateBuySellRecommendationAction extends Action {

    declare IArgument: {
        price: number;
    };

    declare IResult: {
        buyOrSellRecommendation: string;
    }

    async main(){
        console.log(`url ${JSON.stringify(API_ADDRESS)} is generateBuySellRecommendation`);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock_price: this.argument.price })
        };
        const response = await fetch(API_ADDRESS + 'generateBuySellRecommendation', requestOptions);
        this.result.buyOrSellRecommendation = await response.toString();
        return ActionState.SUCCESS
    };

}