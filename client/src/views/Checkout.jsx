import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import EcommerceService from '../services/ecommerce.services';
import { history, useHistory } from 'react-router-dom';


const Checkout = () => {
    const { setItemFromLocalStorage,getItemFromLocalStorage } = useLocalStorage();
    const productCartList = JSON.parse(getItemFromLocalStorage('productCartList'));
    const productsInCart = productCartList[0];
    const idUser = getItemFromLocalStorage('idUser');
    const [qtyCart, setQtyCart] = useState(0);
    const [ammountCart, setAmmountCart] = useState(0);
    const initialStateCart = {
        id_user:'',
        list_products: [],
        status: 'preorder'
    }
    let history = useHistory();
    const [cart, setCart] = useState(initialStateCart)
    const ecommerceService = new EcommerceService;
    useEffect(()=>{
        console.log(productsInCart);
        // const qtyOnCart = productsInCart.reduce((a, b) => ({qty: a.qty + b.qty})); 
        // const ammountOnCart = productsInCart.reduce((a, b) => ({qty: (a.qty*a.price) + (b.qty*b.price)}));
        const { quantity, total } = productsInCart.reduce(
            ({ quantity, total }, { qty, price }) =>
              ({ quantity: quantity + qty, total: total + price * qty }),
            { quantity: 0, total: 0 }
          );
        //console.log(quantity);
        setQtyCart(quantity);
        setAmmountCart(total);
        
    },[])
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>Tu Carrito de Compras <span className="badge bg-primary rounded-pill">{qtyCart}</span></h4>
                </div>
            </div>
            <div className="row">
                <ul className="list-group mb-3">
                    {productsInCart.length>0 && productsInCart.map((item)=>(
                        <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                            <div>
                                <h6 className="my-0">
                                    {item.title}
                                </h6>
                                <small className="text-muted">Cantidad: {item.qty}</small>
                            </div>
                            <span className="text-muted">${item.price}</span>
                        </li>

                    ))}
                    <li className="list-group-item d-flex justify-content-end lh-sm">
                        <span className="text-muted">Total ${ammountCart}</span>
                    </li>

                </ul>
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" name="back" className="btn btn-lg btn-primary bi bi-cart-plus" onClick={history.push("/product/list")} >Añadir productos</button>
                <button type="button" name="create" className="btn btn-lg btn-success bi bi-check2-square">Crear Compra</button>
            </div>
            
        </div>
    )
}

export default Checkout
