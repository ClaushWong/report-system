import { NetworkPrinter, PrinterInvoice } from "@src/lib/printer";
import * as moment from "moment";
import * as path from "path";
import { OrderToInvoice, OrderToItems, OrderToKitchenSheet } from "../../src/shared/printer.service";

let job: any = {
    _id: {$oid: "6242cc71fe443d6f44c28774"},
    status: "completed",
    type: "kitchen_work_sheet",
    order: {
        deliveryTo: {user: null},
        currentGeo: {type: "Point", coordinates: []},
        deliveryAddress: {geo: {type: "Point"}},
        createdBy: {userId: "6215e9b32502fb6ff3ba2b83", name: "Cafe Admin", type: "cafe"},
        updatedBy: {userId: "6215e9b32502fb6ff3ba2b83", name: "Cafe Admin", type: "cafe"},
        code: null,
        cafeCode: "CC27-1000010",
        deliveryFee: 0,
        subTotal: 31.8,
        total: 31.8,
        discount: 0,
        discountAmount: 0,
        discountType: "amount",
        totalDiscount: 0,
        amountChange: 0,
        amountReceived: 31.8,
        amountRounding: "0.00",
        paymentMethod: "cash",
        payment: {$oid: "6242cc71fe443d6f44c28768"},
        paymentStatus: "1",
        rider: null,
        riderRate: 0,
        vehicle: null,
        isRated: false,
        specialpack: false,
        deviceos: "pos",
        isRefund: false,
        failedReasons: null,
        cancelledReasons: null,
        remarks: null,
        hasAddPoints: false,
        incompletedReasons: null,
        orderMethod: "takeaway",
        queueNo: "155",
        _id: {$oid: "6242cc6efe443d6f44c28751"},
        items: [
            {
                rate: 0,
                discount: 0,
                discountType: null,
                discountAmount: 0,
                remarks: "",
                optionName: null,
                _id: {$oid: "6242cc71fe443d6f44c2875f"},
                product: {
                    createdBy: {name: "Admin", userId: "6241375bebac677f47c32459", type: "admin"},
                    variations: {Type: "EASYCHOP AYAM BLACK PEPPER"},
                    sku: "HM0104EABP",
                    price: 15.9,
                    priceOri: 0,
                    stockSplit: 1,
                    printLocation: null,
                    status: "published",
                    deletedAt: null,
                    _id: {$oid: "624187646ac9881210cfb8f7"},
                    childProducts: [],
                    combos: [],
                    metadata: [],
                    product: {
                        code: null,
                        type: "raw",
                        subType: "frozen",
                        platform: ["app", "pos"],
                        tags: ["Halal", "Selangor", "Klang Valley", "Mohd Chan", "Chicken", "Muslim-Friendly"],
                        description:
                            "- EasyChop Ayam Black Pepper\n\nJuicy chicken chop marinated with coarse ground combination of black and white peppercorn and braised with chop onion\n\nNet Weight: 250g+-",
                        didYouKnow: "Cook for 6 minutes and it is ready to serve!",
                        completeYourMeal: "fries, salad, rice. ",
                        galleries: [{$oid: "624187216ac9881210cfb896"}, {$oid: "624187216ac9881210cfb894"}],
                        videoLink: "",
                        videoDescription:
                            "There are 3 cooking methods provided on the food packaging. \nMethod 1: Pan fried\nMethod 2: Air Fry\nMethod 3: Oven",
                        videoThumbnail: {$oid: "624187296ac9881210cfb89a"},
                        refId: {$oid: "6241872b6ac9881210cfb8a0"},
                        variationCount: 1,
                        status: "drafted",
                        deletedAt: null,
                        priceMin: 0,
                        priceMax: 0,
                        priceOriMin: 0,
                        priceOriMax: 0,
                        toSell: true,
                        totalRatings: 0,
                        totalRaters: 0,
                        rating: 0,
                        isFeatured: false,
                        priority: 0,
                        remarkOptions: [],
                        active: true,
                        _id: {$oid: "624187646ac9881210cfb8f8"},
                        name: "【PROMO】EASYCHOP AYAM BLACK PEPPER [MOHD CHAN]",
                        createdAt: {$date: "2022-03-28T10:01:08.413Z"},
                        updatedAt: {$date: "2022-03-29T09:01:46.678Z"}
                    },
                    createdAt: {$date: "2022-03-28T10:01:08.413Z"},
                    updatedAt: {$date: "2022-03-29T09:01:46.678Z"},
                    __v: 0
                },
                quantity: 2,
                price: 15.9,
                total: 31.8
            }
        ],
        pickupstations: [
            {
                main: true,
                collected: false,
                stocks: [{$oid: "624189da76771e2a9b2c4780"}, {$oid: "624189da76771e2a9b2c4785"}],
                _id: {$oid: "6242cc71fe443d6f44c28767"},
                location: {$oid: "6213c72945bc6852b6db7c14"}
            }
        ],
        refunds: [],
        type: "cafe",
        status: "completed",
        serviceCharges: 0,
        amountServiceCharges: 0,
        serviceTax: 0,
        amountServiceTax: 0,
        takeawayFees: 0,
        createdAt: {$date: "2022-03-29T09:07:58.603Z"},
        updatedAt: {$date: "2022-03-29T09:08:01.109Z"},
        __v: 2
    },
    printer: {$oid: "623c2938e85a8f5f5e6e955a"},
    createdAt: {$date: "2022-03-29T09:08:01.135Z"},
    updatedAt: {$date: "2022-03-29T09:08:01.163Z"},
    __v: 0,
    last_message: "success",
    last_update: {$date: "2022-03-29T09:08:01.162Z"}
};

