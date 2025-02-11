import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Swal from "sweetalert2";

const AddToWorkOrder = () => {
  const { id } = useParams(); // Get ID from URL params
  const location = useLocation();
  const navigate = useNavigate();

  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchRepairById = async () => {
      if (!id) return; // Ensure ID is available before fetching

      try {
        const response = await api.get(`/repairs/${id}`);
        console.log("Fetched Repair Data:", response.data); // Debugging
        setRepair(response.data); // Store the fetched repair object
      } catch (error) {
        console.error("Error fetching repair details:", error);
        setRepair(null);
      }
    };

    fetchRepairById();
  }, [id]);

  const { plateNumber, customerName, jobTitle } = location.state || {};
  const [employee_id, setemployee_id] = useState("");
  const [repairs, setRepairs] = useState([]);
  const [employees, setEmployees] = useState([]);

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
  const [rows, setRows] = useState([
    {
      id: 1,
      workDescription: "",
      code: "",
      AssignTo: "",
      EstimationTime: "",
      unit: "",
      totalcost: "",
      TimeIn: "",
      TimeOut: "",
      Remark: "",
      status: "Pending",
    },
  ]);
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        code: "",
        workDescription: "",
        AssignTo: "",
        EstimationTime: "",
        unit: "",
        totalcost: "",
        TimeIn: "",
        TimeOut: "",
        Remark: "",
        status: "Pending",
      },
    ]);
  };
  const handleChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value, // Update the changed field
              totalcost:
                field === "EstimationTime"
                  ? Number(value) * Number(row.unit) // Update totalcost when EstimationTime changes
                  : field === "unit"
                  ? Number(value) * Number(row.EstimationTime) // Update totalcost when unit changes
                  : row.totalcost, // Keep totalcost unchanged if other fields are updated
            }
          : row
      )
    );
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSubmit = () => {
    if (rows.some((row) => !row.workDescription)) {
      setError("Please provide a work description for all rows.");
      return;
    }

    const newWorkOrder = {
      job_card_no: id,
      plate_number: repair?.plate_no,
      customer_name: repair?.customer_name,
      repair_category: repair?.repair_category,
      work_details: rows, // Array of work details
    };

    api
      .post("/work-orders", newWorkOrder)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Work order has been successfully saved.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/job-manager/repair");
        });
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
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
                Add to Work Order
              </h2>

              {/* Job Card No */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Job Card No
                </label>
                <input
                  type="text"
                  value={id || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Plate Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Plate Number
                </label>
                <input
                  type="text"
                  value={repair?.plate_no || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Customer Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={repair?.customer_name || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Repair Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Repair Category
                </label>
                <input
                  type="text"
                  value={repair?.repair_category || ""}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                onClick={addRow}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
              >
                + Add New Work
              </button>
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border p-2">#</th>
                    <th className="border p-2">Code</th>
                    <th className="border p-2">Work Description</th>
                    <th className="border p-2">Assign To </th>
                    <th className="border p-2">E.Time</th>
                    <th className="border p-2">Unit</th>
                    <th className="border p-2">T.cost</th>
                    <th className="border p-2">Time In </th>
                    <th className="border p-2">Time Out </th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Remark</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border p-2 text-center">{row.id}</td>
                      {/* code */}
                      <td className="border p-2">
                        <input
                          type="text"
                          value={row.code}
                          onChange={(e) =>
                            handleChange(row.id, "code", e.target.value)
                          }
                          rows="2"
                          className="w-full border rounded px-2 py-1"
                        ></input>
                      </td>
                      {/* work description */}
                      <td className="border p-2">
                        <input
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
                      {/* Assign To */}
                      <td className="border p-2">
                        <select
                          value={row.AssignTo}
                          onChange={(e) =>
                            handleChange(row.id, "AssignTo", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="">Select Employee</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.full_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.EstimationTime}
                          onChange={(e) =>
                            handleChange(
                              row.id,
                              "EstimationTime",
                              e.target.value
                            )
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.unit}
                          onChange={(e) =>
                            handleChange(row.id, "unit", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.totalcost}
                          disabled
                          className="w-full border rounded px-2 py-1 bg-gray-200"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="datetime-local"
                          value={row.TimeIn}
                          onChange={(e) =>
                            handleChange(row.id, "TimeIn", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="datetime-local"
                          value={row.TimeOut}
                          onChange={(e) =>
                            handleChange(row.id, "TimeOut", e.target.value)
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
                      <td className="border p-2">
                        <input
                          value={row.Remark}
                          onChange={(e) =>
                            handleChange(row.id, "Remark", e.target.value)
                          }
                          rows="2"
                          className="w-full border rounded px-2 py-1"
                        />
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
              <div className="col-span-2 text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md mt-6 transition duration-300 shadow-md shadow-gray-500/90 focus:shadow-sm"
                >
                  Submit
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
