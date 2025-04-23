"use client"
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { doCredentialLogin } from '@/app/actions';
import { useRouter } from "next/navigation";


function LoginForm() {

  const router = useRouter();
  const [error, setError] = useState("");


  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      console.log(response);

      if (response?.error) {      
        setError(response.error.message || "An error occurred");
      } else {
        router.push("/overview");
      }
    } catch (e: any) {
      setError("Invalid credentials");
    }

  }

  return (
    <div className="w-full md:w-[400px] p-10">
      <h2 className="text-xl text-gray-600 mb-2">Welcome to</h2>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Your Own Personal<br />Finance Tracker
      </h1>

      <form onSubmit={e => onSubmit(e)}>
        <div className="mb-4">
          <label className="text-gray-600 text-sm">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 text-sm">Password</label>
          <div className="relative">
            <input
              id="passwordBox"
              name="password"
              type="password"
              placeholder="***********"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
        </div>
        <p className='text-red-500 text-center mb-3'>{error}</p>
        <button
            type="submit"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
            Login
        </button>

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
