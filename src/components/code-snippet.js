import React from "react";

export const CodeSnippet = ({ title, code = "" }) => (
  <div className="code-snippet">
    <span className="code-snippet__title">{title}
    </span>
    <div className="md-pre_cB__header__vPRvs">
      <div className="md-pre_cB__title__Rr49v"></div>
      <button className="md-pre_cB__copyButton__6l2Z9" onClick={() => {navigator.clipboard.writeText(code)}}>Copy</button>
    </div>
    <div className="code-snippet__container">
      <div className="code-snippet__wrapper">
        <pre id="code" className="code-snippet__body">{code}</pre>
      </div>
    </div>
  </div>
);
