import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

export default function ViewRepair() {
  const { id } = useParams();
  const [repairData, setRepairData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepairDetails = async () => {
      try {
        const response = await api.get(`/repairs/${id}`);
        if (response.data) {
          setRepairData(response.data);
        } else {
          throw new Error("Invalid data received");
        }
      } catch (error) {
        console.error("Error fetching repair details", error);
        setError("Failed to fetch repair details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600 text-lg">{error}</p>;
  }

  if (!repairData) {
    return <p className="text-center mt-10 text-lg">No repair data available.</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Header />

        <main className="p-6 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Repair Registration Details
          </h2>

          {/* Customer Information */}
          <div className="border p-6 rounded-lg bg-white shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Customer Information
            </h3>
            <p><strong>Name:</strong> {repairData?.customer_name || "N/A"}</p>
            <p><strong>Type:</strong> {repairData?.customer_type || "N/A"}</p>
            <p><strong>Mobile:</strong> {repairData?.mobile || "N/A"}</p>
            <p><strong>Email:</strong> {repairData?.email || "N/A"}</p>
          </div>

          {/* Repair Details */}
          <div className="border p-6 rounded-lg bg-white shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Repair Details
            </h3>
            <p><strong>Received Date:</strong> {repairData?.received_date || "N/A"}</p>
            <p><strong>Estimated Completion Date:</strong> {repairData?.estimated_date || "N/A"}</p>
            <p><strong>Priority:</strong> {repairData?.priority || "N/A"}</p>
            <p><strong>Repair Category:</strong> {repairData?.repair_category || "N/A"}</p>
            <p><strong>Description:</strong> {repairData?.description || "N/A"}</p>
          </div>

          {/* Vehicle Information */}
          {repairData?.vehicles?.length > 0 && (
            <div className="border p-6 rounded-lg bg-white shadow mb-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Vehicle Information
              </h3>
              {repairData.vehicles.map((vehicle, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-100 mb-3">
                  <p><strong>Plate No:</strong> {vehicle?.plate_no || "N/A"}</p>
                  <p><strong>Model:</strong> {vehicle?.model || "N/A"}</p>
                  <p><strong>Year:</strong> {vehicle?.year || "N/A"}</p>
                  <p><strong>KM Reading:</strong> {vehicle?.km_reading || "N/A"}</p>
                  <p><strong>Estimated Price:</strong> ${vehicle?.estimated_price || "N/A"}</p>
                </div>
              ))}
            </div>
          )}

          {/* Assigned Technician */}
          <div className="border p-6 rounded-lg bg-white shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Assigned Technician
            </h3>
            <p><strong>Name:</strong> {repairData?.technician_name || "Not Assigned"}</p>
            <p><strong>Contact:</strong> {repairData?.technician_contact || "N/A"}</p>
          </div>

          {/* Payment Details */}
          <div className="border p-6 rounded-lg bg-white shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Payment Information
            </h3>
            <p><strong>Payment Status:</strong> {repairData?.payment_status || "Pending"}</p>
            <p><strong>Total Cost:</strong> ${repairData?.total_cost || "Not Calculated"}</p>
            <p><strong>Paid Amount:</strong> ${repairData?.paid_amount || "0"}</p>
            <p><strong>Remaining Balance:</strong> ${repairData?.remaining_balance || "0"}</p>
          </div>

          {/* Repair Status */}
          <div className="border p-6 rounded-lg bg-white shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Repair Status
            </h3>
            <p><strong>Current Status:</strong> {repairData?.status || "In Progress"}</p>
            <p><strong>Last Updated:</strong> {repairData?.last_updated || "N/A"}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
