import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { NavLink } from "react-router-dom";
import logo from "./../images/aa.png";

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
      }
    };

    fetchCustomers();
  }, []);

  const handleImportClick = () => {
    console.log("Import button clicked!");
    // Add logic for file upload or import process
  };

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
  // You may need to install this to manage table rendering easily

  const generatePDF = (customer) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Add Company Logo
    const logoWidth = 60; // Logo width
    const logoHeight = 30; // Logo height
    const logoX = 20; // Align to the left
    const logoY = 10; // Position at the top
    // Replace `logo` with your actual logo path or base64 string
    // const logo = "/../images/aa.png";
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Company Name
    const companyName = "SPEED MEETER TRADING PLC";
    const companyNameX = 95; // Adjust this value to align with logo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(companyName, companyNameX, 20);

    // Add Divider Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 40, pageWidth - 10, 40);

    // Customer Information Section (two columns)
    const customerInfo = [
      { label: "Customer Name:", value: customer.name },
      { label: "Telephone:", value: customer.telephone },
      { label: "Customer Type:", value: customer.customerType },
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

    // Add Divider Line Below Customer Info
    doc.setDrawColor(0);
    doc.line(
      10,
      startY + Math.ceil(customerInfo.length / 2) * 12 + 5,
      pageWidth - 10,
      startY + Math.ceil(customerInfo.length / 2) * 12 + 5
    );

    // Add Job Order Details Table (if applicable)
    if (customer.orders && customer.orders.length > 0) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(
        "Orders:",
        10,
        startY + Math.ceil(customerInfo.length / 2) * 12 + 15
      );

      const tableColumnHeaders = ["#", "Order ID", "Date", "Amount"];
      const tableRows = customer.orders.map((order, index) => [
        index + 1,
        order.id,
        order.date,
        order.amount,
      ]);

      const tableStartX = 20;
      let tableStartY;
      tableStartY = startY + Math.ceil(customerInfo.length / 2) * 12 + 25;

      // Draw Table Headers
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      tableColumnHeaders.forEach((header, i) => {
        doc.text(header, tableStartX + i * 30, tableStartY);
      });

      // Draw Table Rows
      doc.setFont("helvetica", "normal");
      tableRows.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          doc.text(
            `${cell}`,
            tableStartX + cellIndex * 30,
            tableStartY + 10 + rowIndex * 10
          );
        });
      });
    }

    // Save the PDF
    doc.save(`Customer_${customer.id}_Report.pdf`);
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-700">
                  List of Customers
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <NavLink
                    to="/customers"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto text-center"
                  >
                    Add Customer
                  </NavLink>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                  <thead className="bg-gray-400 text-black">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">ID</th>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">
                        Telephone
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Customer Type
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Car Model
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Plate Number
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Car Status
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Payment Status
                      </th>
                      <th className="py-3 px-4 border-b text-left">Edit</th>
                      <th className="py-3 px-4 border-b text-left">Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, customerIndex) => (
                      <React.Fragment key={customer.id}>
                        {customer.carModels.map((car, carIndex) => (
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
                                  rowSpan={customer.carModels.length}
                                >
                                  {customerIndex + 1}
                                </td>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.carModels.length}
                                >
                                  {customer.name}
                                </td>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.carModels.length}
                                >
                                  {customer.telephone}
                                </td>
                                <td
                                  className="py-3 px-4 border-b"
                                  rowSpan={customer.carModels.length}
                                >
                                  {customer.customerType}
                                </td>
                              </>
                            )}
                            <td className="py-3 px-4 border-b">
                              {car.carModel}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {car.plateNo}
                            </td>

                            <td
                              className={`py-3 px-4 border-b rounded ${getStatusClass(
                                car.car_status
                              )}`}
                            >
                              <select
                                className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={car.car_status}
                                onChange={(e) => {
                                  const updatedStatus = e.target.value;
                                  console.log(
                                    `Updated car status: ${updatedStatus}`
                                  );
                                }}
                              >
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
                              <select
                                className="px-2 py-1 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={car.payment_status}
                                onChange={(e) => {
                                  const updatedPaymentStatus = e.target.value;
                                  console.log(
                                    `Updated payment status: ${updatedPaymentStatus}`
                                  );
                                }}
                              >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Half Paid">Half Paid</option>
                                <option value="Paid">Paid</option>
                              </select>
                            </td>

                            <td className="py-3 px-4 border-b">
                              <NavLink
                                to={`/edit-customer/${customer.id}`}
                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              >
                                Edit
                              </NavLink>
                            </td>
                            <td className="py-3 px-4 border-b">
                              <button
                                onClick={() => generatePDF(customer)}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                print
                              </button>
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
