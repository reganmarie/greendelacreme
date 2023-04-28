import React, { useEffect, useState } from 'react';
import { useUpdateReplyMutation } from '../store/replyApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditReply({ reply, id, forum_id }) {
  const [update, edited] = useUpdateReplyMutation();
  const [editedAnswer, setEditAnswer] = useState('');
  const [editedImage, setEditImage] = useState('');

  useEffect(() => {
    if (reply) {
      setEditAnswer(reply.answer);
      setEditImage(reply.image);
    }
  }, [reply]);

  if (edited.isSuccess) {
    edited.reset();
    toast.success('♻️Your reply has been updated!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", toastId: 'recycle'
    });
  }

  return (
    <>
      <input type="checkbox" id={`${reply.id}`} className="modal-toggle" />
      <div className="modal" >
        <div className="modal-box w-11/12 max-w-3xl">
          <form onSubmit={async (e) => { e.preventDefault(); await update({ id, data: { 'answer': editedAnswer, 'rating': 0, 'image': editedImage, 'forum_id': forum_id } }); }}>
            <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
              <h1 className="text-center text-2xl font-bold text-black-500 mb-10">Edit Reply</h1>
              <div className="space-y-4">
                <label htmlFor={`${reply.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div>
                  <label htmlFor="answer" className="text-xl font-bold ">Answer</label>
                  <textarea type="text" required defaultValue={reply.answer} id="answer" className="w-full outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setEditAnswer(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="name" className="text-lx font-serif">Image URL</label>
                  <input type="text" defaultValue={reply.image} id="image" className="w-full ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setEditImage(e.target.value)} />
                </div>
              </div>
              <div className="modal-action flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-3 dark:border-opacity-50">
                <label htmlFor={`${reply.id}`} className="hover:bg-red-800 px-6 py-2  block rounded-md text-lg font-semibold text-gray-100 bg-red-600 hover:cursor-pointer">Exit</label>
                <button className="hover:bg-lime-800 px-6 py-2 mx-auto block rounded-md text-lg font-semibold bg-lime-600 text-gray-100" type="submit" >Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
