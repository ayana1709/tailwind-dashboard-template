import React from "react";

const ReviewStep = ({
  onPrevious,
  onNext,
  customerData,
  vehicleCondition,
  labourAndSpareData,
  carInspectionData,
}) => {
  const handleConfirm = () => {
    // Handle the final submission logic here
    onNext({
      customerData,
      vehicleCondition,
      labourAndSpareData,
      carInspectionData,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>

      {/* Customer Information */}
      <div className="mb-4">
        <h3 className="font-medium">Customer Information</h3>
        <pre>{JSON.stringify(customerData, null, 2)}</pre>
      </div>

      {/* Vehicle Condition */}
      <div className="mb-4">
        <h3 className="font-medium">Vehicle Condition</h3>
        <pre>{JSON.stringify(vehicleCondition, null, 2)}</pre>
      </div>

      {/* Labour and Spare Information */}
      <div className="mb-4">
        <h3 className="font-medium">Labour and Spare Information</h3>
        <pre>{JSON.stringify(labourAndSpareData, null, 2)}</pre>
      </div>

      {/* Car Inspection Data */}
      <div className="mb-4">
        <h3 className="font-medium">Car Inspection</h3>
        <pre>{JSON.stringify(carInspectionData, null, 2)}</pre>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
