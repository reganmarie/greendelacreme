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
          <div className="flex flex-col text-end space-x-8 text-secondary-200">
            <div className="text-xs">{createdOnDate}</div>
            <div className="text-xs">{createOnTime}</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">{title}</div>
          <div className="text-sm text-neutral-600">{body}</div>
        </div>

        <div>
          <div className="flex items-center space-x-5 text-secondary-200">
            <div className="flex cursor-pointer items-center transition hover:text-darkgreen">
              <img src="../images/hand-holding-up-a-flower.png" className="mr-1.5 h-5 w-5" fill="none" />
              <span>4</span>
            </div>
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-darkgreen">
                <img src="../images/plant-comment-icon.png" className="mr-1.5 h-5 w-5" fill="none" />
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
