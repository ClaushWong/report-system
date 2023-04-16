import { NetworkPrinter } from "../../src/lib/printer";
import * as wrap from 'word-wrap';

const run = async () => {
    const net = new NetworkPrinter("192.168.123.100");
    try {

        const printer = await net.printer();

        printer.align("CT");
        /* printer.text("=================================");
        printer.text(" ");
        printer.qrimage('http://www.google.com', () => {
            printer.text(" ");
            printer.text(" ");
            printer.cut().close();
        }); */


        const address = `18, Nouvelle Kemuning Industrial Park, \nJalan Sungai Jeluh 32/191, \nKawasan Perindustrian Kemuning, \nSeksyen 32 Bukit Rimau \n40460 Shah Alam, Selangor, \nMalaysia`;
        const text = `${wrap(address, { width: 40 })}`.trim();

        printer.text(address);
        printer.text(" ");
        printer.text(" ");

        printer.text(text);
        printer.text(" ");
        printer.text(" ");
        printer.cut().close();

    } catch (err) {
        throw err;
    } finally {
        console.log('finished');
    }
};

run().catch(console.error);
