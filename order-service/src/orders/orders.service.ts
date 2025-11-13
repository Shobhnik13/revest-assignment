import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
        private http: HttpService
    ) { }

    async create(dto: CreateOrderDto) {
        const url = `${process.env.PRODUCT_SERVICE_URL || "http://localhost:4444"}/api/products/${dto.productId}`;

        let product;
        try {
            const response = await firstValueFrom(this.http.get(url));
            product = response.data;
        } catch {
            throw new NotFoundException("Product not found in product-service");
        }

        if (product.stock < dto.quantity) {
            throw new BadRequestException("Insufficient stock");
        }

        const order = new this.orderModel({
            productId: dto.productId,
            quantity: dto.quantity,
            total: product.price * dto.quantity,
            productSnapshot: {
                name: product.name,
                sku: product.sku,
                price: product.price,
                attributes: product.attributes,
            }
        });

        return order.save();
    }

    findAll() {
        return this.orderModel.find().exec();
    }

    async findOne(id: string) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) throw new NotFoundException("Order not found");
        return order;
    }
}
