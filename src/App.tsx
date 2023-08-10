import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
// import axiosInstance from "./shared/services/http-clients";
import axios from "axios";
import { API } from "./shared/Constants/Constants";
import { useGetUserQuery } from "./redux/apis/apiUser";
function App() {
  const { data } = useGetUserQuery("Name");
  const data1 = {
    identifier: "super.admin@grr.la",
    password: "Super@admin1",
  };

  useEffect(() => {
    // axios.get(`http://localhost:3000/user`).then((res) => {
    //   console.log(res, "data");
    // });
    // axios
    //   .post(
    //     `http://localhost:3000/auth/signin`,
    //     {
    //       email: "admin@gmail.com",
    //       password: "Hieu12345",
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    console.log(123, data);
  }, []);
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
