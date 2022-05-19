import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer unit tests', () => {


    it('It should throw error when id is empty', () => {
        
        expect(() => {
            let customer = new Customer("", "Breno");
        }).toThrowError('ID is required');

    });

    it('It should change name', () => {
        
        let customer = new Customer("123", "Breno");
        customer.changeName("Vanessa");

        expect(customer.name).toBe("Vanessa");

    });

    it('It should activate customer', () => {
        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111-111", "Teresina");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);

    });


});