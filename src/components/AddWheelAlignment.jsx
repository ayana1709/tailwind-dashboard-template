import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

const AddWheelAlignment = () => {
  const [formData, setFormData] = useState({
    job_card_no: "",
    date: "",
    customer_name: "",
    customer_type: "",
    mobile: "",
    tin_number: "",
    checked_date: "",
    work_description: "",
    result: "",
    total_amount: "",
    professional: "",
    checked_by: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await api.post("/wheel-alignment", formData);
      setSuccess("Job card added successfully!");
      setTimeout(() => navigate("/job-card-list"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow p-6">
          <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Wheel Alignment Registration
            </h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="block text-gray-600 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  {key === "customer_type" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-md focus:border-blue-500 focus:ring-1"
                      required
                    >
                      <option value="">Select Customer Type</option>
                      <option value="Regular">Regular</option>
                      <option value="Contract">Contract</option>
                    </select>
                  ) : key === "work_description" ? (
                    <textarea
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-md focus:border-blue-500 focus:ring-1"
                      placeholder={`Enter ${key.replace("_", " ")}`}
                      required
                    />
                  ) : (
                    <input
                      type={
                        key.includes("date")
                          ? "date"
                          : key === "total_amount"
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-md focus:border-blue-500 focus:ring-1"
                      placeholder={`Enter ${key.replace("_", " ")}`}
                      required
                    />
                  )}
                </div>
              ))}
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddWheelAlignment;
