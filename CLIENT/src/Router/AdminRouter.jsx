import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

// General Routes

import Header from "../Components/admin/partials/HeaderAdmin.jsx";
import Footer from "../Components/partials/Footer.jsx";

import Home from "../Components/user/Home.jsx";

import Product from "../Components/user/Product.jsx";
import ProductDetails from "../Components/user/ProductDetails.jsx";

import Diagnostic from "../Components/user/Diagnostic.jsx";
import Contact from "../Components/user/Contact.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";

import StoreLocator from "../Components/user/StoreLocator.jsx";

import PrivacyPolicy from "../Components/user/PrivatePolicy.jsx";
import LegalInformation from "../Components/user/LegalInformation.jsx";
import TermsOfUse from "../Components/user/TermsOfUse.jsx";
import CodeOfConduct from "../Components/user/CodeOfConduct.jsx";

// Spécific routes for admin

import Dashboard from "../Components/admin/Dashboard.jsx";

import ContactList from "../Components/admin/contact/ContactList.jsx";
import ContactHistory from "../Components/admin/contact/ContactHistory.jsx";

import CommentList from "../Components/admin/comment/CommentList.jsx";
import CommentHistory from "../Components/admin/comment/CommentHistory.jsx";

function AdminRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="diagnostic/create" element={<Diagnostic />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/admin" element={<ProtectedRoute element={Dashboard} />} />

        <Route path="authentification/login" element={<Login />} />
        <Route path="authentification/register" element={<Register />} />
        <Route path="store_locator" element={<StoreLocator />} />

        <Route path="/admin/contact/pending" element={<ContactList />} />
        <Route path="/admin/contact/finished" element={<ContactHistory />} />

        <Route path="/admin/comment/pending" element={<CommentList />} />
        <Route path="/admin/comment/moderated" element={<CommentHistory />} />

        <Route path="legal_information" element={<LegalInformation />} />
        <Route path="privacy_policy" element={<PrivacyPolicy />} />
        <Route path="terms_of_use" element={<TermsOfUse />} />
        <Route path="code_of_conduct" element={<CodeOfConduct />} />

        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>
      <Footer />
    </>
  );
}
export default AdminRouter;
