import CustomerFactory from "./customer.factory";
import {Address} from "../value-object/address";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("Breno");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Breno");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Av Frei Serafim", 10, "12345-678", "Teresina");
        const customer = CustomerFactory.createWithAddress("Breno", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Breno");
        expect(customer.Address).toBe(address);
    });

});