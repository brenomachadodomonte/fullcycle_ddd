import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";
import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepositoty from "../../../infrastructure/product/repository/sequelize/product.repository";

const product1 = ProductFactory.createProduct("Smartphone", 999.99)
const product2 = ProductFactory.createProduct("Laptop", 1200.0)
const product3 = ProductFactory.createProduct("Camera", 205.99)

describe('Unit test list products', () => {
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
    });

    it('should list products', async () => {
        const productRepository = new ProductRepositoty()

        await productRepository.create(product1)
        await productRepository.create(product2)
        await productRepository.create(product3)

        const usecase = new ListProductUseCase(productRepository)
        const output = await usecase.execute()

        expect(output.products.length).toBe(3)

        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)

        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)

        expect(output.products[2].id).toBe(product3.id)
        expect(output.products[2].name).toBe(product3.name)
        expect(output.products[2].price).toBe(product3.price)
    });

});