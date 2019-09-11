import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import "./App.css";

import paymentMachine from "./paymentMachine";
import { SAVE_BOOKING_EXAMPLE_DATA } from "./paymentMachine/services/saveBooking";

function App() {
  const [data, setData] = useState(SAVE_BOOKING_EXAMPLE_DATA);
  const [current, send] = useMachine(paymentMachine);

  const sendData = () => {
    const json = JSON.parse(data);
    send({
      type: "SAVE_BOOKING",
      data: json
    });
  };
  console.log("current state", current);
  return (
    <div className="App">
      <div>Current state: {current.value}</div>
      <textarea
        rows="20"
        cols="100"
        value={data}
        onChange={ev => setData(ev.target.value)}
      ></textarea>
      <br />
      <button onClick={sendData}>Send data</button>
    </div>
  );
}

export default App;
