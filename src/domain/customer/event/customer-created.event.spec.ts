import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLog1Handler from "./handler/send-console-log1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log2.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe('Customer created event unit test', () => {

    it('should register handlers for customer created event', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const eventName = CustomerCreatedEvent.name;

        eventDispatcher.register(eventName, eventHandler1);
        eventDispatcher.register(eventName, eventHandler2);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandler2);
    });

    it('should notify all customer created event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        const eventName = CustomerCreatedEvent.name;

        eventDispatcher.register(eventName, eventHandler1);
        eventDispatcher.register(eventName, eventHandler2);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Breno"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
});