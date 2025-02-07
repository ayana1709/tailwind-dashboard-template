import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../api";

export default function RepairRegistrationForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
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
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto my-4 p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl text-center font-bold mb-4">
              Repair Registration Form
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {/* Customer Details */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-4">Customer Details</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-gray-600 ">Customer Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      onChange={handleChange}
                      placeholder="የደንበኛው ስም"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Customer Type</label>
                    <select className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200">
                      <option className="" value="regular">
                        Regular
                      </option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      onChange={handleChange}
                      placeholder="የደንበኛው ስልክ ቁጥር"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">
                      Received Date/የተቀበሉበት ቀን
                    </label>
                    <input
                      type="date"
                      name="received_date"
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">E. Date/የሚወስደው ቀን</label>
                    <input
                      type="date"
                      name="estimated_date"
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">
                      Promise Date/የመዉጫ ቀን
                    </label>
                    <input
                      type="date"
                      name="promise_date"
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Priority</label>
                    <input
                      type="text"
                      name="priority"
                      onChange={handleChange}
                      placeholder="ቅድሚያ የሚሰጠው"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>

                  <div className="p-4 shadow-sm border-2 hover:border-blue-500 rounded-md transition duration-300">
                    <label className="block text-gray-600 pb-4">
                      Repair Category
                    </label>
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
                  <div className="flex flex-col gap-4">
                    <div className="p-4 border rounded-lg border-2 hover:border-blue-500">
                      <h3 className="font-semibold mb-2">
                        Customer Observations
                      </h3>
                      <textarea
                        type="text"
                        name="customer_observations"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:border-3 focus:ring-0 p-2 rounded h-20"
                      ></textarea>
                    </div>
                    <div className="p-4 border rounded-lg border-2 hover:border-blue-500">
                      <h3 className="font-semibold mb-2">Spare Change</h3>
                      <textarea
                        type="text"
                        name="spare_change"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:border-3 focus:ring-0 p-2 rounded h-20"
                      ></textarea>
                    </div>
                    <div className="p-4 border rounded-lg border-2 hover:border-blue-500">
                      <h3 className="font-semibold mb-2">Received By</h3>
                      <input
                        type="text"
                        name="received_by"
                        onChange={handleChange}
                        className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="w-full">
                <h3 className="font-semibold mb-4">Vehicle Details</h3>
                <div className="w-full">
                  <button
                    onClick={addVehicle}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                  >
                    Add Vehicle +
                  </button>
                </div>
                <div className="w-full">
                  {vehicles.map((_, index) => (
                    <div
                      key={index}
                      className="w-full mt-4 flex flex-col gap-4 p-4 border rounded-lg relative inline-block text-left"
                    >
                      <h4 className="font-semibold">Vehicle {index + 1}</h4>
                      {index > 0 && (
                        <button
                          onClick={() => removeVehicle(index)}
                          className="absolute top-2 right-2 text-red-500"
                        >
                          ✖
                        </button>
                      )}
                      <div>
                        <label className="text-gray-600">Plate No</label>
                        <input
                          type="text"
                          name="plate_no"
                          onChange={handleChange}
                          placeholder="ታርጋ ቁጥር"
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600">Model</label>
                        <input
                          type="text"
                          name="model"
                          onChange={handleChange}
                          placeholder="ሞደል"
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600">TIN Number</label>
                        <input
                          type="text"
                          name="vin"
                          onChange={handleChange}
                          placeholder="TIN"
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600">Year</label>
                        <input
                          type="text"
                          name="year"
                          onChange={handleChange}
                          placeholder="ዓመት"
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>

                      <div className="p-4 border rounded-md shadow-sm border-2 hover:border-blue-500">
                        <label>Condition</label>
                        <select
                          name="condition"
                          value={vehicles.condition}
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

                      <div>
                        <label className="text-gray-600">KM Reading</label>
                        <input
                          type="text"
                          name="km_reading"
                          onChange={handleChange}
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600">E. Price</label>
                        <input
                          type="text"
                          name="estimated_price"
                          onChange={handleChange}
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 text-center">
              <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300 shadow-md shadow-gray-500/90 focus:shadow-sm">
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
