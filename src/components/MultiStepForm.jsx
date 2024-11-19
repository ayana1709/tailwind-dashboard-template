import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import ConditionOfVehicle from "./ConditionOfVehicle";
import TypeOfJob from "./TypeOfJob";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState({});
  const [vehicleCondition, setVehicleCondition] = useState({});
  const [typeOfJob, setTypeOfJob] = useState({});

  const handleNextFromStep1 = (data) => {
    setCustomerData(data);
    setStep(2);
  };

  const handlePreviousFromStep2 = () => {
    setStep(1);
  };

  const handleNextFromStep2 = (data) => {
    setVehicleCondition(data);
    console.log("Customer Data:", customerData);
    console.log("Vehicle Condition:", vehicleCondition);
    // Proceed to the next step or save the data
  };
  const handlePreviousFromStep3 = () => {
    setStep(2);
  };

  const handleNextFromStep3 = (data) => {
    setTypeOfJob(data);

    // Proceed to the next step or save the data
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            Job Service Card / የመኪና መረከቢያ ካርድ
          </div>
          <div className="min-h-screen bg-gray-100 p-4">
            {step === 1 && <CustomerInformation onNext={handleNextFromStep1} />}
            {step === 2 && (
              <ConditionOfVehicle
                onPrevious={handlePreviousFromStep2}
                onNext={handleNextFromStep2}
              />
            )}
            {step === 3 && (
              <TypeOfJob
                onPrevious={handlePreviousFromStep3}
                onNext={handleNextFromStep3}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiStepForm;
