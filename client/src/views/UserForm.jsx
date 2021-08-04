import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EcommerceService from '../services/ecommerce.services';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import UserNavigation from './UserNavigation';

const UserForm = () => {
    const [error, setError] = useState('');
    const [user, setuser] = useState({
        'username': '',
        'email': '',
        'address': '',
        'cellphone': '',
        'password': ''
    });
    const ecommerceService = new EcommerceService()

    const { getItemFromLocalStorage } = useLocalStorage();
    const idUser = getItemFromLocalStorage('idUser');
    const findUserById = async () => {
        const userFind = await ecommerceService.getOneSingleUser(idUser);
        console.log(userFind)
        setuser({
            username: userFind.username,
            email: userFind.email,
            address: userFind.address,
            cellphone: userFind.cellphone,
            password: userFind.password
        });
    }
    const handleChangeInput = (e) => {
        if (e.target.name === 'address') {
            (e.target.value.length > 0 && e.target.value.length < 8) ? setError('* La dirección debe tener por lo menos 8 caracteres') : setError('')
        } else if (e.target.name === 'cellphone') {
            const cellPhoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
            cellPhoneRegex.test(e.target.value) ? setError('') : setError('*Favor ingresar un celular en formato +569xxxxxxx');
        }
        setuser({ ...user, [e.target.name]: e.target.value });

    }
    const updateUser = async (e) => {
        e.preventDefault();
        const updatedUser = await ecommerceService.updateUser(idUser, user);
        if (updatedUser) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario editado exitosamente!',
                showConfirmButton: false,
                timer: 1500
            })
        }

        // setSucessMessage("Producto actualizado exitosamente");
        //history.push('/i');

    }
    useEffect(() => {
        findUserById();
    }, [])
    return (
        <div>
            <UserNavigation />
            <div className="py-5 container">

                <div className="row">
                    <form onSubmit={(e) => updateUser(e)} >
                        <h3 className="bg-light text-center">Actualiza tus Datos de Contacto</h3>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="address" name="address" value={user.address} placeholder="lugar donde enviaremos sus pedidos" onChange={(e) => handleChangeInput(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cellphone" className="form-label">Celular</label>
                            <input type="text" className="form-control" id="cellphone" name="cellphone" value={user.cellphone} placeholder="coloque su celular" onChange={(e) => handleChangeInput(e)} />
                        </div>

                        <div className="mb-3">
                            <div className="col">
                                {error ? (
                                    <button className="btn btn-primary btn-lg bi bi-save2" disabled>Actualizar</button>
                                ) : (
                                    <button className="btn btn-primary btn-lg bi bi-save2" >Actualizar</button>
                                )}

                            </div>
                        </div>
                        <span className="badge bg-danger">{error}</span>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default UserForm
