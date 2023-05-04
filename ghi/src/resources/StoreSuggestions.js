import React, { useState, useEffect } from 'react';
import { useGetStoreSuggestionsQuery } from '../store/yelpApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SvgIcon } from '@mui/material';


export default function StoreSuggestions({ user }) {
  const [slides, setSlides] = useState(3);
  const { data: stores } = useGetStoreSuggestionsQuery();

  console.log(stores);

  console.log(stores?.businesses);

  const handleResize = () => {
    if (window.innerWidth > 2300) {
      setSlides(8);
    } else if (window.innerWidth > 1900) {
      setSlides(6);
    } else if (window.innerWidth > 1100) {
      setSlides(5);
    } else {
      setSlides(3);
    }
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      <div className="py-36 px-20 flex flex-col text-center bg-gradient-to-br from-pink-100 to-yellow-100 space-y-3">
        <h1 className="text-4xl font-bold text-rose-400">Plant Stores and Nurseries Near You</h1>
        <p className="text-xl">Don't know where to buy plants and gardening supplies? We got you covered!</p>
      </div>
      <div className="pt-20 px-8 flex !items-center !justify-center !m-0">
        {user?.user.account.city && stores?.businesses !== undefined ?
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={slides}
            coverflowEffect={
              {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }
            }
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="relative !items-center !justify-center !m-0"
          >
            {stores && stores.businesses.map(store => {
              return (
                <SwiperSlide key={store.id}>
                  <div className="flex flex-col rounded-[20px] max-w-[300px] bg-white shadow-lg p-4 3xl:p-[18px]" key={store.id}>
                    <div className="h-full w-full">
                      <div className="relative w-full">
                        <a href={store.url} target="_blank" rel="noreferrer">
                          <img src={store.image_url} className="mb-3 h-60 w-full object-cover rounded-xl overflow-hidden bg-cover bg-no-repeat" alt="" />
                          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-br from-yellow-400 to-pink-400 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-75 rounded-xl z-1">
                            <div className="text-center absolute top-1/2 pt-3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold z-2">
                              See More
                            </div>
                          </div>
                        </a>
                        {store.price && <div className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2">
                          <div className="flex w-6 h-6 items-center justify-center rounded-full text-sm bg-gradient-to-r bg-clip-text text-transparent from-pink-500 to-yellow-500">
                            {store.price}
                          </div>
                        </div>}
                      </div>
                      <div className="mb-3 h-[100px] flex items-top justify-between px-1 md:items-start">
                        <div className="mb-2 w-full">
                          <div className="flex items-center justify-between">
                            <a href={store.url} target="_blank" rel="noreferrer">
                              <p className="text font-extrabold text-pink-700 hover:underline hover:underline-offset-2 indie">{store.name}</p>
                            </a>
                            <div className="flex items-center text-sm">
                              <SvgIcon component={StarOutlineIcon} className="!h-4" />
                              {store.rating} / 5
                            </div>
                          </div>
                          <div className="flex items-center text-xs justify-start">
                            <SvgIcon component={ReviewsOutlinedIcon} className="!h-3 !w-3 mr-1" />
                            {store.review_count} reviews
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">{store.location.display_address[0]}, {store.location.display_address[1]}{store.location.display_address[2] && `, ${store.location.display_address[2]}`}</p>
                        </div>
                      </div>
                      {store.categories.map(category => {
                        return (
                          <div className="text-xs font-bold bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full text-white px-1.5 py-[1px] text-center inline-block mr-1">
                            {category.title}
                          </div>);
                      })}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="slider-controller d-inline-flex container mt-5 pt-5 align-items-center justify-content-center">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
          :
          (stores?.businesses === undefined ?
            <div className="text-xl px-20 text-center space-y-3">
              <p>
                Uh oh. Looks like we couldn't find any stores near you. Perhaps try another location?
              </p>
              <p>
                Please <Link to="/accounts/edit" className="font-semibold bg-gradient-to-r bg-clip-text text-transparent from-pink-500 to-yellow-500 hover:from-lime-400 hover:to-teal-400">edit your profile</Link> and add it for suggestions!
              </p>
            </div>
            :
            <div className="text-xl px-20 text-center space-y-3">
              <p>
                Uh oh. Looks like you have not given us your location yet.
              </p>
              <p>
                Please <Link to="/accounts/edit" className="font-semibold bg-gradient-to-r bg-clip-text text-transparent from-pink-500 to-yellow-500 hover:from-lime-400 hover:to-teal-400">edit your profile</Link> and add it for suggestions!
              </p>
            </div>
          )
        }
      </div>
    </>
  );
}
