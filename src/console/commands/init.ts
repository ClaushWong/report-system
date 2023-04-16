import { NestFactory } from "@nestjs/core";
import { ConsoleModule } from "../console.module";
import { SeederService } from "../seeder.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ConsoleModule);
  const service: SeederService = app.get(SeederService);

  try {
    await service.data();
    // await service.createSpecialPackProduct();
  } catch (e) {
    console.error(e.stack);
  } finally {
    await app.close();
  }
}

bootstrap().then(() => console.log("finished"));
