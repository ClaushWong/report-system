import { NetworkPrinter } from "../../src/lib/printer";

import * as path from "path";
import { PrinterInvoice } from "@src/lib/printer/models";

const run = async () => {
    const printer = new NetworkPrinter("103.101.50.42", { port: 11001 });
    try {
        const receipt: any = {
            type: "Take Away",
            orderId: "#888",
            header_remarks: "Invoice",
            user: "John",
            company: {
                name: "Meow Cafe",
                address:
                    "Lot 2F-33 - 2F-35B, \nLevel 2, Tropicana Gardens Mall, \nNo. 2A, Persiaran Surian, Tropicana Indah, \n47810 Petaling Jaya, Selangor",
                logo: path.join(__dirname, "invoice-logo.png"),
                phone: "012-3456789",
                registration_no: "555-555555-555",
            },
            id: "1234-12345678-1234",
            date: new Date(),
            items: [
                {
                    name: "Chicken Terriyaki",
                    quantity: 99,
                    unit_price: 16.9,
                    amount: 99 * 16.9,
                    remarks: ["dont want onnion", "more soy saurce"],
                },
                {
                    name: "Coke",
                    quantity: 1,
                    unit_price: 2.9,
                    amount: 2.9,
                },
                {
                    name: "7-Up",
                    quantity: 1,
                    unit_price: 4.9,
                    amount: 10,
                },
            ],
            subtotal: {
                total_items: 0,
                amount: 0,
            },
            total_after_rounding: 0,

            payment: {
                type: "Cash",
                amount: 0,
            },
            change: 0,
            total: 0,
            total_rounding_adj: "0",
        };

        const round = (v: number) => Number(v.toFixed(2));

        receipt.subtotal.total_items = receipt.items.reduce((a, b) => b.quantity + a, 0);
        receipt.subtotal.amount = receipt.items.reduce((a, b) => b.amount + a, 0);
        receipt.service_charge = {
            percent: 10,
            amount: round((receipt.subtotal.amount * 10) / 100),
        };
        receipt.service_tax = {
            percent: 6,
            amount: round((receipt.subtotal.amount * 6) / 100),
        };
        receipt.total = receipt.subtotal.amount + receipt.service_tax.amount + receipt.service_charge.amount;
        receipt.total_after_rounding = round(receipt.total);
        receipt.payment = {
            type: "Cash",
            amount: 100,
        };
        receipt.change = round(receipt.payment.amount - receipt.total_after_rounding);

        await printer.print.invoice(receipt);
    } catch (err) {
        throw err;
    } finally {
    }
};

run().catch(console.error);
