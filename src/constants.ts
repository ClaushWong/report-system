export const SEVERITIES = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    NOTICE: "NOTICE",
    WARNING: "WARNING",
    ERROR: "ERROR",
    CRITICAL: "CRITICAL",
    ALERT: "ALERT",
    EMERGENCY: "EMERGENCY",
    FAILURE: "FAILURE",
};

export const GENERIC_STATUS = {
    ACTIVE: "active",
    READY: "ready",
    RUNNING: "running",
    NEW: "new",
    CLOSED: "closed",
    ONLINE: "online",
    OFFLINE: "offline",
    UPDATE: "updated",
    DELETED: "deleted",
    RESOLVED: "resolved",
    FAILED: "failed",
    ERROR: "error",
};

export const IGNORE_FIELD =
    "-__v -createdBy -updatedBy -deletedBy -createdAt -updatedAt -deletedAt -password";
export const IMAGE_FIELD = "type path url";
export const TIMEZONE = "timezone";

export const ROLE_TYPES = {
    SUPERADMIN: "superadmin",
    ADMIN: "admin",
};

export const STOCKITEMS_STATUS = {
    STOCKLOCK: "stock-lock",
    STOCKIN: "stock-in",
    STOCKOUT: "stock-out",
    STOCKPENDING: "stock-pending",
    STOCKRELEASE: "stock-release",
    STOCKISSUE: "stock-issue",
    STOCKINUSED: "stock-inused",
};

export const ORDER_STATUS = {
    TOPAY: "to-pay",
    PENDING: "pending",
    TOPROCESS: "to-process",
    READYTODELIVER: "ready-to-deliver",
    TODELIVER: "to-deliver",
    COMPLETED: "completed",
    READYTOPICKUP: "ready-to-pickup",
    FAILTODELIVER: "fail-to-deliver",
    REFUNDED: "refunded",
    CANCELLED: "cancelled",
    CHECKOUT: "checkout",
    DRAFT: "draft",
};
export const GEO_TYPE = {
    POINT: "Point",
    TWO_D: "2d",
    TWO_D_SPHERE: "2dsphere",
};
export const DELIVERY_METHOD = {
    DELIVERY: "delivery",
    PICKUP: "pickup",
};

export const PRODUCT_STATUS = {
    PUBLISHED: "published",
    UNPUBLISHED: "unpublished",
    DRAFTED: "drafted",
};
export const PRODUCT_TYPE = {
    RAW: "raw",
    FOOD: "food",
    COMBO: "combo",
};
export const PRODUCT_SUBTYPE = {
    FROZEN: "frozen",
    INGREDIENT: "ingredient",
    ITEM: "item",
};
export const RIDER_TYPE = {
    ADMIN: "admin",
    WAREHOUSE: "warehouse",
    PICKUPSTATION: "pickupstation",
};
export const ADMIN_TYPES = {
    OPERATOR: "operator",
    CLIENT: "client",
};
export const ID_TYPE = {
    IC: "ic",
    PASSPORT: "passport",
};

export const DEVICE_TYPE = {
    IOS: "ios",
    ANDROID: "android",
};

