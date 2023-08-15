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
import { useRefreshTokenMutation } from "./redux/apis/apiUser";
function App() {
  // const [refreshToken] = useRefreshTokenMutation();
  // refreshToken().then((res) => {
  //   console.log(res);
  // });
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // axios.post(
    //   `http://localhost:3000/auth/refreshtoken`,
    //   null,

    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     withCredentials: true,
    //   }
    // );
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
