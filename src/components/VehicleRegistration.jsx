import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

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
      const carModels = Array.isArray(selectedCustomer.carModels)
        ? selectedCustomer.carModels
        : []; // Ensure it's an array
      const plates = carModels.map((car) => car.plateNo);
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
      setTimeout(() => navigate("/list-of-Vehicle"), 2000); // Ensure the path is correct
    } catch (err) {
      console.error(
        "Error Details:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to register vehicle.");
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Form Card */}
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                  Repair Registration
                </h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && (
                  <div className="text-green-500 mb-4">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Customer Selection */}
                  <div className="mb-6">
                    <label
                      htmlFor="customer_id"
                      className="block text-gray-700"
                    >
                      Customer/ደንበኛ
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
                    <label
                      htmlFor="plate_number"
                      className="block text-gray-700"
                    >
                      Plate Number/ታርጋ ቁጥር
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
                      Chasis Number/የቻሲ ቁጥር
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
                      Tin Number/ቲን ቁጥር
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
                      Date In/የገባበት ቀን
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
                      Estimated Date/የሚያልቅበት ቀን
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
                      Kilometer Reading (KM)/ኪሎሜትር
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
                    <label className="block text-gray-700">
                      Job Categorey/የ ስራ አይነት
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "General Service  ",
                        "Body",
                        "Mechanichal",
                        "Electrical",
                        "Diagonistic",
                      ].map((job) => (
                        <label
                          key={job}
                          className="flex items-center space-x-2"
                        >
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
                  {/* Vehicle Conditions */}
                  <div className="mb-6">
                    <label className="block text-gray-700">
                      Car Conditions/የተሽከርካሪ ሁኔታ
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["New", "Average", "Used", "Damage"].map((condition) => (
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
                  {/* Job to be done  */}
                  <div className="mb-6">
                    <label
                      htmlFor="job_to_be_done"
                      className="block text-gray-700"
                    >
                      Job to be done/ማለቅ ያለበት ቀን
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
                      Customer Observation/የ ደንበኛ እይታ
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
                      Additional Work/ተጨማሪ ስራ
                    </label>
                    <textarea
                      id="additional_work"
                      name="additional_work"
                      value={formData.additional_work}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>{" "}
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
                      Add Labour/ሰራተኛ ጨምር
                    </button>
                  </div>
                  {/* Spare  Data */}
                  <div className="mb-6">
                    <h3 className="font-semibold">Spare Data</h3>
                    {formData.spareData.map((spare, index) => (
                      <div key={index} className="flex items-center gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="item name"
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
                          type="text"
                          placeholder="part number"
                          value={spare.part_num}
                          onChange={(e) =>
                            handleArrayChange(
                              "spareData",
                              index,
                              "part_num",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Brand"
                          value={spare.spareData}
                          onChange={(e) =>
                            handleArrayChange(
                              "spareData",
                              index,
                              "Brand",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Qty"
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
                      Add Spare/መለዋወጫ ጨምር
                    </button>
                  </div>
                  {/* Out Source  */}
                  <div className="mb-6">
                    <h3 className="font-semibold">OutSource/የዉጪ ምንጭ</h3>
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
                          type="text"
                          placeholder="Type"
                          value={outsource.type}
                          onChange={(e) =>
                            handleArrayChange(
                              "outsource",
                              index,
                              "type",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="unit Price"
                          value={outsource.unit_price}
                          onChange={(e) =>
                            handleArrayChange(
                              "outsource",
                              index,
                              "unit_price",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Total Price"
                          value={outsource.tot_price}
                          onChange={(e) =>
                            handleArrayChange(
                              "outsource",
                              index,
                              "tot_price",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Remark"
                          value={outsource.remark}
                          onChange={(e) =>
                            handleArrayChange(
                              "outsource",
                              index,
                              "remark",
                              e.target.value
                            )
                          }
                          className="w-32 p-3 border border-gray-300 rounded-md"
                        />

                        <input
                          type="number"
                          placeholder="Total Ammount"
                          value={outsource.tot_ammount}
                          onChange={(e) =>
                            handleArrayChange(
                              "outsource",
                              index,
                              "tot_ammount",
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
                      Add Outsource/የዉጪ ምንጭ ጨምር
                    </button>
                  </div>
                  {/* Lubricant */}
                  <div className="mb-6">
                    <h3 className="font-semibold">Lubricant</h3>
                    {formData.lubricant.map((lubricant, index) => (
                      <div key={index} className="flex items-center gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Item Name"
                          value={lubricant.item_name}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "item_name",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Type"
                          value={lubricant.Type}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "Type",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Brand"
                          value={lubricant.brand}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "brand",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Unit"
                          value={lubricant.unit}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "unit",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Qty"
                          value={lubricant.qty}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "qty",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="unit price"
                          value={lubricant.uni_price}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "uni_price",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Total Price "
                          value={lubricant.tot_price}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "tot_price",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Remark"
                          value={lubricant.remark}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "remark",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Total Amaount"
                          value={lubricant.tot_amount}
                          onChange={(e) =>
                            handleArrayChange(
                              "lubricant",
                              index,
                              "tot_amount",
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
                      Add Lubricant/ዘይት ጨምር
                    </button>
                  </div>
                  {/* Price Estimation */}
                  <div className="mb-6">
                    <label
                      htmlFor="price_estimation"
                      className="block text-gray-700"
                    >
                      Price Estimation/የዋጋ ግምት
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
                    <label
                      htmlFor="recieved_by"
                      className="block text-gray-700"
                    >
                      Recieved By/ተቀባይ
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
                      Register/ መዝግብ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VehicleRegistration;
