import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const WorkOrderList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await api.get("/work-orders");
      console.log("API Response:", response.data);
      setWorkOrders(response.data.data || []); // Default to empty array
    } catch (error) {
      console.error("Error fetching work orders:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="container mx-auto p-4">
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
                {/* Title and Actions */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-700">
                      List of Work Order
                    </h2>
                  </div>

                  {/* Search and Add Customer aligned to the right */}
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="relative">
                      <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
                <table className="table-auto border-collapse border border-gray-100 w-full">
                  <thead className="bg-gray-400 text-black">
                    <tr>
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Customer Name</th>
                      <th className="border px-4 py-2">Plate Number</th>
                      <th className="border px-4 py-2">Job Title</th>
                      <th className="border px-4 py-2">Mechanic</th>
                      <th className="border px-4 py-2">Work Description</th>
                      <th className="border px-4 py-2">Supervisor</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Edit</th>
                      <th className="border px-4 py-2">View</th>
                      <th className="border px-4 py-2">Report</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {workOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{order.id}</td>
                        <td className="border px-4 py-2">
                          {order.customer_name}
                        </td>
                        <td className="border px-4 py-2">
                          {order.plate_number}
                        </td>
                        <td className="border px-4 py-2">{order.job_title}</td>
                        <td className="border px-4 py-2">
                          {order.employee ? order.employee.full_name : "N/A"}
                        </td>
                        <td className="border px-4 py-2">
                          <details>
                            <summary>
                              {order.workDetails?.length || 0} Details
                            </summary>
                            <ul>
                              {(order.workDetails || []).map(
                                (detail, index) => (
                                  <li key={index}>{detail.work_description}</li>
                                )
                              )}
                            </ul>
                          </details>
                        </td>
                        <td className="border px-4 py-2">Supervisor Name</td>
                        <td className="border px-4 py-2">
                          {order.status || "Pending"}
                        </td>
                        <td className="border px-4 py-2">
                          <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200">
                            Edit
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                            View
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">
                            Print
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

export default WorkOrderList;
