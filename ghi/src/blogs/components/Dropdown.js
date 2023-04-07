import React from 'react';
import { Link } from 'react-router-dom';

export default function Dropdown() {
  return (
    <div className="dropdown">
      <button tabIndex={0} className="inline-block align-middle text-secondary-200 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <svg className="mt-1 w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
      </button>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li className="hover-bordered">
          <Link to="#">
            <img src="../images/pencil.png" className="h-6 w-6" alt="Edit" />
            Edit
          </Link>
        </li>
        <li className="hover-bordered">
          <Link to="#">
            <img src="../images/delete.png" className="h-[22px] w-[22px]" alt="Delete" />
            Delete
          </Link>
        </li>
      </ul>
    </div>
  );
}
