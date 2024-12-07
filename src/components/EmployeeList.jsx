import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { NavLink } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees-list");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);
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
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-700">
                    List of Employee
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
                    <span className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400">
                      {/* <SearchIcon className="h-5 w-5 text-gray-400" /> */}
                    </span>
                  </div>
                  <NavLink
                    to="/employees"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Add Employee
                  </NavLink>
                </div>
              </div>

              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Full Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Contact Info
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Position
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Work History
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee, index) => (
                      <tr key={employee.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {employee.full_name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {employee.contact_information}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {employee.position}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {employee.address}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {employee.work_history}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {employee.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-500"
                      >
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;