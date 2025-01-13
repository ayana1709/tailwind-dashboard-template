import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Loading from "./Loading";

const AddWheelAlignment = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_type: "",
    plate_number: "",
    job_description: "",
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
  const [employee_id, setemployee_id] = useState("");
  const [employees, setEmployees] = useState([]);

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
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/select-employee");
        setEmployees(response.data.data); // Access the 'data' array inside the response
      } catch (error) {
        setError("Failed to load employees.");
      }
    };

    fetchEmployees();
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
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if `customer_id` or `customer_type` changes and call respective handlers
    if (name === "customer_id") {
      handleCustomerChange(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    try {
      // Attempt to send the form data
      const response = await api.post("/wheel-alignment", formData);

      // Set success message and navigate after 2 seconds
      setSuccess("Vehicle registered successfully!");
      setTimeout(() => navigate("/wheel-alignment-list"), 2000);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);

      // Check for detailed error message from the server
      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
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
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Wheel Alignment Registration
              </h2>

              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Customer Selection */}
                <div className="mb-6">
                  <label htmlFor="customer_id" className="block text-gray-700">
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
                {/* customer Type */}
                <div className="mb-6">
                  <label
                    htmlFor="customer_type"
                    className="block text-gray-700"
                  >
                    Customer Type /ደንበኛ አይነት
                  </label>
                  <select
                    name="customer_type"
                    value={formData.customer_type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select</option>
                    <option value="contract">Contract</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
                {/* Plate Number Selection */}
                <div className="mb-6">
                  <label htmlFor="plate_number" className="block text-gray-700">
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
                {/*job Description */}
                <div className="mb-6">
                  <label
                    htmlFor="job_description"
                    className="block text-gray-700"
                  >
                    Job Description
                  </label>
                  <input
                    type="text"
                    id="job_description"
                    name="job_description"
                    value={formData.job_description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                    placeholder="Enter a job description"
                  />
                </div>

                {/* tin number  */}
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
                {/* payment total*/}
                <div className="mb-6">
                  <label
                    htmlFor="payment_total"
                    className="block text-gray-700"
                  >
                    Payment Total
                  </label>
                  <input
                    type="number"
                    id="payment_total"
                    name="payment_total"
                    value={formData.payment_total}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter a total  payment "
                    required
                  />
                </div>
                {/* proffesional   */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Proffesional
                  </label>
                  <select
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select professional</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
                  >
                    Register Wheel Alignment{" "}
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

export default AddWheelAlignment;
