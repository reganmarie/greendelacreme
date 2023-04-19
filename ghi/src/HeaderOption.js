import React from "react";
import { Avatar } from "@mui/material";
import "./blogs/static/HeaderOption.css";

function HeaderOption({ avatar, Icon, title }) {
  return (
    <div className="HeaderOption">
      {avatar && <Avatar className="HeaderOption__icon" src={avatar} />}
      <div className="HeaderOption1">
        {Icon && <Icon className="headerOption__icon" />}
      </div>
      <h3 className="HeaderOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
