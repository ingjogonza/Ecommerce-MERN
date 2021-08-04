import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import EcommerceService from '../services/ecommerce.services';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('');
    const history = useHistory();
    const initialStateForm = {
        "username": '',
        "email": '',
        "password": '',
        "address": '',
        "cellphone": ''
    }

    const [loginForm, setLoginForm] = useState(initialStateForm)
    const ecommerceService = new EcommerceService();
    const {setItemFromLocalStorage} = useLocalStorage();

    const handleChangeInput = (e)=>{
        if(e.target.name==='email'){
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            emailRegex.test(e.target.value) ? setError('') : setError('*Favor ingresar un correo en formato xxxx@xxxx.xxxx');
        }
        else if(e.target.name==='username'){
            (e.target.value.length >0 && e.target.value.length <3) ? setError('* El nombre de usuario debe tener por lo menos 3 caracteres') : setError('')
        }else if(e.target.name==='password'){
            (e.target.value.length >0 && e.target.value.length <6) ? setError('* El password debe tener por lo menos 6 caracteres') : setError('')
        }else if(e.target.name==='address'){
            (e.target.value.length >0 && e.target.value.length <8) ? setError('* La dirección debe tener por lo menos 8 caracteres') : setError('')
        }else if(e.target.name==='cellphone'){
            const cellPhoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
            cellPhoneRegex.test(e.target.value) ? setError('') : setError('*Favor ingresar un celular en formato +569xxxxxxx');
        }
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
              
    }
    const handleCommit = async (e)=>{
        e.preventDefault();
        console.log(isLogin)
        if(isLogin){
           // try {
                const login = await ecommerceService.loginUser(loginForm);
                const {authUser, msg} = login;
               
                console.log('me trae', login)

                if(msg==="Se ha logueado correctamente!"){
                     //guardo el id en un localstorage
                setItemFromLocalStorage('idUser', authUser._id );
                setItemFromLocalStorage('isAdmin', authUser.isadmin );
                //setItemFromLocalStorage('productCartList', JSON.stringify([]))

                    Swal.fire(
                        'Hola de nuevo ' + authUser.username,
                        msg,
                        'success'
                      )

                      history.push("/inicio");

                }
                else{
                    Swal.fire(
                        'Error!',
                        msg + ' revisa tus credenciales',
                        'error'
                      )
                }
                //console.log(login)
    
            // } catch (err) {
            //     return err;
            // }
        } else {
            const userCreated = await ecommerceService.registerUser(loginForm);
            console.log(userCreated)
            if (userCreated.user){
                Swal.fire(
                    'Bienvenido ' + userCreated.user.username+'!',
                    'Usa ahora tus credenciales!',
                    'success'
                  )
                  setLoginForm(initialStateForm);

            }
            else{
                // userCreated.errors.errors.map((error)=>{
                //     console.log(error)
                // })

                const {username,email}= userCreated.errors
                const errorMessage = (username ? 'El usuario '+ loginForm.username +' no esta disponible use otro.' : '') + (email ? 'El mail ' + loginForm.email + ' no disponible use otro' : '');
                Swal.fire(
                    'Error!',
                    errorMessage,
                    'error'
                  )
                
            }

        }
    }
    return (
        <div className="container">
            <div className="row">
                <h1 className="bg-dark text-light text-center mb-3">BIENVENIDOS A NUESTRO ECOMMERCE</h1>
            </div>
            <div className="row justify-content-md-center">
                <div className="col">
                    <form onSubmit={(e)=>handleCommit(e)} >
                        <h3 className="bg-light text-center">{isLogin ? 'Login' : 'Registrarse'}</h3>
                        {!isLogin &&(
                            <>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Usuario</label>
                                    <input type="text" className="form-control" id="username" name="username" placeholder="coloque tu nombre de usuario" onChange={(e)=>handleChangeInput(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Dirección</label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="lugar donde enviaremos sus pedidos" onChange={(e)=>handleChangeInput(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cellphone" className="form-label">Usuario</label>
                                    <input type="text" className="form-control" id="cellphone" name="cellphone" placeholder="coloque su celular" onChange={(e)=>handleChangeInput(e)}/>
                                </div>
                            </>    
                        )}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(e)=>handleChangeInput(e)}/>
                        </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(e)=>handleChangeInput(e)}/>
                            </div>
                            <div className="mb-3">
                                <div className="col">
                                    {error ? (
                                        <button className="btn btn-primary btn-lg" disabled>{isLogin ? 'Login' : 'Registrarse'} </button>
                                    ) : (
                                        <button className="btn btn-primary btn-lg" >{isLogin ? 'Login' : 'Registrarse'}</button>
                                    )}
                                    
                                </div>   
                            </div>
                            <span className="badge bg-danger">{error}</span>
                    </form>
                    
                </div>
                <div className="col">
                    <div className="mb-3">
                        {isLogin ? (
                            <>
                                
                                <h6 className="text-info">No tienes cuenta?</h6>
                                <button className="btn btn-primary btn-sm" onClick={() => setIsLogin(false)}>Registrate</button>
                            </>
                        ) : (
                            <>
                                
                                <h6 className="text-info">Ya tienes cuenta? Usa tus credenciales</h6>
                                <button className="btn btn-primary btn-sm" onClick={() => setIsLogin(true)}>Logueate</button>
                            </>
                            
                        )}
                    </div>
                </div>
                

            </div>
    </div>
            )
}

export default Login
