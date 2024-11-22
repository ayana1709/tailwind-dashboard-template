import React, { useState } from "react";

const ConditionOfVehicle = ({
  customers,
  plateNumbers,
  onPrevious,
  onNext,
}) => {
  const [formData, setFormData] = useState({
    customer: "",
    plateNumber: "",
    vehicleCondition: {
      "Fuel/ነዳጅ": false,
      "WindShieldGlass/የንፋስ መከላከያ ብርጭቆ": false,
      "Battery/ባትሪ": false,
      "RadiatorCup/የራዲያተር ዋንጫ": false,
      "EngineOilCup/የሞተር ዘይት ዋንጫ": false,
      "WiperJar/ዋይፐር ጃር": false,
      "Antenna/አንቴና": false,
      "FrontGrill/የፊት ግሪል": false,
      "HeadLightLs/የጭንቅላት መብራት Ls": false,
      "HeadLightRs/የጭንቅላት መብራት Rs": false,
      "ParkingLs/የመኪና ማቆሚያ Ls": false,
      "ParkingRs/የመኪና ማቆሚያ Rs": false,
      "DoorGlassFrLs/በር ብርጭቆ Fr Ls": false,
      "DoorGlassFrRs/በር ብርጭቆ Fr Rs": false,
      "DoorGlassRrLs/በር Glass Rr Ls": false,
      "DoorGlassRrRs/የበር ብርጭቆ Rs": false,
      "FinderSignalLh/አግኚው ሲግናል Lh": false,
      "FinderSignalRh/አግኚው ሲግናል Rh": false,
      "Astray/ተሳስቷል": false,
      "FloorMat/የወለል ንጣፍ": false,
      "Lighter/ቀለሉ": false,
      "MirrorViewInside/የመስታወት እይታ ከውስጥ": false,
      "MirrorViewLh/የመስታወት እይታ Lh": false,
      "MirrorViewRh/የመስታወት እይታ Rh": false,
      "RadioKnob/የሬዲዮ መቆጣጠሪያ": false,
      "TapeRecorderCd/የቴፕ መቅጃ ሲዲ": false,
      "TailLampLh/የጅራት መብራት Lh": false,
      "TailLampRh/የጅራት መብራት Rh": false,
      "HubCap/ሃብ ካፕ": false,
      "SpareWheel/መለዋወጫ ጎማ": false,
      "Tools/መሳሪያዎች": false,
      "Jack/ጃክ": false,
      "FireExtinguisher/የእሳት ማጥፊያ": false,
      "RrBumper/Rr ባምፐር": false,
      "FuelTankCup/የነዳጅ ማጠራቀሚያ ዋንጫ": false,
      "KeyHolder/ቁልፍ ያዥ": false,
      "Tyre/ጎማ": false,
    },
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        vehicleCondition: {
          ...prevState.vehicleCondition,
          [name]: checked,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (!formData.customer || !formData.plateNumber) {
      alert("Please select a customer and plate number.");
      return;
    }
    onNext(formData);
  };

  const filteredPlateNumbers = plateNumbers.filter(
    (plate) => plate.customerId.toString() === formData.customer
  );

  const formatLabel = (label) =>
    label
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/\//g, " - ")
      .trim();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Condition of Vehicle/የተሽከርካሪ ሁኔታ
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Customer
          </label>
          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Plate Number
          </label>
          <select
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={!formData.customer}
          >
            <option value="">Select a plate number</option>
            {filteredPlateNumbers.map((plate) => (
              <option key={plate.id} value={plate.id}>
                {plate.number}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(formData.vehicleCondition).map((key) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={formData.vehicleCondition[key]}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={!formData.customer || !formData.plateNumber}
                aria-label={formatLabel(key)}
              />
              <label htmlFor={key} className="ml-2 text-sm font-medium">
                {formatLabel(key)}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConditionOfVehicle;
