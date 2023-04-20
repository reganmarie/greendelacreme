import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteOwnerMutation } from '../store/forumApi';


export default function ForumDropdown({ id }) {
  const [deleteForum] = useDeleteOwnerMutation(id);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteForum(id);
    navigate("/forum");
  }

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
            <button
            className="btn btn-error"
            onClick={() => handleDelete(id)}
            >
              Delete
            </button>
        </li>
      </ul>
    </div>
  );
}
