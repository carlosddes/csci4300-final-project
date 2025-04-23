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
      
      if (formData.get("password") != formData.get("confirmPassword")) {
        setError("Passwords do not match")
      } else {
        const url = "http://localhost:3000/api/signup";
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({name: formData.get("name"), email: formData.get("email"), password: formData.get("password")})
        });
        if (res.status === 201) {
          router.push("/login");
        } else {
          setError("Email already in use")
        }
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }

  }

  return (
    <div className="flex flex-col m-auto w-full md:w-[400px] p-10">
      <h2 className="text-xl text-gray-600 mb-2">Welcome to</h2>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Your Own Personal<br />Finance Tracker
      </h1>

      <form onSubmit={e => onSubmit(e)}>

      <div className="mb-4">
          <label className="text-gray-600 text-sm">Name</label>
          <input
            name="name"
            type="text"
            placeholder=""
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
              name="password"
              type="password"
              placeholder="***********"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-600 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type="password"
              placeholder=""
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <p className='text-red-500 mb-2 text-center hover:underline'>{error}</p>
        <button
            type="submit"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
            Create Account
        </button>
        <div className="text-center">
          <Link className="text-blue-600 font-medium hover:underline text-sm mt-4" href={"/login"}>Have an account?{' '}</Link>   
         </div>  
      </form>
    </div>
  );
}

export default LoginForm;
