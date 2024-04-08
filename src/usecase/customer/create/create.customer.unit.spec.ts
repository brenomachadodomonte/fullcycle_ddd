import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: 'Customer 1',
    address: {
        street: 'Rua 1',
        number: 10,
        zip: '12345-678',
        city: 'Teresina'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create customer', () => {

    it('should create a customer', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        });
    });

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it('should throw an error when street is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(usecase.execute(input)).rejects.toThrow("Street is required");
    });
});