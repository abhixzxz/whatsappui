import React from 'react';
import { FaWhatsapp, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhatsAppSignUp = () => {
  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden h-screen select-none flex-col justify-center bg-green-600 text-center md:flex md:w-1/2"
      >
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <span className="rounded-full bg-white px-3 py-1 font-medium text-green-600">New Feature</span>
          <p className="my-6 text-3xl font-semibold leading-10">
            Create animations with{' '}
            <span className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-400 py-2 text-white">
              drag and drop
            </span>
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt necessitatibus nostrum repellendus ab
            totam.
          </p>
          <a href="#" className="font-semibold tracking-wide text-white underline underline-offset-4">
            Learn More
          </a>
        </div>
        {/* <img className="mx-auto w-11/12 max-w-lg rounded-lg object-cover" src="/images/SoOmmtD2P6rjV76JvJTc6.png" /> */}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full flex-col md:w-1/2"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center pt-12 md:justify-start md:pl-12"
        >
          <a href="#" className="text-2xl font-bold text-green-600">
            WhatsApp Clone
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]"
        >
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Already using WhatsApp Clone?{' '}
            <Link to="/login" className="whitespace-nowrap font-semibold text-green-700">
              Login here
            </Link>
          </p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-green-700 hover:text-white focus:ring-2"
          >
            <FaGoogle className="mr-2 h-5 w-5" />
            Get started with Google
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative mt-8 flex h-px place-items-center bg-gray-200"
          >
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </motion.div>
          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col pt-4"
            >
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="text"
                  id="login-name"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col pt-4"
            >
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-4 flex flex-col pt-4"
            >
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </motion.div>
            <div className="block">
              <input
                className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-green-600 focus:border-green-600 focus:shadow"
                type="checkbox"
                id="remember-me"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")`,
                }}
                defaultChecked
              />
              <label className="inline-block" htmlFor="remember-me">
                I agree to the <a className="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <motion.button
              type="submit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-green-500 ring-offset-2 transition hover:bg-green-700 focus:ring-2"
            >
              <FaWhatsapp className="mr-2" />
              Sign in
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatsAppSignUp;
