import { Product } from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import { ProductModel } from "./product.model";
import {CustomerModel} from "../../../customer/repository/sequelize/customer.model";
import {Customer} from "../../../../domain/customer/entity/customer";
import {Address} from "../../../../domain/customer/value-object/address";

export default class ProductRepositoty implements ProductRepositoryInterface {
    
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    update(entity: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async find(id: string): Promise<Product> {
        let productModel;
        try {
            productModel = await ProductModel.findOne(
                {
                    where: { "id": id },
                    rejectOnEmpty: true
                }
            );
        } catch( error ) {
            throw new Error('Product not found');
        }

        return new Product(productModel.id, productModel.name, productModel.price)
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(p => new Product(p.id, p.name, p.price));
    }
    
}