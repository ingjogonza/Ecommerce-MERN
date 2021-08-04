import axios from 'axios';

export default class EcommerceService {

    constructor() {}

    async getOneSingleUser(id) {
        try {
            console.log(id)
            const userFinded = await axios.get(`http://localhost:8000/api/users/${id}`)
            console.log(userFinded);
            return userFinded.data.user;
        } catch(err) {
            return err;
        }
    };
//findAllCarts
async getAllCarts() {
    try {
       const cartList = await axios.get(`http://localhost:8000/api/shoppingcarts`);
       console.log(cartList.data.carts)
      // console.log("🚀 ~ file: Home.jsx ~ line 10 ~ getAllTweets ~ tweetList", cartList.data.carts)
       return cartList.data.carts;

   } catch (error) {
       return error;
   }
}
    async getAllCartsByUser(user) {
         try {
            const cartList = await axios.get(`http://localhost:8000/api/shoppingcarts/${user}`);
            console.log(cartList.data.carts)
           // console.log("🚀 ~ file: Home.jsx ~ line 10 ~ getAllTweets ~ tweetList", cartList.data.carts)
            return cartList.data.carts;

        } catch (error) {
            return error;
        }
    }

    async updateOrder(id, cart) {
        try {
            const updatedOrder = await axios.put(`http://localhost:8000/api/shoppingcarts/update/${id}`, cart)
            console.log(updatedOrder)
            return updatedOrder.data.cart;
        } catch(err) {
            return err;
        }
    }

    async deleteShoppingCart(id) {
        try{
            const deleteCart = await axios.delete(`http://localhost:8000/api/shoppingcarts/delete/${id}`)
            
            return deleteCart.data.response;
        } catch(err) {
            return err;
        }
    }

    async registerCart(cart) {
        try {
            const response = await axios.post('http://localhost:8000/api/shoppingcarts/new', cart);
            return response.data;

        } catch(err) {
            return err;
        }
    }

    async registerUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/new', user);
            return response.data;

        } catch(err) {
            return err;
        }
    }

    async updateUser(id, user) {
        try {
            const response = await axios.put('http://localhost:8000/api/users/update/'+id, user);
            return response.data;

        } catch(err) {
            return err;
        }
    }

    async loginUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', user, {withCredentials: true});
            
            return response.data;

        } catch(err) {
            console.log('error', err);
            return err;
        }
    }



};