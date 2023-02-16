import {Order} from "../entity/order";
import {OrderItem} from "../entity/ordem-item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}
export default class OrderFactory {
    private constructor() {}

    public static create(orderProps: OrderFactoryProps): Order {
        return new Order(
            orderProps.id,
            orderProps.customerId,
            orderProps.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
        );
    }

}