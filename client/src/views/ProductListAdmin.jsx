import React, { useEffect, useState } from 'react'
import ProductService from '../services/services.product';
import { Link } from 'react-router-dom';

const ProductListAdmin = () => {
    const [productList, setProductList] = useState([]);
    const productService = new ProductService;

    const getAllProductsFromService = async ()=>{
        try {
            const List = await productService.getAllProducts();
            setProductList(List);
        } catch (err) {
            return err;
        }

    }
    const deleteProduct = async (id)=>{
        try{
            await productService.deleteProduct(id)
            getAllProductsFromService();

        }
        catch(err){
            return err;
        }

    }
    useEffect(()=>{
        getAllProductsFromService();
    },[])
    return (
        <div className="container">
            <h1>Listado de Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList.length > 0 && productList.map((item) => (

                            <tr key={item._id} value={item._id}>

                                <th scope="row">{item.title}</th>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/product/edit/${item._id}`}>
                                            {/* <span className="badge bg-info">View</span> */}
                                            <button type="button" className="btn btn-sm btn-warning">Actualizar</button>
                                        </Link>
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteProduct(item._id)}>Eliminar</button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>


            </table>


        </div>
    )
}

export default ProductListAdmin