// src/app.ts

import PythService from './services/pyth';
import CetusService from './services/cetus';
import { log } from './utils/logger';
import BluefinService from './services/bluefin';

const pythService = new PythService("https://hermes.pyth.network");
const cetusService = new CetusService();
const bluefinService = new BluefinService();

export async function fetchPrices() {
    try {
        const [
            priceViaCetus,
            priceViaBluefin,
            priceViaPyth
        ] = await Promise.all(
            [
                cetusService.fetchUSDC_USDTPrice(),
                bluefinService.fetchUSDC_USDTPrice(),
                pythService.fetchUSDC_USDTPrice(Date.now())
            ]
        );

        log(priceViaCetus.price, priceViaBluefin.price, priceViaPyth.price);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log(`Error fetching prices: ${errorMessage}`);
    }
}

export async function main() {
    setInterval(async () => {
        await fetchPrices();
    }, 30 * 1000); // 30s
}