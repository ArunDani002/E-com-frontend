import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../screens/auth/Signup'
import Signin from '../screens/auth/Signin'
import ProductHome from '../screens/main/ProductHome'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productlisting" element={<ProductHome />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router