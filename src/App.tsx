import React, { Fragment } from "react";
// import { AppRoute } from "./routes";
import { HeaderCompoment } from "./components/Header/HeaderCompoment";
import { FooterComponent } from "./components/Footer/FooterComponent";
import "./App.css";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { DashboardUser } from "./pages/DashboardUser/DashboardUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
function App() {
  return (
    // <div className="App">
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
    // </div>
  );
}

export default App;
