import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

import MultiStepForm from "./components/MultiStepForm";

function App() {
  const location = useLocation();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            !admin ? <Login onLogin={setAdmin} /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/job-card-service" element={<MultiStepForm />} />
      </Routes>
    </>
  );
}

export default App;
