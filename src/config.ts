import * as dotEnv from "dotenv";
import { Logger } from "@nestjs/common";
import * as path from "path";

const logger = new Logger("CONFIG");

dotEnv.config();

process.env.DIR_ROOT = path.join(__dirname, "..");
if (!process.env.DIR_STORAGE) {
    process.env.DIR_STORAGE = path.join(process.env.DIR_ROOT, "storage");
}
process.env.DIR_TEMP = path.join(process.env.DIR_STORAGE, "temp");
process.env.DIR_DATA = path.join(process.env.DIR_STORAGE, "data");

process.env.DIR_ASSETS = path.join(__dirname, "assets");

const CONFIG = Object.assign(
    {
        KEEP_LOGS_LAST_DAYS: 180,
    } as any,
    process.env
);

if (!CONFIG.FILE_DRIVER) {
    CONFIG.FILE_DRIVER = "local";
}

["AUTH_ADMIN_SINGLE_ONLY", "AUTH_APP_SINGLE_ONLY"].forEach((k) => {
    if (CONFIG.hasOwnProperty(k)) {
        CONFIG[k] = ["true", "1"].includes(`${CONFIG[k]}`.trim().toLowerCase());
    }
});

export const {
    APP_ENVIRONMENT,
    PORT,
    APP_NAME,

    CORS_ORIGINS,
    API_URI,

    MONGO_URI,
    KEEP_LOGS_LAST_DAYS,

    AUTH_JWT_SECRET,
    AUTH_JWT_EXPIRATION,
    AUTH_SINGLE_ONLY,

    // AUTH_ADMIN_JWT_SECRET,
    // AUTH_ADMIN_JWT_EXPIRATION,
    // AUTH_ADMIN_SINGLE_ONLY,

    // AUTH_POS_JWT_SECRET,
    // AUTH_POS_JWT_EXPIRATION,
    // AUTH_POS_SINGLE_ONLY,
    // AUTH_APP_JWT_SECRET,
    // AUTH_APP_JWT_EXPIRATION,
    // AUTH_APP_SINGLE_ONLY,

    DIR_ROOT,
    DIR_ASSETS,
    DIR_DATA,
    DIR_TEMP,
    DIR_STORAGE,

    CLIENT_IP_HEADER,

    TOKEN,

    CLOUD_HOSTNAME,

    IPAY88_MERCHANT_CODE,
    IPAY88_MERCHANT_KEY,
    PAYMENT_PROVIDER,
} = CONFIG;

logger.log(`loaded .env config file, environment [${APP_ENVIRONMENT}]`);
if (APP_ENVIRONMENT === "development") {
    const values = {
        PORT,
        APP_NAME,
        MONGO_URI,
        KEEP_LOGS_LAST_DAYS,
    };
    for (const k of Object.keys(values)) {
        logger.debug(`${k} => [${values[k]}]`);
    }
}
