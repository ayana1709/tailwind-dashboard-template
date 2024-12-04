import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

import MultiStepForm from "./components/MultiStepForm";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";
import CustomerInformation from "./components/CustomerInformation";
import ConditionOfVehicle from "./components/ConditionOfVehicle";
import VehicleRegistration from "./components/VehicleRegistration";
import TypeOfJob from "./components/TypeOfJob";
import EditCustomer from "./components/EditCustomer";
import JobOrderList from "./components/JobOrderList";

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

        <Route path="/customers" element={<AddCustomer />} />
        <Route path="/list-of-customer" element={<CustomerList />} />
        <Route path="/list-of-Vehicle" element={<JobOrderList />} />

        <Route path="/step-1" element={<VehicleRegistration />} />
        <Route path="/step-2" element={<TypeOfJob />} />

        {/* <Route path="/edit-customer/:id" element={<EditCustomer />} /> */}
        <Route path="/edit-customer/:customerId" element={<EditCustomer />} />
      </Routes>
    </>
  );
}

export default App;
