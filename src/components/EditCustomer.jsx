import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const EditCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    car_model: [], // Holds car model objects
  });
  const navigate = useNavigate(); // For navigation after submission
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { customerId } = useParams(); // Get customerId from URL params

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(`/customers/${customerId}`);

        setFormData({
          name: response.data.name,
          telephone: response.data.telephone,
          car_model: response.data.car_model || [], // Ensure car_model is an array
        });
      } catch (error) {
        console.error("Error fetching customer data:", error); // Log the error
        alert(`Failed to load customer data. Error: ${error.message}`);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  // Handle individual input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in dynamic array fields (cars)
  const handleArrayChange = (arrayName, index, key, value) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][key] = value;
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  // Add a new row to the dynamic array (add new car)
  const handleAddRow = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { car_model: "", plate_no: "" }],
    }));
  };

  // Remove a specific row from the dynamic array (remove car)
  const handleRemoveRow = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  // Handle form submission (update customer)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${customerId}`, formData); // PUT request to update
      alert("Customer updated successfully!");
      navigate("/list-of-customer"); // Navigate back to the customer list page
    } catch (error) {
      console.error(error);
      alert("Failed to update customer.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-6 py-0 w-full max-w-9xl mx-auto">
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                  Edit Customer/ደንበኛ አስተካክል
                </h2>
                {/* Input fields for name and telephone */}
                {["name", "telephone"].map((field) => (
                  <div key={field} className="mb-4">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                ))}
                {/* Car model dynamic fields */}
                <div className="mb-6">
                  <h3 className="font-semibold">Vehicles</h3>
                  {formData.car_model.map((car_model, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Car Model"
                        value={car_model.car_model}
                        onChange={(e) =>
                          handleArrayChange(
                            "car_model",
                            index,
                            "car_model",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Plate Number"
                        value={car_model.plate_no}
                        onChange={(e) =>
                          handleArrayChange(
                            "car_model",
                            index,
                            "plate_no",
                            e.target.value
                          )
                        }
                        className="w-32 p-3 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRow("car_model", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRow("car_model")}
                    className="text-blue-500"
                  >
                    Add Car/መኪና ጨምር
                  </button>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                  Update Customer/ደንበኛ ለዉጥ
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCustomer;
