import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../Shop/Product'
import About from '../about/About'
import Login from '../LogIn/Login'
import Register from '../LogIn/Register'
import ProductsDetails from '../Shop/ProductsDetails'
import AddToCart from '../cart/AddToCart'
import Search from '../search/Search'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Product/>}/>
        <Route path='/shop/:id' element={<ProductsDetails/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signIn' element={<Register/>}/>
        <Route path='/cart' element={<AddToCart/>}/>
        <Route path='/search' element={<Search/>}/>
    </Routes>
  )
}

export default MainRoutes