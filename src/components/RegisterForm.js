import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import axios from "axios";

const ResiterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
    mobile_no: "",
  });

  const handleOnChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${BASE_URL}/api/auth/register`;
    try {
      const response = await axios.post(url, JSON.stringify(formData), config);
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (eror) {
      console.log("error is ", eror);
    }
  };
  const token = localStorage.getItem("token");
  if (token) navigate("/dashboard");
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-12">
            <div className="text-white text-3xl font-bold">
              BCG<span className="text-emerald-400">X</span>
            </div>
          </div>
          <h4 className="text-white text-base mt-6">
            Sign up into your account
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm mb-2 block">
                First Name
              </label>
              <input
                name="first_name"
                id="first_name"
                onChange={handleOnChange}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Last Name</label>
              <input
                name="last_name"
                id="last_name"
                onChange={handleOnChange}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                id="email"
                onChange={handleOnChange}
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">
                Mobile No.
              </label>
              <input
                name="mobile_no"
                id="mobile_no"
                type="text"
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Password</label>
              <input
                name="password"
                id="password"
                onChange={handleOnChange}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Role</label>
              <select
                name="role"
                id="role"
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-white outline-blue-500 transition-all"
              >
                <option name="user">User</option>
                <option name="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
          <p className="text-white text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ResiterForm;
