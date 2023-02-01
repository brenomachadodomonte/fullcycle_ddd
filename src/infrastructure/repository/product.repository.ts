import { Product } from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

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

    find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(p => new Product(p.id, p.name, p.price));
    }
    
}