import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLogHandler from "./handler/send-console-log.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import {Customer} from "../entity/customer";
import {Address} from "../value-object/address";

describe('Customer address changed event unit test', () => {

    it('should register handler for address changed event', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();

        const eventName = CustomerAddressChangedEvent.name;

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);
    });

    it('should notify all address changed event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const eventName = CustomerAddressChangedEvent.name;

        eventDispatcher.register(eventName, eventHandler);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111-111", "Teresina");
        customer.changeAddress(address);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address.toString()
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

})