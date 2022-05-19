import { Customer } from "./customer";

describe('Customer unit tests', () => {


    it('Should get 1 as result', () => {
        const result = 1;
        expect(result).toBe(1);
    });

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


});