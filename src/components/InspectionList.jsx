import React, { useState, useEffect } from "react";
import api from "../api";

const InspectionList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/job-orders");
        setJobs(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Buttons Section */}
      <div className="flex flex-wrap gap-3 justify-start mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
          View 10
        </button>
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
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                "#",
                "Job ID",
                "Customer Name",
                "Plat No",
                "Repair Type",
                "Es.Date",
                "Priority",
                "Date Out",
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
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{job.id}</td>
                  <td className="px-4 py-3 font-medium">{job.customer_name}</td>
                  <td className="px-4 py-3">{job.plate_number}</td>
                  <td className="px-4 py-3">{job.job_to_be_done}</td>
                  <td className="px-4 py-3">{job.date_in}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      job.priority === "Urgent"
                        ? "text-red-600"
                        : job.priority === "High"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {job.job_order[0]}
                  </td>
                  <td className="px-4 py-3">{job.promised_date}</td>
                  <td className="px-4 py-3">{job.promised_date}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">
                    {job.status}
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

export default InspectionList;
