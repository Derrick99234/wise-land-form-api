import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './modules/mailer/mailer.module';
import { FormModule } from './modules/form/form.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MailerModule, 
    FormModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
