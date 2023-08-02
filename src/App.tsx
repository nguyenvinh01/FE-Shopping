import React from "react";
import { AppRoute } from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <div className="content">
        <AppRoute />
      </div>
    </>
  );
}

export default App;
