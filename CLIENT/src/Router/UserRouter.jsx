import { Routes, Route } from "react-router-dom";

import Home from "../Components/global/Home.jsx";
import Contact from "../Components/global/Contact.jsx";
import Product from "../Components/global/Product.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";

import ProductDetails from "../Components/global/ProductDetails.jsx";
import Header from "../Components/partials/Header.jsx";
import Footer from "../Components/partials/Footer.jsx";

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
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
