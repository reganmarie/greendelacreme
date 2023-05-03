import React from "react";
import { Avatar } from "@mui/material";
import "./blogs/static/HeaderOption.css";


export default function HeaderOption({ avatar, Icon, title, onClick }) {
  return (
    <div className="HeaderOption" onClick={onClick}>
      {avatar && <Avatar className="HeaderOption__icon" src={avatar} />}
      <div className="HeaderOption1">
        {Icon && <Icon className="headerOption__icon" />}
      </div>
      <h3 className="HeaderOption__title">{title}</h3>
    </div>
  );
}
