import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import DashBoard from "../pages/dashBoard";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/admin/adminData/:id" element={<DashBoard />} />
    </Routes>
  );
};

export default Router;
