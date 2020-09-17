import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { shellAdd, shellSubtract, useEventListener } from "./IframeService";

function App() {
  const [count, setCount] = useState(1);

  const handler = useCallback(
    ({ origin, data }) => {
      if (origin !== "http://localhost:4000") {
        return;
      }
      if (data.event === "add") {
        setCount(count + 1);
      }
      if (data.event === "subtract") {
        setCount(count - 1);
      }
    },
    [count, setCount]
  );

  useEventListener(handler);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Counter: {count}</h3>
        <div className="App-buttons">
          <button onClick={() => shellAdd()}>Shell Add</button>
          <button onClick={() => shellSubtract()}>Shell Subtract</button>
          <button onClick={() => setCount(count + 1)}>Local Add</button>
          <button onClick={() => setCount(count - 1)}>Local Subtract</button>
        </div>
      </header>
    </div>
  );
}

export default App;
