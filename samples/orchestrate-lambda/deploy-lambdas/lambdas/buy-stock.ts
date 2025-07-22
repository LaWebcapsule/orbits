const crypto = require("crypto");

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

  var date = new Date();
  // Mocked result of a stock buying transaction
  let transaction_result = {
    'id': crypto.randomBytes(16).toString("hex"), // Unique ID for the transaction
    'price': stock_price.toString(), // Price of each share
    'type': "buy", // Type of transaction(buy/ sell)
    'qty': getRandomInt(10).toString(),  // Number of shares bought / sold(We are mocking this as a random integer between 1 and 10)
    'timestamp': date.toISOString(),  // Timestamp of the when the transaction was completed
  }

  return {
    statusCode: 200,
    body: JSON.stringify(transaction_result)
  };
};
