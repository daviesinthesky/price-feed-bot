import { QueryChain } from '@firefly-exchange/library-sui/dist/src/spot';
import { CLMMPriceData } from '../types';
import { SuiClient } from '@firefly-exchange/library-sui';

class BluefinService {
    private client: SuiClient;
    private readonly USDC_USDT_POOL_ID = '0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1';

    constructor() {
        this.client = new SuiClient({ url: "https://fullnode.mainnet.sui.io:443" });
    }

    async fetchUSDC_USDTPrice(): Promise<CLMMPriceData> {
        try {
            const qc = new QueryChain(this.client);
            const pool = await await qc.getPool(this.USDC_USDT_POOL_ID);
            
            if (!pool) {
                throw new Error('Unable to fetch pool data');
            }

            // Calculate price from sqrt_price
            const sqrtPrice = pool.current_sqrt_price;
            const price = (Math.pow(Number(sqrtPrice), 2) / Math.pow(2, 128));

            return {
                price,
                poolAddress: this.USDC_USDT_POOL_ID,
                timestamp: Date.now(),
                status: 'success'
            };
        } catch (error) {
            console.error('Error fetching USDC/USDT price:', error);
            return {
                price: 0,
                poolAddress: this.USDC_USDT_POOL_ID,
                timestamp: 0,
                status: 'error',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }

    // USDC per USDT
    async fetchPrice(): Promise<CLMMPriceData> {
        try {
            const qc = new QueryChain(this.client);
            const pool = await await qc.getPool(this.USDC_USDT_POOL_ID);
            
            if (!pool) {
                throw new Error('Unable to fetch pool data');
            }

            // Calculate price from sqrt_price
            const sqrtPrice = pool.current_sqrt_price;
            const price = (Math.pow(Number(sqrtPrice), 2) / Math.pow(2, 128));

            return {
                price,
                poolAddress: this.USDC_USDT_POOL_ID,
                timestamp: Date.now(),
                status: 'success'
            };
        } catch (error) {
            console.error('Error fetching USDC/USDT price:', error);
            return {
                price: 0,
                poolAddress: this.USDC_USDT_POOL_ID,
                timestamp: 0,
                status: 'error',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
}

export default BluefinService;