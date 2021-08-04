import React, { useEffect, useState } from 'react'
import ProductService from '../services/services.product';
import EcommerceService from '../services/ecommerce.services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import ProductForm from './ProductForm';
import { history, useHistory } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from "react-router-dom";
import UserNavigation from './UserNavigation';


const ProductList = () => {
    const { setItemFromLocalStorage,getItemFromLocalStorage } = useLocalStorage();
    const productCartList = [];
    const [productList, setProductList] = useState([]);
    const [orderUser, setorderUser] = useState({});

    const [qtyCart, setQtyCart] = useState(0);
    const idUser = getItemFromLocalStorage('idUser');
    const [ammountCart, setAmmountCart] = useState(0);
    const [shoppingCar, setShoppingCar] = useState([]);
    const MySwal = withReactContent(Swal);
    let history = useHistory();
    const initialStateCart = {
        id_user:'',
        list_products: [],
        status: 'preorder'
    }
    const [cart, setCart] = useState(initialStateCart)
    

    const productService = new ProductService;
    const ecommerceService = new EcommerceService;

    const findUserById = async () =>{
        const userFind = await ecommerceService.getOneSingleUser(idUser);
        console.log(userFind)
        setorderUser({
            username: userFind.username,
            email: userFind.email,
            address: userFind.address,
            cellphone: userFind.cellphone     
        }); 
    }

    const handleCheckout = async ()=>{
        const newCartRegistred ={
            user_id: idUser,
            list_products: shoppingCar,
            status: 'Preparando Pedido',
            qty: qtyCart,
            total: ammountCart,
            user_details: orderUser
        }
        const newCart = await ecommerceService.registerCart(newCartRegistred)
        if(newCart){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Compra Registrada con exito!',
                showConfirmButton: false,
                timer: 1500
              })
        }     
        history.push("/mispedidos");
    }
    
    const verShoppingCar = ()=>{
        MySwal.fire(
        <div className="container">
            <div className="row mt-3">
                <div className="col">
                    <h4>Tu Carrito de Compras <span className="badge bg-primary rounded-pill">{qtyCart}</span></h4>
                </div>
            </div>
            <div className="row">
                <ul className="list-group mb-3">
                    {shoppingCar.length>0 && shoppingCar.map((item)=>(
                        <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                            <div>
                                <h5 className="my-0">
                                    {item.title}
                                </h5>
                                <h6 className="my-0">Cantidad: {item.qty}</h6>
                            </div>
                            <h6 className="my-0">${item.price}</h6>
                            
                        </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-end lh-sm">
                        <h4>Total <span className="badge bg-primary">${ammountCart}</span></h4>                      
                    </li>
                </ul>
            </div>        
        </div>)
        //swal(<ProductForm/>)
    }

    const getAllProductsFromService = async () => {
        try {
            const List = await productService.getAllProducts();
            setProductList(List);
             
        } catch (err) {
            return err;
        }

    }
    const handleCart = (item, e) => {
        const qtyList = shoppingCar;
        const index = qtyList.findIndex(q => q.id === item._id);
        setShoppingCar([]);
        let qtyOld = qtyCart;
        let ammountOld = ammountCart;
        if (e.target.name === "add") {
            if (index === -1) {
                qtyList.push({
                    id: item._id,
                    title: item.title,
                    price: item.price,
                    qty: 1
                })
            } else {
                qtyList[index].qty++;
            }

            setQtyCart(qtyOld + 1);
            setAmmountCart(ammountOld + item.price);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto añadido a la lista!',
                showConfirmButton: false,
                timer: 1500
            })

        }
        else {
            console.log("removio!!")    
            if (qtyList[index].qty === 1) {
                qtyList.splice(index, 1)
            } else {
                qtyList[index].qty--;
            }
            setQtyCart(qtyOld - 1);
            setAmmountCart(ammountOld - item.price);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto removido de la lista!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        setShoppingCar(qtyList)
        console.log(shoppingCar);
    }
    useEffect(() => {
        getAllProductsFromService();
        findUserById();
    }, [])
    useEffect(() => {
        console.log(qtyCart, ammountCart)
    }, [qtyCart, ammountCart])
    return (
        <div>
            <UserNavigation/>
            <div className="py-5 container">
            <div className="d-flex justify-content-between">
                <div className="col-6">
                    <h6>En esta compra llevas: <span className="badge bg-primary">{qtyCart}</span> articulos Total $ <span className="badge bg-primary">{ammountCart}</span></h6>
                    {qtyCart>0 && (
                        <button className="btn bi bi-cart btn-info" type="button" onClick={()=>verShoppingCar()}> Ver Carro de Compras</button>
                    )}
                </div>
                <div className="col-4">
                    
                </div>
                <div className="col-2">
                    <div className="d-grid gap-2">
                        {qtyCart>0 &&(
                            <button className="btn bi bi-check2-square btn-success" type="button" onClick={()=>handleCheckout()} > Realizar Pedido</button>
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="col text-center">
                    <h3>Listado de Productos</h3>
                </div>
            </div>
                
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {productList.length > 0 && productList.map((item, idx) => (

                            <div className="col" id={item._id} key={item._id}>
                                <div className="card shadow-sm" >
                                    <img src={item.image} className="card-img-top" width="250" height="250" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <h6 className="card-text">Precio: {item.price}</h6>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" name="add" className="btn btn-lg btn-primary bi bi-cart-plus" onClick={(e) => handleCart(item, e)} />
                                            {shoppingCar.findIndex(q => q.id === item._id) !== -1 ?
                                                (
                                                    <button type="button" name="remove" className="btn btn-lg btn-danger bi bi-cart-dash" onClick={(e) => handleCart(item, e)}></button>
                                                ) : (
                                                    <button type="button" name="remove" className="btn btn-lg btn-danger bi bi-cart-dash" disabled onClick={(e) => handleCart(item, e)}></button>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductList
