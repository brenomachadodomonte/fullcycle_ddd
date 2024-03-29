import {Customer} from "../../../domain/customer/entity/customer";
import {Address} from "../../../domain/customer/value-object/address";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer('123', 'Customer 1');
const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find customer use case', () => {

    it('should find a customer', async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUsecase(customerRepository)

        const input: InputFindCustomerDto = {
            id: "123"
        }

        const output: OutputFindCustomerDto = {
            id: '123',
            name: 'Customer 1',
            address: {
                street: 'Rua 1',
                city: 'Teresina',
                number: 10,
                zip: '12345-678'
            }
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
});