import React from 'react';
import { FaWhatsapp, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion components
import ThreeScene from '../../animations/ThreeScene'; // Import the 3D scene

const WhatsAppSignUp = () => {
  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      {/* 3D Scene as the left half of the screen */}
      <div className="relative hidden h- select-none md:flex md:w-1/2">
        <ThreeScene  />
      </div>

      <motion.div 
        className="flex w-full flex-col md:w-1/2"
        initial={{ x: 100 }} 
        animate={{ x: 0 }} 
        transition={{ duration: 0.5 }} // Slide-in effect
      >
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <a href="#" className="text-2xl font-bold text-green-600">
            WhatsApp Clone
          </a>
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Already using WhatsApp Clone?{' '}
            <Link to="/register" className="whitespace-nowrap font-semibold text-green-700">
              Login here
            </Link>
          </p>
          <button className="mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-green-700 hover:text-white focus:ring-2">
            <FaGoogle className="mr-2 h-5 w-5" />
            Get started with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </div>
          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="text"
                  id="login-name"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="number"
                  id="number"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            <div className="block">
              <input
                className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-green-600 focus:border-green-600 focus:shadow"
                type="checkbox"
                id="remember-me"
                defaultChecked
              />
              <label className="inline-block" htmlFor="remember-me">
                I agree to the <a className="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-green-500 ring-offset-2 transition hover:bg-green-700 focus:ring-2"
            >
              <FaWhatsapp className="mr-2" />
              Sign in
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default WhatsAppSignUp;
