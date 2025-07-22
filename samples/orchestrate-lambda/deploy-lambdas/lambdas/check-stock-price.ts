function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const handler = async (event: Event): Promise<any> => {

  // If the stock price is greater than 50 recommend selling. Otherwise, recommend buying.
  const stock_price = getRandomInt(100)

  return {
    statusCode: 200,
    body: `{"stock_price": ${stock_price}}`
  };
};