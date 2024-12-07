import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

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
  const [percentageValues, setPercentageValues] = useState({});
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };

    fetchJobOrders();
  }, []);

  const tableHeaders = [
    "ID",
    "Plate Number",
    "Customer Name",
    "Ordered Jobs",
    "Actions",
    "Remark",
    "Progress (%)",
    "Edit",
    "Report",
    "Delete",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading job orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Job Orders</h2>
                <button
                  onClick={handleCreateJobCard}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create Job Card
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-600 rounded-lg shadow">
                  <thead className="bg-gray-500 text-black">
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="text-left p-3 border border-gray-500 text-sm font-medium text-black"
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
                        </td>
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
