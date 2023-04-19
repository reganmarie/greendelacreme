
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';

export default function BlogPost({ username, name, avatar, createdOnDate, createOnTime, id, title, body, image }) {
  const [showLikeHover, setShowLikeHover] = useState(false);
  const [showChatHover, setShowChatHover] = useState(false);
  const user = useSelector(state => state.auth.user.username);

  return (
    <div key={id} className="flex max-w-2xl 1080:max-w-3xl 1440:max-w-5xl items-center justify-center mx-auto">
      <div className="flex flex-col items-center w-[100%]">
        <div className="flex items-center justify-center py-2 w-[100%]">
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
                {username === user ? <Dropdown key={`${id} - dropdown`} id={id} /> : null}
              </div>
            </div>
            <div className="flex flex-col flex-grow overflow-auto mt-4 mb-6">
              <div className="mb-3 text-xl font-bold">{title}</div>
              <div className="text-sm text-neutral-600 whitespace-pre-wrap">
                <p>
                  {body}
                </p>
              </div>
              <img src={image}
                className={image && "rounded-xl mt-3"}
                alt="" />
            </div>
            <div>
              <div className="flex items-center space-x-5 text-secondary-200">
                <div
                className="flex cursor-pointer items-center transition hover:text-darkgreen"
                onMouseEnter={() => setShowLikeHover(true)}
                onMouseLeave={() => setShowLikeHover(false)}
                >
                  {
                  !showLikeHover  ?
                    <img src="../images/hand-holding-up-a-flower.png" className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
                  :
                    <img src="../images/hand-holding-up-a-flower-hover.png" className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
                  }
                  <span className="font-semibold">Like</span>
                </div>
                <div className="flex space-x-4 md:space-x-8">
                  <div
                  className="flex cursor-pointer items-center transition hover:text-darkgreen"
                  onMouseEnter={() => setShowChatHover(true)}
                  onMouseLeave={() => setShowChatHover(false)}
                  >
                    {
                    !showChatHover ?
                      <img src="../images/plant-comment-icon.png" className="mr-1.5 h-6 w-6" alt="Comment" fill="none" />
                    :
                      <img src="../images/chat-hover.png" className="mr-1.5 h-6 w-6" alt="Comment" fill="none" />
                    }
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
