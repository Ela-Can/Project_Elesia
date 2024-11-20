import { Routes, Route } from "react-router-dom";

import Home from "../Components/user/Home.jsx";
import Contact from "../Components/user/Contact.jsx";
import Product from "../Components/user/Product.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";

import ProductDetails from "../Components/user/ProductDetails.jsx";
import Header from "../Components/partials/Header.jsx";
import Footer from "../Components/user/partials/Footer.jsx";
import Dashboard from "../Components/user/Dashboard.jsx";
import Diagnostic from "../Components/user/Diagnostic.jsx";
import ProtectedRoute from "../HOC/ProtectedRoute";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="diagnostic/create" element={<Diagnostic />}></Route>
        <Route path="contact" element={<Contact />}></Route>

        <Route path="authentification/login" element={<Login />}></Route>
        <Route path="authentification/register" element={<Register />}></Route>

        <Route path="product/:id" element={<ProductDetails />}></Route>

        <Route
          path="user"
          element={<ProtectedRoute element={Dashboard} />}
        ></Route>
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
