import React, { useState } from "react";
import api from "../api";
import logo from "./../images/aa.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/admin/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      onLogin(response.data.admin);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 p-4">
      <div className="relative h-full w-[95%] mx-auto flex gap-8 bg-gray-800 px-4 py-4 rounded-md bg-car-image bg-gradient-bg bg-cover bg-center">
        {/* <div className="w-[50%] overflow-hidden bg-car-image bg-gradient-bg bg-cover bg-center rounded-md"></div> */}
        <div className="absolute right-[25%] translate-x-1/2 w-full max-w-md overflow-hidden">
          <div className="text-center p-6 text-white">
            <img src={logo} />
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-gray-300 font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="placeholder:text-gray-300 w-full mt-2 p-3 border-2 border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-0 outline-none focus:outline-none focus:border-gray-200 transition-all duration-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="placeholder:text-gray-300 w-full mt-2 p-3 rounded-lg bg-gray-600 border-2 border-gray-700 bg-gray-900 text-white focus:ring-0 focus:outline-none outline-none focus:border-gray-200 transition-all duration-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-900 hover:bg-cyan-800 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
            <div className="flex justify-center py-4 inline-block bg-gray-900 text-left text-gray-300 text-sm rounded-md">
              <p>© 2025 Speed Meter Trading Plc. All rights reserved.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
