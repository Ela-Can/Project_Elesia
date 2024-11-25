import { Routes, Route } from "react-router-dom";

import Home from "../Components/user/Home.jsx";
import Contact from "../Components/user/Contact.jsx";
import Product from "../Components/user/Product.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";
import Diagnostic from "../Components/user/Diagnostic.jsx";

import ProductDetails from "../Components/user/ProductDetails.jsx";

import Header from "../Components/admin/partials/HeaderAdmin.jsx";
import Dashboard from "../Components/admin/Dashboard.jsx";

import ProtectedRoute from "../HOC/ProtectedRoute.jsx";
import ContactList from "../Components/admin/contact/ContactList.jsx";
import ContactHistory from "../Components/admin/contact/ContactHistory.jsx";

function AdminRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="diagnostic/create" element={<Diagnostic />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/admin" element={<ProtectedRoute element={Dashboard} />} />

        <Route path="/admin/contact/pending" element={<ContactList />} />
        <Route path="/admin/contact/finished" element={<ContactHistory />} />

        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>
    </>
  );
}
export default AdminRouter;
