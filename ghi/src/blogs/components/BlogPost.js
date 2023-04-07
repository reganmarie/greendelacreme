import { Avatar } from '@mui/material';
import React from 'react';
import '../static/BlogPost.css';
import InputOption from './InputOption';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';

export default function BlogPost({ username, avatar, createdOnDate, createOnTime, title, body }) {

  return (
    <div>
      <div className='flex items-center justify-center py-3'>
      <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full bg-lime-400" />
            <div className="text-lg font-bold text-slate-700"> {username}</div>
          </div>
          <div className="flex flex-col text-end space-x-8">
            <div className="text-xs text-neutral-500">{createdOnDate}</div>
            <div className="text-xs text-neutral-500">{createOnTime}</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">{title}</div>
          <div className="text-sm text-neutral-600">{body}</div>
        </div>

        <div>
          <div className="flex items-center space-x-5 text-slate-500">
            <div className="flex cursor-pointer items-center transition hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>4</span>
            </div>
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>125</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