let job2 = {
    _id: {$oid: "628cbbb8c9e7b56e99978bbf"},
    status: "completed",
    type: "kitchen_work_sheet",
    order: {
        deliveryTo: {user: {$oid: "626578e73db81345a6ff00d5"}, name: "kev", contact: "60149521730", email: "suwk87@gmail.com"},
        currentGeo: {type: "Point", coordinates: []},
        deliveryAddress: {
            geo: {type: "Point"},
            unit: "577",
            address:
                "MR.DIY, 20,22,22A & 26G, JALAN KUCHAI MAJU 8, OFF, Jalan Kuchai Lama, Kuchai Entrepreneurs Park, 58200 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
            postcode: "",
            state: "",
            country: ""
        },
        createdBy: {name: "kev", userId: "626578e73db81345a6ff00d5"},
        cafeAcceptBy: {userId: "62415b306ac9881210cf9529", name: "Michael", type: "cafe"},
        code: 100848,
        cafeCode: "CC27-1000667",
        itemType: "raw",
        deliveryFee: 6,
        subTotal: 25,
        total: 31,
        discount: 0,
        discountAmount: 0,
        discountType: null,
        totalDiscount: 0,
        amountChange: 0,
        amountReceived: 0,
        amountRounding: "0",
        paymentMethod: "meow",
        payment: null,
        paymentStatus: "1",
        rider: null,
        riderRate: 0,
        vehicle: null,
        isRated: false,
        specialpack: false,
        deviceos: "ios",
        isRefund: false,
        failedReasons: null,
        cancelledReasons: null,
        remarks: null,
        hasAddPoints: false,
        incompletedReasons: null,
        orderMethod: null,
        queueNo: "561",
        platform: "app",
        discountApplied: [],
        _id: {$oid: "628cbba603427461b61219d4"},
        items: [
            {
                rate: 0,
                discount: 0,
                discountType: null,
                discountAmount: 0,
                discountApplied: [],
                totalDiscount: 0,
                remarks: null,
                optionName: null,
                _id: {$oid: "628cbba603427461b61219d7"},
                quantity: 1,
                product: {
                    createdBy: {name: "Admin", userId: "6241375bebac677f47c32459", type: "admin"},
                    updatedBy: {name: "Admin", userId: "6241375bebac677f47c32459", type: "admin"},
                    variations: {"1kg": "Curry Soup"},
                    sku: "NK0101FC",
                    price: 25,
                    priceOri: 0,
                    stockSplit: 5,
                    printLocation: null,
                    status: "published",
                    deletedAt: null,
                    _id: {$oid: "6241414483e084030341d00c"},
                    childProducts: [],
                    combos: [],
                    metadata: [],
                    product: {
                        code: null,
                        type: "raw",
                        subType: "frozen",
                        platform: ["app", "pos"],
                        tags: ["Johor", "Southern", "Curry", "Malaysia", "Fuk Luk Sau"],
                        description:
                            "A typical Chinese curry in Johor, a bit sweet and salty, spicy but not stinging. The curry was light in taste and perfect to go with a white bowl of rice. Besides, this frozen package can serves 2-3 pax.",
                        didYouKnow:
                            "No water adding is required for this pre-packed curry flavour sauce. And please fully consume the product on the same day once it is opened.",
                        completeYourMeal: "-",
                        galleries: [{$oid: "6241410e83e084030341cff6"}],
                        videoLink: "",
                        videoDescription:
                            "1. Thaw the frozen curry pack\n2. Pour the thawed curry into the pot and cook it with other ingredients.\n3. Enjoy your food once it is cooked.",
                        videoThumbnail: null,
                        refId: {$oid: "6241414483e084030341d009"},
                        variationCount: 0,
                        status: "drafted",
                        deletedAt: null,
                        priceMin: 0,
                        priceMax: 0,
                        priceOriMin: 0,
                        priceOriMax: 0,
                        toSell: true,
                        totalRatings: 0,
                        totalRaters: 0,
                        rating: 0,
                        isFeatured: false,
                        priority: 0,
                        remarkOptions: [],
                        foodActive: true,
                        inCafe: false,
                        _id: {$oid: "6241415283e084030341d097"},
                        name: "JB FROZEN CURRY SOUP -1kg [FUK LUK SAU]",
                        createdAt: {$date: "2022-03-28T05:02:10.255Z"},
                        updatedAt: {$date: "2022-05-24T03:42:43.588Z"}
                    },
                    createdAt: {$date: "2022-03-28T05:01:56.096Z"},
                    updatedAt: {$date: "2022-05-24T03:42:43.588Z"},
                    __v: 0
                },
                price: 25,
                total: 25
            }
        ],
        pickupstations: [
            {
                main: true,
                collected: false,
                stocks: [{$oid: "628b21f85e47a442844049d8"}],
                _id: {$oid: "628cbba703427461b61219da"},
                location: {$oid: "62415abb6ac9881210cf937f"}
            }
        ],
        refunds: [],
        type: "online",
        deliveryMethod: "delivery",
        serviceTax: 0,
        status: "to-process",
        createdAt: {$date: "2022-05-24T11:04:07.119Z"},
        updatedAt: {$date: "2022-05-24T11:04:07.119Z"},
        cafeAcceptAt: {$date: "2022-05-24T11:04:24.595Z"},
        __v: 0
    },
    printer: {$oid: "623c2938e85a8f5f5e6e9557"},
    createdAt: {$date: "2022-05-24T11:04:24.760Z"},
    updatedAt: {$date: "2022-05-24T11:04:24.805Z"},
    __v: 0,
    last_message: "success",
    last_update: {$date: "2022-05-24T11:04:24.805Z"}
};

