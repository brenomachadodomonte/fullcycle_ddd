import { Address } from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export class Customer extends Entity {

    _name: string;
    _address!: Address;
    _active: boolean = true;
    _rewardPoints: number = 0;

    constructor(id: string, name: string){
        super();
        this._id = id;
        this._name = name;

        this.validade();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    validade(){
        CustomerValidatorFactory.create().validate(this)
    }

    changeName(name: string): void{
        this._name = name;
    }

    changeAddress(address: Address) {
        this.Address = address;
    }

    activate(): void {
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get Address(): Address {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    isActive(): boolean {
        return this._active;
    }
}