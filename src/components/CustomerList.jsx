import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { NavLink } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

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
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                  Customer List
                </h2>
                <NavLink
                  end
                  to="/customers"
                  className={({ isActive }) =>
                    "block transition duration-150 truncate " +
                    (isActive
                      ? "text-violet-500"
                      : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                  }
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
                    Add Customer
                  </button>
                </NavLink>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-gray-50 rounded-lg">
                  <thead>
                    <tr>
                      {[
                        "ID",
                        "Name",
                        "Telephone",
                        "Car Model",
                        "Tin No",
                        "Plate No",
                        "Chassis No",
                        "Date In",
                        "Km",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } hover:bg-blue-50`}
                      >
                        <td className="px-4 py-2">{customer.id}</td>
                        <td className="px-4 py-2">{customer.name}</td>
                        <td className="px-4 py-2">{customer.telephone}</td>
                        <td className="px-4 py-2">{customer.car_model}</td>
                        <td className="px-4 py-2">
                          {customer.tin_no || "N/A"}
                        </td>
                        <td className="px-4 py-2">{customer.plate_no}</td>
                        <td className="px-4 py-2">
                          {customer.chassis_no || "N/A"}
                        </td>
                        <td className="px-4 py-2">{customer.date_in}</td>
                        <td className="px-4 py-2">{customer.km}</td>
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

export default CustomerList;
