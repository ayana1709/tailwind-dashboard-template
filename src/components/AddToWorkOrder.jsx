import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Swal from "sweetalert2";

const AddToWorkOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plateNumber, customerName, jobTitle } = location.state || {};
  const [employee_id, setemployee_id] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 1,
      workDescription: "",
      laborTime: 1, // Lab. Time (replace Quantity)
      cost: 0, // Cost (Unit Price)
      total: 0, // Total Cost
      startDate: "",
      endDate: "",
      status: "Pending",
    },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/select-employee");
        setEmployees(response.data.data); // Access the 'data' array inside the response
      } catch (error) {
        setError("Failed to load employees.");
      }
    };

    fetchEmployees();
  }, []);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        workDescription: "",
        laborTime: 1,
        cost: 0,
        total: 0,
        startDate: "",
        endDate: "",
        status: "Pending",
      },
    ]);
  };

  const handleChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? { ...row, [field]: value, total: row.laborTime * row.cost }
        : row
    );
    setRows(updatedRows);
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSubmit = () => {
    if (rows.some((row) => !row.workDescription)) {
      setError(
        "Please select work description and provide a work description for all rows."
      );
      return;
    }

    const newWorkOrder = {
      plateNumber,
      customerName,
      employee_id,
      jobTitle,
      workDetails: rows,
    };

    console.log("Work Order Data: ", newWorkOrder); // Check what is being submitted

    api
      .post("/work-orders", newWorkOrder)

      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Work order has been successfully saved.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000, // Automatically close after 2 seconds
          showConfirmButton: true, // Show button for manual close
          allowOutsideClick: false, // Prevent click outside to close
        }).then(() => {
          navigate("/list-of-Vehicle");
        });
      })
      .catch((error) => {
        console.error("Error response:", error.response?.data || error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to save the work order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
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
            <div className="p-4">
              <h2 className="text-xl font-bold text-center mb-6">
                Create Work Order
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Plate Number
                </label>
                <input
                  type="text"
                  value={plateNumber || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Employee
                </label>
                <select
                  value={employee_id}
                  onChange={(e) => setemployee_id(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addRow}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Add Row
              </button>

              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">No.</th>
                    <th className="border p-2">Work Description</th>
                    <th className="border p-2">Labor Time</th>
                    <th className="border p-2">Cost</th>
                    <th className="border p-2">Total Cost</th>
                    <th className="border p-2">Start Date</th>
                    <th className="border p-2">End Date</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border p-2 text-center">{row.id}</td>
                      <td className="border p-2">
                        <textarea
                          value={row.workDescription}
                          onChange={(e) =>
                            handleChange(
                              row.id,
                              "workDescription",
                              e.target.value
                            )
                          }
                          rows="2"
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.laborTime}
                          onChange={(e) =>
                            handleChange(row.id, "laborTime", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.cost}
                          onChange={(e) =>
                            handleChange(row.id, "cost", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2 text-center">{row.total}</td>
                      <td className="border p-2">
                        <input
                          type="date"
                          value={row.startDate}
                          onChange={(e) =>
                            handleChange(row.id, "startDate", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="date"
                          value={row.endDate}
                          onChange={(e) =>
                            handleChange(row.id, "endDate", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          value={row.status}
                          onChange={(e) =>
                            handleChange(row.id, "status", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => deleteRow(row.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit Work Order
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddToWorkOrder;
