import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateForm from './CreateForm';
import EditForm from './EditForm';


export default function Comment({ id, comments, username }) {
  const [limit, setLimit] = useState(3);
  const user = useSelector(state => state.auth.user.username);
  const showCommentRef = useRef(null);

  const showMoreComments = () => {
    setLimit(prev => prev + 3);
    showCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="pt-3 mt-4 border-t">
        {comments && comments.slice(0, limit).map(comment => {
          const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
          };
          return (
            <>
              <div key={comment.id} className="flex justify-between">
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
                  <span>{new Date(comment.created_on).toLocaleDateString("en-US", options)}</span>
                  <span>{new Date(comment.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
              <div className="pb-3">
                {user === comment.username && <EditForm id={comment.id} initResponse={comment.response} key={`${comment.id} - edit comment`} />}
              </div>
            </>
          );
        })}
      </div>
      {comments && comments.slice(0, limit).length < comments.length && <div className="flex justify-center">
        <button
          type="button"
          className="text-sm font-semibold justify-center pb-4 text-secondary-200 hover:text-darkgreen"
          onClick={showMoreComments}
          ref={showCommentRef}
        >Show more comments</button>
      </div>
      }
      <CreateForm id={id} username={username} key={`${id} - create comment`} setLimit={setLimit} comments={comments} />
    </>
  );
}
