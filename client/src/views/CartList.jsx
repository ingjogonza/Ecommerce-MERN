import React, { useEffect, useState } from 'react'
import EcommerceService from '../services/ecommerce.services'
import { useLocalStorage } from '../hooks/useLocalStorage';
import Swal from 'sweetalert2';
import { history, useHistory } from 'react-router-dom';
import UserNavigation from './UserNavigation';
const CartList = () => {
    let history = useHistory();
    const [variable, setvariable] = useState('');
    const [cartList, setcartList] = useState([]);
    const eccomerceService = new EcommerceService();
    const { setItemFromLocalStorage,getItemFromLocalStorage } = useLocalStorage();
    const Listado = [];

    const idUser = getItemFromLocalStorage('idUser'); 
    
    const getCartsFromService = async ()=>{
        const list = await eccomerceService.getAllCartsByUser(idUser);
        //Listado = list;
        console.log(list);
        setcartList(list);
    }
    const cancelOrder = async (order)=>{
        Swal.fire({
            title: 'Seguro de querer cancelar tu orden?',
            text: "Ya la queriamos hacer :(",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then((result) => {
            if (result.isConfirmed) {
                const deleted =  eccomerceService.deleteShoppingCart(order)
                console.log(deleted)
                if (deleted){
                    Swal.fire(
                        'Que lastima!',
                        'Tu Pedido ha sido eliminado',
                        'success'
                    )
                    history.go(0);
                }
                
            }
          })

    }

    const completeOrder = async (order)=>{
    
        Swal.fire({
            title: 'Seguro de querer aceptar como recibido su pedido?',
            text: "Es la prueba que hemos completado con exito su pedido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then((result) => {
            if (result.isConfirmed) {
                const updated =  eccomerceService.updateOrder(order._id,{ ...order, status: 'Completado' })
                //console.log(updated)
                if (updated){
                    Swal.fire(
                        'Gracias por tu compra!',
                        'El pedido ha sido completado',
                        'success'
                    )
                    history.go(0);
                }
                
            }
          })

    }


    
    useEffect(()=>{
        
       // console.log(cartList);
        setvariable('hola!')
        getCartsFromService();
        console.log(cartList);

        
    },[])
    return (
        <div className="container">
            <UserNavigation/>
            <div className="py-5 container">
                <h4 className="my-1">Mis Pedidos</h4>
                {cartList.length > 0 && cartList.map((item)=>(
                    <div className="card mb-3" key={item._id}>
                        <div className="card-body">
                            <div className="bg-info d-flex justify-content-between">
                                <div>
                                    <h5 className="my-1">Codigo Pedido: {item._id}</h5>
                                </div>
                                <div>
                                <h5 className="my-1">Fecha Pedido: {item.createdAt.substr(0,10)}</h5>
                                </div>
                            </div>
                            <div className="card-header">
                                <h5 className="my-0">
                                   Detalle de Compra
                                </h5>
                            </div>
                            <ul className="list-group mb-3">
                                {item.list_products.length > 0 && item.list_products.map((p)=>(
                                    <li className="list-group-item d-flex justify-content-between lh-sm" key={p.id}>
                                        <div>
                                            <h5 className="my-0">
                                                {p.title}
                                            </h5>
                                            <h6 className="my-0">Cantidad: {p.qty}</h6>
                                        </div>
                                        <h6 className="my-0">${p.price}</h6>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex justify-content-between lh-sm">
                                <h4>Total <span className="badge bg-primary">${item.total}</span></h4>
                                <h4>Estado Pedido: <span className="badge bg-success"> {item.status}</span></h4>                      
                            </div>
                            {item.status==="Preparando Pedido" && (
                                <div className="d-flex justify-content-center lh-sm">
                                    <button className="btn btn-danger bi bi-x " onClick={()=>cancelOrder(item._id)}> 
                                    Cancelar Pedido
                                    </button>      
                                </div>
                            )
                            
                            }
                            {item.status==="Preparado" && (
                                <>
                                <div className="d-flex justify-content-center lh-sm">
                                    <h6 className="my-0">Su pedido esta listo, con su codigo favor comunicarse con soporte para coordinar su entrega, </h6>
                                    
                                </div>
                                <div className="d-flex justify-content-center lh-sm">
                                    <h6 className="my-0">una vez en sus manos haga click en Aceptar recibo del pedido </h6>
                                    
                                </div>
                                

                                <div className="d-flex justify-content-center lh-sm mt-3">
                                    <button className="btn btn-primary bi bi-check " onClick={()=>completeOrder(item)}> 
                                        Aceptar recibo del pedido
                                    </button>  
                                </div>
                                </>
                                
                            )}
                            
                            
                            
                        </div>
                    </div>
                ))}
                

            </div>
        </div>
            
            
            
    )
}

export default CartList
