import React, { useState } from "react";

const ConditionOfVehicle = ({ onPrevious, onNext }) => {
  const [formData, setFormData] = useState({
    Fuel: false,
    WindShieldGlass: false,
    Battery: false,
    RadiatorCup: false,
    EngineOilCup: false,
    WiperJar: false,
    Antenna: false,
    FrontGrill: false,
    HeadLightLs: false,
    HeadLightRs: false,
    ParkingLs: false,
    ParkingRs: false,
    DoorGlassFrLs: false,
    DoorGlassFrRs: false,
    DoorGlassRrLs: false,
    DoorGlassRrRs: false,
    FinderSignalLh: false,
    FinderSignalRh: false,
    Astray: false,
    FloorMat: false,
    Lighter: false,
    MirrorViewInside: false,
    MirrorViewLh: false,
    MirrorViewRh: false,
    RadioKnob: false,
    TapeRecorderCd: false,
    TailLampLh: false,
    TailLampRh: false,
    HubCap: false,
    SpareWheel: false,
    Tools: false,
    Jack: false,
    FireExtinguisher: false,
    RrBumper: false,
    FuelTankCup: false,
    KeyHolder: false,
    Tyre: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Condition of Vehicle</h2>
      <form>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={formData[key]}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={key} className="ml-2 text-sm font-medium">
                {key.replace(/([A-Z])/g, " $1").trim()}
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
            Previous Page
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
