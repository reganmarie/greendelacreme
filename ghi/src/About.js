import React from 'react';
import { Link } from 'react-router-dom';



export default function About() {

  return (
<section className="min-h-screen min-w-full flex-auto flex-col justify-center p-10" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1619364726002-dfd4fdaee5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
  <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
    <div className="max-w-2xl text-center">
      <h1 className=" text-5xl capitalize flex mt-72 justify-center tracking-widest text-white lg:text-7xl">Coming Soon</h1>

      <p className="mt-6 text-lg text-white">We're working hard to bring you something amazing!</p>

      <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
        <Link to="/" className="hover:underline mt-10 text-gray-600 cursor-pointer">
              <button type="button" className="inline-block px-6 mr-2 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full bg-gradient-to-r from-rose-100 to-teal-100  hover:from-red-200 hover:via-red-300 hover:to-yellow-200"> Home </button>
              </Link>
      </div>
    </div>
  </div>
</section>

  )
}
