import ProductFactory from "../../../domain/product/factory/product.factory";
import {InputFindProductDto, OutputFindProductDto} from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.createProduct("Product 1", 10.25)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find product use case', () => {

    it('should find a product', async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = {
            id: product.id
        }

        const output: OutputFindProductDto = {
            id: product.id,
            name: 'Product 1',
            price: 10.25
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    });

    it("should not find a product", () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })
        const usecase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});