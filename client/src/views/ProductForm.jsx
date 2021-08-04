import React, { useEffect, useState } from 'react'
//import Navigation from './Navigation'
import { Link, useParams, useHistory } from 'react-router-dom';
import ProductService from '../services/services.product';
import Swal from 'sweetalert2';
import AdminNavigation from './AdminNavigation';


const ProductForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const productService = new ProductService;
    const initialState = {
        "title":'',
        "price": '',
        "description": '',
        "image": ''
    }
    const [product, setProduct] = useState(initialState)
    const [error, setError] = useState('')
    //const [sucessMessage, setSucessMessage] = useState()

    const getASingleProductFromService = async () => {
        try {
            const singleProduct = await productService.getOneSingleProduct(id);
            setProduct(singleProduct);
        } catch (err) {
            return err;
        }

    }

    const createProduct = async (e) =>{
        e.preventDefault();
        const newProduct= await productService.createProduct(product);
        console.log(newProduct);
        if (newProduct){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto almacenado exitosamente!',
                showConfirmButton: false,
                timer: 1500
              })
            console.log("insertado con exito!!!")
        }
     //   setSucessMessage("Producto creado exitosamente");
        history.push('/productos');
    }
    const updateProduct = async (e) =>{
        e.preventDefault();
        const updatedProduct= await productService.updateproduct(id,product);
        if (updatedProduct){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto editado exitosamente!',
                showConfirmButton: false,
                timer: 1500
              })
        }
        
       // setSucessMessage("Producto actualizado exitosamente");
        history.push('/productos');

    }
    const handleCommit = (e)=>{
        id ? updateProduct(e) : createProduct(e);
        
    }
//^[0-9,$]*$
    const handleChangeInput = (e)=>{
        if(e.target.name==='title'){
            (e.target.value.length >0 && e.target.value.length <2) ? setError('* El titulo debe tener por lo menos 2 caracteres') : setError('')
        }else if (e.target.name==='price'){
            const numberRegExp = /^[0-9]*$/;
            numberRegExp.test(e.target.value) ? setError('') : setError('* Favor Ingresar solo numeros');
        }else if(e.target.name==='description'){
            (e.target.value.length >0 && e.target.value.length <6) ? setError('* La descripcion debe tener por lo menos 6 caracteres') : setError('')
        }
        setProduct({...product, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        if (id){
            getASingleProductFromService();
        }else{
            setProduct(initialState);
        }
    },[])

    return (
        <div className="container">
            <AdminNavigation/>
            {/* <Navigation /> */}
            <div className="row justify-content">
                <div className="col">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h3 className="text-center">{id ? 'Edit Product' : 'Create New Product'}</h3>
                            
                            <form onSubmit={(e) => handleCommit(e)}>
                                {id &&(
                                    <div className="row mb-3">
                                        <div className="col text-center">
                                            <img src={product.image} class="img-responsive" alt="product img" width="400" height="350"/>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-5 col-form-label">Title</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="title" id="title" value={product.title} onChange={(e) => handleChangeInput(e)} />
                                        
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="price" className="col-sm-5 col-form-label">Price</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="price" id="price" value={product.price} onChange={(e) => handleChangeInput(e)} />
                        
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="description" className="col-sm-5 col-form-label">Description</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="description" id="description" value={product.description} onChange={(e) => handleChangeInput(e)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="image" className="col-sm-5 col-form-label">Image URL</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="image" id="image" value={product.image} onChange={(e) => handleChangeInput(e)} />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    {/* <span className="badge bg-danger"></span> */}
                                    {error.length>1 &&(
                                        <div class="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <div className="col text-center">
                                        <button type="submit" className="btn btn-primary btn-lg">Save</button>
                                    </div>
                                </div>
                                

                            </form>
                            
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductForm