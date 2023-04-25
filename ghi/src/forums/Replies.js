import React, { useState } from 'react';
import { useCreateReplyMutation, useGetRepliesQuery } from '../store/replyApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


export default function Replies({id}){
  const { data: replyData } = useGetRepliesQuery(`${id}`);
  const [ post, replied ] = useCreateReplyMutation();
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState('');
  const user = useSelector(state => state.auth.user.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post({ 'answer': answer, 'forum_id': id, 'image': image, 'rating': 0});
    setAnswer('');
    setImage('');
    e.target.reset()
  };
  if (replied.isSuccess){
        replied.reset()
        toast.success('📝 Your reply was posted!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", toastId:'un'
        });
  }


    return(
  <section className=" dark:bg-gray-900 py-8 lg:py-16">
    <form className=" bg-color5 bg-opacity-70 mb-6 max-w-5xl ml-12 p-5 rounded-5xl" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-lg lg:text-2xl font-bold p-2 mb-5 text-gray-900 dark:text-white">Reply</h2>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea type="text" id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write a reply..." required></textarea>
        </div>
              <input
                className="w-full rounded-lg text-sm py-2 pl-2 pr-[70px] bg-gray-100 mb-3 mr-2 focus:outline-secondary-200"
                type="text"
                placeholder="Image URL here"
                onChange={e => setImage(e.target.value)}
                maxLength="400"
              />
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post Reply
        </button>
    </form>
        <h2 className="text-lg lg:text-2xl p-4 font-bold text-gray-900 dark:text-white">Replies</h2>
      {Array.isArray(replyData) && replyData.map(reply =>{
            const options = {
                month: "long",
                day: "numeric",
                year: "numeric",
            };
            return(
    <article key={reply.id} id="reply" className="p-6 mb-6 static break-words text-base bg-color6 rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center" key={reply.id}>
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={reply.avatar}
                        alt="Avatar" />User: {reply.username}</p>
            </div>
            {reply.username === user ?
            <div className="dropdown" >
                <label tabIndex={0} className="">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
             </div>
            : null }

        </footer>
        <p key={reply.id} className="text-black-500 dark:text-gray-400">{reply.answer}</p>
        {reply.image != null ? <img src={reply.image} className='object-scale-down' /> : null}
        <div className="flex items-center mt-4 space-x-4">
            <p
                className="flex items-center text-sm text-black-500 hover:underline dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16"> <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> </svg>
                {new Date(reply.created_on).toLocaleDateString("en-US", options)} {new Date(reply.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
        </div>
    </article>
    )
  })}

</section>
        )

};
