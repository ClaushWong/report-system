import * as escpos from "escpos";
import { PrinterSummarySheet } from "./models";
import * as moment from 'moment';

export const SummarySheet = async (printerOri: escpos.Printer, sheet: PrinterSummarySheet) => {

    const toValue = (v: any) => v !== undefined ? v : '-';

    const printer = printerOri as any;

    const line = () => printer.align('CT').text('------------------------------------------------');

    printer.size(0, 0);
    printer.style('NORMAL').align('LT');

    if (sheet.header_remarks) {
        printer.align('CT');
        printer.text(`-------- ${sheet.header_remarks} --------`);
        printer.text(` `);
        printer.align('LT');
    }
    if (sheet.title) {
        printer.text(`${sheet.title}`.trim());
    }
    if (sheet.user) {
        printer.text(`${sheet.user}`.trim());
    }
    printer.text(moment(sheet.date).format('DD/MM/YYYY, LT'));
    printer.size(1).style('NORMAL');

    printer.font('A').align('CT');
    if (sheet.summary_title) {
        line();
        printer.size(1.5).style('B').text(`${sheet.summary_title}`);
        line();
    } else {
        line();
    }

    printer.size(0, 0);
    printer.style('NORMAL');
    let isBold = undefined;
    sheet.items.forEach(item => {

        if (isBold !== item.is_bold) {
            if (item.is_bold) {
                printer.style('B');
            } else {
                printer.style('NORMAL');
            }
            isBold = item.is_bold;
        }

        const label = `${item.label}`;
        const value = `${toValue(item.value)}`;

        if (value.length > 8) {
            printer.tableCustom(
                [
                    { text: label, align: "LEFT", width: 0.5 },
                    { text: value, align: "RIGHT", width: 0.5 }
                ]
            );
        } else {
            printer.tableCustom(
                [
                    { text: label, align: "LEFT", width: 0.65 },
                    { text: value, align: "RIGHT", width: 0.35 }
                ]
            );
        }
    });

    if (sheet.remarks) {
        printer.size(0, 0).style('NORMAL');
        printer.text(`Remarks: ${sheet.remarks}`);
    }

    line();
}
