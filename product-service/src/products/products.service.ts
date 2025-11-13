import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)   
        private productModel: Model<ProductDocument>
    ) { }

    create(dto: CreateProductDto) {
        const product = new this.productModel(dto);
        return product.save();
    }

    findAll() {
        return this.productModel.find().exec();
    }

    async findOne(id: string) {
        const product = await this.productModel.findById(id).exec();
        if (!product) throw new NotFoundException("Product not found");
        return product;
    }

    async update(id: string, dto: UpdateProductDto) {
        const updated = await this.productModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();

        if (!updated) throw new NotFoundException("Product not found");
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.productModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException("Product not found");
        return { removed: true };
    }
}
