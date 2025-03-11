import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

interface PriceData {
    timestamp: string;
    cetusPrice: number;
    bluefinPrice: number;
    pythPrice: number;
    cetusPythDifference: number;
    cetusBluefinDifference: number;
    bluefinPythDifference: number;
}

class ExcelLogger {
    private logFile: string;
    private data: PriceData[] = [];

    constructor() {
        const logsDir = path.join(__dirname, '../../logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        
        const date = new Date().toISOString().split('T')[0];
        this.logFile = path.join(logsDir, `price-feed-${date}.xlsx`);
        
        // Load existing data if file exists
        if (fs.existsSync(this.logFile)) {
            const workbook = XLSX.readFile(this.logFile);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            this.data = XLSX.utils.sheet_to_json(worksheet);
        }
    }

    log(cetusPrice: number, bluefinPrice: number, pythPrice: number) {
        const timestamp = new Date().toISOString();
        const cetusPythDifference = ((cetusPrice / pythPrice - 1) * 100);
        const cetusBluefinDifference = ((cetusPrice / bluefinPrice - 1) * 100);
        const bluefinPythDifference = ((bluefinPrice / pythPrice - 1) * 100);
        
        const entry: PriceData = {
            timestamp,
            cetusPrice,
            bluefinPrice,
            pythPrice,
            cetusPythDifference,
            cetusBluefinDifference,
            bluefinPythDifference
        };
        
        this.data.push(entry);
        this.saveToExcel();
        
        // Also log to console
        console.log(
            `[${timestamp}] Cetus: ${cetusPrice.toFixed(6)} | ` +
            `Bluefin: ${bluefinPrice.toFixed(6)} | ` +
            `Pyth: ${pythPrice.toFixed(6)} | ` +
            `Cetus/Pyth Diff: ${cetusPythDifference.toFixed(4)}% | ` +
            `Cetus/Bluefin Diff: ${cetusBluefinDifference.toFixed(4)}% | ` +
            `Bluefin/Pyth Diff: ${bluefinPythDifference.toFixed(4)}%`
        );
    }

    private saveToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Price Feed Data');
        
        // Add column headers
        XLSX.utils.sheet_add_aoa(worksheet, [
            ['Timestamp', 'Cetus Price', 'Bluefin Price', 'Pyth Price', 'Cetus/Pyth Difference (%)', 'Cetus/Bluefin Difference (%)', 'Bluefin/Pyth Difference (%)']
        ], { origin: 'A1' });
        
        XLSX.writeFile(workbook, this.logFile);
    }
}

export const logger = new ExcelLogger();
export const log = logger.log.bind(logger);