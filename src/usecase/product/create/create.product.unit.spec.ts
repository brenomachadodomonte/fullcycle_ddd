import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: 'Product 1',
    price: 10.24
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create product', () => {

    it('should create a product', async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it('should throw an error when name is missing', async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await expect(usecase.execute({name: "", price: input.price})).rejects.toThrow("Name is required");
    });

    it('should throw an error when price equal to zero', async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = 0;
        await expect(usecase.execute({name: input.name, price: 0})).rejects.toThrow("Price must be greater than 0");
    });
});