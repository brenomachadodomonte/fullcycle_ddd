import { Address } from "./address";

class Customer {

    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = true;

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
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address
    }
}