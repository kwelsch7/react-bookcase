import * as React from 'react';
import { MediaList } from './MediaList';

export const Footer: React.SFC = () => (
  <footer className="navbar navbar-dark">
    <span>
      Copyright © 2019 Konnor Welsch
    </span>
    <div>
      <span className="pr-4">
        Find me on:
      </span>
      <MediaList/>
    </div>
  </footer>
);