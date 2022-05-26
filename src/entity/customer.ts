import { Address } from "./address";

export class Customer {

    private _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = true;
    _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;

        this.validade();
    }

    validade(){
        if(this._name.length === 0){
            throw new Error("Name is required");
        }

        if(this._id.length === 0){
            throw new Error("ID is required");
        }
    }

    changeName(name: string): void{
        this._name = name;
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
        this._rewardPoints += 10;
    }

    set Address(address: Address) {
        this._address = address
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    isActive(): boolean {
        return this._active;
    }
}