import { GiMoneyStack } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import { IoArrowUpCircleOutline } from "react-icons/io5";

function DashboardStatics() {
  return (
    <div className="grid grid-cols-4 gap-4 pt-[20px]">
      <div className="flex justify-center items-center gap-4 px-6 py-4 bg-stone-200  rounded-lg shadow-md">
        <div className="relative w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          {/* <GiMoneyStack /> */}
          <FaCarAlt
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-[#464255] text-[15px] font-bold">75</p>
          <p>Done Vehicle</p>
          <div className="flex justify-center items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              color="#00A389"
              className="bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-[15px] font-normal">4%(30days)</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 px-6 py-4 bg-amber-100 rounded-lg shadow-md">
        <div className="relative  w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <GiMechanicGarage
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-[#464255] text-[15px] font-bold">25</p>
          <p> Material </p>
          <div className="flex justify-center items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              color="#00A389"
              className="bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />

            <p className="text-[#464255] text-[15px] font-normal">
              45%(30days)
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 px-6 py-4 bg-cyan-100 rounded-lg shadow-md">
        <div className="relative  w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          {/* <GiMoneyStack
            
          /> */}
          <FaClock
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-[#464255] text-[15px] font-bold">15</p>
          <p>Appointment</p>
          <div className="flex justify-center items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              color="#00A389"
              className="bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-[15px] font-normal">
              10%(30days)
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 px-6 py-4 bg-indigo-100 rounded-lg shadow-md">
        <div className="relative  w-[70px] h-[70px] rounded-full bg-[#00B074] bg-opacity-[0.15]">
          <FaPeopleGroup
            size={40}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-[#464255] text-[15px] font-bold">62</p>
          <p>Customer </p>
          <div className="flex justify-center items-center gap-2">
            <IoArrowUpCircleOutline
              size={20}
              color="#00A389"
              className="bg-[#00A389] bg-opacity-[0.15] p-[2px] rounded-xl"
            />
            <p className="text-[#464255] text-[15px] font-normal">
              89%(30days)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatics;
