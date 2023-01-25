import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CustomerModel } from "./customer.model";
import { OrderModel } from "./order.model";
import ProductModel from "./product.model";


@Table({
    tableName: 'order_items',
    timestamps: false
})
export class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column
    declare product_id: string;
    
    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column
    declare order_id: string;
    
    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare quantidade: number;
    
    @Column({ allowNull: false })
    declare price: number;
    
    @Column({ allowNull: false })
    declare name: string;
    
}