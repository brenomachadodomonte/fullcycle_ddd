import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import {CustomerRepository} from "../../customer/repository/sequelize/customer.repository";
import {InputCreateCustomerDto} from "../../../usecase/customer/create/create.customer.dto";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
    const repository = new CustomerRepository()
    const usecase = new CreateCustomerUseCase(repository)
    try {
        const input: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(input)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

customerRoute.get('/', async (req: Request, res: Response) => {
    const repository = new CustomerRepository()
    const usecase = new ListCustomerUseCase(repository)
    try {
        const output = await usecase.execute()
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})