import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calling from "./pages/SendbirdCalling";
import Receive from "./pages/SendbirdReceive";
import CallLoading from "./components/Calling/CallLoading";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calling/*" element={<Calling />} />
      <Route path="/receive/*" element={<Receive />} />
    </Routes>
  );
};

export default Router;
