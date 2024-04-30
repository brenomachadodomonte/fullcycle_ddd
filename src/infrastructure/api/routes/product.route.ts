import express, {Request, Response} from "express";
import ProductRepositoty from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import {InputCreateProductDto} from "../../../usecase/product/create/create.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const repository = new ProductRepositoty()
    const usecase = new CreateProductUseCase(repository)
    try {
        const input: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }

        console.log(input)

        const output = await usecase.execute(input)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    const repository = new ProductRepositoty()
    const usecase = new ListProductUseCase(repository)
    try {
        const output = await usecase.execute()
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})