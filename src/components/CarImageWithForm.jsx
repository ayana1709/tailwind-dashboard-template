import React, { useState } from "react";
import carimage from "../images/cr3.jpg";

const CarImageWithForm = ({ onPrevious, onNext }) => {
  const [formData, setFormData] = useState({
    rOrder: "",
    front: "",
    rear: "",
    leftSide: "",
    rightSide: "",
    door: "",
    interior: "",
    tools: "",
  });
  // Update form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Step 4 Data:", formData);
    onNext(formData); // Pass data to the parent component
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Car inspection data/ የመኪና ፍተሻ መረጃ
      </h2>

      {/* Car Image Section */}
      <div className="mb-6 flex justify-center items-center">
        <div className="relative rounded-lg overflow-hidden">
          {/* Placeholder car image */}
          <img
            src={carimage}
            alt="Car Diagram"
            className="w-auto h-auto object-contain" // Let the image size determine the size of the container
          />
        </div>
      </div>

      {/* Fillable Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "R Order", name: "rOrder" },
            { label: "Front/ፊት", name: "front" },
            { label: "Rear/የኋላ", name: "rear" },
            { label: "Left Side/በግራ በኩል", name: "leftSide" },
            { label: "Right Side/የቀኝ ጎን", name: "rightSide" },
            { label: "Door/በር", name: "door" },
            { label: "Interior/የውስጥ", name: "interior" },
            { label: "Tools/መሳሪያዎች", name: "tools" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={`Enter notes for ${label}`}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarImageWithForm;
