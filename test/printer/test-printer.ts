import { NestFactory } from "@nestjs/core";
import { PRINTER_LOCATIONS, PRINTER_TYPES } from "@src/constants";
import { DatabaseService } from "@src/database";
import { IOrder } from "@src/database/schema";
import { OrderToItems, PrinterService } from "@src/shared/printer.service";
import { TestPrinterModule } from "./test-printer.module";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(TestPrinterModule);
    const database = app.get(DatabaseService);

    const printer = app.get(PrinterService);
    try {
        const order = await database.Order.findById("628c9407dd1c77586c9872e2").populate("items.product").populate("payment");

        /* console.log("dry", OrderToItems(order, { is_dry_kitchen: true }));
        console.log("wet", OrderToItems(order, { is_dry_kitchen: false })); */

        /* const rs = await printer.order("627e1d9e4a51112e10860bbc").toPrintModel();
        console.log(JSON.stringify(rs.invoice));
 */
    } catch (e) {
        console.error(e.stack);
    } finally {
        await app.close();
    }
}

bootstrap().then(() => console.log("finished"));
