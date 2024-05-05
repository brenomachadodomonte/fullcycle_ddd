import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup"
import {Product} from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product>{
    validate(entity: Product) {
        try {
            yup.object()
                .shape({
                    id: yup.string().required("ID is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().moreThan(0,"Price must be greater than 0")
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                }, { abortEarly: false })
        } catch (errors) {
            const e = errors as yup.ValidationError

            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: Product.name,
                    message: error
                })
            })
        }
    }
}