import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from './store/authApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ 'email': username, 'password': password });
    e.target.reset();
  };

  if (result.isSuccess) {
    navigate("/blogs");
    toast(`Welcome back, ${username}!`, {toastId: 'loginSuccess'});
  } else if (result.isError) {
    toast.error(`${result.error.data.detail}`, {toastId: 'loginError'});
    result.reset();
  }

  useEffect(() => {
    if (token) {
      navigate('/blogs');
    }
  }, [token])

  return (
    <div className="bg-gradient-to-br from-emerald-100 via-lime-100 to-yellow-100 dark:bg-darkgreen">
      <div className='bg-[url("./assets/images/leaf-login.png")] dark:bg-[url("./assets/images/leaf-dark.png")] b-clip-content bg-center object-cover bg-contain bg-no-repeat p-12 drop-shadow-lg'>
        <div className="px-6 py-8 flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
          <Link
            to="#"
            className="flex items-center text-2xl font-semibold text-black dark:text-white"
          >
            <img
              className="w-14 h-14 mr-2"
              src="/images/planticon.png"
              alt="Plant icon"
            />
            Green de la Creme
          </Link>
          <div className='md:mt-0 sm:max-w-md xl:p-0 md:w-full h-80'>
            <div className="p-6 space-y-4 md:space-y-6 sm:px-8 sm:py-4">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username or email</label>
                  <input
                    name="username"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none"
                    required
                    placeholder="green@delacreme.com"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none"
                    required
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-emerald-200 dark:via-lime-200 dark:to-yellow-200 dark:hover:from-yellow-200 dark:hover:to-emerald-200 dark:focus:ring-primary-800 dark:text-darkgreen" type="submit" value="Login">Login</button>
                </div>
              </form>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-secondary">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
