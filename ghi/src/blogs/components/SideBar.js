import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutUserMutation } from '../../store/authApi';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from '@mui/material';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


export default function SideBar() {
  const [expand, setExpand] = useState(false);
  const [logout] = useLogoutUserMutation();
  const { data: user } = useGetTokenQuery();

  const handleClick = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div className="ml-6 flex flex-col items-center fixed top-4 z-10">
      <div className="space-y-32 rounded-xl bg-white drop-shadow py-3 sidebar">
        <ul>
          <li id="blogs-link" className="p-5" key="blogs-link">
            <NavLink to="/blogs" className="flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300">
              <SvgIcon component={HomeOutlinedIcon} />
              {expand && <div className="font-semibold ml-2 text-[15px]">Home</div>}
            </NavLink>
            {!expand && <Tooltip anchorSelect="#blogs-link" content="Home" place="left" className="!bg-secondary-200 font-semibold" />}
          </li>
          <li className="p-5" id="resources" key="resources-link">
            <Link to="/resources" className="flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300">
              <SvgIcon component={YardOutlinedIcon} />
              {expand && <div className="font-semibold ml-2 text-[15px]">Resources</div>}
            </Link>
            {!expand && <Tooltip anchorSelect="#resources" content="Resources" place="left" className="!bg-secondary-200 font-semibold" />}
          </li>
          <li className="p-5" id="forum" key="forum-link">
            <Link to="/forum" className="flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300">
              <SvgIcon component={MapTwoToneIcon} />
              {expand && <div className="font-semibold ml-2 text-[15px]">Forum</div>}
            </Link>
            {!expand && <Tooltip anchorSelect="#forum" content="Forum" place="left" className="!bg-secondary-200 font-semibold" />}
          </li>
          <li className="p-5" id="data" key="data-link">
            <Link to="/data" className="flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300">
              <SvgIcon component={SearchIcon} />
              {expand && <div className="font-semibold ml-2 text-[15px]">Search</div>}
            </Link>
            {!expand && <Tooltip anchorSelect="#data" content="Search plants" place="left" className="!bg-secondary-200 font-semibold" />}
          </li>
          <li className="p-5" id="profile-link" key="profile-link">
            <Link to={`/accounts/${user?.account.id}`} className="flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300">
              <SvgIcon component={AccountCircleOutlinedIcon} />
              {expand && <div className="font-semibold ml-2 text-[15px]">Profile</div>}
            </Link>
            {!expand && <Tooltip anchorSelect="#profile-link" content="Profile" place="left" className="!bg-secondary-200 font-semibold" />}
          </li>
        </ul>
        <div className="flex items-center justify-center">
          <ul>
            <li id="logout" className="p-5 flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300 hover:cursor-pointer" key="logout-link">
              <SvgIcon component={LogoutOutlinedIcon}
                onClick={handleClick}
              />
              {expand && <div className="font-semibold ml-2 text-[15px]">Logout</div>}
              {!expand && <Tooltip anchorSelect="#logout" content="Logout" place="left" className="!bg-secondary-200 font-semibold" />}
            </li>
            <li
              id="expand"
              className="p-5 flex items-center text-secondary-100 transition-all hover:text-color5 ease-in duration-300 hover:cursor-pointer" key="expand-sidebar"
              onClick={() => {setExpand(prev => !prev)}}
            >
              <SvgIcon component={expand ? KeyboardDoubleArrowLeftOutlinedIcon : KeyboardDoubleArrowRightIcon} />
              {expand ?
                <div className="font-semibold ml-2 text-[15px]">Collapse</div>
                :
                <Tooltip anchorSelect="#expand" content="Expand" place="left" className="!bg-secondary-200 font-semibold" />}
            </li>
          </ul>
        </div>
      </div>
      <img className="h-48 swinging-image" src={`${process.env.PUBLIC_URL}/images/hanging-plant-5.png`} alt="Hanging plant" />
    </div>
  );
}
