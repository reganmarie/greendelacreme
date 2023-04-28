import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLogoutUserMutation } from '../../store/authApi';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { SvgIcon } from '@mui/material';


export default function SideBar() {
  const [showResourcesHover, setShowResourcesHover] = useState(false);
  const [logout] = useLogoutUserMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div class="ml-6 flex flex-col items-center fixed top-4 z-10">
      <div class="space-y-32 rounded-xl bg-white drop-shadow py-3">
        <ul>
          <li class="p-5">
            <NavLink to="/blogs">
              <SvgIcon component={HomeOutlinedIcon} className="text-secondary-100 transition-all hover:text-color5 sidebar" />
            </NavLink>
          </li>
          <li class="p-5">
            <Link to="/resources">
              <SvgIcon component={YardOutlinedIcon} className="text-secondary-100 transition-all hover:text-color5 sidebar" />
            </Link>
          </li>
          <li class="p-5">
            <Link to="/forum">
              <SvgIcon component={MapTwoToneIcon} className="text-secondary-100 transition-all hover:text-color5 sidebar" />
            </Link>
          </li>
          <li class="p-5">
            <Link to="/plants"
              onMouseEnter={() => setShowResourcesHover(prev => !prev)}
              onMouseLeave={() => setShowResourcesHover(prev => !prev)}
            >
              {showResourcesHover ?
                <img
                  src={`${process.env.PUBLIC_URL}/images/green-energy-hover.png`}
                  alt="Resources"
                  className="h-6 w-6" />
                :
                <img
                  src={`${process.env.PUBLIC_URL}/images/green-energy.png`}
                  alt="Resources"
                  className="h-6 w-6" />
              }
            </Link>
          </li>
          <li class="p-5">
            <Link to="/profile">
              <SvgIcon component={AccountCircleOutlinedIcon} className="text-secondary-100 transition-all hover:text-color5 sidebar" />
            </Link>
          </li>
        </ul>
        <div class="flex items-center justify-center">
          <ul>
            <li class="p-5">
              <SvgIcon component={LogoutOutlinedIcon}
                className="text-secondary-100 transition-all hover:text-color5 sidebar hover:cursor-pointer"
                onClick={handleClick}
              />
            </li>
            <li class="p-5">
              <SvgIcon component={KeyboardDoubleArrowLeftOutlinedIcon} className="text-secondary-100 transition-all hover:text-color5 sidebar hover:cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
      <img className="h-48 swinging-image swinging-image-outside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-5.png`} alt="Hanging plant" />
    </div>
  );
}
