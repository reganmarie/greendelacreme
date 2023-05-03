import React from 'react';
import StoreSuggestions from './StoreSuggestions';
import EndingLinks from './EndingLinks';
import { useGetTokenQuery } from '../store/authApi';


export default function PlantResources() {
  const { data: user } = useGetTokenQuery();

  return (
    <>
      <div id="slide" className="-mt-[80px] brightness-[.5] z-0"></div>
      <div className='text-center absolute top-1/2 pt-3 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3'>
        <h1 id="h1" className="font-bold text-7xl text-white">Plant Resources</h1>
        <p className="font-bold bg-gradient-to-r from-lime-300 to-teal-300 bg-clip-text text-transparent hover:from-pink-500 hover:to-yellow-500 text-3xl">
          Looking to grow your knowledge?
        </p>
        <p className="font-semibold text-white text-3xl">
          Our knowledge hub features articles, videos, and guides on gardening techniques, plant care, and <span className="bg-gradient-to-r from-lime-300 to-teal-300 bg-clip-text text-transparent hover:from-pink-500 hover:to-yellow-500">more </span>.
        </p>
      </div>
      <div className=' container mx-auto'>
        <div className="grid grid-cols-1 max-w-9xl px-12 min-[1000px]:px-20 min-[600px]:grid-cols-2 gap-8 py-20 1440:px-64 min-[1000px]:grid-cols-3 min-[1750px]:grid-cols-4" >

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img
              src="https://i.ytimg.com/vi/kk4-NzpbXxw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCj-_6orwSLqcRSALS12MTj6AGL6Q"
              className="rounded-t-[20px] h-64 w-full object-cover" style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                Top 6 Common Indoor Plants That can grow in Water!
              </p>
              <div className='flex justify-center'>
                <a href="https://www.youtube.com/watch?v=kk4-NzpbXxw" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Watch
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img
              src="https://bloomscape.com/wp-content/uploads/2019/03/190221_plant-care-banner.jpg?ver=17901"
              className="rounded-t-[20px] h-64 w-full object-cover " style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                The Ultimate Guide to Spring Plant Care
              </p>
              <div className='flex justify-center'>
                <a href="https://bloomscape.com/plant-care/ultimate-guide-spring-plant-care/" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img
              src="https://www.urbanjunglebloggers.com/wp-content/uploads/2017/10/urban-jungle-bloggers-osram-lights-featured.jpg"
              className="rounded-t-[20px] h-64 w-full  object-cover " style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                Start something bright and keep your plants happy
              </p>
              <div className='flex justify-center'>
                <a href="https://www.urbanjunglebloggers.com/start-something-bright-keep-your-plants-happy/" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img
              src="https://i.ytimg.com/vi/dlp_MgVJCYc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAJuuLapHBRJs72Std7LbQp3WwtEQ"
              className="rounded-t-[20px] h-64 w-full object-cover " style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                🍴 Don't just care for them! Eat Them! 🍴
              </p>
              <div className='flex justify-center'>
                <a href="https://www.youtube.com/watch?v=dlp_MgVJCYc" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img
              src="https://i.ytimg.com/vi/wtoPApGNE7Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBTrHcPu_wpGio3lwYJWd6Jrt2KeA"
              className="rounded-t-[20px] h-64 w-full object-cover" style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                ☀️ No Sun? No Problem 🌙
              </p>
              <div className='flex justify-center'>
                <a href="https://www.youtube.com/watch?v=wtoPApGNE7Q" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Watch
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="glass" className="glass rounded-[20px] shadow-xl dark:bg-gray-800 duration-300 hover:-translate-y-1 min-w-full">
            <img src="https://i.ytimg.com/vi/pMzRIdPreaY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDnaYLq
          EP_xhKMeEM_M1o-SknAprQ"
              className="rounded-t-[20px] h-64 w-full object-cover " style={{ maxWidth: "100%" }} alt="Plants" />
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <p className="break-words max-w-lg text-xl font-semibold text-center indie leading-relaxed text-gray-800 dark:text-gray-300">
                Need to spread your Roots?
              </p>
              <div className='flex justify-center'>
                <a href="https://www.youtube.com/watch?v=pMzRIdPreaY&pp=ygVOICAgIDA6MDAgLyA5OjI5ICDigKIgSW50cm8gICA3IFRoaW5ncyBQbGFudCBFeHBlcnRzIERvIFRoYXQgWW91IFByb2JhYmx5IERvbid0" target="_blank" rel="noreferrer">
                  <button className="mx-auto px-5 py-2 font-extrabold text-md rounded-full text-stone-700 bg-gradient-to-tr from-[#00ffcc] to-[#99ff66] hover:from-[#99ff66] hover:to-[#00ffcc]">
                    Watch
                  </button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <StoreSuggestions user={user && { user }} />
      <EndingLinks />
    </>
  );
}
