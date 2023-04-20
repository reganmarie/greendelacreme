import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div class="relative">
        <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-green-400">
            <h2 class="text-4xl">Welcome</h2>
            <p>Scroll Down</p>
        </div>
        <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
            <h2 class="text-4xl">2</h2>
            <p>Scroll Down</p>
        </div>
        <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-purple-600 text-white">
            <h2 class="text-4xl">da</h2>
            <p>Scroll Down</p>
        </div>
        <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
            <h2 class="text-4xl">Cream de la creme HomePage c: </h2>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Ready? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-secondary">Click me!</Link>
              </p>
        </div>
    </div>
  );
}
