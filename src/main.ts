import { Address } from './entity/address';
import { Customer } from './entity/customer';
import { OrderItem } from './entity/ordem-item';
import { Order } from './entity/order';

let customer = new Customer("123", "Breno Machado");
const address = new Address("Rua 2", 2, "12345-678", "Teresina");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const item3 = new OrderItem("3", "Item 3", 20);

const order = new Order("1", "123", [item1, item2, item3]);