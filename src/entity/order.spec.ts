import { OrderItem } from "./ordem-item";
import { Order } from "./order";

describe('Order unit tests', () => {

    it('It should throw error when id is empty', () => {
        
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError('ID is required');

    });

    it('It should throw error when CustomerId is empty', () => {
        
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError('CustomerId is required');

    });

    it('It should throw error when CustomerId is empty', () => {
        
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError('Items are required');

    });

    it('It should calculate total', () => {

        const item1 = new OrderItem("1", "Item 1", 100);
        const item2 = new OrderItem("2", "Item 2", 150);
        const item3 = new OrderItem("3", "Item 3", 200);

        const order = new Order("o1", "c1", [item1, item2, item3]);
        const total = order.total();

        expect(total).toBe(450);

    });

});