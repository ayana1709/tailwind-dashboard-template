import React, { useState } from "react";

const CustomerInformation = ({ onNext }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    telephone: "",
    carModel: "",
    tinNo: "",
    plateNo: "",
    chassisNo: "",
    dateIn: "",
    km: "",
    priceEstimation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Customer Information/የደንበኛ መረጃ
      </h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium">
              Customer Name /የደንበኛ ስም
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium">
              Telephone/ ስልክ
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="carModel" className="block text-sm font-medium">
              Car Model/ የመኪና ሞዴል
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="tinNo" className="block text-sm font-medium">
              Tin No/የቲን ቁጥር
            </label>
            <input
              type="text"
              id="tinNo"
              name="tinNo"
              value={formData.tinNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="plateNo" className="block text-sm font-medium">
              Plate No/የሰሌዳ ቁጥር
            </label>
            <input
              type="text"
              id="plateNo"
              name="plateNo"
              value={formData.plateNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="chassisNo" className="block text-sm font-medium">
              Chassis No/ቻሲስ ቁጥር
            </label>
            <input
              type="text"
              id="chassisNo"
              name="chassisNo"
              value={formData.chassisNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="dateIn" className="block text-sm font-medium">
              Date In/የገባበት ቀን
            </label>
            <input
              type="date"
              id="dateIn"
              name="dateIn"
              value={formData.dateIn}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="km" className="block text-sm font-medium">
              Km/ኪ.ሜ
            </label>
            <input
              type="number"
              id="km"
              name="km"
              value={formData.km}
              onChange={handleChange}
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
              value={formData.priceEstimation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
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

export default CustomerInformation;