const opt = {
    register_url: "https://www.yahoo.com",
    company: {
        name: "Yunda O2O Sdn Bhd",
        address:
            "18, Nouvelle Kemuning Industrial Park, Jalan Sungai Jeluh 32/191, Kawasan Perindustrian Kemuning, Seksyen 32 Bukit Rimau 40460 Shah Alam, Selangor, Malaysia",
        logo: path.join(__dirname, "invoice-logo.png"),
        phone: "",
        registration_no: ""
    }
};

console.log("INVOICE ITEMS", JSON.stringify(OrderToItems(job.order as any, {}), null, 2));
console.log("DRY ITEMS", JSON.stringify(OrderToItems(job.order as any, {is_dry_kitchen: true}), null, 2));
console.log("WET ITEMS", JSON.stringify(OrderToItems(job.order as any, {is_dry_kitchen: false}), null, 2));
console.log("\n");
console.log("\n");
console.log("INVOICE", JSON.stringify(OrderToInvoice(job.order as any), null, 2));
console.log("\n");
console.log("DRY KITCHEN", JSON.stringify(OrderToKitchenSheet(job.order as any, {is_dry_kitchen: true}), null, 2));
console.log("WET KITCHEN", JSON.stringify(OrderToKitchenSheet(job.order as any, {is_dry_kitchen: false}), null, 2));

