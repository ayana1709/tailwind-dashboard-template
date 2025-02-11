import React, { useState, useEffect } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const JobOrderList = () => {
  const [repairs, setRepairs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await api.get("/repairs");
        setRepairs(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching repair registrations:", error);
        setRepairs([]);
      }
    };
    fetchRepairs();
  }, []);

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Orders Report", 20, 10);
    doc.autoTable({
      head: [
        [
          "Job ID",
          "Customer Name",
          "Plate No",
          "Repair Category",
          "Received Date",
        ],
      ],
      body: displayedRepairs.map((repair) => [
        repair.id,
        repair.customer_name,
        repair.plate_no,
        repair.repair_category,
        repair.received_date,
      ]),
    });
    doc.save("JobOrders.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(displayedRepairs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job Orders");
    XLSX.writeFile(workbook, "JobOrders.xlsx");
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-wrap gap-3 justify-start mb-4">
        <button
          onClick={exportToPDF}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Export PDF
        </button>
        <button
          onClick={exportToExcel}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
        >
          Export Excel
        </button>
        <button
          onClick={printTable}
          className="bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600"
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-300 text-gray-700 text-xs">
            <tr>
              {[
                "Job ID",
                "Customer Name",
                "Plate No",
                "Repair Category",
                "Received Date",
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
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              displayedRepairs.map((repair) => (
                <tr key={repair.id} className="border-b hover:bg-gray-200">
                  <td className="px-4 py-3">{repair.id}</td>
                  <td className="px-4 py-3 font-medium">
                    {repair.customer_name}
                  </td>
                  <td className="px-4 py-3">{repair.plate_no}</td>
                  <td className="px-4 py-3">{repair.repair_category}</td>
                  <td className="px-4 py-3">{repair.received_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobOrderList;
