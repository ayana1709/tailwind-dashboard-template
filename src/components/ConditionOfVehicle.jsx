import React, { useState, useEffect } from "react";
import api from "../api";

const ConditionOfVehicle = () => {
  const [formData, setFormData] = useState({
    customer: "",
    plateNumber: "",
    vehicleCondition: {},
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicleConditions = [
    { id: "engine", label: "Engine" },
    { id: "tires", label: "Tires" },
    { id: "brakes", label: "Brakes" },
    // Add more conditions as needed
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/custom");
        if (response.data && Array.isArray(response.data.data)) {
          setCustomers(response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Invalid data format from API.");
        }
      } catch (err) {
        console.error("Error fetching customers:", err.message);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        vehicleCondition: {
          ...prevState.vehicleCondition,
          [name]: checked,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form
  const validateForm = () => {
    return formData.customer && formData.plateNumber;
  };

  // Handle the "Next" button click
  const handleNext = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/condition-of-vehicle", {
        customer_id: formData.customer,
        plate_number: formData.plateNumber,
        vehicle_condition: formData.vehicleCondition,
      });

      console.log(response.data.message); // Success message
      onNext(formData); // Move to the next step
    } catch (err) {
      console.error("Error saving condition of vehicle:", err);
      alert("Failed to save the data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Condition of Vehicle / የተሽከርካሪ ሁኔታ
      </h2>

      <form>
        {/* Customer Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="customer"
            className="block text-sm font-medium text-gray-700"
          >
            Select Customer
          </label>
          {loading ? (
            <p className="text-gray-500">Loading customers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <select
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.car_model || "N/A"}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Plate Number */}
        <div className="mb-4">
          <label
            htmlFor="plateNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Plate Number
          </label>
          <input
            type="text"
            id="plateNumber"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            placeholder="Enter plate number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Vehicle Condition */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Condition
          </label>
          {vehicleConditions.map((condition) => (
            <div className="flex items-center mb-2" key={condition.id}>
              <input
                type="checkbox"
                id={condition.id}
                name={condition.id}
                checked={formData.vehicleCondition[condition.id] || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={condition.id}
                className="ml-2 text-sm text-gray-700"
              >
                {condition.label}
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            disabled={!validateForm() || isSubmitting}
            className={`px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting
                ? "bg-gray-400 text-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConditionOfVehicle;
