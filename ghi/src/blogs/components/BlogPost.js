
import React from 'react';
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';

export default function BlogPost({ username, name, avatar, createdOnDate, createOnTime, title, body }) {
  const user = useSelector(state => state.auth.user.username);

  return (
    <div className="flex max-w-2xl 1080:max-w-3xl 1440:max-w-5xl items-center justify-center mx-auto">
      <div className="flex flex-col items-center w-[100%]">
        <div className="flex items-center justify-center py-3 w-[100%]">
          <div className="rounded-xl border p-5 shadow-md w-full bg-white">
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full bg-lime-400" />
                <div className="flex flex-col">
                  <div className="text-md font-bold text-slate-700"> {name}</div>
                  <div className="text-xs font-semibold text-secondary-200">@{username}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex flex-col text-end space-x-8 text-secondary-200">
                  <div className="text-xs">{createdOnDate}</div>
                  <div className="text-xs">{createOnTime}</div>
                </div>
                {username === user ? <Dropdown /> : null}
              </div>
            </div>
            <div className="flex flex-col flex-grow overflow-auto mt-4 mb-6">
              <div className="mb-3 text-xl font-bold">{title}</div>
              <div className="text-sm text-neutral-600">
                <p>
                  {body}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-5 text-secondary-200">
                <div className="flex cursor-pointer items-center transition hover:text-darkgreen">
                  <img src="../images/hand-holding-up-a-flower.png" className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
                  <span className="font-semibold">Like</span>
                </div>
                <div className="flex space-x-4 md:space-x-8">
                  <div className="flex cursor-pointer items-center transition hover:text-darkgreen">
                    <img src="../images/plant-comment-icon.png" className="mr-1.5 h-6 w-6" alt="Comment" fill="none" />
                    <span className="font-semibold">Comment</span>
                  </div>
                </div>
                <div className="flex space-x-4 md:space-x-8">
                  <div className="flex cursor-pointer items-center transition hover:text-darkgreen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Bookmark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
