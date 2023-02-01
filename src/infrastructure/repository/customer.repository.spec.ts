import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";

describe('Customer Repository Unit test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ CustomerModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Should create a product', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('c1', 'Customer 1');
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: 'c1' }});
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: 0
        });

    });

    it('Should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.Address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });

    it('Should throw an error when customer is not found', async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("ABC123");
        }).rejects.toThrow('Customer not found');
    });

    it('Should find all products', async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("123", "Customer 1");
        const address1 = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer1.Address = address1;
        customer1.addRewardPoints(20);
        customer1.activate();

        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer2.Address = address2;
        customer2.addRewardPoints(10);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
        
    });
});