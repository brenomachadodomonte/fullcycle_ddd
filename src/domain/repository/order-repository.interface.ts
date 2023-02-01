import { Order } from "sequelize/types";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
