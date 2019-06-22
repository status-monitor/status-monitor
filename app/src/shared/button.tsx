import React, { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';
// import { textColor } from '@app/styles/variables';

const StyledButton = styled.button``;

interface ButtonProps {
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, onClick }): ReactElement => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
