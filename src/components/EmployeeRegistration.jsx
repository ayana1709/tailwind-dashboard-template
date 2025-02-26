import { useState } from "react";
import axios from "axios";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_information: "",
    position: "",
    address: "",
    gender: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/employees", formData);

      setFormData({
        full_name: "",
        contact_information: "",
        position: "",
        address: "",
        gender: "",
      });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/employees-list"), 2000);
    } catch (error) {
      console.error(error.response.data);
      toast.error("Failed to submit form.", {
        position: "top-right",
        autoClose: 3000,
      });
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
          {/* <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"> */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6"
            >
              <h2 className="text-xl font-bold mb-4">Employee Registration</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name/ሙሉ ስም
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact Information/የመገናኛ መረጃ
                </label>
                <input
                  type="text"
                  name="contact_information"
                  value={formData.contact_information}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Position/ቦታ
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address/አድራሻ
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender/ጾታ
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Register Employee/ሰራተኛ መዝግብ
              </button>
            </form>
          </div>
          {/* </div> */}
        </main>
      </div>
      //{" "}
    </div>
  );
};

export default EmployeeRegistration;
