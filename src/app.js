import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";

import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";

import { ProfilePage } from "./pages/profile-page";
import { DeveloperPage } from "./pages/developer-page";
import { UserPage } from "./pages/user-page";
import { ScientistPage } from "./pages/scientist-page";


export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route
        path="/developer"
        element={<AuthenticationGuard component={DeveloperPage} />}
      />
      <Route
        path="/user"
        element={<AuthenticationGuard component={UserPage} />}
      />
      <Route
        path="/scientist"
        element={<AuthenticationGuard component={ScientistPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
