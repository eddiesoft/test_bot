const fetch = require('node-fetch'); // if running in Node.js environment
const crypto = require('crypto');

const API_KEY = 'vXWxnGPbHtWzcT5h3bXG6Mj4s2fn95uqtmSHXmrmQt238oZ53icA9fkji6M93CZI';
const API_SECRET = 'IVhf0PXTN3sGdQRhkfNID4qX0HUrBWvVmYCb92JE7I8pT2RDawm1V7paPl0uou1A';
const BASE_URL = 'https://fapi.binance.com';

// Function to make authenticated API requests
async function makeRequest(endpoint, method = 'GET', data = {}) {
    const timestamp = Date.now().toString();
    const message = timestamp + endpoint + JSON.stringify(data);
    const signature = crypto.createHmac('sha256', API_SECRET).update(message).digest('hex');

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
            'X-SIGNATURE': signature,
            'X-TIMESTAMP': timestamp
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined
    };

    const response = await fetch(BASE_URL + endpoint, options);
    return response.json();
}

// Get Close Prices of Last 20 Candlesticks
async function getLast20Candlesticks(symbol, interval = '1h') {
    const candlesticks = await makeRequest(`/candlesticks/${symbol}?interval=${interval}`, 'GET');
    const last20Candlesticks = candlesticks.slice(-20); // Get last 20 candlesticks
    return last20Candlesticks;
}

// Example usage
setInterval(async () => {
    try {
        // Get last 20 candlesticks including the current one
        const last20Candlesticks = await getLast20Candlesticks('BTCUSD', '1h');
        console.log('Last 20 candlesticks:', last20Candlesticks);

        // Perform any analysis here based on the last 20 candlesticks
        
    } catch (error) {
        console.error('Error:', error);
    }
}, 3000); // Run every 3 seconds
