import ProductFactory from "../../../domain/product/factory/product.factory";
import {InputUpdateProductDto} from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepositoty from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = ProductFactory.createProduct("Product 1", 10.24)

const input: InputUpdateProductDto = {
    id: product.id,
    name: 'John Updated',
    price: 12.50
}

describe('Unit test update product', () => {
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

    it('should update a product', async () => {
        const productRepository = new ProductRepositoty()
        await productRepository.create(product)

        const usecase = new UpdateProductUseCase(productRepository)
        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    });

});