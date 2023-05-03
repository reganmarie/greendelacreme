import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"




export default function Perenual() {
  const [look, setSearch] = useState('');
  const [info, setData] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [scientific_name, setScience] = useState('');
  const [water, setWater] = useState('');
  const [sunlight, setSun] = useState([]);
  const [cycle, setCycle] = useState('');
  const [other, setOther] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://perenual.com/api/species-list?key=${process.env.REACT_APP_PERENUAL_KEY}&q=${look}`)
      if (response.ok) {
        const plant = await response.json()
        setData(plant.data)
      }
    } catch (e) {
      console.error(e)
      toast.error('Error in retrieving Data', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", toastId: 'error'
      });
    }
  }
  return (
    <>

      <div className='min-h-screen perenual'>
        <form onSubmit={handleSearch} className='max-w-4xl mx-auto py-7' >
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900  rounded-lg bg-gray-50
           focus:ring-[#C69F6A]  outline-none dark:placeholder-gray-400 dark:text-white
            dark:focus:border-[#C69F6A]" placeholder="Search plant by name..." required value={look} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#22695A]/80 hover:bg-[#22695A] focus:ring-4 focus:outline-none
             focus:ring-[#C69F6A] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#C69F6A] dark:hover:bg-[#C69F6A] dark:focus:ring-[#C69F6A]">Search</button>
          </div>
        </form>
        <section className="py-10 ">
          <div id="data" className="mx-auto relative grid max-w-7xl z-0  grid-cols-3 gap-24 p-6 indie sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(info) && info.slice(0, 9).map(database => {
              const { id } = database.id
              return (
                <>
                  <motion.div animate={{ rotate: 360, scale: 1, }} transition={{
                    type: "spring", duration: 3, bounce: 0.5
                  }} onClick={() => [setName(database.common_name),
                  setImage(database.default_image.regular_url), setScience(database.scientific_name),
                  setCycle(database.cycle), setWater(database.watering), setSun(database.sunlight), setOther(database.other_name)]}
                  >
                    <div key={id} className='rounded-xl bg-[#EADAB2] p-3 shadow-lg hover:-translate-y-1 '>
                      <div className="relative flex items-end overflow-hidden rounded-xl shadow-xl">
                        <img src={database.default_image.regular_url} alt={database.default_image.thumbnail} />
                      </div>
                      <div className="mt-1 p-2  relative">
                        <h2 className="text-black text-center text-xl font-semibold ">{database.common_name}</h2>
                        <div className="flex justify-center">
                          <label htmlFor="my-modal" className="px-5 popup py-2 mt-4 font-extrabold text-md rounded-full text-stone-700">
                            More info
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )
            })}
          </div>
        </section>
        <input type="checkbox" id="my-modal" className="modal-toggle " />
        <motion.div className="modal ">
          <div className="card mx-auto lg:card-side bg-[#EADAB2] shadow-xl max-w-6xl">
            <label htmlFor="my-modal" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</label>
            <div className='grid grid-cols-5'>
              <div className='col-span-3'>
                <img src={image} alt="Album" className='object-fill' />
              </div>
              <div className='col-span-2'>
                <div className="card-body indie  text-2xl">
                  <h1 className="card-title font-bold text-4xl">{name}</h1>
                  {`${other.length}` > 0 ? <p className="font-light mt-5">This plant may also be known as {other.join(", ")}</p> : null}
                  <p className='font-extrabold mt-4'>How often should I water this plant?</p>
                  <p className='ml-9 font-semibold'>{water}</p>
                  <p className='font-extrabold mt-4'>Amount of ☀️ this plant needs</p>
                  <p className='ml-9 font-semibold '>{sunlight.join(", ")}</p>
                  <p className='mt-4'>Scientific Name: {scientific_name}</p>
                  <p className='mt-4'>{cycle} Cycle</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
