import React from 'react';
import Link from 'next/link';


function LoginForm() {
  return (
    <div className="w-full md:w-[400px] p-10">
      <h2 className="text-xl text-gray-600 mb-2">Welcome to</h2>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Your Own Personal<br />Finance Tracker
      </h1>

      <form>
        <div className="mb-4">
          <label className="text-gray-600 text-sm">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 text-sm">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="***********"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
              👁
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>


        <Link
            href="/overview"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
            Login
        </Link>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
