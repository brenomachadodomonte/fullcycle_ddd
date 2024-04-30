import { app, sequelize  } from "../express"

import request from "supertest";

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const response = await request(app).post('/product').send({
            name: "smartphone",
            price: 999.50
        })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("smartphone")
        expect(response.body.price).toBe(999.50)
    })

    it('should not create a product', async () => {
        const response = await request(app).post('/product').send({
            name: "smartphone"
        })

        expect(response.status).toBe(500)
    })

    it('should list all products', async () => {
        const response = await request(app).post('/product').send({
            name: "smartphone",
            price: 999.50
        })

        const response2 = await request(app).post('/product').send({
            name: "laptop",
            price: 1699.10
        })

        expect(response.status).toBe(200)
        expect(response2.status).toBe(200)

        const listReponse = await request(app).get('/product').send()
        expect(listReponse.status).toBe(200)
        expect(listReponse.body.products.length).toBe(2)

        const smartphone = listReponse.body.products[0]
        expect(smartphone.name).toBe("smartphone")
        expect(smartphone.price).toBe(999.50)

        const laptop = listReponse.body.products[1]
        expect(laptop.name).toBe("laptop")
        expect(laptop.price).toBe(1699.10)

    })
})