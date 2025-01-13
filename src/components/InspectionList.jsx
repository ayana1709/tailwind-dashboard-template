import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoadingSpinner from "./LoadingSpinner";
import Loading from "./Loading";

const InspectionList = () => {
  const [inspection, setInspection] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tableHeaders = [
    "ID",
    "Customer Name",
    "Customer Type",
    "phone number",
    "Plate Number",
    "Tin number",
    "Result",
    "Total Payment",
    "Make",
    "model",
    "Year",
    "Body Type",
    "transmission",
    "vehicle_conditions",
  ];

  const handleCreateJobCard = () => {
    navigate("/inspection");
  };

  // if (loading) {
  //   return <Loading />;
  // }

  useEffect(() => {
    const fetchinspectionOrders = async () => {
      try {
        const response = await api.get("/inspection-list");
        console.log("Fetched wheel orders:", response.data);
        setInspection(response.data || []);
      } catch (error) {
        console.error("Error fetching wheel orders:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchinspectionOrders();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold"> Inspection Job Orders</h2>

                <div className="relative">
                  <div className="flex items-center gap-4 ml-auto">
                    <input
                      type="text"
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={handleCreateJobCard}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Create Job Card
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-100 rounded-lg shadow">
                  <thead className="bg-gray-400 text-black">
                    <tr>
                      {tableHeaders.map((header) => (
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
                    {inspection.length > 0 ? (
                      inspection.map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-100">
                          <td>{index + 1}</td>
                          <td>{order.customer_name || "N/A"}</td>
                          <td>{order.customer_type || "N/A"}</td>
                          <td>{order.phone_number || "N/A"}</td>
                          <td>{order.plate_number || "N/A"}</td>
                          <td>{order.tin_number || "N/A"}</td>
                          <td>{order.result || "N/A"}</td>
                          <td>{order.payment_total || "N/A"}</td>
                          {/* <td>{order.employee_id || "N/A"}</td> */}
                          <td>{order.make || "N/A"}</td>
                          <td>{order.model || "N/A"}</td>
                          <td>{order.year || "N/A"}</td>
                          <td>{order.body_type || "N/A"}</td>
                          <td>{order.transmission || "N/A"}</td>
                          <td>{order.vehicle_conditions || "N/A"}</td>]
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

export default InspectionList;
