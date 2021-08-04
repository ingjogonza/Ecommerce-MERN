const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = app => {    
    app.post('/api/users/login', UserController.loginUser);
    app.post('/api/users/new', UserController.registerUser);
    app.get('/api/users/:id', UserController.getOneSingleUser);
    app.put('/api/users/update/:id', UserController.updateExistingUser);
    app.post('/api/users/logout', UserController.logout);
}

