import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    try {
      if (id) {
        await api.put(`/inspections/${id}`, formData);
        toast.success("Inspection updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await api.post("/add-inspection", formData);
        toast.success("Vehicle registered successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setTimeout(() => navigate("/job-manager/inspection-list"), 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
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
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
                {id ? "Update Inspection" : "Inspection Registration"}
              </h2>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border px-4 py-6 rounded-md">
                  {/* <div className="absolute w-[2px] h-full bg-gray-300 left-1/2 -translate-x-1/2"></div> */}
                  {Object.keys(formData).map((key) =>
                    key === "customer_type" ? (
                      <div key={key} className="">
                        <label className="block font-medium text-gray-600 pb-[2px] text-sm">
                          CUSTOMER TYPE
                        </label>
                        <select
                          name="customer_type"
                          value={formData.customer_type}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        >
                          <option value="">የተከታታይነት አይነት ምረጥ</option>
                          <option value="Regular">ተመን ሰለባ</option>
                          <option value="Contract">ውል</option>
                        </select>
                      </div>
                    ) : (
                      <div key={key}>
                        <label className="block font-medium text-gray-600 pb-[2px] text-sm">
                          {key.replace("_", " ").toUpperCase()}
                        </label>
                        <input
                          type="text"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          placeholder={
                            key === "customer_name"
                              ? "የደንበኛ ስምን በተለይ እባኮት"
                              : key === "phone_number"
                              ? "ስልኩን ቁጥር"
                              : key === "tin_number"
                              ? "ታዋቂ ቁጥር"
                              : key === "result"
                              ? "ምን ውጤት"
                              : key === "total_payment"
                              ? "አጠቃቀም ክፍያ"
                              : key === "checked_by"
                              ? "ምልክት በማኅበረሰብ"
                              : key === "plate_number"
                              ? "ተሽከርካሪ ቁጥር"
                              : key === "make"
                              ? "ባለሞያ እባኮት"
                              : key === "model"
                              ? "ሞዴል"
                              : key === "year"
                              ? "ዓመት"
                              : "ተጨማሪ እባኮት"
                          }
                          className="placeholder:text-sm w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-1 transition duration-200"
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-[50%] bg-blue-600 hover:shadow-lg focus:shadow-sm hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300"
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
