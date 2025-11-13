import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/orders_db"
    ),
    OrdersModule,
  ],
})
export class AppModule { }
