import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoadingSpinner from "./LoadingSpinner";
import Loading from "./Loading";

const JobOrderList = () => {
  const [jobOrders, setJobOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({
    job_to_be_done: "",
    customer_observation: "",
    additional_work: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };
  const [percentageValues, setPercentageValues] = useState({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobOrders = async () => {
      try {
        const response = await api.get("/job-orders");
        setJobOrders(response.data.data);
        setPercentageValues(
          response.data.data.reduce(
            (acc, order) => ({ ...acc, [order.id]: 0 }),
            {}
          )
        );
      } catch (error) {
        setError(error.message);
        // } finally {
        //   setLoading(false);
      }
    };

    fetchJobOrders();
  }, []);

  const tableHeaders = [
    "ID",
    "Plate Number",
    "Customer Name",

    "Ordered Jobs",
    "Date In",
    "Date Out",
    "Remark",
    "priority",
    "Status",
    "Option",
    // "Progress (%)",
    // "Edit",
    // "Report",
    // "Delete",
  ];

  const handleAction = (action, id) => {
    switch (action) {
      case "edit":
        navigate(`/edit-job-order/${id}`);
        break;
      case "print":
        alert(`Printing report for Job Order ID: ${id}`);
        break;
      case "delete":
        alert(`Deleting Job Order ID: ${id}`);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };
  const handleJobAction = (job, order) => {
    // Pass the correct order details (plate number, customer name, and job title)
    navigate("/add-to-work-order", {
      state: {
        plateNumber: order.plate_number, // Ensure `order` has plate_number
        customerName: order.customer_name, // Ensure `order` has customer_name
        jobTitle: job,
      },
    });
  };

  const handleCreateJobCard = () => {
    navigate("/step-1");
  };

  const openPopup = (job_to_be_done, customer_observation, additional_work) => {
    setPopupData({ job_to_be_done, customer_observation, additional_work });
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // if (loading) {
  //   return <Loading />;
  // }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Repair Job Orders</h2>

                <div className="relative">
                  <div className="flex items-center gap-4 ml-auto">
                    <input
                      type="text"
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={handleCreateJobCard}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Create Job Card
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-100 rounded-lg shadow">
                  <thead className="bg-gray-400 text-black">
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 border-b text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jobOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-100 odd:bg-gray-50 even:bg-white"
                      >
                        <td className="p-3 border border-gray-200">
                          {order.id}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.plate_number}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.customer_name}
                        </td>

                        <td className="p-3 border border-gray-200">
                          <ul>
                            {order.job_order.map((job, index) => (
                              <li key={index}>*{job}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.date_in}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {order.promised_date}
                        </td>
                        {/* <td className="p-3 border border-gray-200">
                          <ul>
                            {order.job_order.map((job, index) => (
                              <li
                                key={index}
                                className="flex items-center py-1 gap-2"
                              >
                                <button
                                  onClick={() => handleJobAction(job, order)} // Pass the entire order object
                                  className="bg-blue-900 text-white px-2 py-0 text-xs rounded hover:bg-blue-400"
                                >
                                  Add to Work Order
                                </button>
                              </li>
                            ))}
                          </ul>
                        </td> */}
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() =>
                              openPopup(
                                order.job_to_be_done,
                                order.customer_observation,
                                order.additional_work
                              )
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                          >
                            View Remark
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <select className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <select className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Not Started">Not Started</option>
                            <option value="Started">Started</option>
                            <option value="onhold">Onhold</option>
                            <option value="canceled">Canceled</option>
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        {/* <td className="p-3 border border-gray-200 relative">
                          <button
                            onClick={() => toggleDropdown(order.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                          >
                            Action
                          </button>
                          {dropdownVisible === order.id && (
                            <ul className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg z-10">
                              <li>
                                <button
                                  onClick={() => console.log("View", order.id)}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => console.log("Edit", order.id)}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    console.log("Add to Work", order.id)
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  Add to Work
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    console.log("Add Spare", order.id)
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  Add Spare
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    console.log("Add Out Source", order.id)
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  Add Out Source
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    console.log("Request Spare", order.id)
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                  Request Spare
                                </button>
                              </li>
                            </ul>
                          )}
                        </td> */}
                        <td>
                          <select name="" id="">
                            <option value="">Action</option>
                            <option value="">
                              <button
                                onClick={() => console.log("View", order.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              >
                                View
                              </button>
                            </option>

                            <option value="">
                              <button
                                onClick={() => console.log("Edit", order.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                              >
                                Edit
                              </button>
                            </option>
                            <option value="">
                              <button
                                onClick={() =>
                                  console.log("Add to work order ", order.id)
                                }
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              >
                                Add to Work Order
                              </button>
                            </option>
                            <option value="">
                              <button
                                onClick={() => console.log("Edit", order.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              >
                                CheackList
                              </button>
                            </option>
                            <option value="">
                              <button
                                onClick={() => console.log("Edit", order.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              >
                                Summary Report
                              </button>
                            </option>
                          </select>
                        </td>

                        {/* <td className="p-3 border border-gray-200">
                          <div className="flex flex-col items-center space-y-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={percentageValues[order.id] || 0}
                              onChange={(e) =>
                                setPercentageValues({
                                  ...percentageValues,
                                  [order.id]: e.target.value,
                                })
                              }
                              className="w-full h-2 bg-blue-100 rounded-lg transition-colors duration-300 focus:outline-none hover:bg-blue-200"
                            />
                            <div className="flex justify-between text-xs w-full">
                              <span>0%</span>
                              <span>{percentageValues[order.id] || 0}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("edit", order.id)}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("print", order.id)}
                            className="text-green-500 hover:underline"
                          >
                            Print
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <button
                            onClick={() => handleAction("delete", order.id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-lg font-bold mb-4">Job Order Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="text-gray-700">
                <strong>Job to be done:</strong>
                <p>{popupData.job_to_be_done}</p>
              </div>
              <div className="text-gray-700">
                <strong>Customer Observation:</strong>
                <p>{popupData.customer_observation}</p>
              </div>
              <div className="text-gray-700">
                <strong>Additional Work:</strong>
                <ul>{popupData.additional_work}</ul>
              </div>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOrderList;
