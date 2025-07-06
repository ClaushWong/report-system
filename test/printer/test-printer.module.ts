import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { SharedModule } from '@src/shared/shared.module';
import { MongooseCoreModule } from '@nestjs/mongoose/dist/mongoose-core.module';
import { MONGO_URL } from '@src/config';

@Module({
    imports: [
        MongooseCoreModule.forRoot(MONGO_URL, {
            useCreateIndex: true,
        }),
        DatabaseModule,
        SharedModule,
    ],
    providers: [],
})
export class TestPrinterModule {

}
