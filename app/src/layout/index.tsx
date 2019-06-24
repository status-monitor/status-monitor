import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { AppHeader } from './header';
import { backgroundColor, textColor } from '@app/styles/variables';
import { ConfirmDialog } from '@app/components/dialogs/confirm-dialog';

const BodyDiv = styled.div`
  background: ${backgroundColor};
  height: 100vh;
  color: ${textColor};
`;

export const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <BodyDiv>
      <AppHeader />
      <ConfirmDialog />
      {children}
    </BodyDiv>
  );
};
