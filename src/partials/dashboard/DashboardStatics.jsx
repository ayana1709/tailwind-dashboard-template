import { GiMoneyStack } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import { IoArrowUpCircleOutline } from "react-icons/io5";

function DashboardStatics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6">
      {/* Done Vehicle */}
      <div className="flex justify-between items-center gap-4 px-6 py-4 bg-stone-200 rounded-lg shadow-lg">
        <div className="relative w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <FaCarAlt
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[#00A389]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#464255] text-lg font-bold">75</p>
          <p className="text-sm text-gray-600">Done Vehicle</p>
          <div className="flex items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              className="text-[#00A389] bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-sm">4% (30 days)</p>
          </div>
        </div>
      </div>

      {/* Material */}
      <div className="flex justify-between items-center gap-4 px-6 py-4 bg-amber-100 rounded-lg shadow-lg">
        <div className="relative w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <GiMechanicGarage
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[#00A389]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#464255] text-lg font-bold">25</p>
          <p className="text-sm text-gray-600">Material</p>
          <div className="flex items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              className="text-[#00A389] bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-sm">45% (30 days)</p>
          </div>
        </div>
      </div>

      {/* Appointment */}
      <div className="flex justify-between items-center gap-4 px-6 py-4 bg-cyan-100 rounded-lg shadow-lg">
        <div className="relative w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <FaClock
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[#00A389]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#464255] text-lg font-bold">15</p>
          <p className="text-sm text-gray-600">Appointment</p>
          <div className="flex items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              className="text-[#00A389] bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-sm">10% (30 days)</p>
          </div>
        </div>
      </div>

      {/* Customer */}
      <div className="flex justify-between items-center gap-4 px-6 py-4 bg-indigo-100 rounded-lg shadow-lg">
        <div className="relative w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <FaPeopleGroup
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[#00A389]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#464255] text-lg font-bold">62</p>
          <p className="text-sm text-gray-600">Customer</p>
          <div className="flex items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              className="text-[#00A389] bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-sm">89% (30 days)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatics;
