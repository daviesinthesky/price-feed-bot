import { CetusClmmSDK, initCetusSDK } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { CLMMPriceData } from '../types';

class CetusService {
    private sdk: CetusClmmSDK;
    private readonly USDC_USDT_POOL_ID = '0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957';

    constructor() {
        this.sdk = initCetusSDK({ network: "mainnet" });
    }

    async fetchUSDC_USDTPrice(): Promise<CLMMPriceData> {
        try {
            const pool = await this.sdk.Pool.getPool(this.USDC_USDT_POOL_ID);

            if (!pool) {
                throw new Error('Unable to fetch pool data');
            }

            // Calculate price from sqrt_price
            const sqrtPrice = pool.current_sqrt_price;
            const price = 1 / (Math.pow(Number(sqrtPrice), 2) / Math.pow(2, 128));

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

    // USDT per USDC
    async fetchPrice(): Promise<CLMMPriceData> {
        try {
            const pool = await this.sdk.Pool.getPool(this.USDC_USDT_POOL_ID);

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

export default CetusService;