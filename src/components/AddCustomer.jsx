import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    car_model: "",
    tin_no: "",
    plate_no: "",
    chassis_no: "",
    date_in: "",
    km: "",
  });

  const navigate = useNavigate(); // For navigation after submission
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", formData);
      alert("Customer added successfully!");
      navigate("/list-of-customer"); // Navigate back to the customer list page
    } catch (error) {
      console.error(error);
      alert("Failed to add customer.");
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                  Add Customer
                </h2>
                {[
                  "name",
                  "telephone",
                  "car_model",
                  "tin_no",
                  "plate_no",
                  "chassis_no",
                  "date_in",
                  "km",
                ].map((field) => (
                  <div key={field} className="mb-4">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      id={field}
                      type={field === "date_in" ? "date" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                  Add Customer
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCustomer;
