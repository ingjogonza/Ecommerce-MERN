import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import ProductList from './ProductList';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';

const Home = () => {
    const { getItemFromLocalStorage } = useLocalStorage();
    const isAdmin = getItemFromLocalStorage('isAdmin');
    console.log(isAdmin);
    return (
        <div className="container">
            

            {isAdmin ? (
                <div className="container">
                    <AdminNavigation />
                    <div className="container px-lg-5">
                        <div className="d-flex justify-content-center">
                            <h1>Bienvenido</h1>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="container">
                    <UserNavigation />
                    <div className="container px-lg-5">
                        <div className="d-flex justify-content-center">
                            <h1>Bienvenido</h1>
                        </div>
                    </div>

                </div>

            )}


        </div>
    )
}

export default Home
