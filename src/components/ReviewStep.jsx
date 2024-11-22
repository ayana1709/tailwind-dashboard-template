import { useState } from "react";

const ReviewStep = ({
  onPrevious,
  onFinish,
  initialLabourData = [],
  initialSpareData = [],
}) => {
  // Initialize state for labour and spare data
  const [labourData, setLabourData] = useState(initialLabourData);
  const [spareData, setSpareData] = useState(initialSpareData);

  // State for final inputs
  const [fullName, setFullName] = useState("");
  const [customerSignature, setCustomerSignature] = useState("");
  const [receptionistSignature, setReceptionistSignature] = useState("");

  // Handle price change for labour
  const handleLabourPriceChange = (index, value) => {
    const updatedLabourData = [...labourData];
    updatedLabourData[index].price = value;
    setLabourData(updatedLabourData);
  };

  // Handle price change for spare parts
  const handleSparePriceChange = (index, value) => {
    const updatedSpareData = [...spareData];
    updatedSpareData[index].price = value;
    setSpareData(updatedSpareData);
  };

  // Handle final submission
  const handleFinish = () => {
    const finalData = {
      labourData,
      spareData,
      fullName,
      customerSignature,
      receptionistSignature,
    };
    onFinish(finalData); // Pass all data to the parent component
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Review and Sign/ይገምግሙ እና ይመዝገቡ
      </h2>

      {/* Flex container for tables */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Labour Table */}
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">
            Labour Information/የሰራተኛ መረጃ
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Label
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price (ETB)
                </th>
              </tr>
            </thead>
            <tbody>
              {labourData.map((labour, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {labour.label}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={labour.price || ""}
                      onChange={(e) =>
                        handleLabourPriceChange(index, e.target.value)
                      }
                      placeholder="Enter Price"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Spare Table */}
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">
            Spare Parts Information/መለዋወጫዎች መረጃዎች
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Label
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price (ETB)
                </th>
              </tr>
            </thead>
            <tbody>
              {spareData.map((spare, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {spare.label}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={spare.price || ""}
                      onChange={(e) =>
                        handleSparePriceChange(index, e.target.value)
                      }
                      placeholder="Enter Price"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Step Inputs */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">
          Final Information/የመጨረሻ መረጃ
        </h3>
        <div>
          <label htmlFor="km" className="block text-sm font-medium">
            Km/ኪ.ሜ
          </label>
          <input
            type="number"
            id="km"
            name="km"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label
            htmlFor="priceEstimation"
            className="block text-sm font-medium"
          >
            Price Estimation (ETB)/የዋጋ ግምት (ETB)
          </label>
          <input
            type="number"
            id="priceEstimation"
            name="priceEstimation"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name/ሙሉ ስም
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
          />
        </div>

        {/* Customer's Signature */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer's Signature/የደንበኛው ፊርማ
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={customerSignature}
            onChange={(e) => setCustomerSignature(e.target.value)}
            placeholder="Enter Customer's Signature"
          />
        </div>

        {/* Receptionist's Signature */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receptionist's Signature/የተቀባይ ፊርማ
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={receptionistSignature}
            onChange={(e) => setReceptionistSignature(e.target.value)}
            placeholder="Enter Receptionist's Signature"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleFinish}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
