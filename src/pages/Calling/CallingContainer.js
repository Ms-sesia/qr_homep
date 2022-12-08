import React, { useState } from "react";
import CallingPresenter from "./CallingPresenter";

const CallingContainer = () => {
  const [message, setMessage] = useState(false);
  const [send, setSend] = useState(false);
  const [receive, setReceive] = useState(false);

  return (
    <CallingPresenter
      message={message}
      setMessage={setMessage}
      send={send}
      setSend={setSend}
      receive={receive}
      setReceive={setReceive}
    />
  );
};

export default CallingContainer;
