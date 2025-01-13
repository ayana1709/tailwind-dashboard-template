import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoadingSpinner from "./LoadingSpinner";
import api from "../api"; // Import axios instance

const VehicleDetails = () => {
  const { state } = useLocation();
  const [vehicleDetails, setVehicleDetails] = useState(state?.order || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vehicleDetails) {
      console.log("Fetching vehicle details...");
      setLoading(true);
      api
        .get(`/vehicle/${state?.vehicleId}`)
        .then((response) => {
          console.log("Fetched data:", response.data);
          setVehicleDetails(response.data.vehicle);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching vehicle details:", error);
          setError("Failed to fetch vehicle details.");
          setLoading(false);
        });
    }
  }, [vehicleDetails, state?.vehicleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  if (!vehicleDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">
          Vehicle details not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="grow p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Vehicle Details
            </h2>
            {/* <div>
              {vehicleDetails && (
                <pre>{JSON.stringify(vehicleDetails, null, 2)}</pre>
              )}
              {error && <div className="text-red-500">{error}</div>}
            </div> */}

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Plate Number:</h3>
                  <p className="text-gray-600">{vehicleDetails.plate_number}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Customer Name:</h3>
                  <p className="text-gray-600">
                    {vehicleDetails.customer_name}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Job Orders:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {vehicleDetails.job_order.map((job, index) => (
                      <li key={index}>{job}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Customer Observation :
                  </h3>
                  <p className="text-gray-600">
                    {vehicleDetails.customer_observation}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Date In:</h3>
                  <p className="text-gray-600">{vehicleDetails.date_in}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Out:</h3>
                  <p className="text-gray-600">
                    {vehicleDetails.promised_date}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Job To be Done :</h3>
                  <p className="text-gray-600">
                    {vehicleDetails.job_to_be_done}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Additional Work :</h3>
                  <p className="text-gray-600">
                    {vehicleDetails.additional_work}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VehicleDetails;
