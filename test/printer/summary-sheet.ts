import { NetworkPrinter } from "../../src/lib/printer";
import { PrinterSummarySheet } from "@src/lib/printer/models";
import * as moment from "moment";

const run = async () => {
    const printer = new NetworkPrinter("103.101.50.42", { port: 9003 });

    try {
        const sheet: PrinterSummarySheet = {
            header_remarks: "TEST PRINT",
            title: "Meow Cafe Kuchai Lama",
            date: new Date(),
            user: "Kelvin",

            summary_title: "Shift Summary",
            items: [
                {
                    label: "Shift Begining",
                    value: moment().hour(8).startOf("hour").format("DD/MM/YYYY, LT"),
                    is_bold: true,
                },
                {
                    label: "Opened By",
                    value: "John",
                },

                {
                    label: "Opening Amount",
                    value: "300.00",
                },
                {
                    label: "Transactions",
                    value: "888.00",
                },
                {
                    label: "Cash Payments",
                    value: "888.00",
                },
                {
                    label: "Refund in Cash",
                    value: "88.00",
                },
                {
                    label: "Paid in",
                    value: "888.00",
                },
                {
                    label: "Paid out",
                    value: "88.00",
                },

                {
                    label: "Expected Drawer Amount",
                    value: "91100.00",
                    is_bold: true,
                },
                {
                    label: "Closing Amount",
                    value: "1100.00",
                    is_bold: true,
                },
                {
                    label: "Closed By",
                    value: moment().format("DD/MM/YYYY, LT"),
                    is_bold: true,
                },

                {
                    label: "Total gross sales",
                    value: "88.00",
                },
                {
                    label: "Total refunds",
                    value: "888.00",
                },
                {
                    label: "Total discounts",
                    value: "88.00",
                },
                {
                    label: "Total net sales",
                    value: "91100.00",
                    is_bold: true,
                },
            ],
        };
        await printer.print.summarySheet(sheet);
    } catch (err) {
        throw err;
    } finally {
    }
};

run().catch(console.error);
