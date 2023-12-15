import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      authSource: process.env.AUTH,
      dbName: process.env.DB_NAME,
    }),
    /*MongooseModule.forRoot(
      'mongodb+srv://srkica:srkica23@k8s.ebxstme.mongodb.net/retryWrites=true&w=majority',
      { authSource: 'admin', dbName: 'psyart_23' },
    ),*/
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
