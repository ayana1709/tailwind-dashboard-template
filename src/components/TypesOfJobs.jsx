import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const TypesOfJobs = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Job types and their respective routes
  const jobTypes = [
    { name: "Repair", route: "/step-1" },
    { name: "Bolo", route: "/bolo" },
    { name: "Inspection", route: "/inspection" },
    { name: "Wheel Alignment", route: "/wheel-alignment" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-hidden overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                Select Job Type
              </h2>
              <ul className="space-y-4">
                {jobTypes.map((job) => (
                  <li key={job.name}>
                    <button
                      onClick={() => navigate(job.route)}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      {job.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TypesOfJobs;
