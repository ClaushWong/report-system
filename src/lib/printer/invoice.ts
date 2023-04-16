import * as escpos from "escpos";
import * as fs from "fs";
import { PrinterInvoice as ReceiptModel } from "./models";
import * as moment from "moment";
import * as wrap from "word-wrap";

const CURRENCY = "RM";

export const Invoice = async (printerOri: escpos.Printer, receipt: ReceiptModel) => {
    const ValueOrNull = (v: any) => {
        return v !== undefined ? `${v}` : "-";
    };

    const getLogo = () =>
        new Promise<any>((resolve) => {
            fs.access(receipt.company.logo, (err) => {
                if (!err) {
                    escpos.Image.load(receipt.company.logo, (img) => {
                        resolve(img);
                    });
                } else {
                    resolve(null);
                }
            });
        });

    const printer = printerOri as any;

    const line = () => printer.align("CT").text("-----------------------------------------------");

    printer.font("A").align("CT");

    const logo = await getLogo();

    if (receipt.orderId) {
        printer.size(0, 0);
        line();
        printer.style("B").text(`Your Queue No.`);
        printer.size(2, 2).style("B").text(`${receipt.orderId}`);
        printer.size(0, 0);
    }

    line();
    if (receipt.header_remarks) {
        printer.style("B").text(`${receipt.header_remarks}`);
        line();
    }

    if (logo) {
        printerOri.image(await getLogo(), "D24");
    }

    printer
        .size(1.5)
        .style("B")
        .text(receipt.company?.name ?? "-");
    printer.size(1).style("NORMAL");

    if (receipt.company?.address) {
        const text = `${wrap(receipt.company?.address, { width: 40 })}`.trim();
        printer.text(text);
    }

    if (receipt.company?.registration_no) {
        printer.text(`(${receipt.company.registration_no})`);
    }
    if (receipt.company?.phone) {
        printer.text(`Tel: ${receipt.company.phone}`);
    }
    printer.text(" ");

    printer.align("LT");
    printer.size(1).style("B").text(`Order ID: ${receipt.id}`);

    printer.size(0.8).style("NORMAL").align("LT");
    if (receipt.user) {
        printer.text(`Cashier: ${receipt.user}`);
    }
    if (receipt.type) {
        printer.text(`Order Type: ${receipt.type}`);
    }
    printer.text(moment(receipt.date).format("DD/MM/YYYY, LT"));
    line();

    printer.size(0, 0).style("NORMAL");

    /* final String itemsFormat1 = "%-24s%-6s%-8s%10s";
        final String itemsFormat1_1 = "%-24s";
        final String itemsFormat2 = "%-38s%10s";
        final String itemsFormat3 = "%-44s";
        final String itemsFormat4 = "%38s%10s"; */

    /* printer.tableCustom([
        { text: "Item", align: "LEFT", cols: 22, style: "B" },
        { text: "Qty", align: "CENTER", cols: 3, style: "B" },
        { text: "Price", align: "CENTER", cols: 8, style: "B" },
        { text: `Amount(${CURRENCY})`, align: "RIGHT", cols: 10, style: "B" },
    ]); */
    printer.style("B");
    printer.text(`${"Item".padEnd(24)}${"Qty".padStart(5)}${"Price".padStart(8)}${`Amount(${CURRENCY})`.padStart(10)}`);
    line();

    const tableText = (text: string) => `${text}`.trim();

    printer.style("NORMAL").align("LT");
    receipt.items.forEach((item) => {
        const quantity = `${item.quantity}`.trim();
        const unit_price = ValueOrNull(item.unit_price);
        const amount = ValueOrNull(item.amount);

        if (!quantity && !unit_price) {
            /* printer.tableCustom([
                { text: tableText(item.name), align: "LEFT", cols: 32 },
                { text: ValueOrNull(item.amount), align: "RIGHT", cols: 10 },
            ]); */
            printer.text(`${tableText(item.name).padEnd(38)}${ValueOrNull(item.amount).padStart(10)}`);
        } else {
            wrap(item.name, { width: 24 })
                .split("\n")
                .forEach((text: string, index: number) => {
                    if (index === 0) {
                        /* printer.tableCustom([
                            { text: tableText(text), align: "LEFT", cols: 22 },
                            { text: quantity, align: "CENTER", cols: 3 },
                            { text: unit_price, align: "CENTER", cols: 8 },
                            { text: amount, align: "RIGHT", cols: 10 },
                        ]); */
                        printer.text(
                            `${tableText(text).padEnd(24)}${`${quantity}`.padStart(5)}${`${unit_price}`.padStart(8)}${`${amount}`.padStart(
                                10,
                            )}`,
                        );
                    } else {
                        // printer.tableCustom([{ text: tableText(text), align: "LEFT", cols: 45 }]);
                        printer.text(`${tableText(text).padEnd(45)}`);
                    }
                });
        }

        /* printer.tableCustom(
            [
                { text: tableText(item.name), align: "LEFT", width: 0.50 },
                { text: `${item.quantity}`.trim(), align: "CENTER", width: 0.10 },
                { text: ValueOrNull(item.unit_price), align: "CENTER", width: 0.20 },
                { text: ValueOrNull(item.amount), align: "RIGHT", width: 0.20 }
            ]
        ); */

        if (item.subitems?.length > 0) {
            item.subitems.forEach((subitem) => {
                //printer.tableCustom([{ text: `${tableText(subitem.text)}`, align: "LEFT", cols: 37 }]);
                printer.text(`  ${tableText(subitem.text).padEnd(37)}`);
                if (subitem.remark) {
                    // printer.tableCustom([{ text: `${tableText(subitem.remark)}`, align: "LEFT", cols: 37 }]);
                    printer.text(`    ${tableText(subitem.remark).padEnd(37)}`);
                }
            });
        }

        // add one line
        printer.text(" ");
        // printer.tableCustom([{ text: " ", align: "LEFT", cols: 10 }]);
    });
    line();

    /* printer.tableCustom([
        { text: "Sub Total", align: "LEFT", cols: 24 },
        { text: `${receipt.subtotal.total_items}`, align: "CENTER", cols: 3 },
        { text: "", align: "CENTER", cols: 8 },
        { text: ValueOrNull(receipt.subtotal.amount), align: "RIGHT", cols: 10 },
    ]); */

    printer.text(
        `${"Sub Total".padEnd(24)}${`${receipt.subtotal.total_items}`.padEnd(5)}${``.padStart(8)}${`${receipt.subtotal.amount}`.padStart(
            10,
        )}`,
    );
    line();

    /* printer.tableCustom([
        { text: "Sub Total", align: "RIGHT", width: 0.75 },
        { text: ValueOrNull(receipt.subtotal.amount), align: "RIGHT", width: 0.25 },
    ]); */
    printer.text(`${"Sub Total".padStart(37)}${`${ValueOrNull(receipt.subtotal.amount)}`.padStart(10)}`);

    /* printer.tableCustom([
        { text: `Discount`, align: "RIGHT", width: 0.75 },
        { text: receipt.discount ? ValueOrNull(receipt.discount) : "0.00", align: "RIGHT", width: 0.25 },
    ]); */
    printer.text(`${"Discount".padStart(37)}${`${receipt.discount ? ValueOrNull(receipt.discount) : "0.00"}`.padStart(10)}`);

    if (receipt.service_charge) {
        /* printer.tableCustom([
            { text: `Service Charge (${receipt.service_charge.percent}%)`, align: "RIGHT", width: 0.75 },
            { text: ValueOrNull(receipt.service_charge.amount), align: "RIGHT", width: 0.25 },
        ]); */
        printer.text(
            `${`Service Charge (${receipt.service_charge.percent}%)`.padStart(37)}${`${
                receipt.discount ? ValueOrNull(receipt.service_charge.amount) : "0.00"
            }`.padStart(10)}`,
        );
    }
    if (receipt.service_tax) {
        /* printer.tableCustom([
            { text: `Tax (${receipt.service_tax.percent}%)`, align: "RIGHT", width: 0.75 },
            { text: ValueOrNull(receipt.service_tax.amount), align: "RIGHT", width: 0.25 },
        ]); */
        printer.text(`${`Tax (${receipt.service_tax.percent}%)`.padStart(37)}${`${ValueOrNull(receipt.service_tax.amount)}`.padStart(10)}`);
    }
    line();

    /* printer.tableCustom([
        { text: "Total after Rounding", align: "RIGHT", width: 0.75 },
        { text: ValueOrNull(receipt.total_after_rounding), align: "RIGHT", width: 0.25 },
    ]); */
    printer.text(`${`Total after Rounding`.padStart(37)}${`${ValueOrNull(receipt.total_after_rounding)}`.padStart(10)}`);

    /* printer.tableCustom([
        { text: "Rounding Adj", align: "RIGHT", width: 0.75 },
        { text: receipt.total_rounding_adj !== undefined ? `${receipt.total_rounding_adj}` : "0", align: "RIGHT", width: 0.25 },
    ]); */
    const rAdj = receipt.total_rounding_adj !== undefined ? `${receipt.total_rounding_adj}` : "0";
    printer.text(`${`Rounding Adj`.padStart(37)}${`${rAdj}`.padStart(10)}`);

    printer.text("===============================================");
    printer.text(" ");

    if (receipt.payment) {
        /* printer.tableCustom([
            { text: receipt.payment.type, align: "RIGHT", width: 0.75 },
            { text: CURRENCY + ValueOrNull(receipt.payment.amount), align: "RIGHT", width: 0.25 },
        ]); */
        printer.text(`${`${receipt.payment.type}`.padStart(37)}${`${CURRENCY + ValueOrNull(receipt.payment.amount)}`.padStart(10)}`);
        /* printer.tableCustom([
            { text: "Change", align: "RIGHT", width: 0.75 },
            { text: ValueOrNull(receipt.change), align: "RIGHT", width: 0.25 },
        ]); */
        printer.text(`${`Change`.padStart(37)}${`${ValueOrNull(receipt.change)}`.padStart(10)}`);

        if (receipt.payment.detail) {
            printer.align("CT");
            printer.text(" ");
            printer.text(" ");

            printer.text("====== Cashless transaction information ======");
            /* ac: "E21B2D1774049B19",
            aid: "A0000000031010",
            amount: "000000000000",
            app: "VISA CREDIT",
            apprCode: "363134343632",
            batchNo: "000003",
            invoiceNo: "000012",
            others: "000000000200",
            refNo: "213316000025",
            respCode: "00",
            saleDT: "220513165811",
            saleTID: "20013666",
            traceNo: "000025",
            tvr: "0000000000", */
            const values = [
                { lable: "AC", value: receipt.payment.detail.ac },
                { lable: "AID", value: receipt.payment.detail.aid },
                { lable: "APP", value: receipt.payment.detail.app },
                { lable: "APPR Code", value: receipt.payment.detail.apprCode },
                { lable: "Batch No.", value: receipt.payment.detail.batchNo },
                { lable: "Invoice No.", value: receipt.payment.detail.invoiceNo },
                { lable: "Ref. No.", value: receipt.payment.detail.refNo },
                { lable: "Sales DT", value: receipt.payment.detail.saleDT },
                { lable: "Sales TID", value: receipt.payment.detail.saleTID },
                { lable: "Trace No.", value: receipt.payment.detail.traceNo },
            ];

            values.forEach((r) => {
                const { value, lable } = r;
                printer.text(`${lable.padEnd(22)}${ValueOrNull(value).padEnd(26)}`);
            });
            printer.text(" ");
            printer.text(`${"Amount".padEnd(22)}${`${CURRENCY}${receipt.payment.amount}`.padEnd(26)}`);

            printer.text("===============================================");
            printer.text(" No Signature Required");
            printer.text("===============================================");
        }
    }

    printer.align("CT");
    printer.text(" ");
    if (receipt.register_url) {
        printer.text("===============================================");
        const prinQr = (text: string) =>
            new Promise<any>((resolve) => {
                printer.qrimage(text, resolve);
            });
        printer.text(" ");
        printer.text("Scan the QR code to download Meow Meow app now");
        printer.text("and start ordering your favourite food today!");
        await prinQr(receipt.register_url);
    }
    printer.text(" ");
    printer.text("Thank You").text("Please Come Again.");
    printer.text(" ");
    printer.text(" ");
};
