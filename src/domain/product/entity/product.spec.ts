import { Product } from "./product";

describe('Product unit tests', () => {

    it('Should throw error when id is empty', () => {
        
        expect(() => {
            const product = new Product("", "Product1", 100);
        }).toThrowError('Product: ID is required');

    });

    it('Should throw error when name is empty', () => {
        
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError('Product: Name is required');

    });

    it('Should throw error when name and id are empty', () => {

        expect(() => {
            const product = new Product("", "", 100);
        }).toThrowError('Product: ID is required,Product: Name is required');

    });

    it('Should throw error when price is lower than 0', () => {
        
        expect(() => {
            const product = new Product("123", "Product", -1);
        }).toThrowError('Product: Price must be greater than 0');

    });

    it('Should throw error when price is lower than 0', () => {

        expect(() => {
            const product = new Product("123", "Product", -1);
        }).toThrowError('Product: Price must be greater than 0');

    });


    it('Should change name', () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it('Should change price', () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);

        expect(product.price).toBe(150);
    });
});