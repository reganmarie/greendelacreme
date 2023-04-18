import React from 'react';
import { Link } from 'react-router-dom';

export default function ForumDropdown() {
  return(
    <div className="dropdown dropdown-bottom">
      <label tabIndex={0} className="btn m-1">Update</label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
            <Link to="#">
            <p>Edit</p>
            </Link>
        </li>
        <li>
            <Link to="#">
            <p>Delete</p>
            </Link>
        </li>
      </ul>
    </div>
  );
}
