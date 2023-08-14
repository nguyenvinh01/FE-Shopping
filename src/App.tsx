import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { API } from "./shared/Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setUser } from "./redux/slice/userSlice";
function App() {
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
