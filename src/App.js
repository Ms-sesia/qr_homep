import React, { useEffect, useState } from "react";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
};

export default App;
