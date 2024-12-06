import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { NavLink } from "react-router-dom";
// import { SearchIcon } from "@heroicons/react/outline"; // Import search icon from Heroicons

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/list-of-customer");
        setCustomers(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-200 text-gray-700";
      case "Started":
        return "bg-yellow-200 text-yellow-700";
      case "Finished":
        return "bg-green-200 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case "Unpaid":
        return "bg-red-200 text-red-700";
      case "Half Paid":
        return "bg-yellow-200 text-yellow-700";
      case "Paid":
        return "bg-green-200 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
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
            <div className="p-6 bg-white rounded-lg shadow-lg">
              {/* Title and Actions */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-700">
                    List of Customers
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
                    to="/customers"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Add Customer
                  </NavLink>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-600 rounded-lg shadow">
                  <thead className="bg-gray-500 text-black">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">ID</th>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">
                        Telephone
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Car Model
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Plate Number
                      </th>
                      <th className="py-3 px-4 border-b text-left">Edit</th>
                      <th className="py-3 px-4 border-b text-left">
                        Car Status
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Payment Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, customerIndex) => (
                      <React.Fragment key={customer.id}>
                        {customer.car_model.map((car, carIndex) => (
                          <tr
                            key={`${customer.id}-${carIndex}`}
                            className={`hover:bg-gray-50 transition ${
                              (customerIndex + carIndex) % 2 === 0
                                ? "bg-gray-50"
                                : "bg-white"
                            }`}
                          >
                            {carIndex === 0 && (
                              <>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.car_model.length}
                                >
                                  {customerIndex + 1}
                                </td>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.car_model.length}
                                >
                                  {customer.name}
                                </td>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.car_model.length}
                                >
                                  {customer.telephone}
                                </td>
                              </>
                            )}
                            <td className="py-3 px-4 border-b">
                              {car.car_model}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {car.plate_no}
                            </td>
                            <td className="py-3 px-4 border-b">
                              <NavLink
                                to={`/edit-customer/${customer.id}`}
                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              >
                                Edit
                              </NavLink>
                            </td>

                            <td
                              className={`py-3 px-4 border-b rounded ${getStatusClass(
                                car.car_status
                              )}`}
                            >
                              <select className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="Not Started">Not Started</option>
                                <option value="Started">Started</option>
                                <option value="Finished">Finished</option>
                              </select>
                            </td>
                            <td
                              className={`py-3 px-4 border-b rounded ${getPaymentStatusClass(
                                car.payment_status
                              )}`}
                            >
                              <select className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option value="Unpaid">Unpaid</option>
                                <option value="Half Paid">Half Paid</option>
                                <option value="Paid">Paid</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
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
