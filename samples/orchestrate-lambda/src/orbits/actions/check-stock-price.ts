import { Action, ActionState } from "@orbi-ts/core";
import { API_ADDRESS } from '../../init-env';
import { StockPriceResultObj } from "../types/stocks";
import { JSONObject } from "../../../../../packages/services/src/utils";


export class CheckStockPriceAction extends Action {

    declare IResult: {
        stockPrice: StockPriceResultObj & JSONObject;
    }

    async main(){
        console.log(`url ${JSON.stringify(API_ADDRESS)} is checkStockPrice`);
        const requestOptions = {
            method: 'GET',
                headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(API_ADDRESS + 'checkStockPrice', requestOptions);
        this.result.stockPrice = await response.json();
        return ActionState.SUCCESS
    };

}