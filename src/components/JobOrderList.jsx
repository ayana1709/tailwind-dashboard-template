import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const JobOrderList = () => {
  const [jobOrders, setJobOrders] = useState([]); // Holds the job orders data
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch job orders from API
  useEffect(() => {
    const fetchJobOrders = async () => {
      try {
        const response = await api.get("/job-orders"); // Update with your API endpoint
        setJobOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch job orders:", error);
      }
    };

    fetchJobOrders();
  }, []);

  // Navigate to Edit Page
  const handleEdit = (id) => {
    navigate(`/edit-job-order/${id}`);
  };

  // Print Report (example placeholder function)
  const handlePrintReport = (id) => {
    alert(`Print report for Job Order ID: ${id}`);
  };

  // Handle Delete or Action
  const handleAction = (id) => {
    alert(`Perform action on Job Order ID: ${id}`);
  };

  // Navigate to Create Job Card Page
  const handleCreateJobCard = () => {
    navigate("/step-1");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              {/* Page Title and Create Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Job Orders</h2>
                <button
                  onClick={handleCreateJobCard}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Job Card
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
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
                      ].map((header) => (
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
                            onClick={() => handleEdit(order.id)}
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
                            onClick={() => handlePrintReport(order.id)}
                            className="text-green-500 hover:underline"
                          >
                            Print
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction(order.id)}
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
