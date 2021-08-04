const ShoppingCart = require('../models/shoppingCart.model');

module.exports.findAllCarts = (req, res) => {
    ShoppingCart.find().sort({createdAt: -1})
    .then(allCarts => res.json({carts: allCarts}))
    .catch(err => res.json({errors: err}));
}
module.exports.findShoppingCartByUser = (req, res) => {
    ShoppingCart.find({user_id: req.params.user_id}).sort({createdAt: -1})
    .then(allCarts => res.json({carts: allCarts}))
    .catch(err => res.json({errors: err}));
}

module.exports.createNewCart = (req, res) => {
    console.log('llegue aqui',req.body);
    ShoppingCart.create(req.body)
    .then(newCart => res.send({cart: newCart}))
    .catch(err => res.send({errors: err}));
}

module.exports.updateExistingCart = (req, res) => {
    console.log(req.params.id)
    ShoppingCart.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updateCart => res.json({ cart: updateCart }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteExistingCart = (req, res) => {
    ShoppingCart.findByIdAndDelete({ _id: req.params.id })
        .then(deleteCart => res.json({ cartDeleted: deleteCart }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};