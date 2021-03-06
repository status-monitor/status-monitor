import React, { ReactElement, FunctionComponent, memo } from 'react';
import styled from 'styled-components';
import { dialogXPadding } from './styles';
import { rem } from '@app/styles/mixins';

const DialogFooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${rem(20)} ${dialogXPadding};
  display: flex;
  flex-direction: row;
  box-sizing: content-box;
  height: ${rem(44)};

  button {
    margin-left: 5px;
  }
`;

export const DialogFooter: FunctionComponent = memo(
  ({ children }): ReactElement => {
    return <DialogFooterDiv>{children}</DialogFooterDiv>;
  },
);

(DialogFooter as any).componentName = 'DialogFooter';
