import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './blogs/static/Card.css';
import Lottie from "lottie-react";
import team from "./assets/images/team.json";
import leaf from "./assets/images/arrow.json";
import wind from "./assets/images/wind.json";


export default function MainPage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3550);
  }, []);


  return (
    loading ? <Lottie className=" min-h-screen absolute top-0 min-w-full bg-gradient-to-tr from-gray-900 via-gray-100 to-gray-900 w-2/6 h-2/6 " animationData={wind} /> : (
      <div className="relative">
        <section className="sticky z-6 top-0 min-h-screen  dark:bg-darkgreen">
          <div className="min-h-screen min-w-full flex-auto flex-col justify-center p-10" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492892132812-a00a8b245c45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          >
            <div className="relative w-full max-w-6xl max-w-screen-2xl mx-auto">
              <div className="absolute inset-0 -mr-3.5 bg-gradient-to-r from-indigo-200 via-yellow-200 to-red-100 shadow-lg transform  skew-y-0 rotate-3 rounded-3xl"></div>
              <div className="relative bg-white shadow-lg rounded-3xl">

                <div className="flex items-center justify-start pt-6 pl-6">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                </div>

                <div className="px-20 py-6">



                  <div className="flex items-center justify-between bg-repeat backdrop-filter backdrop-blur-lg bg-opacity-30">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center text-3xl font-bold text-true-gray-800">
                        <svg className="w-10 h-10 mr-1 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                        </svg>
                        GC
                      </div>
                      <div className="flex items-center justify-center antialiased ml-20 pt-1">
                        <p className="flex items-center justify-center mr-10 text-base hover:from-pink-500 hover:to-yellow-500 text-gray-700 text-opacity-90 font-medium tracking-tight transition duration-150 ease-in-out">
                          Green



                        </p>
                        <p className="flex hover:from-pink-500 hover:to-yellow-500 items-center break-keep justify-center mr-10 text-base text-gray-700 text-opacity-90 font-medium tracking-tight transition duration-150 ease-in-out">
                          de



                        </p>
                        <p className="flex  hover:from-pink-500 hover:to-yellow-500 items-center break-keep justify-center mr-10 text-base text-gray-700 text-opacity-90 font-medium tracking-tight  transition duration-150 ease-in-out">
                          la
                        </p>
                        <p className="flex items-center hover:from-pink-500 hover:to-yellow-500 justify-center mr-10 text-base text-gray-700 text-opacity-90 font-medium tracking-tighttransition duration-150 ease-in-out">
                          Creme
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex color-black justify-center"> <Lottie animationData={leaf} className="w-4/6" /> </div>
                      <Link to="/login" className="hover:underline text-gray-600 cursor-pointer">
                        <button type="button" className="inline-block px-6 mr-2 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full bg-gradient-to-r from-rose-100 to-teal-100  hover:from-red-200 hover:via-red-300 hover:to-yellow-200"> Login </button>
                      </Link>
                      <Link to="/signup" className="hover:underline  text-gray-600 cursor-pointer">
                        <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full bg-gradient-to-r from-rose-100 to-teal-100  hover:from-red-200 hover:via-red-300 hover:to-yellow-200"> Sign up</button>
                      </Link>
                    </div>
                  </div>



                  <div className="flex">
                    <img className=" absolute bottom-20 right-20 visible sm:invisible md:invisible lg:invisible w-2/6 h-4/6" alt='' src="https://cdn.discordapp.com/attachments/1090723116604473459/1100946935101267989/hero.png" />
                  </div>
                  <div className="w-2/4 mt-40 ml-16 text-left">
                    <div className="text-6xl font-semibold text-center mb-10 mr-5 text-gray-900">Community starts <span className="bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent hover:from-pink-500 hover:to-yellow-500"> here </span></div>
                    <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">Join our community of plant enthusiasts and share your love for gardening.</div>


                    <button className="mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg ">
                      Scroll for more about us!
                    </button>
                  </div>
                  <div className="mt-12 ml-20 text-left">
                    <div type="button" className="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-gray-800 animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-0 z-5  min-h-screen min-w-full dark:bg-darkgreen">

            <div className="sticky min-h-screen top-0 z-5 bg-gradient-to-br from-emerald-100 via-lime-100 to-yellow-100 dark:bg-darkgreen py-14">
              <h3 className="mt-8 text-center pb-5 text-5xl bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent font-bold">Green de la Creme</h3>
              <h1 className="text-2xl tracking-widest text-black text-center ">Features & Services</h1>

              <div className="flex flex-wrap pr-8 flex-row justify-evenly px-14">
                <div className="mt-16 py-4 px-4 w-72 scene--card bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-6  md:mx-0">
                  <div className="w-sm card">
                    <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a17abde8d83650a582a28432/users-with-speech-bubbles-vector_53876-82250.jpg" alt="" />
                    <div className="mt-4 text-green-600 text-center card__face card__face--front">
                      <h1 className="text-xl font-bold">Communications</h1>
                      <p className="mt-4 text-gray-600">Connect with others who share the love of plants</p>
                      <button className="mt-8 mb-4 py-2 px-14 rounded-full bg-green-600 text-white tracking-widest hover:bg-green-500 transition duration-200 ">MORE</button>
                    </div>
                  </div>
                </div>




                <div className="flex flex-row justify-center  px-14">
                  <div className="mt-16 py-4 px-4 w-72 scene--card bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
                    <div className="w-sm card">
                      <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/3b242447f922540fbe750cab/fdf.jpg" alt="" />
                      <div className="mt-4 text-green-600 text-center card__face card__face--front">
                        <h1 className="text-xl font-bold ">Community Support</h1>
                        <p className="mt-4 text-gray-600">Join in on countless answers and questions surrounding plant life</p>
                        <button className="mt-8 mb-4 py-2 px-14 rounded-full bg-green-600 text-white tracking-widest hover:bg-green-500 transition duration-200 ">MORE</button>
                      </div>
                    </div>
                  </div>
                </div>





                <div className="flex flex-row justify-center pr-auto">
                  <div className="mt-16 py-4 px-4 w-72 scene--card bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
                    <div className="w-sm card">
                      <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg" alt="" />
                      <div className="mt-4 text-green-600 text-center card__face card__face--front">
                        <h1 className="text-xl font-bold">Share your plants</h1>
                        <p className="mt-4 text-gray-600">Makes posts and share your plants while admiring other gardens</p>
                        <button className="mt-8 mb-4 py-2 px-14 rounded-full bg-green-600 text-white tracking-widest hover:bg-green-500 transition duration-200 ">MORE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky z-4 top-0 h-screen flex bg-white flex-col items-center justify-center  text-white">
            <div className="text-gray-900 pt-20 pr-12 pb-14 pl-12 bg-yellow-100 ">
              <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl">
                <div className="flex items-center px-5 flex-row">
                  <div className="flex flex-row items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-0 ">
                    <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5">
                      <p className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Write anything.</p>
                      <p className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Share your <span className="bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent">garden</span></p>

                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="block">
                      <img alt=''
                        src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_20/3476394/210520-raised-garden-beds-bd-2x1.jpg" className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:px-5 gap-x-8 gap-y-16">
                  <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                    <img alt=''
                      src="https://img.etimg.com/thumb/width-640,height-480,imgsize-59036,resizemode-1,msid-99145868/magazines/panache/do-your-indoor-plants-end-up-dying-new-research-shows-they-generate-sounds-under-stress/plants-wilting_istock.jpg" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" />
                    <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase">Care tips</p>
                    <p className="text-lg font-bold sm:text-xl md:text-2xl">10 Reasons your plants are dying!</p>
                    <p className="text-sm break-words text-black">Plants are a beautiful addition to any garden. However, they can be finicky and difficult to care for, leading to the frustration
                      of watching them wither away. </p>
                    <div className="pt-2 pr-0 pb-0 pl-0">
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Blue</p>
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 20th, April 2023 ·</p>
                      <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">20 min. read</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                    <img alt=''
                      src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/indoor-plants-that-are-easy-to-maintain-section-2.jpg" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" />
                    <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase">Advice</p>
                    <p className="text-lg font-bold sm:text-xl md:text-2xl">5 Easiest plants to Upkeep</p>
                    <p className="text-sm text-black">If you're new to plant parenting or simply want to add some greenery to your home without too much hassle, there are plenty of low-maintenance
                      plant options to choose from.</p>
                    <div className="pt-2 pr-0 pb-0 pl-0">
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Amy Hollow</p>
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 28th, March 2023 ·</p>
                      <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">5 min. read</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                    <img
                      src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" alt="" />
                    <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase">MISC</p>
                    <p className="text-lg font-bold sm:text-xl md:text-2xl"> A list of dog friendly plants</p>
                    <p className="text-sm text-black">You might be wondering which plants are safe for your furry friend.
                      While there are many plants that can be toxic to dogs, there are also plenty of dog-friendly options to choose from.</p>
                    <div className="pt-2 pr-0 pb-0 pl-0">
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Zack Livingston</p>
                      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 15th, April 2023 ·</p>
                      <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">10 min. read</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <section className="sticky top-0 z-3 h-screen flex flex-col items-center bg-white justify-center text-white">
            <div className="p-8">
              <div className="bg-gradient-to-r from-teal-200 to-lime-200  mx-auto my-auto mt-auto mb-auto p-4 rounded-lg shadow-xl py-8">
                <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">Gardening <span className="bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent">FAQ</span></h4>
                <p className="text-center text-gray-600 text-sm mt-2">Here are some frequently asked questions about gardening.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 px-2 xl:px-12 mt-4">

                  <div className="flex space-x-8 mt-8">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c2a887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14M5 14h14M5 18h14"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-700">How do I fertilize my plants?</h3>
                      <p className="text-gray-600 my-2">Fertilizing your plants provides them with the nutrients they need to grow strong and healthy. You can use organic or synthetic fertilizers, depending on your preference. Follow the instructions on the fertilizer package to determine how much to use and how often to apply it. As a general rule, it's best to fertilize your plants once a month during the growing season.</p>

                    </div>
                  </div>


                  <div className="flex space-x-8 mt-8">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c2a887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14M5 14h14M5 18h14"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-700">How often should I water my plants?</h3>
                      <p className="text-gray-600 my-2"> Most plants need to be watered once a week, but the frequency may vary depending on the plant species and weather conditions. It's important to check the soil moisture level before watering to avoid over or under watering your plants. If the soil feels dry to the touch, it's time to water them. If it's still moist, you can wait a few more days.</p>

                    </div>
                  </div>


                  <div className="flex space-x-8 mt-8">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c2a887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14M5 14h14M5 18h14"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-700">How much sunlight do plants need?</h3>
                      <p className="text-gray-600 my-2">The amount of sunlight that plants need varies depending on the type of plant. Some plants prefer full sun, while others prefer partial shade. Most plants will have a label or tag that indicates how much sun they need. As a general rule, vegetables and fruits need at least six hours of sunlight a day, while flowering plants and herbs need four to six hours of sunlight a day.</p>

                    </div>
                  </div>
                  <div className="flex space-x-8 mt-8">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c2a887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14M5 14h14M5 18h14"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-700">How do I prevent pests in my garden?</h4>
                      <p className="text-gray-600 my-2">To prevent pests in your garden, make sure to keep it clean and well-maintained. Remove any dead or diseased plants, and use natural methods such as companion planting and neem oil to deter pests.</p>

                    </div>
                  </div>

                  <div className="flex space-x-8 mt-8">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c2a887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14M5 14h14M5 18h14"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-700">How do I prepare my garden for winter?</h3>
                      <p className="text-gray-600 my-2">As winter approaches, it's important to prepare your garden for the colder temperatures. You can start by cleaning up any dead plant material and debris. You can also apply a layer of mulch around your plants to protect their roots from freezing. In colder climates, you may need to cover your plants with frost blankets or move them indoors to protect them from frost.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>




        <div className="container z-2 absolutemx-auto mb-10 h-0">
          <section className="sticky z-2 min-h-screen bg-gray-200 min-w-full">

            <div className="container mx-auto relative px-6 py-20">

            </div>
            <div className="container mx-auto min-h-screen px-6">
              <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">The Team</h1>

              <div className="mx-auto mt-6 flex justify-center">
                <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              </div>

              <p className="mx-auto text-center mt-10 text-gray-500 dark:text-gray-300">We believe in the power of teamwork. Meet ours.</p>
              <div className="flex justify-center"> <Lottie animationData={team} className="w-2/6" /> </div>
              <div className="mb-16 grid grid-cols-4 gap-20 px-10 md:grid-cols-2 xl:mt-16 xl:grid-cols-3 justify-items-center">
                <div className="flex flex-col items-center rounded-xl bg-white border p-4 dark:border-gray-700 sm:p-6">
                  <img className="aspect-square rounded-xl object-cover" src="https://img.freepik.com/free-vector/hand-drawn-frailejon-character-illustration_23-2150016506.jpg?size=626&ext=jpg&ga=GA1.1.1709868956.1682377036&semt=robertav1_2_sidr" alt="" />

                  <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Adam Azai</h1>

                  <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Fullstack Developer</p>

                  <div className="-mx-2 mt-3 flex">
                    <a href="https://www.linkedin.com/in/adam-azai/" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="LinkedIn">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/fluency/512/linkedin.png" />
                    </a>
                    <a href="https://gitlab.com/ImronAzai" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Gitlab">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/color/512/gitlab.png" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-white border p-4 dark:border-gray-700 sm:p-6">
                  <img className="aspect-square w-full rounded-xl object-cover" src="https://img.freepik.com/free-vector/frailejon-character-illustration_23-2150054640.jpg?size=626&ext=jpg&ga=GA1.1.1709868956.1682377036&semt=robertav1_2_sidr" alt="" />

                  <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Shayne Buac</h1>

                  <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Fullstack Developer</p>

                  <div className="-mx-2 mt-3 flex">
                    <a href="https://www.linkedin.com/in/shaynebuac/" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="LinkedIn">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/fluency/512/linkedin.png" />
                    </a>
                    <a href="https://gitlab.com/asmbuac" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Gitlab">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/color/512/gitlab.png" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-white border p-4 dark:border-gray-700 sm:p-6">
                  <img className="aspect-square w-full rounded-xl object-cover" src="https://img.freepik.com/free-vector/cute-cat-sitting-book-stack-cartoon-icon-illustration-flat-cartoon-style_138676-3110.jpg?size=626&ext=jpg&ga=GA1.1.1709868956.1682377036&semt=robertav1_2_sidr" alt="" />
                  <h1 className="mt-4 text-2xl font-semibold capitalize text-center text-gray-700 dark:text-white">Regan Tewksbury</h1>
                  <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Fullstack Developer</p>
                  <div className="-mx-2 mt-3 flex">
                    <a href="https://www.linkedin.com/in/regan-tewksbury/" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="LinkedIn">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/fluency/512/linkedin.png" />
                    </a>
                    <a href="https://gitlab.com/regantewksbury" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Gitlab">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/color/512/gitlab.png" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-xl border bg-white p-4 dark:border-gray-700 sm:p-6">
                  <img className="aspect-square w-full rounded-xl object-cover" src="https://img.freepik.com/free-vector/hand-drawn-frailejon-character-illustration_23-2150064793.jpg?size=626&ext=jpg&ga=GA1.1.1709868956.1682377036&semt=robertav1_2_sidr" alt="" />
                  <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Brandon Gomez</h1>
                  <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Fullstack Developer</p>
                  <div className="-mx-2 mt-3 flex">
                    <a href="https://www.linkedin.com/in/brandon-g4/" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="LinkedIn">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/fluency/512/linkedin.png" />
                    </a>
                    <a href="https://gitlab.com/vbrandon" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Gitlab">
                      <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/color/512/gitlab.png" />
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="top-0">
            <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
              <div className="grid grid-flow-col gap-4">
                <Link to="/about" className="hover:underline cursor-pointer"> About Us </Link>
                <a href="https://gitlab.com/green-de-la-creme/green-de-la-creme" target="_blank" rel="noreferrer" className="bold link link-hover">Repo</a>
                <Link to="/about" className="hover:underline cursor-pointer"> Contact Us </Link>
              </div>
              <div>
                <div className="grid grid-flow-col gap-4">
                  <a href="https://gitlab.com/green-de-la-creme/green-de-la-creme" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 hover:animate-pulse hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Gitlab">
                    <img alt='' className="h-6 w-6 fill-current" src="https://img.icons8.com/color/512/gitlab.png" />
                  </a>
                </div>
              </div>
              <div>
                <p>Copyright © 2023 - All right reserved by Green de la Industries Ltd</p>
              </div>
            </footer>
          </section>
        </div>
      </div>

    ));
}
