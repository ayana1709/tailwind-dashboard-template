import React from "react";

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Types of Jobs
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Customer </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Vehicle</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Spare</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Payment</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 mr-2 sm:mr-3"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle fill="#4CAF50" cx="18" cy="18" r="18" />

                      <path
                        d="M20.2 10.2l-1.6 1.6 1.8 1.8c.4.4.4 1 0 1.4l-1.4 1.4-1.8-1.8-6.4 6.4c-.6.6-.6 1.6 0 2.2l1.4 1.4c.6.6 1.6.6 2.2 0l6.4-6.4-1.8-1.8 1.4-1.4c.4-.4 1-.4 1.4 0l1.8 1.8 1.6-1.6c1.6-1.6 1.2-4.4-.8-5.4-1.8-1-4.2-.4-5.6 1z"
                        fill="#FFC107"
                        stroke="#FFF"
                        strokeWidth="0.5"
                      />
                    </svg>

                    <div className="text-gray-800 dark:text-gray-100">
                      Repair
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">75</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">120</div>
                </td>
                <td className="p-2">
                  <div className="text-center">100</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">33000</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 mr-2 sm:mr-3"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <g fill="#FFF">
                        <circle
                          cx="18"
                          cy="18"
                          r="6"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          fill="none"
                        />

                        <path
                          d="M18 12 v-2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 24 v2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 18 h-2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M24 18 h2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />

                        <circle cx="18" cy="18" r="1" />
                      </g>
                    </svg>

                    <div className="text-gray-800 dark:text-gray-100">
                      Wheel Alignemnt
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">250</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">321</div>
                </td>
                <td className="p-2">
                  <div className="text-center">23</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">44432</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 mr-2 sm:mr-3"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle fill="#4CAF50" cx="18" cy="18" r="18" />

                      <path
                        d="M12 14c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v4c0 2.2-1.8 4-4 4h-2l-3 3v-3h-1c-2.2 0-4-1.8-4-4v-4z"
                        fill="#FFF"
                      />

                      <circle cx="18" cy="18" r="1.5" fill="#4CAF50" />

                      <path d="M15 14h6v2h-6v-2z" fill="#FFC107" />
                    </svg>

                    <div className="text-gray-800 dark:text-gray-100">Bolo</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">210</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">123</div>
                </td>
                <td className="p-2">
                  <div className="text-center">224</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">42222</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 mr-2 sm:mr-3"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <g fill="#FFF">
                        <circle cx="18" cy="18" r="4" />
                        <path
                          d="M18 10v2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 24v2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M24 18h2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 18h2"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M22.6 13.4l1.4-1.4"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M13.4 22.6l-1.4 1.4"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M22.6 22.6l1.4 1.4"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M13.4 13.4l-1.4-1.4"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />

                        <path
                          d="M25 12.5l-2.5 2.5c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l2.5-2.5c.4-.4.4-1 0-1.4L26.4 12.5c-.4-.4-1-.4-1.4 0z"
                          fill="#FFF"
                        />
                      </g>
                    </svg>

                    <div className="text-gray-800 dark:text-gray-100">
                      Service{" "}
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1000</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,236</div>
                </td>
                <td className="p-2">
                  <div className="text-center">220</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">40928</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 mr-2 sm:mr-3"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle fill="#FF5722" cx="18" cy="18" r="18" />

                      <path
                        d="M22.5 22.5l4 4"
                        stroke="#FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="18"
                        cy="18"
                        r="5"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="2"
                      />

                      <circle cx="18" cy="18" r="2.5" fill="#FFC107" />
                    </svg>

                    <div className="text-gray-800 dark:text-gray-100">
                      Inspection
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">12222</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">29</div>
                </td>
                <td className="p-2">
                  <div className="text-center">2042</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">32101</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
