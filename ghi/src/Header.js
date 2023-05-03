import React, { useEffect, useState } from "react";
import "./blogs/static/Header.css";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import YardIcon from "@mui/icons-material/Yard";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import SearchIcon from '@mui/icons-material/Search';
import Lottie from "lottie-react";
import plant from "./assets/images/plant.json";
import { useLogoutUserMutation } from './store/authApi';
import { useNavigate, Link } from 'react-router-dom';



export default function Header({ token }) {
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();

async function handleClick(e) {
  e.preventDefault();
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
}



  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="navbar sticky z-0 min-h-[32px] bg-[#f8f8f6]">
  <div className="flex-1">
    <a className="mx-auto lottie normal-case text-xl">
      <Link to="/blogs">
            <Lottie animationData={plant} className="w-20" />
          </Link>
    </a>
  </div>
      <div className="bg-[#f8f8f6] flex justify-center w-full top-0">
      <div className="flex flex-row justify-center items-center">

        <div className="header__icons flex basis-1/2 justify-center space-x-20">
          <Link to="/blogs">
            <HeaderOption className="mt-5" Icon={HomeIcon} title="Home" />
          </Link>
          <Link to="/resources">
            <HeaderOption Icon={YardIcon} title="Plant Info" />
          </Link>
          <Link to="/forum">
            <HeaderOption Icon={MapTwoToneIcon} title="Forum" />
            </Link>
            <Link to="/data">
            <HeaderOption Icon={SearchIcon} title="Plant Data" />
            </Link>
        </div>
        </div>
        </div>

    <div className="dropdown dropdown-end p-2">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[%E2%80%A6]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content  p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="" >Settings</Link></li>
        <li><button className="button__input" id="logout" type="submit" onClick={handleClick}> Logout </button></li>
      </ul>
    </div>
  </div>
  );
}
