import React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatedProduct from '../pages/CreatedProduct';
import Home from '../pages/Home';
import Sale from '../pages/Sale';
import ShowProducts from '../pages/ShowProducts';
import Login from '../components/Login/Login'; //Login

function AppRoutes() {
    return (
        <>
            <Routes>
                {/* ruta de Login al entrar en la pagina */}
                <Route path="/" element={<Login/>} />
                <Route path='/home' element={<Home />} />
                <Route path='/venta' element={<Sale />} />
                <Route path='/create' element={<CreatedProduct />} />
                <Route path='/show' element={<ShowProducts/>} />
            </Routes>
        </>
    )
}

export default AppRoutes