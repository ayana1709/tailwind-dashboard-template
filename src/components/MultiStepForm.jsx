import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import ConditionOfVehicle from "./ConditionOfVehicle";
import TypeOfJob from "./TypeOfJob";
import CarImageWithForm from "./CarImageWithForm";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  // Collecting data for each step
  const [customerData, setCustomerData] = useState({});
  const [vehicleCondition, setVehicleCondition] = useState({});
  const [typeOfJob, setTypeOfJob] = useState({});
  const [carInspectionData, setCarInspectionData] = useState({});

  // Handlers for navigation and data updates
  const handleNextFromStep1 = (data) => {
    setCustomerData(data); // Save data from Step 1
    setStep(2); // Move to Step 2
  };

  const handlePreviousFromStep2 = () => setStep(1);

  const handleNextFromStep2 = (data) => {
    setVehicleCondition(data); // Save data from Step 2
    setStep(3); // Move to Step 3
  };

  const handlePreviousFromStep3 = () => setStep(2);

  const handleNextFromStep3 = (data) => {
    setTypeOfJob(data); // Save data from Step 3
    setStep(4); // Move to Step 4
  };

  const handlePreviousFromStep4 = () => setStep(3);

  const handleNextFromStep4 = (data) => {
    setCarInspectionData(data); // Save data from Step 4
    console.log("Car Inspection Data:", data);
    // Proceed to next step or save data
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800">
              Job Service Card / የመኪና መረከቢያ ካርድ
            </h1>
          </div>

          {/* Form Steps */}
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
            {step === 4 && (
              <CarImageWithForm
                onPrevious={handlePreviousFromStep4}
                onNext={handleNextFromStep4}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiStepForm;
