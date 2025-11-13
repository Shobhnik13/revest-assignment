import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly svc: OrdersService) { }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.svc.create(dto);
    }

    @Get()
    findAll() {
        return this.svc.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.svc.findOne(id);
    }
}
