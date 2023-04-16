import { NetworkPrinter } from '../../src/lib/printer';
import { PrinterKitchenSheetItem, PrinterKitchenSheet } from '@src/lib/printer/models';

const run = async () => {
    const printer = new NetworkPrinter('103.101.50.42', { port: 11001 });
    try {
        const sheet: PrinterKitchenSheet = {
            // header_remarks: 'REPRINT',
            type: 'Take Away',
            queueNo: '#888',
            date: new Date(),
            items: [
                {
                    name: 'Chicken Terriyaki',
                    quantity: 99,
                    remarks: [
                        'dont want onnion',
                        'more soy saurce'
                    ]
                },
                {
                    name: 'Coke',
                    quantity: 1
                },
                {
                    name: '7-Up',
                    quantity: 1
                }
            ],
            user: `John`
        }
        await printer.print.kitchenSheet(sheet);
    } catch (err) {
        throw err;
    } finally {
    }
}

run().catch(console.error);