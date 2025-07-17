import { Action, ActionState } from "@orbi-ts/core";
import { API_ADDRESS } from '../../init-env';
import { StockTransaction } from "../types/stocks";
import { JSONObject } from "../../../../../packages/services/src/utils";


export class BuyStockAction extends Action {

    declare IArgument: {
        price: number;
    };

    declare IResult: {
        stockData : StockTransaction & JSONObject
    }

    async main(){
        console.log(`url ${JSON.stringify(API_ADDRESS)} is buyStock`);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock_price: this.argument.price })
        };
        const response = await fetch(API_ADDRESS + 'buyStock', requestOptions);
        this.result.stockData = await response.json();
        return ActionState.SUCCESS
    };

}