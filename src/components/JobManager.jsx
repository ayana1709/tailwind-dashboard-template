import { useState, useRef, useLayoutEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const JobManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const location = useLocation();

  const tabs = [
    "repair",
    "bolo-list",
    "inspection-list",
    "wheel-alignment-list",
  ];

  useLayoutEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    const activeTabIndex = tabs.indexOf(currentPath);
    if (tabRefs.current[activeTabIndex]) {
      const activeTab = tabRefs.current[activeTabIndex];
      setIndicatorStyle({
        transform: `translateX(${activeTab.offsetLeft}px)`,
        width: `${activeTab.offsetWidth}px`,
      });
    }
  }, [location]);

  return (
    <div className="w-full flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative w-[95%] mx-auto my-6 mt-4 shadow-md rounded-lg">
          {/* Tab Navigation */}
          <nav className="flex rounded-t-xl overflow-hidden">
            {tabs.map((tab, index) => (
              <NavLink
                key={tab}
                to={`/job-manager/${tab}`}
                ref={(el) => (tabRefs.current[index] = el)}
                className={({ isActive }) =>
                  `relative px-4 py-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-gray-300 text-gray-600 text-black font-bold rounded-t-lg"
                      : "bg-white text-gray-500"
                  }`
                }
              >
                {tab.replace("-", " ").toUpperCase()}
              </NavLink>
            ))}
          </nav>

          {/* Active Content */}
          <div className="transition-all duration-500 px-4 pb-4 bg-gray-300 text-black rounded-b-lg shadow-md">
            <div className="pt-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManager;
