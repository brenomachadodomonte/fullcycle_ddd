import { OrderItem } from "../../../../domain/checkout/entity/ordem-item";
import { Order } from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";


export class OrderRepository implements OrderRepositoryInterface {
    
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        }, {
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total()
        }, {
            where: { id: entity.id }, 
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne(
                {
                    where: { id: id },
                    rejectOnEmpty: true,
                    include: ["items"]
                }
            );
        } catch( error ) {
            throw new Error('Order not found');
        }

        const order = new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(item => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
        )));
        
        return order;
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({include: ["items"]});
        
        const orders = ordersModel.map(orderModel => 
            new Order(
                orderModel.id, 
                orderModel.customer_id, 
                orderModel.items.map(item => new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
        ))));

        return orders;
    }
}