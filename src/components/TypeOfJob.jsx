import React, { useState } from "react";

const TypeOfJob = ({ onPrevious, onNext }) => {
  const [formData, setFormData] = useState({
    customerObservation: "",
    jobToBeDone: "",
    additionalWork: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Type of Job</h2>
      <form>
        <div className="space-y-4">
          {/* Customer Observation */}
          <div>
            <label
              htmlFor="customerObservation"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Observation
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

          {/* Job to be Done */}
          <div>
            <label
              htmlFor="jobToBeDone"
              className="block text-sm font-medium text-gray-700"
            >
              Job to be Done
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

          {/* Additional Work */}
          <div>
            <label
              htmlFor="additionalWork"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Work
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

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Previous Page
          </button>
          <button
            type="button"
            onClick={handleNext}
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
