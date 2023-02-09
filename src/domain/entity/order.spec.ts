import { OrderItem } from "./ordem-item";
import { Order } from "./order";

describe('Order unit tests', () => {

    it('Should throw error when id is empty', () => {
        
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrowError('ID is required');

    });

    it('Should throw error when CustomerId is empty', () => {
        
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError('CustomerId is required');

    });

    it('Should throw error when CustomerId is empty', () => {
        
        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrowError('Items are required');

    });

    it('Should calculate total', () => {

        const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 150, "p2", 2);
        const item3 = new OrderItem("3", "Item 3", 200, "p3", 5);

        const order = new Order("o1", "c1", [item1, item2, item3]);
        let total = order.total();

        expect(total).toBe(1500);

        const order2 = new Order("o2", "c2", [item1, item2]);
        total = order2.total();

        expect(total).toBe(500);

    });

    it('Should throw error when item quantity is lower than 0', () => {

        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item1]);
        }).toThrowError('Item quantity should be greater than 0');

    });

});