import React from 'react';
import { useDeleteCommentMutation } from '../store/commentApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Delete({ id, comment }) {
  const [deleteComment, result] = useDeleteCommentMutation();

  const handleDelete = () => {
    deleteComment(id);
  };

  if (result.isSuccess) {
    toast(`Uprooted comment "${comment}"`, { toastId: `commentDelete - ${comment}` });
    result.reset();
  }

  return (
    <>
      <input type="checkbox" id={`${id} - delete comment`} className="modal-toggle" />
      <label htmlFor={`${id} - delete comment`} className="modal cursor-pointer">
        <label className="modal-box relative bg-white/60 backdrop-blur-md" htmlFor="">
          <p className="py-4 font-semibold">Are you sure you want to delete this comment?</p>
          <p className="italic border-s-4 px-2 py-0.5 border-secondary-100">{comment}</p>
          <p className="flex items-center justify-end py-4">
            <button type="button"
              className="font-sm group scale-75 relative h-12 w-20 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-gradient-to-br from-[#75f977] via-[#c5e0c6] to-[#30f862] dark:bg-darkgreen transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <label htmlFor={`${id} - delete comment`}
                className="relative text-black group-hover:text-black py-[10px] px-[12.328px] hover:cursor-pointer inline-block">Cancel</label>
            </button>
            <button type="submit"
              className="font-sm group scale-75 relative h-12 w-20 overflow-hidden rounded-lg bg-white text-lg shadow"
              onClick={handleDelete}>
              <div className="absolute inset-0 w-3 bg-gradient-to-br from-[#f70303b2] via-[#f90606ce] to-[#f82f3994] dark:bg-darkgreen transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-black font-sm ">Delete</span>
            </button>
          </p>
        </label>
      </label>
    </>
  );
}
