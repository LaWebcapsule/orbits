interface Event {
  body: string;
}

interface LambdaResponse {
  statusCode: number;
  body: string;
}

export const handler = async (event: Event): Promise<LambdaResponse> => {

  const body = JSON.parse(event.body);
  const { stock_price } = body;

  console.log(`stock_price: ${stock_price}`);
  const recommendation = stock_price > 50 ? 'sell' : 'buy';

  return {
    statusCode: 200,
    body: recommendation
  };
};
