import React, { FunctionComponent, memo } from 'react';
import styled from 'styled-components';
import { AppHeader } from './header';
import { textColor } from '@app/styles/variables';
import { ConfirmDialog } from '@app/components/dialogs/confirm-dialog';

const BodyDiv = styled.div`
  height: 100vh;
  color: ${textColor};
`;

export const AppLayout: FunctionComponent = memo(({ children }) => {
  return (
    <BodyDiv>
      <AppHeader />
      <ConfirmDialog />
      {children}
    </BodyDiv>
  );
});
