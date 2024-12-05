import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const JobOrderList = () => {
  const [jobOrders, setJobOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobOrders = async () => {
      try {
        const response = await api.get("/job-orders");
        console.log("Response data:", response.data);
        setJobOrders(response.data.data);
      } catch (error) {
        console.error("Axios error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOrders();
  }, []);

  const tableHeaders = [
    "ID",
    "Plate Number",
    "Customer Name",
    "Ordered Jobs",
    "Status",
    "Remark",
    "Edit",
    "Percentage",
    "Print Report",
    "Action",
  ];

  const handleAction = (action, id) => {
    switch (action) {
      case "edit":
        navigate(`/edit-job-order/${id}`);
        break;
      case "print":
        alert(`Print report for Job Order ID: ${id}`);
        break;
      case "delete":
        alert(`Perform action on Job Order ID: ${id}`);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  const handleCreateJobCard = () => {
    navigate("/step-1");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading job orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
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
                <h2 className="text-2xl font-bold">Job Orders</h2>
                <button
                  onClick={handleCreateJobCard}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Job Card
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="text-left p-3 border border-gray-200 text-sm font-medium text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jobOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="p-3 border border-gray-200">
                          {order.id}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.plateNumber}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.customerName}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.orderedJobs}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.status}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.remark}
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("edit", order.id)}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.percentage}%
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("print", order.id)}
                            className="text-green-500 hover:underline"
                          >
                            Print
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("delete", order.id)}
                            className="text-red-500 hover:underline"
                          >
                            Action
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default JobOrderList;
