import { EvmPriceServiceConnection, HexString, PriceFeed } from '@pythnetwork/pyth-evm-js';
import { PythPriceData } from '../types';

class PythService {
    private connection: EvmPriceServiceConnection;
    private readonly USDC_PRICE_FEED_ID = '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a';
    private readonly USDT_PRICE_FEED_ID = '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b';
    private readonly FEED_IDS = [this.USDC_PRICE_FEED_ID, this.USDT_PRICE_FEED_ID];

    constructor(pythEndpoint: string) {
        this.connection = new EvmPriceServiceConnection(pythEndpoint);
    }

    async fetchPrice(feed: PriceFeed, timestamp: number): Promise<PythPriceData> {
        const price = await feed.getPriceNoOlderThan(timestamp);

        return {
            price: Number(price?.price || 0),
            confidence: Number(price?.conf || 0),
            timestamp: price?.publishTime || 0,
            status: 'success'
        }
    }

    async fetchUSDC_USDTPrice(timestamp: number): Promise<PythPriceData> {
        try {
            const priceFeeds = await this.connection.getLatestPriceFeeds(this.FEED_IDS);
            
            if (!priceFeeds || priceFeeds.length === 0) {
                throw new Error('Unable to fetch price feeds');
            }

            const [usdcPriceData, usdtPriceData] = await Promise.all(priceFeeds.map(feed => this.fetchPrice(feed, timestamp)));

            return {
                price: usdcPriceData.price / usdtPriceData.price,
                confidence: usdcPriceData.confidence,
                timestamp: Math.max(usdcPriceData.timestamp, usdtPriceData.timestamp),
                status: 'success',
            };
        } catch (error) {
            console.error('Error fetching prices:', error);
            return {
                price: 0,
                confidence: 1,
                timestamp: 0,
                status: 'error',
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
}

export default PythService;