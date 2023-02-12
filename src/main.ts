import { Address } from './domain/customer/value-object/address';
import { Customer } from './domain/customer/entity/customer';
import { OrderItem } from './domain/checkout/entity/ordem-item';
import { Order } from './domain/checkout/entity/order';

const customer = new Customer("123", "Breno Machado");
const address = new Address("Rua 2", 2, "12345-678", "Teresina");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "p1", 2);
const item3 = new OrderItem("3", "Item 3", 20, "p1", 2);

const order = new Order("1", "123", [item1, item2, item3]);
console.log(order);