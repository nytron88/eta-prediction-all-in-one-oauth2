import React from "react";

export const HeroBanner = () => {
  const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">ETA Prediction by MIT Media Lab!</h1>
      <p className="hero-banner__description">
        If you are new here, then <strong>Sign Up</strong> and send an email to <strong>sidjain88tx@gmail.com</strong> to have
        appropriate role assigned to you.
      </p>
      <p className="hero-banner__description">
        You can get your <strong>access token</strong> by clikcing on <strong>Profile</strong> in the navigation bar.
      </p>
    </div>
  );
};
