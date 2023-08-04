import React from "react";
import { NavLink } from "react-router-dom";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="mobile-nav-bar__logo"
          src="/mit-media-lab.svg"
          alt="MIT Media Lab Logo"
          width="82.313"
          height="45"
        />
      </NavLink>
    </div>
  );
};
