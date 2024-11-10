import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginname, setLoginname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      loginname: loginname,
      password: password,
    };

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/login`, user);
      const username = response.data.loggedinuser.username;
      console.log("Navigating to home");
      navigate(`/user/${response.data.loggedinuser.username}`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("Error Request:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-sm bg-white p-12 rounded-3xl shadow-2xl transform transition-transform hover:scale-105" style={{ height: '500px' }}>
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={loginname}
              onChange={(e) => setLoginname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit" 
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/Signup" className="text-blue-500 hover:underline">No account? Signup</Link>
          <p className="text-gray-600 mt-2">Forgot password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
