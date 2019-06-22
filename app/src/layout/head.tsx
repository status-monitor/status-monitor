import HtmlHead from 'next/head';
import React, { FunctionComponent } from 'react';

import '../styles/index.scss';

export const Head: FunctionComponent<{ title: string }> = ({ title, children }) => {
  return (
    <HtmlHead>
      <title>{title} - Uptime</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
      {children}
    </HtmlHead>
  );
};
