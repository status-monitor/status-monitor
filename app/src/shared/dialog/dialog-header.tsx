import React, { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';
import { rem } from '@app/styles/mixins';
import { textColor } from '@app/styles/variables';
import { dialogXPadding } from './styles';

interface DialogHeaderProps {
  onClose?: (...args: any[]) => void;
  dismissable?: boolean;
  className?: string;
}

const DialogHeaderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: ${rem(27)} 0 ${rem(10)} 0;
  font-size: ${rem(24)};
  font-weight: normal;
  margin: 0 ${dialogXPadding};
`;

const CloseButtonA = styled.a`
  position: absolute;
  right: 0;
  top: ${rem(20)};
  font-size: ${rem(30)};
  color: ${textColor};
  cursor: pointer;
`;

export const DialogHeader: FunctionComponent<DialogHeaderProps> = ({
  children,
  onClose,
  dismissable,
}): ReactElement => {
  return (
    <DialogHeaderDiv>
      <div>{children}</div>
      {dismissable && <CloseButtonA onClick={onClose}>&times;</CloseButtonA>}
    </DialogHeaderDiv>
  );
};

(DialogHeader as any).componentName = 'DialogHeader';
