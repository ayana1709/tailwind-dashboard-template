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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await api.post("/add-job-card", formData);
      setSuccess("Job card added successfully!");
      setTimeout(() => navigate("/job-card-list"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow p-6">
          <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Job Card Registration
            </h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600">Job Card No</label>
                  <input
                    type="text"
                    name="job_card_no"
                    value={formData.job_card_no}
                    onChange={handleChange}
                    placeholder="የካርድ ቁጥር"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Customer Name</label>
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
                  <label className="block text-gray-600">Customer Type</label>
                  <input
                    type="text"
                    name="customer_type"
                    value={formData.customer_type}
                    onChange={handleChange}
                    placeholder="የደንበኛው አይነት"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Mobile</label>
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
                  <label className="block text-gray-600">TIN Number</label>
                  <input
                    type="text"
                    name="tin_number"
                    value={formData.tin_number}
                    onChange={handleChange}
                    placeholder="የቲን ቁጥር"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600">Checked Date</label>
                  <input
                    type="date"
                    name="checked_date"
                    value={formData.checked_date}
                    onChange={handleChange}
                    placeholder="የካርድ ቁጥር"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Result</label>
                  <input
                    type="text"
                    name="result"
                    value={formData.result}
                    onChange={handleChange}
                    placeholder="ዉጤት"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Total Amount</label>
                  <input
                    type="number"
                    name="total_amount"
                    value={formData.total_amount}
                    onChange={handleChange}
                    placeholder="አጠቃላይ መጠን"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Professional</label>
                  <input
                    type="text"
                    name="professional"
                    value={formData.professional}
                    onChange={handleChange}
                    placeholder="የባለሙያ ስም"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Checked By</label>
                  <input
                    type="text"
                    name="checked_by"
                    value={formData.checked_by}
                    onChange={handleChange}
                    placeholder="ያረጋገጠው አካል"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-600">
                    Work Description
                  </label>
                  <textarea
                    name="work_description"
                    value={formData.work_description}
                    onChange={handleChange}
                    placeholder="የስራ ዝርዝር ፃፍ"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    required
                  />
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                  Submit
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
