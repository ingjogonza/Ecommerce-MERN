const ShoppingCartController = require('../controllers/shoppingCart.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    //app.get('/api/shoppingcarts/:id_user', ShoppingCartController.findAllCarts);
    // app.get('/api/shoppingcarts/:user_id', authenticate,ShoppingCartController.findShoppingCartByUser);
    // app.get('/api/shoppingcarts/',authenticate,ShoppingCartController.findAllCarts);
    // app.post('/api/shoppingcarts/new',authenticate ,ShoppingCartController.createNewCart);
    // app.put("/api/shoppingcarts/update/:id",authenticate,ShoppingCartController.updateExistingCart);
    // app.delete("/api/shoppingcarts/delete/:id",authenticate, ShoppingCartController.deleteExistingCart);

    app.get('/api/shoppingcarts/:user_id', ShoppingCartController.findShoppingCartByUser);
    app.get('/api/shoppingcarts/', ShoppingCartController.findAllCarts);
    app.post('/api/shoppingcarts/new',ShoppingCartController.createNewCart);
    app.put("/api/shoppingcarts/update/:id",ShoppingCartController.updateExistingCart);
    app.delete("/api/shoppingcarts/delete/:id", ShoppingCartController.deleteExistingCart);
    

}