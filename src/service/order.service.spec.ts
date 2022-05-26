import { Customer } from "../entity/customer";
import { OrderItem } from "../entity/ordem-item";
import { Order } from "../entity/order";
import OrderService from "./order.service";

describe('Order Service unit tests', () => {

    it('Should place an order', () => {
        
        const customer = new Customer('c1', 'Customer 1');
        const item1 = new OrderItem('it1', 'Item 1', 10, 'p1', 1);

        const order = OrderService.placeOrder(customer, [ item1 ]);

        expect(customer.rewardPoints).toBe(5);

        expect(order.total()).toBe(10);
    });

    it('Should get total of all orders', () => {

        const item1 = new OrderItem('id1', 'Item1', 100, 'p1', 1);
        const item2 = new OrderItem('id2', 'Item2', 200, 'p1', 2);

        const ordem  = new Order('o1', 'c1', [ item1 ]);
        const ordem2  = new Order('o1', 'c1', [ item2 ]);
    
        const total = OrderService.total([ordem, ordem2]);
    });

});