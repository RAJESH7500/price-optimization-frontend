import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import axios from 'axios';

const ResiterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: 'user',
    password: '',
    mobile_no: '',
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
        'Content-Type': 'application/json',
      },
    };
    const url = `${BASE_URL}/api/auth/register`;
    try {
      setLoading(true);
      const response = await axios.post(url, JSON.stringify(formData), config);
      setLoading(false);
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (eror) {
      console.log('error is ', eror);
      setLoading(false);
    }
  };
  const token = localStorage.getItem('token');
  if (token) navigate('/dashboard');
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
              disabled={loading}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
          <p className="text-white text-sm mt-6 text-center">
            Already have an account?{' '}
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
