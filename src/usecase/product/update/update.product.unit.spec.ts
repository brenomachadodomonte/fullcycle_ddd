import ProductFactory from "../../../domain/product/factory/product.factory";
import {InputUpdateProductDto} from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createProduct("Product 1", 10.24)

const input: InputUpdateProductDto = {
    id: product.id,
    name: 'John Updated',
    price: 12.50
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)),
    }
}

describe('Unit test update product', () => {

    it('should update a product', async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    });

});