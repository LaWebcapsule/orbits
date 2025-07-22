
export interface StockPriceResultObj {
    stock_price: number;
}

export interface StockTransaction {
    id: string;
    price: string;
    type: "sell" | "buy";
    qty: string;
    timestamp: string;
  }