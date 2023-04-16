import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as bodyParser from "body-parser";
import { Logger, ValidationPipe } from "@nestjs/common";
import { APP_PORT, CORS_ORIGINS, APP_ENVIRONMENT } from "./config";

const logger = new Logger("bootstrap");

async function bootstrap() {
  const corsOrigin =
    APP_ENVIRONMENT !== "development"
      ? CORS_ORIGINS
        ? CORS_ORIGINS.split(",").map((c) => c.trim())
        : []
      : "*";
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: "25mb" }));
  app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: corsOrigin,
  });

  await app.listen(APP_PORT, "0.0.0.0");

  logger.log(`cors origin: ${CORS_ORIGINS}`);
  logger.log(`application is running on: ${await app.getUrl()}`);
}

bootstrap();
