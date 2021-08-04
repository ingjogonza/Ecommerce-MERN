const ProductController = require('../controllers/product.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/products', ProductController.findAllProducts);
    app.get('/api/products/:id', ProductController.getProductByID);
    app.post('/api/products/new', authenticate,ProductController.createNewProduct);
    app.put("/api/products/update/:id", ProductController.updateExistingProduct);
    app.delete("/api/products/delete/:id", ProductController.deleteExistingProduct);
    

}