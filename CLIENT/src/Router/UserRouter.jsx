import { Routes, Route } from "react-router-dom";

import Home from "../Components/user/Home.jsx";
import Contact from "../Components/user/Contact.jsx";
import Product from "../Components/user/Product.jsx";

import Login from "../Components/auth/Login.jsx";
import Register from "../Components/auth/Register.jsx";

import ProductDetails from "../Components/user/ProductDetails.jsx";
import Header from "../Components/partials/Header.jsx";
import Footer from "../Components/partials/Footer.jsx";
import Dashboard from "../Components/user/Dashboard.jsx";
import Diagnostic from "../Components/user/Diagnostic.jsx";
import ProtectedRoute from "../HOC/ProtectedRoute";
import StoreLocator from "../Components/user/StoreLocator.jsx";
import PrivacyPolicy from "../Components/user/PrivatePolicy.jsx";
import LegalInformation from "../Components/user/LegalInformation.jsx";
import TermsOfUse from "../Components/user/TermsOfUse.jsx";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="diagnostic/create" element={<Diagnostic />} />
        <Route path="contact" element={<Contact />} />

        <Route path="authentification/login" element={<Login />} />
        <Route path="authentification/register" element={<Register />} />

        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="store_locator" element={<StoreLocator />} />

        <Route path="legal_information" element={<LegalInformation />} />
        <Route path="privacy_policy" element={<PrivacyPolicy />} />
        <Route path="terms_of_use" element={<TermsOfUse />} />

        <Route path="user" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
