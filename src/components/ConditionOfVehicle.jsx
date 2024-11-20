import React, { useState } from "react";

const ConditionOfVehicle = ({ onPrevious, onNext }) => {
  const [formData, setFormData] = useState({
    "Fuel/ነዳጅ": false,
    "WindShieldGlass/የንፋስ መከላከያ ብርጭቆ": false,
    " Battery/ባትሪ": false,
    "RadiatorCup/የራዲያተር ዋንጫ": false,
    "EngineOilCup/የሞተር ዘይት ዋንጫ": false,
    " WiperJar/ዋይፐር ጃር": false,
    "Antenna/ አንቴና": false,
    "FrontGrill/የፊት ግሪል": false,
    "HeadLightLs/የጭንቅላት መብራት ኤል.ኤስ": false,
    "HeadLightRs/የጭንቅላት መብራት Rs": false,
    "ParkingLs/የመኪና ማቆሚያ Ls": false,
    " ParkingRs/የመኪና ማቆሚያ Rs": false,
    "DoorGlassFrLs/በር ብርጭቆ Fr Ls": false,
    "DoorGlassFrRs/በር ብርጭቆ Fr Rs": false,
    "DoorGlassRrLs/በር Glass Rr Ls": false,
    " DoorGlassRrRs/የበር ብርጭቆ Rs": false,
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
      <h2 className="text-xl font-semibold mb-4">
        Condition of Vehicle/የተሽከርካሪ ሁኔታ
      </h2>
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
