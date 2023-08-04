import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="/mit-media-lab.svg"
          alt="MIT Media Lab Logo"
          width="82.313"
          height="45"
        />
      </NavLink>
    </div>
  );
};