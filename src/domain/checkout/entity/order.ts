import { OrderItem } from "./ordem-item";

export class Order {
    
    private _id: string;
    private _customerID: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerID: string, items: OrderItem[]) {
        this._id = id;
        this._customerID = customerID;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean{
        if(this._id.length === 0){
            throw new Error("ID is required");
        }

        if(this._customerID.length === 0){
            throw new Error("CustomerId is required");
        }

        if(this._items.length === 0){
            throw new Error("Items are required");
        }

        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    get id(): string {
        return this._id;
    } 
    
    get customerId(): string {
        return this._customerID;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    set customerId(customerID: string) {
        this._customerID = customerID;
        this.validate();
    }    
}