# Price Feed Bot

This project is a TypeScript application that fetches historical prices for USDC/USD and USDT/USD from the Pyth Price Feed, as well as the USDC/USDT price from the Cetus CLMM pool with a fee tier of 0.01%. 

## Features

- Fetch historical prices for USDC/USD and USDT/USD.
- Retrieve USDC/USDT price from the Cetus CLMM pool.
- Concurrent fetching of prices from both services.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd price-feed-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys and configuration settings.

## Usage

To run the bot, execute the following command:
```bash
npm start
```

## Testing

To run the tests, use:
```bash
npm test
```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.