import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const user_id = localStorage.getItem('user_id');
    const url = `${BASE_URL}/api/users/${user_id}`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        url: url,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      const errorMessage = JSON.parse(error?.request?.response || '').error;
      if (errorMessage === 'token_expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
      }
    }
  };
  const token = localStorage.getItem('token');
  if (!token) navigate('/login');
  return (
    <div className="bg-zinc-900 p-4">
      <h1 className="text-emerald-400 text-xl  font-medium">
        Price Optimization Tool
      </h1>
      <div className="flex justify-end text-white items-center space-x-2">
        <span className="text-gray-400">Welcome,</span>
        <span className="text-emerald-400">
          {user?.first_name} {user.last_name}
        </span>
        <div className="w-8 h-8 bg-zinc-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
