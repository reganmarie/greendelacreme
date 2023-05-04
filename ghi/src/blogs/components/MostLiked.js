import React from 'react';
import { useGetMostLikedQuery } from '../../store/blogApi';
import { SvgIcon } from '@mui/material';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import PunList from '../../PunList';
import RequestList from '../../friends/RequestList';
import FriendList from '../../friends/FriendList';

export default function MostLiked() {
  const { data: blog } = useGetMostLikedQuery();

  return (
    <div className={`flex flex-col space-y-3 ${window.scrollY <= 80.5 ? "mt-4" : "fixed top-4"}`}>
      <div className="flex flex-col p-4 bg-white rounded-xl drop-shadow z-30 sidebar max-w-[240px] max-h-[600px]">
        <div className="h-full w-full">
          <div className="text-center font-bold mb-3 text-gray-600">Most Liked</div>
          <div className="relative w-full">
            <a href={`#${blog?.id}`}>
              {blog?.image && <img src={blog.image} className="mb-3 h-[168px] w-full object-cover rounded-xl overflow-hidden bg-cover bg-no-repeat" alt="" />}
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-br from-yellow-400 to-pink-400 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-75 rounded-xl z-1">
                <div className="text-center absolute top-1/2 pt-3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold z-2">
                  See More
                </div>
              </div>
            </a>
          </div>
          <div className="mb-3 flex items-top justify-between px-1 md:items-start">
            <div className="mb-2 w-full h-full">
              <div className="flex flex-wrap items-center">
                <a href={`#${blog?.id}`}>
                  <p className="text font-extrabold text-pink-700 hover:underline hover:underline-offset-2 indie break-words whitespace-pre-wrap" style={{ inlineSize: "200px" }}>{blog?.title}</p>
                </a>
              </div>
              <div className="flex items-center text-xs justify-start space-x-2">
                <div>
                  <SvgIcon component={FilterVintageOutlinedIcon} className="!h-4" />
                  {blog?.like_count} Likes
                </div>
                <div>
                  <SvgIcon component={ReviewsOutlinedIcon} className="!h-3 !w-3 mr-1" />
                  {blog?.comment_count} Comments
                </div>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 break-words whitespace-pre-wrap overflow-y-auto max-h-[150px]">{blog?.body}</p>
            </div>
          </div>
          <div className="text-xs font-bold bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full text-white px-1.5 py-[1px] text-center inline-block mr-1">
            @{blog?.username}
          </div>
        </div>
      </div>
      <PunList />
      <RequestList />
      <FriendList />
    </div>
  );
}
