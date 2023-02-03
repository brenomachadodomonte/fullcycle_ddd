import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entity/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import ProductRepositoty from "./product.repository";

describe('Product Repository Unit test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ ProductModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it('Should create a product', async () => {
        const productRepository = new ProductRepositoty();
        const product = new Product('p1', "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: 'p1' }});
        
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name:  product.name,
            price: product.price
        });
    });

    it('Should find all products', async () => {
        const productRepository = new ProductRepositoty();

        const product = new Product('p1', "Product 1", 100);
        await productRepository.create(product);

        const product2 = new Product('p2', "Product 2", 200);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
        
    });
});