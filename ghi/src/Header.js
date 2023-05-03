import React, { useEffect } from "react";
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
    await logout();
  }

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="bg-[#f8f8f6] border-b-[0.1px] border-b-[lightgray] sticky z-[99999]">
      <div className="flex justify-center items-center max-w-7xl mx-auto space-x-32">
        <div className="mr-[82px] mr__small">
          <Link to="/blogs">
            <Lottie animationData={plant} className="w-20" />
          </Link>
        </div>
        <div className="header__icons justify-center space-x-20">
          <Link to="/blogs">
            <HeaderOption Icon={HomeIcon} title="Home" />
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
        <div className="flex">
          <HeaderOption
            avatar="https://images.pexels.com/photos/8192014/pexels-photo-8192014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            title="Profile"
          />
          <div>
            <button className="button__input" id="logout" type="submit" onClick={handleClick}> Logout </button>
          </div>
        </div>
      </div>
    </div>
  );
}
