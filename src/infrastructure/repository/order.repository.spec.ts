import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { OrderItem } from "../../domain/entity/ordem-item";
import { Order } from "../../domain/entity/order";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import ProductRepositoty from "./product.repository";

describe('Order Repository Unit test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ CustomerModel, ProductModel, OrderModel, OrderItemModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const repository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.changeAddress(address);

        await repository.create(customer);

        const productRepository = new ProductRepositoty();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id
                }
            ]
        });
    });

    it('Should find a order', async () => {
        const repository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.changeAddress(address);

        await repository.create(customer);

        const productRepository = new ProductRepositoty();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(order).toStrictEqual(orderResult);
    });

    it('Should throw an error when order is not found', async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("ABC123");
        }).rejects.toThrow('Order not found');
    });

    it('Should find all orders', async () => {
        const repository = new CustomerRepository();
        
        const customer = new Customer("123", "Customer 1");
        const address = new Address('Rua 1', 10, '12345-678', 'Teresina');
        customer.changeAddress(address);

        const customer2 = new Customer("321", "Customer 2");
        const address2 = new Address('Rua 2', 20, '12345-000', 'Teresina');
        customer2.changeAddress(address2);

        await repository.create(customer);
        await repository.create(customer2);

        const productRepository = new ProductRepositoty();
        
        const product = new Product("123", "Product 1", 10);
        const product2 = new Product("321", "Product 2", 15);

        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem("1",product.name,product.price,product.id,2);
        const orderItem2 = new OrderItem("2",product2.name,product2.price,product2.id,3);
        const orderItem3 = new OrderItem("3",product.name,product.price,product.id,1);
        
        const order = new Order("123", "123", [orderItem, orderItem2]);
        const order2 = new Order("456", "321", [orderItem3]);
        const orderRepository = new OrderRepository();
        
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const ordersResult = await orderRepository.findAll();

        expect(ordersResult).toHaveLength(2);
        expect(ordersResult).toContainEqual(order);
        expect(ordersResult).toContainEqual(order2);
    });

})