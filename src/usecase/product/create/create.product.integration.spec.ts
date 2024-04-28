import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepositoty from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";

describe('Integration Test create a product', () => {
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

    it('should create a product', async () => {
        const productRepository = new ProductRepositoty();
        const usecase = new CreateProductUseCase(productRepository)

        const input: InputCreateProductDto = {
            name: "Produto 1",
            price: 20.5
        }

        const output: OutputCreateProductDto = {
            id: expect.any(String),
            name: "Produto 1",
            price: 20.5
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
});