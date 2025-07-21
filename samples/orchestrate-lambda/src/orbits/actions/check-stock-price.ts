import { Action, ActionState } from "@orbi-ts/core";
import { API_ADDRESS } from '../../const';
import { StockPriceResultObj } from "../types/stocks";

export class CheckStockPriceAction extends Action {

    declare IResult: {
        stockPrice: StockPriceResultObj;
    }

    async main(){
        this.internalLog(`url ${JSON.stringify(API_ADDRESS)} is checkStockPrice`);
        const requestOptions = {
            method: 'GET',
                headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(API_ADDRESS + 'checkStockPrice', requestOptions);
        const stockPrice = await response.json();
        this.setResult({stockPrice});
        return ActionState.SUCCESS;
    };

}