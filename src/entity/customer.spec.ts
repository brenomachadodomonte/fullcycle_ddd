import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer unit tests', () => {


    it('Should throw error when id is empty', () => {
        
        expect(() => {
            let customer = new Customer("", "Breno");
        }).toThrowError('ID is required');

    });

    it('Should change name', () => {
        
        let customer = new Customer("123", "Breno");
        customer.changeName("Vanessa");

        expect(customer.name).toBe("Vanessa");

    });

    it('Should activate customer', () => {
        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111-111", "Teresina");
        customer.Address = address;

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

});