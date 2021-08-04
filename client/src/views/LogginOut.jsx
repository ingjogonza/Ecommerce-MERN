import React from 'react'
import EcommerceService from '../services/ecommerce.services'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { history, useHistory } from 'react-router-dom';

const LogginOut = (props) => {
    const {user} = props;
    const {getItemFromLocalStorage, removeItemFromLocalStorage} = useLocalStorage();
    const ecommerceService = new EcommerceService();
    let history = useHistory();
    const handleLogOut = async (user)=>{
        const logOut = await ecommerceService.logOut(user)
        if (logOut){
            removeItemFromLocalStorage('idUser');
            removeItemFromLocalStorage('isAdmin');
            history.push('/');
        }
    }
    return (
        <div>
            <button className="btn btn-danger" onClick={()=>handleLogOut(user)}>Logout</button>
        </div>
    )
}

export default LogginOut
