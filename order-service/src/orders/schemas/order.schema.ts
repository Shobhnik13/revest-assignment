import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    total: number;

    @Prop({ type: Object, required: true })
    productSnapshot: Record<string, any>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
