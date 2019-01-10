import * as React from 'react';

export const MediaList: React.SFC = () => (
  <ul className="nav">
    <li className="nav-item">
      <a className="nav-link" href="https://www.linkedin.com/in/konnor-welsch-812448114">
        <i className="fab fa-fw fa-linkedin pr-1"/> LinkedIn
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://github.com/kwelsch7">
        <i className="fab fa-fw fa-github pr-1"/> GitHub
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://codepen.io/kwelsch">
        <i className="fab fa-fw fa-codepen pr-1"/> CodePen
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://kwelsch7.github.io">
        <i className="fas fa-fw fa-address-card pr-1"/> Portfolio
      </a>
    </li>
  </ul>
);
