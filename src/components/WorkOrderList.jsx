import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import { FiSearch } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonOperation from "./ButtonOperation";

const WorkOrderList = () => {
  const [repairs, setRepairs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(repairs);
  const headers = [
    "Job Card No",
    "Customer Name",
    "Plate Number",
    "Repair Category",
    "Work Description",
    "Assign To",
    "Total Cost",
  ];

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await api.get("/work-orders");
        setRepairs(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching repair registrations:", error);
        setRepairs([]);
      }
    };
    fetchRepairs();
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleFilter = () => {
    let filteredRepairs = repairs;
    if (startDate && endDate) {
      filteredRepairs = filteredRepairs.filter((repair) => {
        const repairDate = new Date(repair.received_date);
        return (
          repairDate >= new Date(startDate) && repairDate <= new Date(endDate)
        );
      });
    }
    if (searchTerm) {
      filteredRepairs = filteredRepairs.filter((repair) =>
        repair.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredRepairs;
  };

  const filteredRepairs = handleFilter();
  const totalPages = Math.ceil(filteredRepairs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRepairs = filteredRepairs.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const navigate = useNavigate();
  const handleNavigation = (option, repairId) => {
    const routes = {
      View: `/view/${repairId}`,
      Edit: `/edit/${repairId}`,
      Delete: `/delete/${repairId}`,
      "Add to Work": `/add-to-work-order/${repairId}`,
      "Change Status": `/change-status/${repairId}`,
      "Print Summary": `/print-summary/${repairId}`,
      "Work Progress": `/work-progress/${repairId}`,
      "Request Spare": `/request-spare/${repairId}`,
    };

    if (routes[option]) {
      navigate(routes[option]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden p-4 mr-8 bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-wrap gap-3 justify-start mb-4">
              {/* <h2> Work ordered</h2> */}
              <select
                className="bg-white text-gray-700 px-2 py-2 rounded-lg shadow-md border border-gray-300"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    View {num}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="border rounded-lg px-2 py-2 shadow-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="border rounded-lg px-2 py-2 shadow-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button
                onClick={handleFilter}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
              >
                Filter
              </button>
              <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg shadow-md">
                <FiSearch className="text-gray-600" />
                <input
                  type="text"
                  className="bg-transparent border-none focus:outline-none ml-2"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ButtonOperation
                displayedRepairs={displayedRepairs}
                headers={headers}
                filename={"work"}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-300 text-gray-700 text-xs">
                  <tr>
                    {[
                      "Job Card No",
                      "Customer Name",
                      "Plate No",
                      "Repair Category",
                      "Work Description ",

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
                  {displayedRepairs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-4 text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    displayedRepairs.map((repair) => (
                      <tr
                        key={repair.id}
                        className="border-b hover:bg-gray-200"
                      >
                        <td className="px-4 py-3">{repair.id}</td>
                        <td className="px-4 py-3 font-medium">
                          {repair.customer_name}
                        </td>
                        <td className="px-4 py-3">{repair.plate_number}</td>
                        <td className="px-4 py-3">{repair.repair_category}</td>
                        <td className="px-4 py-3">
                          {repair.work_details &&
                          repair.work_details.length > 0 ? (
                            <table className="border-collapse border border-gray-300 w-full text-sm">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 px-2 py-1">
                                    W.description
                                  </th>
                                  <th className="border border-gray-300 px-2 py-1">
                                    Code
                                  </th>
                                  <th className="border border-gray-300 px-2 py-1">
                                    Assign To
                                  </th>
                                  <th className="border border-gray-300 px-2 py-1">
                                    Time In
                                  </th>
                                  <th className="border border-gray-300 px-2 py-1">
                                    Time Out
                                  </th>
                                  <th className="border border-gray-300 px-2 py-1">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {repair.work_details.map((detail, index) => (
                                  <tr
                                    key={index}
                                    className="border border-gray-300"
                                  >
                                    <td className="border border-gray-300 px-2 py-1">
                                      {detail.workDescription}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      {detail.code}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      {detail.AssignTo}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      {new Date(detail.TimeIn).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      {new Date(
                                        detail.TimeOut
                                      ).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      {detail.status}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            "No work details"
                          )}
                        </td>

                        <td className="px-4 py-3 relative">
                          <button
                            onClick={() => toggleDropdown(repair.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                          >
                            Action <FiChevronDown className="ml-2" />
                          </button>
                          {dropdownOpen === repair.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                              {[
                                "View",
                                "Edit",
                                "Delete",

                                "Change Status",
                                "Print Summary",
                                "Work Progress",
                                "Request Spare",
                              ].map((option, index) => (
                                <button
                                  key={index}
                                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                  onClick={() =>
                                    handleNavigation(option, repair.id)
                                  }
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkOrderList;
