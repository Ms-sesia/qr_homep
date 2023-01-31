import React from "react";
import { Route, Routes } from "react-router-dom";
import CallLoading from "./components/Calling/CallLoading";
import Calling from "./pages/Calling";
import Home from "./pages/Home";
import Receive from "./pages/Receive";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calling" element={<Calling />} />
      <Route path="/receive" element={<Receive />} />
    </Routes>
  );
};

export default Router;
