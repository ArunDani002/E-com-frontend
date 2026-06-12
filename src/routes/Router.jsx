import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "../screens/auth/Signup";
import Signin from "../screens/auth/Signin";

import ProductHome from "../screens/main/ProductHome";
import MyProductListing from "../screens/main/MyProductListing";
import SellProductForm from "../screens/main/SellProductForm";
import AdminPage from "../screens/main/AdminPage";

import ProfilePage from "../screens/profile/ProfilePage";


import UserLayout from "../screens/layout/UserLayout";
import ProtectedRoute from "../screens/layout/ProtectedRoute";
import CartPage from "../screens/main/CartPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<ProductHome />} />

          {/* Protected */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-products"
            element={
              <ProtectedRoute>
                <MyProductListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellProductForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/productlisting" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;