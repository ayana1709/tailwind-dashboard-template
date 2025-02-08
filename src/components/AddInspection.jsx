import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

const AddInspection = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    try {
      // Attempt to send the form data
      const response = await api.post("/add-inspection", formData);

      // Set success message and navigate after 2 seconds
      setSuccess("Vehicle registered successfully!");
      setTimeout(() => navigate("/inspection-list"), 2000);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);

      // Check for detailed error message from the server
      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
    }
  };
  // if (loading)
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );

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
                Inspection Registration
              </h2>

              {/* {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>} */}

              <form onSubmit={handleSubmit}>
                {/* Customer Selection */}
                <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="የደንበኛው ስም"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Customer Type
                          </label>

                          <select className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200">
                            <option>Select Customer</option>
                            <option value="regular">Regular</option>
                            <option value="contract">Contract</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="ስልክ ቁጥር"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Tin Number
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="ቲን ቁጥር"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Result
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="ዉጤት"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Total Payment
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="አጠቃላይ ክፍያ"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Checked by
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="የባለሙያ ስም"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Plate Number
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="የታርጋ ቁጥር"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Make
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="Enter Make"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Model
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="ሞደል"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gray-600 pb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                            placeholder="አመት"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300 shadow-md shadow-gray-500/90 focus:shadow-sm">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddInspection;
