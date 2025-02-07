import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

const AddBolo = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_type: "",
    plate_number: "",
    make: "",
    year: "",
    body_type: "",
    result: "",
    issue_date: "",
    expiry_date: "",
    tin_number: "",
    payment_total: "",
    employee_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plateNumbers, setPlateNumbers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/select-customer");
        setCustomers(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customers.");
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/select-employee");
        setEmployees(response.data.data);
      } catch (error) {
        setError("Failed to load employees.");
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await api.post("/add-bolo", formData);
      setSuccess("Vehicle registered successfully!");
      setTimeout(() => navigate("/bolo-list"), 2000);
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
        <main className="grow">
          <div className="min-h-screen p-6 shadow-lg">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
              <h2 className="text-2xl font-bold text-center mb-6">
                Bolo Registration Form
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <label className="block font-semibold text-gray-600 text-md pb-1">
                    Job Card No
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የካርድ ቁጥር"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የደንበኛው ስም"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Customer Type
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የደንበኛው አይነት"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የስልክ ቁጥር"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    TIN Number
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የቲን ቁጥር"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Checked Date/የገባበት ቀን
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border-gray-300 rounded-md"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Issue Date/ የወጣበት ቀን
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border-gray-300 rounded-md"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Expiry Date/ የማለቂያ ቀን
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border-gray-300 rounded-md"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Next Reminding on (B4 15 Days)
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border-gray-300 rounded-md"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Result
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ዉጤት"
                  />
                </div>

                {/* Right Column */}
                <div>
                  <label className="block font-semibold text-gray-600 text-md pb-1">
                    Plate No
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የታርጋ ቁጥር"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Type (Electric, Hybrid, Fuel, Diesel)
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የተሽከርካሪ አይነት"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ሞዴል"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    VIN
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ቪን"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="አምት"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Condition
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ሁኔታ"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    KM Reading
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ኪልመትር"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Professional
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="የባለሙያ ስም አስገባ"
                  />

                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Checked By
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ያረጋገጠውን አስገባ"
                  />
                  <label className="block font-semibold mt-4 text-gray-600 text-md pb-1">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                    placeholder="ጠቅላላ ዋጋ"
                  />
                </div>

                <div className="col-span-2 text-center">
                  <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300 shadow-md shadow-gray-500/90 focus:shadow-sm">
                    Submit
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

export default AddBolo;
