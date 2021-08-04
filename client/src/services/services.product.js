import axios from 'axios';

export default class ProductService {

    constructor() {}

    async getOneSingleProduct(id) {
        try {
            
            const product = await axios.get(`http://localhost:8000/api/products/${id}`)
            console.log(product)
            return product.data.productData;
        } catch(err) {
            return err;
        }
    };

    async getAllProducts() {
         try {
            const productsList = await axios.get('http://localhost:8000/api/products');
            console.log(productsList)
            return productsList.data.products;

        } catch (error) {
            return error;
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await axios.post(`http://localhost:8000/api/products/new`, product)
            console.log(newProduct)
            return newProduct.data;
        } catch(err) {
            return err;
        }
    }

    async updateproduct(id, product) {
        try {
            const updatedProduct = await axios.put(`http://localhost:8000/api/products/update/${id}`, product)
            return updatedProduct.data.product;
        } catch(err) {
            return err;
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            return deletedProduct.data.productDeleted;
        } catch(err) {
            return err;
        }
    }
};