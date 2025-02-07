import { useState } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../api";

export default function RepairRegistrationForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      plate_no: "",
      model: "",
      tin: "",
      year: "",
      condition: "",
      km_reading: "",
      estimated_price: "",
    },
  ]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_type: "",
    mobile: "",
    received_date: "",
    estimated_date: "",
    promise_date: "",
    priority: "",
    repair_category: [],
    customer_observations: "",
    spare_change: "",
    received_by: "",
  });

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        plate_no: "",
        model: "",
        vin: "",
        year: "",
        condition: "",
        km_reading: "",
        estimated_price: "",
      },
    ]);
  };

  const removeVehicle = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        repair_category: checked
          ? [...prevData.repair_category, value]
          : prevData.repair_category.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = vehicles.map((vehicle, i) =>
      i === index ? { ...vehicle, [name]: value } : vehicle
    );
    setVehicles(updatedVehicles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        repair_category: formData.repair_category.join(", "), // Convert array to string
        ...vehicles[0], // Assuming one vehicle for now (adjust if needed)
      };

      const response = await api.post("/repairs", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">Repair Registration Form</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Customer Details */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <div className="space-y-2">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <label>Customer Type</label>
                  <select
                    name="customer_type"
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Regular">Regular</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <label>Received Date</label>
                  <input
                    type="date"
                    name="received_date"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <label>E. Date</label>
                  <input
                    type="date"
                    name="estimated_date"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  <label>Promise Date</label>
                  <input
                    type="date"
                    name="promise_date"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  <label>Priority</label>
                  <select
                    name="priority"
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <label>Repair Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "General Service",
                      "Body",
                      "Mechanical",
                      "Electrical",
                      "Diagnostic",
                    ].map((category) => (
                      <label key={category}>
                        <input
                          type="checkbox"
                          name="repair_category"
                          value={category}
                          onChange={handleChange}
                        />{" "}
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Customer Observations, Spare Change, and Received By - Vertically Aligned */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Customer Observations
                    </h3>
                    <textarea
                      type="text"
                      name="customer_observations"
                      onChange={handleChange}
                      className="w-full border p-2 rounded h-20"
                    ></textarea>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Spare Change</h3>
                    <textarea
                      type="text"
                      name="spare_change"
                      onChange={handleChange}
                      className="w-full border p-2 rounded h-20"
                    ></textarea>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Received By</h3>
                    <input
                      type="text"
                      name="received_by"
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="col-span-1 text-right">
                <h3 className="font-semibold mb-2">Vehicle Details</h3>
                <button
                  type="button"
                  onClick={addVehicle}
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Add Vehicle +
                </button>

                {vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 border rounded-lg relative inline-block text-left"
                  >
                    <h4 className="font-semibold">Vehicle {index + 1}</h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeVehicle(index)}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        ✖
                      </button>
                    )}
                    {[
                      "plate_no",
                      "model",
                      "tin",
                      "year",
                      "km_reading",
                      "estimated_price",
                    ].map((field) => (
                      <div key={field}>
                        <label>{field.replace("_", " ").toUpperCase()}</label>
                        <input
                          type="text"
                          name={field}
                          value={vehicle[field]}
                          onChange={(e) => handleVehicleChange(index, e)}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                    ))}
                    <label>Condition</label>
                    <select
                      name="condition"
                      value={vehicle.condition}
                      onChange={(e) => handleVehicleChange(index, e)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Average">Average</option>
                      <option value="Damage">Damage</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-green-500 text-white p-2 w-full rounded"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
