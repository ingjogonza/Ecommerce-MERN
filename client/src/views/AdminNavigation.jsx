import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocalStorage } from '../hooks/useLocalStorage';
import EcommerceService from '../services/ecommerce.services';
import LogginOut from './LogginOut';

const AdminNavigation = () => {
    const {getItemFromLocalStorage, removeItemFromLocalStorage} = useLocalStorage();
    const idUser = getItemFromLocalStorage('idUser');
    const ecommerceService = new EcommerceService;
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [user, setuser] = useState({
        'username': '',
        'email': '',
        'address': '',
        'cellphone': ''  
    });
    const findUserById = async () =>{
        const userFind = await ecommerceService.getOneSingleUser(idUser);
        console.log(userFind)
        setuser({
            username: userFind.username,
            email: userFind.email,
            address: userFind.address,
            cellphone: userFind.cellphone     
        }); 
    }
    useEffect(()=>{
        findUserById();
    },[])

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/inicio"> 
                        Admin
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to ="/product/new">
                                    Crear Producto
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to ="/productos">
                                    Administrar Productos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to ="/pedidos">
                                    Pedidos
                                </Link>
                            </li>
                            <li className="nav-item">
                                {/* <p className="nav-link">Hola, {user.username}</p> */}
                                <h6 className="nav-link">Hola, {user.username}</h6>    
                            </li>
                            <li className="nav-item">
                                <LogginOut user={user}/>  
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default AdminNavigation