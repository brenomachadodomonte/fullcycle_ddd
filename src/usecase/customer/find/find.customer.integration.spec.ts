import {Sequelize} from "sequelize-typescript";
import {CustomerModel} from "../../../infrastructure/customer/repository/sequelize/customer.model";
import {CustomerRepository} from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import {Customer} from "../../../domain/customer/entity/customer";
import {Address} from "../../../domain/customer/value-object/address";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";
import FindCustomerUsecase from "./find.customer.usecase";

describe('Test find customer use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ CustomerModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUsecase(customerRepository)

        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.changeAddress(address);
        await customerRepository.create(customer);

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

        const result = usecase.execute(input)
        expect(result).toEqual(output)
    })
});