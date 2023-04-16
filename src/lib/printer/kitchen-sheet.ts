import * as escpos from "escpos";
import { PrinterKitchenSheet } from "./models";
import * as moment from "moment";
import * as wrap from "word-wrap";

export const KitchenSheet = async (printerOri: escpos.Printer, sheet: PrinterKitchenSheet) => {
    const printer = printerOri as any;

    const line = () => printer.text("----------------------------------------------");

    printer.font("A").align("CT");

    printer.size(1, 1.1);
    if (sheet.header_remarks) {
        printer.text(`---- ${sheet.header_remarks} ----`);
        printer.text(" ");
    }

    if (sheet.title) {
        printer.style("B");
        printer.text(sheet.title);
        printer.text(" ");
    }

    printer.size(2, 2).text(`${sheet.queueNo}`);

    printer.size(0, 0);
    printer.text(" ");
    printer.style("NORMAL").align("LT");
    if (sheet.user) {
        printer.text(`${`Cashier`.padEnd(10)}: ${sheet.user}`);
    }
    if (sheet.orderId) {
        printer.text(`${`Order ID`.padEnd(10)}: ${sheet.orderId}`);
    }
    if (sheet.customer) {
        printer.text(`${`Customer`.padEnd(10)}: ${sheet.customer}`);
    }

    printer.text(moment(sheet.date).format("DD/MM/YYYY, LT"));

    printer.style("NORMAL").align("CT");
    line();
    printer.style("B").size(1, 1.1).text(`${sheet.type}`);
    printer.size(0, 0);
    line();

    printer.align("LT");
    sheet.items.forEach((item) => {
        printer.text(`${item.quantity} x ${item.name}`);
        if (item.subitems) {
            item.subitems.forEach((subitem) => {
                printer.text(wrap(`${subitem.text}`.trim(), { indent: "  ", width: 42 }));
                if (subitem.remark) {
                    printer.text(wrap(`${subitem.remark}`.trim(), { indent: "    ", width: 34 }));
                }
            });
        }
        printer.text(` `);
    });
    printer.size(0, 0);
    line();
};
