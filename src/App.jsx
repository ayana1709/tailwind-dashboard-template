import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

// import MultiStepForm from "./components/MultiStepForm";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";
import CustomerInformation from "./components/CustomerInformation";
import ConditionOfVehicle from "./components/ConditionOfVehicle";
import VehicleRegistration from "./components/VehicleRegistration";
// import TypeOfJob from "./components/TypeOfJob";
import EditCustomer from "./components/EditCustomer";
import JobOrderList from "./components/JobOrderList";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeList from "./components/EmployeeList";
import AddToWorkOrder from "./components/AddToWorkOrder";
import WorkOrderList from "./components/WorkOrderList";
import TypesOfJobs from "./components/TypesOfJobs";
import AddBolo from "./components/AddBolo";
import AddWheelAlignment from "./components/AddWheelAlignment";
import AddInspection from "./components/AddInspection";
import BoloList from "./components/BoloList";
import InspectionList from "./components/InspectionList";
import WheelAlignemntList from "./components/WheelAlignemntList";
import VehicleDetails from "./components/VehicleDetails";
import RepairRegistrationForm from "./components/RepairRegistrationForm";

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
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/job-card-service" element={<MultiStepForm />} /> */}
        <Route path="/customers" element={<AddCustomer />} />
        <Route path="/list-of-customer" element={<CustomerList />} />
        <Route path="/list-of-Vehicle" element={<JobOrderList />} />
        {/* <Route path="/step-1" element={<VehicleRegistration />} /> */}
        <Route path="/step-1" element={<RepairRegistrationForm />} />

        <Route path="/vehicle-details" element={<VehicleDetails />} />
        {/* <Route path="/step-2" element={<TypeOfJob />} /> */}
        {/* <Route path="/edit-customer/:id" element={<EditCustomer />} /> */}
        {/* <Route path="/edit-customer/:customerId" element={<EditCustomer />} /> */}
        <Route path="/edit-customer/:id" element={<EditCustomer />} />

        <Route path="/employees" element={<EmployeeRegistration />} />
        <Route path="/employees-list" element={<EmployeeList />} />
        <Route path="/add-to-work-order" element={<AddToWorkOrder />} />
        <Route path="/work-order-list" element={<WorkOrderList />} />
        <Route path="/types-of-jobs" element={<TypesOfJobs />} />
        <Route path="/bolo" element={<AddBolo />} />
        <Route path="/bolo-list" element={<BoloList />} />

        <Route path="/inspection" element={<AddInspection />} />
        <Route path="/inspection-list" element={<InspectionList />} />

        <Route path="/wheel-alignment" element={<AddWheelAlignment />} />
        <Route path="/wheel-alignment-list" element={<WheelAlignemntList />} />
      </Routes>
    </>
  );
}

export default App;
