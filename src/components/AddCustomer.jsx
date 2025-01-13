import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    customerType: "", // Holds the customer type
    telephone: "",
    carModels: [], // Holds car model objects
  });

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle individual input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in dynamic array fields
  const handleArrayChange = (index, key, value) => {
    const updatedArray = [...formData.carModels];
    updatedArray[index][key] = value;
    setFormData((prev) => ({ ...prev, carModels: updatedArray }));
  };

  // Add a new row to the dynamic array
  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      carModels: [...prev.carModels, { carModel: "", plateNo: "" }],
    }));
  };

  // Remove a specific row from the dynamic array
  const handleRemoveRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      carModels: prev.carModels.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to the server with form data
      await api.post("/customers", formData);

      // Display success alert to the user
      alert("Customer added successfully!");

      // Navigate to the customer list page
      navigate("/types-of-jobs");
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error adding customer:", error);

      // Display a more informative error message to the user
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add customer. Please try again.";

      alert(errorMessage);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow flex justify-center items-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              Add Customer/ደንበኛ ይመዝግቡ
            </h2>

            {/* Input fields for name and telephone */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name/ሙሉ ስም
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="customerType"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Type
              </label>
              <select
                id="customerType"
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                required
              >
                <option value="">Select</option>
                <option value="regular">Regular</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700"
              >
                Telephone/ስልክ
              </label>
              <input
                id="telephone"
                name="telephone"
                type="text"
                value={formData.telephone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Car models dynamic fields */}
            <div className="mb-6">
              <h3 className="font-semibold">Vehicles/ተሽከርካሪ</h3>
              {formData.carModels.map((car, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Car Model"
                    value={car.carModel}
                    onChange={(e) =>
                      handleArrayChange(index, "carModel", e.target.value)
                    }
                    className="w-full p-3 border rounded-md focus:ring focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Plate Number"
                    value={car.plateNo}
                    onChange={(e) =>
                      handleArrayChange(index, "plateNo", e.target.value)
                    }
                    className="w-32 p-3 border rounded-md focus:ring focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddRow}
                className="text-blue-500 hover:text-blue-700"
              >
                Add Car/መኪና መዝግብ
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
            >
              Add Customer/ደንበኛ መዝግብ
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddCustomer;
