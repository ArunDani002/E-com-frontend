import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../screens/auth/Signup'
import Signin from '../screens/auth/Signin'
import ProductHome from '../screens/main/ProductHome'
import SellProductForm from '../screens/main/SellProductForm'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productlisting" element={<ProductHome />} />
        <Route path="/sell" element={<SellProductForm />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router