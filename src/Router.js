import React from "react";
import { Route, Routes } from "react-router-dom";
import Calling from "./pages/Calling";
import Home from "./pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calling" element={<Calling />} />
    </Routes>
  );
};

export default Router;
