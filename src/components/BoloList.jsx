import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoadingSpinner from "./LoadingSpinner";
import Loading from "./Loading";
import logo from "./../images/aa.png";

const BoloList = () => {
  const [bolo, setBolo] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [percentageValues, setPercentageValues] = useState({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobOrders, setJobOrders] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  useEffect(() => {
    const fetchBoloOrders = async () => {
      try {
        const response = await api.get("/bolo-list");
        console.log("API Response:", response); // Log the full response object
        setBolo(response.data || []); // Ensure it defaults to an empty array
      } catch (error) {
        console.error("Error fetching bolo orders:", error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchBoloOrders();
  }, []);

  const tableHeaders = [
    "ID",
    "Customer Name",
    "Plate Number",
    "Make",
    "Year",
    "Body Type",
    "Result",
    "Issue Date",
    "Expiry Date",
    "Total Payment",
    "Cheacked by",
    "Option",
    "Priority",
    "Status",
  ];
  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };
  const handleCreateJobCard = () => {
    navigate("/bolo");
  };

  // if (loading) {
  //   return <Loading />;
  // }
  // print
  const generatePDF = (order) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Add Company Logo
    const logoWidth = 60; // Logo width
    const logoHeight = 30; // Logo height
    const logoX = 20; // Align to the left
    const logoY = 10; // Position at the top
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Adjust Company Name to align closer with the logo
    const companyNameEnglish = "SPEED MEETER TRADING PLC";
    const companyNameAmharic = "ስፒድ ሜትር ትሬዲንግ";

    // Slight adjustment to align company name closer to logo
    const companyNameX = 95; // Adjust this value to bring it closer to the logo

    // Use a font compatible with Amharic
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(companyNameEnglish, companyNameX, 20); // Positioning company name closer
    doc.setFont("Noto Sans Ethiopic", "normal");
    // doc.text(companyNameAmharic, companyNameX, 30); // Positioning Amharic name closer

    // Add Divider Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 40, pageWidth - 10, 40);

    // Customer Information Section (two columns)
    const customerInfo = [
      { label: "Customer Name:", value: order.customer_name },
      { label: "Plate Number:", value: order.plate_number },
      { label: "Date In:", value: order.date_in },
      { label: "Promised Date:", value: order.promised_date },
      { label: "Priority:", value: order.priority || "N/A" },
      { label: "Status:", value: order.status || "N/A" },
      { label: "Remark:", value: order.remark || "None" },
    ];

    doc.setFontSize(10); // Smaller font for the customer info
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    let startX = 20;
    let startY = 50;
    const colWidth = (pageWidth - 20) / 2; // Divide into 2 columns

    customerInfo.forEach((item, index) => {
      const columnIndex = index % 2; // Alternate between the two columns
      const rowIndex = Math.floor(index / 2);

      // Adjusting the text positions for tighter spacing and better alignment
      doc.text(
        item.label,
        startX + columnIndex * colWidth,
        startY + rowIndex * 12
      );
      doc.text(
        item.value,
        startX + columnIndex * colWidth + 35,
        startY + rowIndex * 12
      ); // Align value next to label
    });
    // doc.text("Job Order Report", pageWidth / 2, 50, null, null, "center");

    // Add Divider Line Below Customer Info
    // doc.setDrawColor(0);
    // doc.line(
    //   10,
    //   startY + Math.ceil(customerInfo.length / 2) * 12 + 5,
    //   pageWidth - 10,
    //   startY + Math.ceil(customerInfo.length / 2) * 12 + 5
    // );
    // Add Title
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");

    // Add Job Order Details Table
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Ordered Jobs:",
      10,
      startY + Math.ceil(customerInfo.length / 2) * 12 + 15
    );

    const tableColumnHeaders = ["#", "Job Description"];
    const tableRows = order.job_order.map((job, index) => [index + 1, job]);

    const tableStartX = 20;
    let tableStartY = startY + Math.ceil(customerInfo.length / 2) * 12 + 25;

    // Draw Table Headers
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    tableColumnHeaders.forEach((header, i) => {
      doc.text(header, tableStartX + i * 20, tableStartY);
    });

    // Draw Table Rows
    doc.setFont("helvetica", "normal");
    tableRows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        doc.text(
          `${cell}`,
          tableStartX + cellIndex * 20,
          tableStartY + 10 + rowIndex * 10
        );
      });
    });

    // Footer Section (Timestamp)
    const footerY = tableStartY + 20 + tableRows.length * 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, footerY);

    // Save the PDF
    doc.save(`Job_Order_${order.id}.pdf`);
  };

  // asigning  priority and status
  const [statusPopup, setStatusPopup] = useState({
    visible: false,
    orderId: null,
  });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const [priorityPopup, setPriorityPopup] = useState({
    visible: false,
    orderId: null,
  });

  const handlePriorityChange = (orderId) => {
    setPriorityPopup({ visible: true, orderId });
  };
  const handleStatusChange = (orderId) => {
    setStatusPopup({ visible: true, orderId });
  };

  const savePriorityChange = () => {
    if (selectedPriority) {
      setJobOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === priorityPopup.orderId
            ? { ...order, priority: selectedPriority }
            : order
        )
      );
      setPriorityPopup({ visible: false, orderId: null });
      setSelectedPriority("");
    }
  };
  const saveStatusChange = () => {
    if (selectedStatus) {
      setJobOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === statusPopup.orderId
            ? { ...order, status: selectedStatus }
            : order
        )
      );
      setStatusPopup({ visible: false, orderId: null });
      setSelectedStatus("");
    }
  };

  const cancelStatusChange = () => {
    setStatusPopup({ visible: false, orderId: null });
    setSelectedStatus("");
  };

  const cancelPriorityChange = () => {
    setPriorityPopup({ visible: false, orderId: null });
    setSelectedPriority("");
  };

  const priorityColors = {
    Urgent: "bg-red-500 text-white",
    High: "bg-yellow-500 text-white",
    Medium: "bg-blue-500 text-white",
    Low: "bg-green-500 text-white",
  };
  // const = ["Pending", "In Progress", "Completed", "Cancelled"];
  const statusColors = {
    Pending: "bg-yellow-500 text-white",
    In_Progress: "bg-blue-500 text-white",
    Completed: "bg-green-500 text-white",
    Cancelled: "bg-red-500 text-white",
  };

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
                <h2 className="text-2xl font-bold">Bolo Job Orders</h2>

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
                    {bolo.length > 0 ? (
                      bolo.map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-100">
                          <td>{index + 1}</td>
                          <td>{order.customer_name || "N/A"}</td>
                          <td>{order.plate_number || "N/A"}</td>
                          {/* <td>{order.customer_type || "N/A"}</td> */}
                          <td>{order.make || "N/A"}</td>
                          <td>{order.year || "N/A"}</td>
                          <td>{order.body_type || "N/A"}</td>
                          <td>{order.result || "N/A"}</td>
                          <td>{order.issue_date || "N/A"}</td>
                          <td>{order.expiry_date || "N/A"}</td>
                          {/* <td>{order.tin_number || "N/A"}</td> */}
                          <td>{order.payment_total || "N/A"}</td>
                          <td>{order.employee_id || "N/A"}</td>

                          <td className="p-3 border relative">
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() => toggleDropdown(order.id)}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              >
                                Action
                              </button>
                              {dropdownVisible === order.id && (
                                <ul className="absolute top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-48 overflow-hidden">
                                  <li>
                                    <button
                                      onClick={() => generatePDF(order)}
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                      Print job order
                                    </button>
                                  </li>

                                  <li>
                                    <button
                                      onClick={() =>
                                        handleJobAction(
                                          order.job_order[0],
                                          order
                                        )
                                      } // Pass the job and order object
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                      Add to Work Order
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleViewClick(order)} // Navigate to the vehicle details page
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                      View
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        handlePriorityChange(order.id)
                                      }
                                    >
                                      Change Priority
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        handleStatusChange(order.id)
                                      }
                                    >
                                      Change Status
                                    </button>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                          <td className="py-2 px-4 border">
                            <span
                              className={`px-2 py-1 rounded ${
                                priorityColors[order.priority]
                              }`}
                            >
                              {order.priority}
                            </span>
                          </td>
                          <td className="py-2 px-4 border">
                            <span
                              className={`px-2 py-1 rounded ${
                                statusColors[order.status]
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="text-center py-4 text-gray-500"
                        >
                          No job orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      {statusPopup.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">Change Status</h3>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Pending">pending</option>
              <option value="In_Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            ;
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelStatusChange}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveStatusChange}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      ,
      {priorityPopup.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">Change Priority</h3>
            <select
              className="w-full px-4 py-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={cancelPriorityChange}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={savePriorityChange}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default BoloList;
