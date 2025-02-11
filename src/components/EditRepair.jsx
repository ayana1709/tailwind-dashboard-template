import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRepair() {
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

  const { id } = useParams(); // Assuming you're using React Router v6 and the ID is part of the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const response = await api.get(`/repairs/${id}`);
        console.log("Fetched Data:", response.data); // Log response

        const data = response.data;

        if (!data) {
          throw new Error("No data received");
        }

        setFormData({
          customer_name: data.customer_name || "",
          customer_type: data.customer_type || "",
          mobile: data.mobile || "",
          received_date: data.received_date || "",
          estimated_date: data.estimated_date || "",
          promise_date: data.promise_date || "",
          priority: data.priority || "",
          repair_category: data.repair_category
            ? data.repair_category.split(", ")
            : [],
          customer_observations: data.customer_observations || "",
          spare_change: data.spare_change || "",
          received_by: data.received_by || "",
        });

        setVehicles([
          {
            plate_no: data.plate_no || "",
            model: data.model || "",
            tin: data.tin || "",
            year: data.year || "",
            condition: data.condition || "",
            km_reading: data.km_reading || "",
            estimated_price: data.estimated_price || "",
          },
        ]);
      } catch (error) {
        console.error(
          "Error fetching repair data:",
          error.response || error.message
        );
        alert("Failed to load repair data.");
      }
    };

    fetchRepairData();
  }, [id]);

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
      // Check if repair_category is an empty array
      if (formData.repair_category.length === 0) {
        alert("Please select at least one repair category.");
        return;
      }

      const payload = {
        ...formData,
        repair_category: formData.repair_category.join(", "), // Convert array to string
        ...vehicles[0], // Assuming one vehicle for now (adjust if needed)
      };

      const response = await api.put(`/repairs/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      setTimeout(() => navigate("/job-manager/repair"), 1000);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit form.");
    }
  };

  const placeholders = {
    plate_no: "plate_no",
    model: "model",
    tin: "tin",
    year: "year",
    condition: "condition",
    km_reading: "km_reading",
    estimated_price: "estimated_price",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow mt-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">
              Edit Repair Registration Form
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Customer Details */}
              <div className="col-span-1 border px-4 py-2 rounded-md">
                <h3 className="font-semibold mb-4 text-blue-700">
                  Customer Details
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="የደንበኛው ስም"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label>Customer Type</label>
                    <select
                      name="customer_type"
                      value={formData.customer_type}
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Regular">Regular</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <label>Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="ስልክ ቁጥር"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label>Received Date/የተቀበሉበት ቀን</label>
                    <input
                      type="date"
                      name="received_date"
                      value={formData.received_date}
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label>E. Date/የሚገመተው ቀን</label>
                    <input
                      type="date"
                      name="estimated_date"
                      value={formData.estimated_date}
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>
                  <div>
                    <label>Promise Date/የምያልቅበት ቀን</label>
                    <input
                      type="date"
                      name="promise_date"
                      value={formData.promise_date}
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>
                  <div>
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="border border-gray-300 hover:shadow-md hover:border-blue-500 p-3 py-4 rounded-md">
                    <label className="mb-2 block text-gray-700 font-semibold">
                      Repair Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Electrical", "Mechanical", "Cosmetic"].map(
                        (category) => (
                          <label
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              name="repair_category"
                              value={category}
                              checked={formData.repair_category.includes(
                                category
                              )}
                              onChange={handleChange}
                            />
                            <span>{category}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <label>Customer Observations</label>
                    <textarea
                      name="customer_observations"
                      value={formData.customer_observations}
                      onChange={handleChange}
                      placeholder="የደንበኛ እትም"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>
                  <div>
                    <label>Spare Change</label>
                    <input
                      type="text"
                      name="spare_change"
                      value={formData.spare_change}
                      onChange={handleChange}
                      placeholder="ማህተም"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>
                  <div>
                    <label>Received By</label>
                    <input
                      type="text"
                      name="received_by"
                      value={formData.received_by}
                      onChange={handleChange}
                      placeholder="የተቀበሉት ተቀባይ"
                      className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="col-span-1 border px-4 py-2 rounded-md">
                <h3 className="font-semibold mb-4 text-blue-700">
                  Vehicle Details
                </h3>
                <div className="flex flex-col gap-4">
                  {Object.entries(vehicles[0]).map(([key, value]) => (
                    <div key={key}>
                      <label>{placeholders[key]}</label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) => handleVehicleChange(0, e)}
                        placeholder={placeholders[key]}
                        className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/job-manager/repair")}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
