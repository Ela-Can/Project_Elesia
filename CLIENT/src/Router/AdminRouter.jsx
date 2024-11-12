import { Routes, Route } from "react-router-dom";

import Dashboard from "../Components/admin/Dashboard.jsx";

import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

function AdminRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={Dashboard} />}
        ></Route>
        <Route path="*" element={<p>NOT FOUND ADMIN</p>} />
      </Routes>
    </>
  );
}
export default AdminRouter;
