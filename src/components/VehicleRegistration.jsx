import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const VehicleRegistration = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    plate_number: "",
    chasis_number: "",
    tin_number: "",
    date_in: "",
    promised_date: "",
    job_to_be_done: "",
    customer_observation: "",
    additional_work: "",
    vehicle_conditions: [],
    job_order: [],
    labourData: [],
    spareData: [],
    outsource: [],
    lubricant: [],
    price_estimation: "",
    km: "",
    recieved_by: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plateNumbers, setPlateNumbers] = useState([]);

  // Fetch customers on load
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/select-customer");
        setCustomers(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customers.");
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerChange = (customerId) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === parseInt(customerId)
    );

    if (selectedCustomer) {
      const carModels = Array.isArray(selectedCustomer.car_model)
        ? selectedCustomer.car_model
        : []; // Ensure it's an array
      const plates = carModels.map((car) => car.plate_no);
      setPlateNumbers(plates);
    } else {
      setPlateNumbers([]);
    }

    setFormData((prev) => ({
      ...prev,
      customer_id: customerId,
      plate_number: "",
    }));
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes for arrays
  const handleCheckboxChange = (name, value) => {
    setFormData((prev) => {
      const isSelected = prev[name].includes(value);
      const updatedArray = isSelected
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value];
      return { ...prev, [name]: updatedArray };
    });
  };

  // Dynamic array handling
  const handleArrayChange = (arrayName, index, key, value) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][key] = value;
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddRow = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { description: "", price: "" }],
    }));
  };

  const handleRemoveRow = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await api.post("/vehicles", formData);
      setSuccess("Vehicle registered successfully!");
      setTimeout(() => navigate("/vehicle"), 2000); // Ensure the path is correct
    } catch (err) {
      console.error(
        "Error Details:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to register vehicle.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Vehicle Registration
              </h2>

              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Customer Selection */}
                <div className="mb-6">
                  <label htmlFor="customer_id" className="block text-gray-700">
                    Customer
                  </label>
                  <select
                    name="customer_id"
                    value={formData.customer_id}
                    onChange={(e) => {
                      handleChange(e);
                      handleCustomerChange(e.target.value); // Load plate numbers
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Plate Number Selection */}
                <div className="mb-6">
                  <label htmlFor="plate_number" className="block text-gray-700">
                    Plate Number
                  </label>
                  <select
                    name="plate_number"
                    value={formData.plate_number}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Plate Number</option>
                    {plateNumbers.map((plate, index) => (
                      <option key={index} value={plate}>
                        {plate}
                      </option>
                    ))}
                  </select>
                </div>
                {/* chasis No */}
                <div className="mb-6">
                  <label
                    htmlFor="chasis_number"
                    className="block text-gray-700"
                  >
                    Chasis Number
                  </label>
                  <input
                    type="text"
                    id="chasis_number"
                    name="chasis_number"
                    value={formData.chasis_number}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                    placeholder="Enter chasis number "
                  />
                </div>
                {/* Tin Number */}
                <div className="mb-6">
                  <label htmlFor="tin_number" className="block text-gray-700">
                    Tin Number
                  </label>
                  <input
                    type="text"
                    id="tin_number"
                    name="tin_number"
                    value={formData.tin_number}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                    placeholder="enter tin number "
                  />
                </div>
                {/* Date In  */}
                <div className="mb-6">
                  <label htmlFor="date_in" className="block text-gray-700">
                    Date In
                  </label>
                  <input
                    type="date"
                    id="date_in"
                    name="date_in"
                    value={formData.date_in}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                {/* Promised Date  */}
                <div className="mb-6">
                  <label
                    htmlFor="promised_date"
                    className="block text-gray-700"
                  >
                    Promised Date
                  </label>
                  <input
                    type="date"
                    id="promised_date"
                    name="promised_date"
                    value={formData.promised_date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                {/* KM */}
                <div className="mb-6">
                  <label htmlFor="km" className="block text-gray-700">
                    Kilometer Reading (KM)
                  </label>
                  <input
                    type="number"
                    id="km"
                    name="km"
                    value={formData.km}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter KM reading"
                    required
                  />
                </div>
                {/* Job Orders */}
                <div className="mb-6">
                  <label className="block text-gray-700">Job Order</label>
                  <div className="flex flex-wrap gap-4">
                    {["Inspection", "Repair", "Maintenance"].map((job) => (
                      <label key={job} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={job}
                          checked={formData.job_order.includes(job)}
                          onChange={(e) =>
                            handleCheckboxChange("job_order", e.target.value)
                          }
                          className="h-5 w-5"
                        />
                        <span>{job}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Job to be done  */}
                <div className="mb-6">
                  <label
                    htmlFor="job_to_be_done"
                    className="block text-gray-700"
                  >
                    Job to be done
                  </label>
                  <textarea
                    id="job_to_be_done"
                    name="job_to_be_done"
                    value={formData.job_to_be_done}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Observations */}
                <div className="mb-6">
                  <label
                    htmlFor="customer_observation"
                    className="block text-gray-700"
                  >
                    Customer Observation
                  </label>
                  <textarea
                    id="customer_observation"
                    name="customer_observation"
                    value={formData.customer_observation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Additional Work   */}
                <div className="mb-6">
                  <label
                    htmlFor="additional_work"
                    className="block text-gray-700"
                  >
                    Additional Work
                  </label>
                  <textarea
                    id="additional_work"
                    name="additional_work"
                    value={formData.additional_work}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>{" "}
                {/* Vehicle Conditions */}
                <div className="mb-6">
                  <label className="block text-gray-700">
                    Vehicle Conditions
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Good", "Average", "Poor"].map((condition) => (
                      <label
                        key={condition}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={condition}
                          checked={formData.vehicle_conditions.includes(
                            condition
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "vehicle_conditions",
                              e.target.value
                            )
                          }
                          className="h-5 w-5"
                        />
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Labour Data */}
                <div className="mb-6">
                  <h3 className="font-semibold">Labour Data</h3>
                  {formData.labourData.map((labour, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Description"
                        value={labour.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "labourData",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={labour.price}
                        onChange={(e) =>
                          handleArrayChange(
                            "labourData",
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-32 p-3 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRow("labourData", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRow("labourData")}
                    className="text-blue-500"
                  >
                    Add Labour
                  </button>
                </div>
                {/* Spare  Data */}
                <div className="mb-6">
                  <h3 className="font-semibold">Spare Data</h3>
                  {formData.spareData.map((spare, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Description"
                        value={spare.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "spareData",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={spare.price}
                        onChange={(e) =>
                          handleArrayChange(
                            "spareData",
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-32 p-3 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRow("spareData", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRow("spareData")}
                    className="text-blue-500"
                  >
                    Add Spare
                  </button>
                </div>
                {/* Out Source  */}
                <div className="mb-6">
                  <h3 className="font-semibold">OutSource</h3>
                  {formData.outsource.map((outsource, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Description"
                        value={outsource.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "outsource",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={outsource.price}
                        onChange={(e) =>
                          handleArrayChange(
                            "outsource",
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-32 p-3 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRow("outsource", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRow("outsource")}
                    className="text-blue-500"
                  >
                    Add Outsource
                  </button>
                </div>
                {/* Lubricant */}
                <div className="mb-6">
                  <h3 className="font-semibold">Lubricant</h3>
                  {formData.lubricant.map((lubricant, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Description"
                        value={lubricant.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "lubricant",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={lubricant.price}
                        onChange={(e) =>
                          handleArrayChange(
                            "lubricant",
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-32 p-3 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRow("lubricant", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRow("lubricant")}
                    className="text-blue-500"
                  >
                    Add Lubricant
                  </button>
                </div>
                {/* Price Estimation */}
                <div className="mb-6">
                  <label
                    htmlFor="price_estimation"
                    className="block text-gray-700"
                  >
                    Price Estimation
                  </label>
                  <input
                    type="number"
                    id="price_estimation"
                    name="price_estimation"
                    value={formData.price_estimation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Estimated price"
                  />
                </div>
                {/* Recieved By */}
                <div className="mb-6">
                  <label htmlFor="recieved_by" className="block text-gray-700">
                    Recieved By
                  </label>
                  <input
                    type="text"
                    id="recieved_by"
                    name="recieved_by"
                    value={formData.recieved_by}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Recieved by"
                  />
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
                  >
                    Register Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VehicleRegistration;
