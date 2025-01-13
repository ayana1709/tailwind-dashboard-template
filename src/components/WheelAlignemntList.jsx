import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoadingSpinner from "./LoadingSpinner";
import Loading from "./Loading";

const WheelAlignmentList = () => {
  const [wheel, setWheel] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWheelOrders = async () => {
      try {
        const response = await api.get("/wheel-list");
        console.log("Fetched wheel orders:", response.data);
        setWheel(response.data || []);
      } catch (error) {
        console.error("Error fetching wheel orders:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWheelOrders();
  }, []);

  const filteredWheel = wheel.filter((order) =>
    Object.values(order).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCreateJobCard = () => {
    navigate("/wheel-alignment");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">
          {error}{" "}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Wheel Alignment Job Orders
                </h2>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    onClick={handleCreateJobCard}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Create Job Card
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-100 rounded-lg shadow">
                  <thead className="bg-gray-400 text-black">
                    <tr>
                      {[
                        "ID",
                        "Customer Name",
                        "Customer Type",
                        "Plate Number",
                        "Job Description",
                        "TIN Number",
                        "Total Payment",
                        "Checked By",
                      ].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 border-b text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWheel.length > 0 ? (
                      filteredWheel.map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-100">
                          <td>{index + 1}</td>
                          <td>{order.customer_name}</td>
                          <td>{order.customer_type}</td>
                          <td>{order.plate_number}</td>
                          <td>{order.job_description}</td>
                          <td>{order.tin_number}</td>
                          <td>{order.payment_total}</td>
                          <td>{order.employee_full_name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-gray-500"
                        >
                          No job orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WheelAlignmentList;
