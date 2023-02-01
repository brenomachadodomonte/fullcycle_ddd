import { or } from "sequelize/types";
import { OrderItem } from "../../domain/entity/ordem-item";
import { Order } from "../../domain/entity/order";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";


export class OrderRepository {
    
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
        // await CustomerModel.update(
        //     { 
        //         name: entity.name,
        //         street: entity.Address.street,
        //         number: entity.Address.number,
        //         zipcode: entity.Address.zip,
        //         city: entity.Address.city,
        //         active: entity.isActive(),
        //         rewardPoints: entity.rewardPoints
        //     },

        //     {
        //         where: { id: entity.id }
        //     }
        // );
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
        // const customerModels = await CustomerModel.findAll();

        // return customerModels.map(c => {
        //     const customer = new Customer(c.id, c.name);
        //     const address = new Address(c.street, c.number, c.zipcode, c.city);
        //     customer.changeAddress(address);
        //     customer.addRewardPoints(c.rewardPoints);
        //     return customer;
        // });
        return [];
    }
}