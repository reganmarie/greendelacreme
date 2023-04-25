import {React, useState } from 'react';
import { useDeleteReplyMutation, useUpdateReplyMutation } from '../store/replyApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditReply(id, old_answer, old_image,){
  const [update, edited] = useUpdateReplyMutation();
  const [deleteReply] = useDeleteReplyMutation(id);
  const [answer, setAnswer] = useState(old_answer);
  const [image, setImage] = useState(old_image);

  const handleEdit = async (e) => {
    e.preventDefault();
    await update( {id:id, data:{answer, image}});
  }

  if (edited.isSuccess){
    edited.reset()
    toast.success('♻️Your reply has been updated!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", toastId:'recycle'
    });
  }

  const handleDelete = (id) => {
    deleteReply(id);
  }
  return (
    <>
    <label htmlFor="my-modal" className="btn">open modal</label>
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal max-w-full">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">Yay!</label>
    </div>
  </div>
</div>

     <label htmlFor="my-modal" className="btn border-0 hover:bg-amber-800  bg-amber-600 mx-auto">Edit Reply</label>
       
      </>
  )
};
