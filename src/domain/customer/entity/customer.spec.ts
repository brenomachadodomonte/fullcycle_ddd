import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe('Customer unit tests', () => {


    it('Should throw error when id is empty', () => {
        
        expect(() => {
            const customer = new Customer("", "Breno");
        }).toThrowError('Customer: ID is required');

    });

    it('Should throw error when name is empty', () => {

        expect(() => {
            const customer = new Customer("123", "");
        }).toThrowError('Customer: Name is required');

    });

    it('Should throw error when name and id are empty', () => {

        expect(() => {
            const customer = new Customer("", "");
        }).toThrowError('Customer: Name is required,Customer: ID is required');

    });

    it('Should change name', () => {
        
        const customer = new Customer("123", "Breno");
        customer.changeName("Vanessa");

        expect(customer.name).toBe("Vanessa");

    });

    it('Should activate customer', () => {
        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111-111", "Teresina");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);

    });


    it('Should deactivate customer', () => {
        
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);

    });

    it('Should throw error when address is undefined when you activate a customer', () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");

            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    });

    it('Should should add reward points', () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});