export const PRINTER_TYPES = {
    NETWORK: "network",
};
export const PRINTER_LOCATIONS = {
    CASHIER: "cashier",
    KITCHEN: "kitchen",
};
export const PRINTER_JOB_STATUS = {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
};
export const PRINTER_JOB_TYPES = {
    INVOICE: "invoice",
    KITCHEN_WORK_SHEET: "kitchen_work_sheet",
    KITCHEN_DELIVERY_WORK_SHEET: "kitchen_delivery_work_sheet",
    SUMMARY_SHEET: "sumary_sheet",
    PAY_IN_OUT: "pay_in_out",
};
export const PRINTER_STATUS = {
    OFFLINE: "offline",
    OK: "okay",
    COVER_OPNENED: "cover_opened",
    NO_PAPPER: "no_papper",
};
export const SETTING_KEYS = {
    COMPANY: {
        NAME: "company.name",
        SHORT_NAME: "company.short_name",
        ADDRESS: "company.address",
        REGISTRATION_NO: "company.registration_no",
        CONTACT: "company.contact",
    },
    CAFE: {
        NAME: "cafe.name",
    },
    SERVICE_CHARGES: "cafe-service-charges",
    TAKE_AWAY_FEES: "cafe-take-away-fees",
    TAX: "cafe-tax",
    LOCATION_CODE: "location.code",

    LASTPUSH_ACCOUNT: "lastpushAccount",
    LASTPUSH_ORDER: "lastpushOrder",
    LOCATION_SHARELINK: "location.shareLink",

    LASTSYNC_FOODMENU: "last-sync-food-menu",
    LASTSYNC_PRODUCTMAIN: "last-sync-product-main",
    LASTSYNC_PRODUCT: "last-sync-product",
    LASTSYNC_STOCK: "last-sync-stock",
    LASTSYNC_SETTING: "last-sync-setting",
    LASTSYNC_USER: "last-sync-user",
    LASTSYNC_DEVICE: "last-sync-device",
    LASTSYNC_GIVEAWAY: "last-sync-giveaway",

    LASTSYNC_MERCHANT_BRAND: "last-sync-merchant-brand",
    LASTSYNC_MERCHANT_COMPANY: "last-sync-merchant-company",
    LASTSYNC_DISCOUNT: "last-sync-discount",

    LASTSYNC_PRODUCTACTIVE: "last-sync-product-active",

    PAYMENT_METHOD_LIST: "payment-method-list",

    PARTNERS: "partners",
};
export const LOCATION_TYPE = {
    WAREHOUSE: "warehouse",
    PICKUP_STATION: "pickupstation",
    OFFICE: "office",
    OTHERS: "others",
    CAFE: "cafe",
};
export const CAFE_DEVICE_TYPE = {
    KIOSK: "kiosk",
    SERVER: "server",
    POS: "pos",
};

export const ACCOUNT_STATUS = {
    OPEN: "open",
    CLOSE: "close",
};
export const ORDER_TYPES = {
    ONLINE: "online",
    CAFE: "cafe",
    ONLINE_CAFE: "online-cafe",
};
export const ORDER_METHOD = {
    DINEIN: "dine-in",
    TAKEAWAY: "takeaway",
};

export enum DISCOUNT_TYPE {
    PERCENTAGE = "percentage",
    AMOUNT = "amount",
}

export const CAFE_GIVEAWAY_TYPES = {
    DAILY: "daily",
    PERIOD: "period",
};
export const PLATFORM = {
    APP: "app",
    KIOSK: "kiosk",
    POS: "pos",
};

export enum DISCOUNT_SPECIFIC {
    PRODUCT = "product",
    MERCHANT = "merchant",
    FOODMENU = "foodmenu",
    ORDER = "order", //for total order $$
}

export enum DISCOUNT_PRODUCT_TYPE {
    FROZEN = "frozen",
    FOOD = "food",
    COMBO = "combo",
}

export enum DISCOUNT_STATUS {
    ENABLED = "enabled",
    DISABLED = "disabled",
}

export enum DISCOUNT_TYPES {
    PERCENTAGE = "percentage",
    AMOUNT = "amount",
}

export enum DISCOUNT_CATEGORY {
    PWP = "pwp",
    ORDER = "order",
    GIVEAWAY = "giveaway",
    PRODUCT = "product",
    MERCHANT = "merchant",
}

//=========adding partners need to add payment method as well==============
export const PARTNERS = {
    MEOW: "meow",
    GRAB: "grab",
    FOODPANDA: "foodpanda",
    AAFOOD: "aafood",
    EASI: "easi",
    SHOPEEFOOD: "shopeefood",
};

export const PAYMENT_METHODS = {
    MEOW: "meow",
    IPAY88: "ipay-88",
    CASH: "cash",
    CREDITCARD: "credit-card",
    QRPAY: "qrpay",
    QRPAY_TNG: "qrpay-tng",
    QRPAY_MBB: "qrpay-mbb",
    QRPAY_GRAB: "qrpay-grab",
    QRPAY_SHOPEE: "qrpay-shopee",
    QRPAY_FAVE: "qrpay-fave",
    QRPAY_BOOST: "qrpay-boost",
    RAZER: "razer",
    RAZER_PAYNOW: "razer-paynow",
    GRAB: PARTNERS.GRAB,
    FOODPANDA: PARTNERS.FOODPANDA,
    AAFOOD: PARTNERS.AAFOOD,
    EASI: PARTNERS.EASI,
    SHOPEEFOOD: PARTNERS.SHOPEEFOOD,
};
//=========adding partners need to add payment method as well==============
