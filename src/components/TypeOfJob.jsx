import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const TypeOfJob = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // State to hold form data
  const [formData, setFormData] = useState({
    customerObservation: "",
    jobToBeDone: "",
    additionalWork: "",
  });

  // Loading and error states for API calls
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle "Next" button click (Save data and move to the next step)
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/jobs", formData);
      setSuccess(response.data.message);
      navigate("/step-3");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to register types of jobs."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Type of Job</h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Customer Observation */}

        <div>
          <div>
            <label
              htmlFor="customerObservation"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Observation/የሥራ ዓይነት
            </label>
            <textarea
              id="customerObservation"
              name="customerObservation"
              value={formData.customerObservation}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter customer observations..."
            />
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="jobToBeDone"
              className="block text-sm font-medium text-gray-700"
            >
              Job to be Done/መጠናቀቅ ያለበት ሥራ
            </label>
            <textarea
              id="jobToBeDone"
              name="jobToBeDone"
              value={formData.jobToBeDone}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the job to be done..."
            />
          </div>
        </div>

        {/* Step 3: Additional Work */}

        <div>
          <div>
            <label
              htmlFor="additionalWork"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Work/ተጨማሪ ሥራ
            </label>
            <textarea
              id="additionalWork"
              name="additionalWork"
              value={formData.additionalWork}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter additional work details..."
            />
          </div>
        </div>

        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default TypeOfJob;
