import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { appBarBackground, appBarHeight, appBarColor } from '@app/styles/variables';

const AppBar = styled.section`
  background: ${appBarBackground};
  height: ${appBarHeight};
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;

  a {
    display: inline-block;
    padding: 0 20px;
    line-height: ${appBarHeight};
    color: ${appBarColor};
    font-size: 1.05rem;
  }
`;

const TitleDiv = styled.div`
  display: inline-block;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: white;

  img {
    height: 30px;
    margin-right: 8px;
    position: relative;
    top: -3px;
  }
`;

export const AppHeader: FunctionComponent = () => {
  return (
    <AppBar>
      <TitleDiv>
        <img src="/static/logo-white.png" />
        Status Monitor
      </TitleDiv>

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/settings">
        <a>Settings</a>
      </Link>
    </AppBar>
  );
};
