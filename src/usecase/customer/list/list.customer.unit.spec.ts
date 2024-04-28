import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import {Address} from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
    "John",
    new Address("Rua 1", 123, "zip", "City")
)

const customerTwo = CustomerFactory.createWithAddress(
    "Jane",
    new Address("Rua 2", 321, "zip-code", "City")
)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test list customers', () => {

    it('should list customers', async () => {
        const customerRepository = MockRepository()

        const useCase = new ListCustomerUseCase(customerRepository)
        const output = await useCase.execute()

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customerOne.id)
        expect(output.customers[0].name).toBe(customerOne.name)
        expect(output.customers[0].address.street).toBe(customerOne.Address.street)

        expect(output.customers[1].id).toBe(customerTwo.id)
        expect(output.customers[1].name).toBe(customerTwo.name)
        expect(output.customers[1].address.street).toBe(customerTwo.Address.street)
    });

});