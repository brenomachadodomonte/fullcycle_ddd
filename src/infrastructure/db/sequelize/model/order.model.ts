import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CustomerModel } from "./customer.model";


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

    @Column({ allowNull: false })
    declare total: number;

}