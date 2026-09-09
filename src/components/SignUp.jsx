import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Signup successful:", res.data);

       alert("Signup successful! 🎉");
       
         navigate("/login");

      // You can navigate to login/home here
      // navigate("/login");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-lg">DT</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>

            <p className="text-slate-400">
              Join the DevTinder community
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                disabled={loading}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          © 2024 DevTinder. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
