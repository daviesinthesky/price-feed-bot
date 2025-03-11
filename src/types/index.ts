export interface PriceData {
    symbol: string;
    price: number;
    timestamp: number;
}

export interface ServiceResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PythPriceData {
    price: number;
    confidence: number;
    timestamp: number;
    status: 'success' | 'error';
    error?: string;
}

export interface CLMMPriceData {
    price: number;
    poolAddress: string;
    timestamp: number;
    status: 'success' | 'error';
    error?: string;
}

export interface BluefinPriceData {
    price: number;
    marketId: string;
    timestamp: number;
    status: 'success' | 'error';
    error?: string;
}