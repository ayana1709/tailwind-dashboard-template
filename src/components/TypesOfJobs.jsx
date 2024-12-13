import React from "react";
import { useNavigate } from "react-router-dom";

const TypesOfJobs = () => {
  const navigate = useNavigate();

  // Job types and their respective routes
  const jobTypes = [
    { name: "Repair", route: "/step-1" },
    { name: "Bolo", route: "/jobs/bolo" },
    { name: "Inspection", route: "/jobs/inspection" },
    { name: "Wheel Alignment", route: "/jobs/wheel-alignment" },
  ];

  return (
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
  );
};

export default TypesOfJobs;
