import { app, sequelize  } from "../express"

import request from "supertest";

describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const response = await request(app).post('/customer').send({
            name: "John Doe",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "12345"
            }
        })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("John Doe")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.city).toBe("City")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("12345")
    })

    it('should not create a customer', async () => {
        const response = await request(app).post('/customer').send({
            name: "John Doe"
        })

        expect(response.status).toBe(500)
    })

    it('should list all customers', async () => {
        const response = await request(app).post('/customer').send({
            name: "John Doe",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "12345"
            }
        })

        const response2 = await request(app).post('/customer').send({
            name: "Jane",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 1234,
                zip: "54321"
            }
        })

        expect(response.status).toBe(200)
        expect(response2.status).toBe(200)

        const listReponse = await request(app).get('/customer').send()
        expect(listReponse.status).toBe(200)
        expect(listReponse.body.customers.length).toBe(2)

        const john = listReponse.body.customers[0]
        expect(john.name).toBe("John Doe")
        expect(john.address.street).toBe("Street")
        expect(john.address.city).toBe("City")
        expect(john.address.number).toBe(123)
        expect(john.address.zip).toBe("12345")

        const jane = listReponse.body.customers[1]
        expect(jane.name).toBe("Jane")
        expect(jane.address.street).toBe("Street 2")
        expect(jane.address.city).toBe("City 2")
        expect(jane.address.number).toBe(1234)
        expect(jane.address.zip).toBe("54321")

    })
})