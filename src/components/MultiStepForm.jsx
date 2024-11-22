import React, { useState } from "react";
import CustomerInformation from "./CustomerInformation";
import ConditionOfVehicle from "./ConditionOfVehicle";
import TypeOfJob from "./TypeOfJob";
import CarImageWithForm from "./CarImageWithForm";
import ReviewStep from "./ReviewStep";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  // Collecting data for each step
  const [vehicleCondition, setVehicleCondition] = useState({});
  const [typeOfJob, setTypeOfJob] = useState({});
  const [carInspectionData, setCarInspectionData] = useState({});
  const [reviewStep, setReviewStep] = useState({});

  // Handler for final submission
  const handleFinalSubmit = async () => {
    const finalData = {
      vehicleCondition,
      typeOfJob,
      carInspectionData,
      reviewStep,
    };

    try {
      const response = await fetch("/api/job-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        // Optionally reset the form or navigate to a success page
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Navigation Handlers
  const handleNext = (step, data) => {
    if (step === 1) setVehicleCondition(data);
    if (step === 2) setTypeOfJob(data);
    if (step === 3) setCarInspectionData(data);

    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
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
            {step === 1 && (
              <ConditionOfVehicle
                onNext={(data) => handleNext(1, data)}
                initialData={vehicleCondition} // Pass saved data for editing
              />
            )}
            {step === 2 && (
              <TypeOfJob
                onPrevious={handlePrevious}
                onNext={(data) => handleNext(2, data)}
                initialData={typeOfJob} // Pass saved data for editing
              />
            )}
            {step === 3 && (
              <CarImageWithForm
                onPrevious={handlePrevious}
                onNext={(data) => handleNext(3, data)}
                initialData={carInspectionData} // Pass saved data for editing
              />
            )}
            {step === 4 && (
              <ReviewStep
                onPrevious={handlePrevious}
                onNext={handleFinalSubmit} // Final submission
                initialData={reviewStep} // Pass saved data for editing
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiStepForm;
