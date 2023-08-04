import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { MobileNavBarTab } from "./mobile-nav-bar-tab";

export const MobileNavBarTabs = ({ handleClick }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__tabs">
      <MobileNavBarTab
        path="/profile"
        label="Profile"
        handleClick={handleClick}
      />
      {isAuthenticated && (
        <>
          <MobileNavBarTab
            path="/developer"
            label="Developer"
            handleClick={handleClick}
          />
          <MobileNavBarTab
            path="/user"
            label="User"
            handleClick={handleClick}
          />
          <MobileNavBarTab
            path="/scientist"
            label="Scientist"
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
