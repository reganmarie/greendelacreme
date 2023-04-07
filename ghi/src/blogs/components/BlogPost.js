
import React from 'react';
<<<<<<< HEAD

export default function BlogPost({ username, name, avatar, createdOnDate, createOnTime, title, body }) {
=======
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';

export default function BlogPost({ username, name, avatar, createdOnDate, createOnTime, title, body }) {
  const user = useSelector(state => state.auth.user.username);
>>>>>>> main

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
<<<<<<< HEAD
                  <div className="text-xs font-semibold text-slate-700">@{username}</div>
=======
                  <div className="text-xs font-semibold text-secondary-200">@{username}</div>
>>>>>>> main
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex flex-col text-end space-x-8 text-secondary-200">
                  <div className="text-xs">{createdOnDate}</div>
                  <div className="text-xs">{createOnTime}</div>
                </div>
<<<<<<< HEAD
                <div className="dropdown">
                  <button tabIndex={0} className="inline-block text-secondary-200 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="hover-bordered">
                      <a>Edit</a>
                    </li>
                    <li className="hover-bordered">
                      <a>Delete</a>
                    </li>
                  </ul>
                </div>
=======
                {username === user ? <Dropdown /> : null}
>>>>>>> main
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
