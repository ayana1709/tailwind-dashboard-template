import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const AddInspection = () => {
  const { id } = useParams(); // Get ID from URL (for editing)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_type: "",
    phone_number: "",
    tin_number: "",
    result: "",
    total_payment: "",
    checked_by: "",
    plate_number: "",
    make: "",
    model: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/inspections/${id}`)
        .then((response) => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (id) {
        await api.put(`/inspections/${id}`, formData);
        setSuccess("Inspection updated successfully!");
      } else {
        await api.post("/add-inspection", formData);
        setSuccess("Vehicle registered successfully!");
      }
      setTimeout(() => navigate("/inspection-list"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {id ? "Update Inspection" : "Inspection Registration"}
              </h2>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(formData).map((key) => (
                    <div key={key}>
                      <label className="block font-medium text-gray-600 pb-2">
                        {key.replace("_", " ").toUpperCase()}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        placeholder={`Enter ${key.replace("_", " ")}`}
                        className="w-full border p-2 rounded-md focus:border-blue-500 focus:ring-1"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300 shadow-md"
                  >
                    {id ? "Update" : "Submit"}
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

export default AddInspection;
