import ProductInterface from "../entity/product.interface";
import {Product} from "../entity/product";
import { v4 as uuid} from "uuid";
import {ProductB} from "../entity/productb";

export default class ProductFactory {
    private constructor() {}

    public static create(type: string, name: string, price: number) : ProductInterface {
        switch (type){
            case "a":
                return new Product(uuid(), name, price);
            case "b":
                return new ProductB(uuid(), name, price);
            default:
                throw new Error("Product type not supported");
        }
    }

    public static createProduct(name: string, price: number) : Product {
        return new Product(uuid(), name, price);
    }
}