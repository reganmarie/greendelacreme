import React, { useState, useEffect } from "react";
import { useSignupMutation } from "./store/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SvgIcon } from '@mui/material';
import Lottie from "lottie-react";
import plant from "./assets/images/plant.json";
import states from "./States";


export default function Signup({ token }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [theme, setTheme] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const [hideLeaf, setHideLeaf] = useState(false);
  const [signup, result] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ first, last, username, email, password, city, state });
    e.target.reset();
  };

  if (result.isSuccess) {
    toast(`Welcome to Green de la Creme, ${username}!`, { toastId: 'signupSuccess' });
  } else if (result.isError) {
    toast(`${result.error.error}`, { toastId: 'signupError' });
    result.reset();
  }

  const handleHideLeaf = () => {
    if (window.innerWidth < 800 || window.innerHeight < 900) {
      setHideLeaf(true);
    } else {
      setHideLeaf(false);
    }
  };

  window.addEventListener("resize", handleHideLeaf);

  useEffect(() => {
    if (token) {
      navigate('/blogs');
    }
  }, [token, navigate]);

  useEffect(() => {
    handleHideLeaf();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <section className="bg-gradient-to-br from-emerald-100 via-lime-100 to-yellow-100 dark:to-gray-900 dark:from-darkgreen h-screen">
      <label className="swap swap-rotate absolute top-10 right-10 z-[999999]">
        <input type="checkbox" onChange={handleThemeSwitch} />
        <svg className="swap-on fill-current w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
      </label>
      <div className={hideLeaf ? "flex items-center justify-center min-h-screen" : 'bg-[url("./assets/images/leaf-login.png")] dark:bg-[url("./assets/images/leaf-dark.png")] b-clip-content bg-center object-cover bg-contain bg-no-repeat p-12 drop-shadow-xl min-h-screen flex items-center justify-center'}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-w-xl lg:py-0">
          <Link
            to="/"
            className={`flex flex-col items-center text-2xl font-semibold text-black dark:text-white ${!hideLeaf ? "-mt-36" : "mt-[-34rem]"}`}
          >
            <Lottie animationData={plant} className="w-20" />
            Green de la Creme
          </Link>
          <div className='md:mt-0 sm:max-w-md xl:p-0 md:w-full h-80'>
            <div className={`py-6 px-12 space-y-4 md:space-y-6 sm:px-8 sm:py-4 ${hideLeaf && "!p-12 bg-white rounded-2xl mt-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800"}`}>
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} action="#">
                <div className="flex flex-col space-y-4">
                  <div className="flex min-[800px]:space-x-3 max-[800px]:flex-col max-[800px]:space-y-4">
                    <div className="flex-auto">
                      <label
                        htmlFor="first"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={first}
                        onChange={(e) => setFirst(e.target.value)}
                        type="text"
                        name="first"
                        id="first"
                        maxLength="100"
                        placeholder="Bob"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div className="flex-auto">
                      <label
                        htmlFor="last"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={last}
                        onChange={(e) => setLast(e.target.value)}
                        type="text"
                        name="last"
                        id="last"
                        maxLength="100"
                        placeholder="Smith"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex min-[800px]:space-x-3 max-[800px]:flex-col max-[800px]:space-y-4">
                    <div className="flex-auto">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        maxLength="20"
                        placeholder="iLuvDirt"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div className="flex-auto">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        maxLength="100"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center min-[800px]:space-x-3 max-[800px]:flex-col max-[800px]:space-y-4">
                    <div className="flex-auto w-full min-[800px]:w-1/2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <div className="flex items-center justify-end">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          maxLength="100"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                        {showPassword ?
                          <SvgIcon
                            component={VisibilityOffIcon}
                            className="absolute mr-2.5 !w-5 !h-5 hover:cursor-pointer transition-all ease-in hover:scale-110 duration-300 text-gray-400"
                            onClick={() => setShowPassword(false)}
                          />
                          :
                          <SvgIcon
                            component={VisibilityIcon}
                            className="absolute mr-2.5 !w-5 !h-5 hover:cursor-pointer transition-all ease-in hover:scale-110 duration-300 text-gray-400"
                            onClick={() => setShowPassword(true)}
                          />
                        }
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 flex-auto min-[800px]:w-1/2">
                      <div className="flex-auto w-2/3">
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City
                        </label>
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          type="city"
                          name="city"
                          id="city"
                          maxLength="150"
                          placeholder="San Francisco"
                          className="!bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full p-2.5 dark:!bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                      </div>
                      <div className="flex-auto w-1/3">
                        <label
                          htmlFor="state"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          State
                        </label>
                        <select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          name="state"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:ring-1  dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none block w-full px-2.5 py-[13px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                          <option value=""></option>
                          {states?.map(s => {
                            return (
                              <option key={s} value={s}>{s}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start pt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-primary-600"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <span
                        className="font-medium text-gradient-to-r from-slate-300 to-slate-500 hover:underline hover:cursor-pointer"
                      >
                        Terms and Conditions
                      </span>
                    </label>
                    <span className="text-red-600"> *</span>
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <button
                    type="submit"
                    className="w-1/2 max-[800px]:w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-emerald-200 dark:via-lime-200 dark:to-yellow-200 dark:hover:from-yellow-200 dark:hover:to-emerald-200 dark:focus:ring-primary-800 dark:text-darkgreen"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline
                    dark:text-primary-500"
                  >
                    {" "}
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
