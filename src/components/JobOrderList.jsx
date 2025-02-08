import React, { useState, useEffect } from "react";
import api from "../api";

const JobOrderList = () => {
  const [repairs, setRepairs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await api.get("/repairs");
        setRepairs(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching repair registrations:", error);
        setRepairs([]);
      }
    };

    fetchRepairs();
  }, []);

  return (
    <div className="p-6 bg-gray-200 shadow-lg rounded-lg">
      {/* Controls Section */}
      <div className="flex flex-wrap gap-3 justify-start mb-4">
        <select
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md border border-gray-300"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value={5}>View 5</option>
          <option value={10}>View 10</option>
          <option value={20}>View 20</option>
          <option value={50}>View 50</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
          Add New Job
        </button>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
          Report Date
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300">
          From
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300">
          To
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300">
          Filter
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
          Search
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
          PDF/Excel Print
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              {[
                "Job ID",
                "Customer Name",
                "Plate No",
                "Repair Category",
                "Received Date",
                "Priority",
                "Estimated Date",
                "Promise Date",
                "Status",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  className="text-sm px-4 py-3 border text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repairs.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              repairs.slice(0, itemsPerPage).map((repair) => (
                <tr key={repair.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{repair.id}</td>
                  <td className="px-4 py-3 font-medium">
                    {repair.customer_name}
                  </td>
                  <td className="px-4 py-3">{repair.plate_no}</td>
                  <td className="px-4 py-3">{repair.repair_category}</td>
                  <td className="px-4 py-3">{repair.received_date}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      repair.priority === "Urgent"
                        ? "text-red-600"
                        : repair.priority === "High"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {repair.priority}
                  </td>
                  <td className="px-4 py-3">
                    {repair.estimated_date || "N/A"}
                  </td>
                  <td className="px-4 py-3">{repair.promise_date || "N/A"}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">
                    {repair.condition}
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobOrderList;
