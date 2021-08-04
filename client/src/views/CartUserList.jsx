import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import EcommerceService from '../services/ecommerce.services';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartUserList = () => {
    const { getItemFromLocalStorage } = useLocalStorage();
    const [cartsList, setCartsList] = useState([]);

    const [mierda, setMierda] = useState('')
    
    const idUser = getItemFromLocalStorage('idUser');
    let listAgg = [];
    
    const eccomerceService = new EcommerceService;



const getAllCarts = async () => {
        const List = await eccomerceService.getAllCartsByUser(idUser);
        console.log(List)
        setCartsList(List);
        setMierda('malparioooooooooooo')
        console.log(cartsList)
         
   
}

const fillArrayAgg = ()=>{
    console.log(cartsList)
    cartsList.length > 0 && cartsList.map((item)=>{
        const { quantity, total } = item.list_products.reduce(
        ({ quantity, total }, { qty, price }) =>
            ({ quantity: quantity + qty, total: total + price * qty }),
            { quantity: 0, total: 0 }
        );
        listAgg[item._id].push({
            qty: quantity,
            total: total
        })
    })
    
}
useEffect(() => {
    getAllCarts();
    fillArrayAgg();
    console.log(cartsList)
    console.log(mierda)
}, [])


    return (
        <div className="container">
            {cartsList.length >0 && cartsList.map((item)=>{
                <div className="card" key={item._id}>
                    <div className="card-body">
                        <div className="card-title">
                            <p className="card-text">Creado en: {item.createdAt}</p>   
                        </div>
                    </div>
                    <p className="card-text">Monto Total: {listAgg[item._id].total}</p>
                    <div className="card-header">
                        Productos Comprados
                    </div>
                    <ul className="list-group list-group-flush">
                        {item.list_products.length>0 && item.list_products.map((item_p)=>{
                            <li className="list-group-item d-flex justify-content-between lh-sm" key={item_p.id}>
                                <div>
                                    <h5 className="my-0">
                                        {item_p.title}
                                    </h5>
                                    <h6 className="my-0">Cantidad: {item_p.qty}</h6>
                                </div>
                                <h6 className="my-0">${item_p.price}</h6>        
                            </li>
                        })}
                    </ul>
                    <button className="btn btn-success bi bi-whatsapp">
                        <Link to="https://api.whatsapp.com/send?phone=56971882482">
                            Comunicarse con la tienda
                        </Link>
                    </button>
                </div>
            })}
            
            
        </div>
    )
}

export default CartUserList
