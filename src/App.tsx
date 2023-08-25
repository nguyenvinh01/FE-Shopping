import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
import { API } from "./shared/Constants/Constants";

function App() {
  // useEffect(() => {
  //   const url = window.location.href;
  //   console.log(url);

  //   if (url.includes("http://localhost:3001/success")) {
  //   } else {
  //     console.log("not success");
  //   }
  // }, []);
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          const Layout = route.isHeader ? DefaultComponent : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
