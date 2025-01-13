import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

const EditCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the route
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    customerType: "",
    telephone: "",
    carModels: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get(`/customers/${id}`);
        setFormData(response.data || {});
      } catch (error) {
        console.error("Error fetching customer data:", error);
        alert("Failed to load customer details.");
      } finally {
        setLoading(false); // Hide the loader
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading)
    return (
      <div>
        {" "}
        <Loading />
      </div>
    ); // Show a loading message or spinner

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, key, value) => {
    const updatedArray = [...formData.carModels];
    updatedArray[index][key] = value;
    setFormData((prev) => ({ ...prev, carModels: updatedArray }));
  };

  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      carModels: [...prev.carModels, { carModel: "", plateNo: "" }],
    }));
  };

  const handleRemoveRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      carModels: prev.carModels.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${id}`, formData); // Update customer data
      alert("Customer updated successfully!");
      navigate("/types-of-jobs"); // Navigate back to the list page
    } catch (error) {
      console.error("Error updating customer:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update customer. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow flex justify-center items-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              Edit Customer/ደንበኛ አስተካክል
            </h2>

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

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
            >
              Update Customer/ደንበኛ አስተካክል
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditCustomer;
