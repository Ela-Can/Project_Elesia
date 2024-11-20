import { Routes, Route } from "react-router-dom";

import Header from "../Components/admin/partials/HeaderAdmin.jsx";
import Dashboard from "../Components/admin/Dashboard.jsx";

import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

function AdminRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/admin"
          element={<ProtectedRoute element={Dashboard} />}
        ></Route>
        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>
    </>
  );
}
export default AdminRouter;
