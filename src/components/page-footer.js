import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList = [
    {
      path: "https://www.media.mit.edu/research/",
      label: "Research",
    },
    {
      path: "https://www.media.mit.edu/graduate-program/",
      label: "Graduate Program",
    },
    {
      path: "https://members.media.mit.edu/user/login?destination=/",
      label: "Member Portal",
    },
    {
      path: "https://www.media.mit.edu/groups/camera-culture/overview/",
      label: "Camera Culture",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>This application is brought to you by&nbsp;</span>
              <PageFooterHyperlink path="https://www.media.mit.edu/">
                MIT Media Lab
              </PageFooterHyperlink>
            </p>
            <p className="page-footer-message__description">
              <PageFooterHyperlink path="https://www.media.mit.edu/groups/camera-culture/projects/">
                <span>
                  Projects at MIT Media Lab's <u><strong>Camera Culture Group</strong></u>
                </span>
              </PageFooterHyperlink>
            </p>
            <p className="page-footer-message__description">
              <PageFooterHyperlink path="https://www.media.mit.edu/groups/camera-culture/overview/">
                <span>
                  <br></br>
                  <img
                    className="nav-bar__logo"
                    src="/camera-culture-group.svg"
                    alt="MIT Media Lab Logo"
                    width="400"
                    height="45"
                  />
                </span>
              </PageFooterHyperlink>
            </p>
          </div>
          <div className="">
            <a
              id="create-account-button"
              className="button button--secondary"
              href="https://auth0.com/signup"
              target="_blank"
              rel="noreferrer noopener"
            >
              Create Free Auth0 Account
            </a>
          </div>
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  {resource.label}
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="/mit-media-lab.svg"
              alt="Auth0"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://www.media.mit.edu">
              MIT Media Lab
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};