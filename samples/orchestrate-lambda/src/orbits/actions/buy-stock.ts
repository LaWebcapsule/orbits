import { Action, ActionState } from '@orbi-ts/core';
import { API_ADDRESS } from '../../const';
import { StockTransaction } from '../types/stocks';

export class BuyStockAction extends Action {
    declare IArgument: {
        price: number;
    };

    declare IResult: {
        stockData: StockTransaction;
    };

    async main() {
        this.internalLog(`url ${JSON.stringify(API_ADDRESS)} is buyStock`);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock_price: this.argument.price }),
        };
        const response = await fetch(API_ADDRESS + 'buyStock', requestOptions);
        const stockData = await response.json();
        this.setResult({ stockData });
        return ActionState.SUCCESS;
    }
}
