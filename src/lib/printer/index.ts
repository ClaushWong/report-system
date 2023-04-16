import * as escpos from "escpos";
import { Invoice } from "./invoice";
import { KitchenSheet } from "./kitchen-sheet";
import { PrinterInvoice, PrinterKitchenSheet, PrinterSummarySheet } from "./models";
import { SummarySheet } from "./summary-sheet";

(escpos as any).Network = require("escpos-network");

type PrinterStatus = {
    is_reachable: boolean;
    timestamp: Date;
    error?: string;
    is_cover_open?: boolean;
    is_no_papper?: boolean;
    is_stopped_with_no_papper?: boolean;
};

export { PrinterInvoice, PrinterKitchenSheet, PrinterStatus, PrinterSummarySheet };
export class NetworkPrinter {
    constructor(private readonly ip: string, private opts?: { port?: number; debug?: boolean; timeout?: number }) { }

    private log(message: string) {
        if (this.opts?.debug) {
            console.log(message);
        }
    }

    private connect() {
        return new Promise<escpos.Printer>((resolve, reject) => {
            const options = { encoding: "GB18030" };

            this.log(`network printer ${this.ip}`);

            const device = new escpos.Network(this.ip, this.opts?.port);
            const printer = new escpos.Printer(device, options);

            const d = device as any;
            d.device.setTimeout(this.opts?.timeout ?? 5000, () => {
                reject(new Error(`timeout connection - address:${this.ip}`));
            });

            d.device.once("connect", () => {
                this.log("socket connect");
                d.device.setTimeout(0);
                // resolve(printer)
            });

            device.open((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(printer);
                }
            });
        });
    }

    public status() {
        return new Promise<PrinterStatus>(async (resolve) => {
            try {
                const printer = await this.connect();
                await (printer as any).getStatuses((rs: any) => {
                    const [PrinterStatus, RollPaperSensorStatus, OfflineCauseStatus] = rs;

                    const issues = [
                        ...PrinterStatus.toJSON()?.statuses.filter((s) => s.status === `error`),
                        ...RollPaperSensorStatus.toJSON()?.statuses.filter((s) => s.status === `error`),
                        ...OfflineCauseStatus.toJSON()?.statuses.filter((s) => s.status === `error`),
                    ];
                    const issuesName = issues.map((i) => `${i.label}`.trim().toLocaleLowerCase());
                    resolve({
                        is_reachable: true,
                        error: null,
                        timestamp: new Date(),
                        is_cover_open: issuesName.includes("cover is open"),
                        is_no_papper: issuesName.includes("roll paper end sensor: paper not present"),
                        is_stopped_with_no_papper: issuesName.includes("printing stops due to a paper-end"),
                    });
                    printer.close();
                });
            } catch (err) {
                resolve({
                    is_reachable: false,
                    error: err.message,
                    timestamp: new Date(),
                });
            }
        });
    }

    public print = {
        invoice: async (invoice: PrinterInvoice) => {
            const printer = await this.connect();
            await Invoice(printer, invoice);
            printer.text(" ");
            printer.text(" ");
            printer.cut().close();
        },
        kitchenSheet: async (sheet: PrinterKitchenSheet) => {
            const printer = await this.connect();
            await KitchenSheet(printer, sheet);
            printer.text(" ");
            printer.text(" ");
            printer.cut().close();
        },
        summarySheet: async (sheet: PrinterSummarySheet) => {
            const printer = await this.connect();
            await SummarySheet(printer, sheet);
            printer.text(" ");
            printer.text(" ");
            printer.cut().close();
        },
    };

    public async openDrawer() {
        const printer = await this.connect();
        printer.cashdraw().close();
    }

    public async printer() {
        return await this.connect();
    }
}
