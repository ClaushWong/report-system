import { NetworkPrinter } from '../../src/lib/printer';
import { PrinterKitchenSheetItem, PrinterKitchenSheet } from '@src/lib/printer/models';

const run = async () => {
    const printer = new NetworkPrinter('192.168.123.100', {timeout: 1000 });
    try {
        const rs = await printer.status();
        console.log(rs);
    } catch (err) {
        console.error(err)
    } finally {
        console.log(`finished`)
    }
}

run().catch(console.error);