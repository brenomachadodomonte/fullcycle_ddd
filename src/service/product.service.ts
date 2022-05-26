import { Product } from "../entity/product";


export default class ProductService {
    
    static increasePrice(products: Product[], percentage: number): Product[] {
        products.forEach(product => {
            const ammout = product.price * (percentage / 100);
            product.changePrice(product.price + ammout);
        });

        return products;
    }

}