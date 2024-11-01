import { Routes, Route } from "react-router-dom";

import Home from "../Components/user/Home.jsx";
import Contact from "../Components/user/Contact.jsx";
import Product from "../Components/user/Product.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";

import ProductDetails from "../Components/user/ProductDetails.jsx";
import Header from "../Components/user/partials/Header.jsx";
import Footer from "../Components/user/partials/Footer.jsx";
import Dashboard from "../Components/user/Dashboard.jsx";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="product/:id" element={<ProductDetails />}></Route>
        <Route path="contact" element={<Contact />}></Route>

        <Route path="authentification/login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
