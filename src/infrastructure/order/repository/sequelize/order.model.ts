import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./order-item.model";


@Table({
    tableName: 'orders',
    timestamps: false
})
export class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column
    declare customer_id: string;
    
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]

    @Column({ allowNull: false })
    declare total: number;

}