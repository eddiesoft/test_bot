const Binance = require("binance-api-node").default;

const API_KEY = "";
const API_SECRET = "";
const client = Binance({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
});

const symbol = "DYMUSDT";
const quantity = 1;

async function fetchCandlesticks() {
  try {
    const candlesticks = await client.candles({
      symbol,
      interval: "1m",
      limit: 20,
    });
    console.log("Previous 20 candlesticks:", candlesticks);
    return candlesticks;
  } catch (error) {
    console.error("Error fetching candlesticks:", error);
  }
}

async function marketBuy() {
  try {
    const order = await client.order({
      symbol,
      side: "BUY",
      type: "MARKET",
      quantity,
    });
    console.log("Market buy order placed:", order);
  } catch (error) {
    console.error("Error placing market buy order:", error);
  }
}

async function marketSell() {
  try {
    const order = await client.order({
      symbol,
      side: "SELL",
      type: "MARKET",
      quantity,
    });
    console.log("Market sell order placed:", order);
  } catch (error) {
    console.error("Error placing market sell order:", error);
  }
}

async function cancelOrders() {
  try {
    const orders = await client.cancelOrders({ symbol });
    console.log("Canceled orders:", orders);
  } catch (error) {
    console.error("Error canceling orders:", error);
  }
}

async function performTradingActions() {
  marketBuy();
}
performTradingActions();

// setInterval(performTradingActions, 3000);
