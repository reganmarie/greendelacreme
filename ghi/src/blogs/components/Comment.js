import React, { useState } from 'react';
import { useGetCommentsQuery, useCreateCommentMutation } from '../../store/commentApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


export default function Comment({ id, username }) {
  const [response, setResponse] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { data: comments } = useGetCommentsQuery(id);
  const [createComment, result] = useCreateCommentMutation();
  const user = useSelector(state => state.auth.user.username);

  const onEmojiClick = (e) => {
    const emoji = e.native;
    setResponse(prev => prev + emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment({ "blog_id": id, response });
    setResponse("");
  };

  if (result.isSuccess) {
    toast(`${user} commented on ${username}'s blog!`, { toastId: `commentSuccess - ${response}` });
    result.reset();
  }

  return (
    <>
      <div className="pt-3 mt-4 pr-2 border-t overflow-auto max-h-48">
        {comments && comments.map(comment => {
          const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
          };
          return (
            <div key={comment.id} className="flex pb-4 justify-between">
              <div className="flex items-center space-x-3">
                <img className="rounded-full max-w-none w-9 h-9 bg-lime-400" src={comment.avatar} alt="avatar" />
                <div className="flex flex-col -space-y-0.5">
                  <div className="flex items-center">
                    <Link className="inline-block text-slate-700 text-sm font-bold mr-1" to="#">{comment.first} {comment.last}</Link>
                    <span className="text-xs text-secondary-200 font-semibold">@{comment.username}</span>
                  </div>
                  <p className="text-base">{comment.response}</p>
                </div>
              </div>
              <div className="flex flex-col text-xs text-secondary-200 dark:text-slate-300 text-end">
                <span className="">{new Date(comment.created_on).toLocaleDateString("en-US", options)}</span>
                <span className="">{new Date(comment.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            className="py-2 pl-3 w-full h-11 bg-gray-100 dark:bg-gray-600 rounded-lg placeholder:text-gray-400 dark:placeholder:text-gray-300 text-sm pr-20 focus:outline-secondary-200"
            type="text"
            placeholder="Write a comment"
            value={response}
            onChange={e => setResponse(e.target.value)}
            required
          />
          <div className="absolute bottom-[45px] right-[-121px]">
            {showPicker && <Picker
              theme="light"
              data={data}
              onEmojiSelect={onEmojiClick}
            />}
          </div>
          <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
            <button type="button" onClick={() => setShowPicker(prev => !prev)}>
              <svg className="mr-2 w-6 h-6 fill-secondary-200 hover:fill-darkgreen hover:cursor-pointer" viewBox="0 0 24 24"
              >
                <path
                  d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
                </path>
              </svg>
            </button>
            <button type="submit">
              <svg className="fill-secondary-200 hover:fill-darkgreen hover:cursor-pointer dark:fill-gray-50 w-6 h-6" viewBox="0 0 24 24">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
              </svg>
            </button>
          </span>
        </form>
      </div>
    </>
  );
}
