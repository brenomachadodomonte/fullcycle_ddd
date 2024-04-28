import {Sequelize} from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductRepositoty from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import {InputFindProductDto, OutputFindProductDto} from "./find.product.dto";
import {ProductModel} from "../../../infrastructure/product/repository/sequelize/product.model";

describe('Test find product use case', () => {
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

    it('should find a product', async () => {
        const productRepository = new ProductRepositoty();
        const usecase = new FindProductUseCase(productRepository)

        const product = ProductFactory.createProduct("Product 1", 10.10)
        await productRepository.create(product);

        const input: InputFindProductDto = {
            id: product.id
        }

        const output: OutputFindProductDto = {
            id: product.id,
            name: 'Product 1',
            price: 10.10
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })

    it("should not find a product", () => {
        const productRepository = new ProductRepositoty()
        const usecase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});