console.log(
    "DRY KITCHEN (FROZEN)",
    JSON.stringify(OrderToKitchenSheet(job.order as any, {is_dry_kitchen: true}), null, 2)
);

const d: PrinterInvoice = {
    header_remarks: "INVOICE",
    type: "Take Away",
    orderId: "#405",
    company: {
        name: "Yunda O2O Sdn Bhd",
        address:
            "18, Nouvelle Kemuning Industrial Park, \nJalan Sungai Jeluh 32/191, \nKawasan Perindustrian Kemuning, \nSeksyen 32 Bukit Rimau \n40460 Shah Alam, Selangor, Malaysia",
        logo: "/Users/boonpin/Documents/Workspace/wt/yunda/yunda-meow-cafe-pos-core-api/src/assets/img/invoice-logo.png",
        phone: "",
        registration_no: "1415201-P"
    },
    id: "CC27-1000511",
    date: moment("13/05/2022, 4:58 PM").toDate(),
    user: "KIOSK",
    items: [
        {
            name: "Combo C",
            quantity: 1,
            unit_price: "1.00",
            amount: "1.00",
            subitems: [
                {text: "(1 x A03. Penang 888 Prawn Mee)", remark: "- Mee"},
                {text: "(1 x Vida C Orange)", remark: ""}
            ]
        },
        {
            name: "[RM1 PROMO] P02 Combo D",
            quantity: "1",
            unit_price: "1.00",
            amount: "1.00",
            subitems: [
                {text: "(1 x B01. Hot Americano)", remark: ""},
                {text: "(1 x S11. Meow Curry Puff (1pc))", remark: ""}
            ]
        }
    ],
    payment: {
        type: "Credit-card",
        amount: "2.00",
        detail: {
            ac: "E21B2D1774049B19",
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
            tvr: "0000000000"
        }
    },
    subtotal: {total_items: "2", amount: "2.00"},
    service_tax: {percent: "0", amount: "0.00"},
    service_charge: {percent: "0", amount: "0.00"},
    change: "0.00",
    total: "2.00",
    total_rounding_adj: "0.00",
    total_after_rounding: "2.00",
    discount: "0.00",
    register_url: "https://applink.meowdelivery.com/LEsWhjzMZob"
};
const print = async () => {
    console.log(`printing .....`);

    const printer = new NetworkPrinter("103.101.50.42", {port: 9105});
    // const printer = new NetworkPrinter("192.168.100.210");
    // await printer.print.invoice(OrderToInvoice(job.order as any, opt));

    await printer.print.invoice(d);

    /* let sheet = OrderToKitchenSheet(job.order as any, { is_dry_kitchen: false });
    if (sheet.items.length > 0) {
        await printer.print.kitchenSheet(sheet);
    }

    sheet = OrderToKitchenSheet(job.order as any, { is_dry_kitchen: true });
    if (sheet.items.length > 0) {
        await printer.print.kitchenSheet(sheet);
    } */
};

/* print()
    .then(() => console.log("finished"))
    .catch((err) => console.error(err)); */

//console.log(JSON.stringify(OrderToInvoice(job.order), null, 2));
