import { Link } from 'react-router-dom';
import React from 'react';

export default function EndingLinks() {
  return (
    <div className="py-36 px-20 flex justify-center bg-gradient-to-t from-yellow-100 to-white space-x-24 items-center">
      <div className="flex flex-col space-y-3 text-center mt-16">
        <h1 className="text-2xl font-semibold">Looking for specific plant details?</h1>
        <Link to="/data">
          <button className="text-lg font-bold bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full text-white px-4 py-1 text-center mx-auto hover:from-lime-400 hover:to-teal-400 transition-all ease-in duration-300 hover:scale-105">Search Here</button>
        </Link>
      </div>
      <div className="flex flex-col space-y-3 text-center mt-16">
        <h1 className="text-2xl font-semibold">Don't see what you're looking for?</h1>
        <Link to="/forum">
          <button className="text-lg font-bold bg-gradient-to-br from-lime-400 to-teal-400 rounded-full text-white px-4 py-1 text-center mx-auto hover:from-pink-500 hover:to-yellow-400 transition-all ease-in duration-300 hover:scale-105">Ask in the Forum</button>
        </Link>
      </div>
    </div>
  );
}
