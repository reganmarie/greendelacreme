import React, { useState } from 'react';
import { useDeleteOwnerMutation } from '../../store/blogApi';

export default function Dropdown({id}) {

  const [DeleteBlog] = useDeleteOwnerMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = () => {
    DeleteBlog(id);
    setConfirmDelete(false);
  };

  return (
    <div className="dropdown">
      <button tabIndex={0} className="inline-block align-middle text-secondary-200 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <svg className="mt-1 w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
      </button>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li className="hover-bordered" key={`${id} - dropdown edit`}>
          <label htmlFor={`${id}-modal`}>
            <img src={`${process.env.PUBLIC_URL}/images/pencil.png`} className="h-6 w-6" alt="Edit" />
            Edit
          </label>
        </li>
        <li className="hover-bordered" key={`${id} - dropdown delete` }>
          <label htmlFor={id} onClick={handleDelete}>
            <img src={`${process.env.PUBLIC_URL}/images/delete.png`} className="h-[22px] w-[22px]" alt="Delete" />
            Delete
          </label>
          {confirmDelete && (
            <div className="">
              <form>
                <div className="double-confirm">
                  <div className="double-confirm-inner relative transform transition duration-500 ease-in-out">
                    <p className="text-black flex start-0">Last chance, delete?</p>
                    <button type="button" className=" font-sm group scale-75 relative h-10 w-16 overflow-hidden rounded-lg bg-white text-lg shadow"  onClick={handleCancelDelete}>
                      <div className="absolute inset-0 w-3 bg-gradient-to-br from-[#75f977] via-[#c5e0c6] to-[#30f862] dark:bg-darkgreen transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-black group-hover:text-black">Cancel </span>
                    </button>
                    <button type="submit" className="font-sm group scale-75 relative h-10 w-16 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={handleConfirmDelete}>
                      <div className="absolute inset-0 w-3 bg-gradient-to-br from-[#f70303b2] via-[#f90606ce] to-[#f82f3994] dark:bg-darkgreen transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-black group-hover:text-black font-sm ">Delete</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
