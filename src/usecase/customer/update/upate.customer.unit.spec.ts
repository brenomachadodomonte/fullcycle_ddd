import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import {Address} from "../../../domain/customer/value-object/address";
import {InputUpdateCustomerDto} from "./update.customer.dto";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Rua 1", 123, "zip", "City"))

const input: InputUpdateCustomerDto = {
    id: customer.id,
    name: 'John Updated',
    address: {
        street: 'Rua 1',
        number: 10,
        zip: '12345-678',
        city: 'Teresina'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)),
    }
}

describe('Unit test update customer', () => {

    it('should update a customer', async () => {
        const customerRepository = MockRepository()

        const customerUpdateUseCase = new UpdateCustomerUsecase(customerRepository)

        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    });

});