import React, { useState } from "react";
import axios from "axios";
import logo from "./../images/lg.png"; // Replace with the actual path to your logo image

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", response.data.token);
      onLogin(response.data.admin); // Redirect to dashboard
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Logo and Header */}
        <div className="text-center p-6 bg-gradient-to-r from-gray-600 to-gray-600 text-white">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 mx-auto mb-4 object-cover rounded-full border-4 border-white"
          />
          <h1 className="text-3xl font-extrabold">Speed Meter Trading Plc</h1>
          <p className="text-sm font-medium">ስፒድ ሜትር ትሬዲንግ ኃላ የተ የግ ማህበር</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
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
        </form>

        {/* Footer */}
        <div className="p-4 bg-gray-100 text-center text-gray-600 text-sm">
          © 2024 Speed Meter Trading Plc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
