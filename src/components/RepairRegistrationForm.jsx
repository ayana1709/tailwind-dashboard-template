import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

export default function RepairRegistrationForm() {
  const [vehicles, setVehicles] = useState([{}]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const addVehicle = () => {
    setVehicles([...vehicles, {}]);
  };
  const removeVehicle = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
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
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Repair Registration Form</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Customer Details */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <div className="space-y-2">
                  <label>Customer Name</label>
                  <input type="text" className="w-full border p-2 rounded" />

                  <label>Customer Type</label>
                  <input type="text" className="w-full border p-2 rounded" />

                  <label>Mobile</label>
                  <input type="text" className="w-full border p-2 rounded" />

                  <label>Received Date</label>
                  <input type="date" className="w-full border p-2 rounded" />

                  <label>E. Date</label>
                  <input type="date" className="w-full border p-2 rounded" />

                  <label>Promise Date</label>
                  <input type="date" className="w-full border p-2 rounded" />

                  <label>Priority</label>
                  <input type="text" className="w-full border p-2 rounded" />

                  <label>Repair Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label>
                      <input
                        type="checkbox"
                        name="repairCategory"
                        value="General Service"
                      />{" "}
                      General Service
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repairCategory"
                        value="Body"
                      />{" "}
                      Body
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repairCategory"
                        value="Mechanical"
                      />{" "}
                      Mechanical
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repairCategory"
                        value="Electrical"
                      />{" "}
                      Electrical
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repairCategory"
                        value="Diagnostic"
                      />{" "}
                      Diagnostic
                    </label>
                  </div>
                </div>

                {/* Customer Observations, Spare Change, and Received By - Vertically Aligned */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Customer Observations
                    </h3>
                    <textarea className="w-full border p-2 rounded h-20"></textarea>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Spare Change</h3>
                    <textarea className="w-full border p-2 rounded h-20"></textarea>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Received By</h3>
                    <input type="text" className="w-full border p-2 rounded" />
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="col-span-1 text-right">
                <h3 className="font-semibold mb-2">Vehicle Details</h3>
                <button
                  onClick={addVehicle}
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Add Vehicle +
                </button>
                {vehicles.map((_, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 border rounded-lg relative inline-block text-left"
                  >
                    <h4 className="font-semibold">Vehicle {index + 1}</h4>
                    {index > 0 && (
                      <button
                        onClick={() => removeVehicle(index)}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        ✖
                      </button>
                    )}
                    <label>Plate No</label>
                    <input type="text" className="w-full border p-2 rounded" />

                    <label>Model</label>
                    <input type="text" className="w-full border p-2 rounded" />

                    <label>VIN</label>
                    <input type="text" className="w-full border p-2 rounded" />

                    <label>Year</label>
                    <input type="text" className="w-full border p-2 rounded" />

                    <label>Condition</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label>
                        <input type="checkbox" name="condition" value="New" />{" "}
                        New
                      </label>
                      <label>
                        <input type="checkbox" name="condition" value="Used" />{" "}
                        Used
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="condition"
                          value="Average"
                        />{" "}
                        Average
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="condition"
                          value="Damage"
                        />{" "}
                        Damage
                      </label>
                    </div>

                    <label>KM Reading</label>
                    <input type="text" className="w-full border p-2 rounded" />

                    <label>E. Price</label>
                    <input type="text" className="w-full border p-2 rounded" />
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-6 bg-green-500 text-white p-2 w-full rounded">
              Submit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
