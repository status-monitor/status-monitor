import React, { ReactElement, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  primary,
  primaryButtonBackground,
  primaryButtonHoverBackground,
  primaryButtonActiveBackground,
  primaryButtonFocusShadowColor,
  dangerButtonHoverBackground,
  dangerButtonBackground,
  dangerButtonActiveBackground,
  dangerButtonFocusShadowColor,
} from '@app/styles/variables';

const StyledButton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #606a96;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }

  ${({ theme }: ButtonProps) =>
    theme === 'primary' &&
    css`
      color: #fff;
      background-color: ${primaryButtonBackground};
      border-color: ${primaryButtonBackground};

      &:hover {
        background-color: ${primaryButtonHoverBackground};
        border-color: ${primaryButtonHoverBackground};
      }

      &:not(:disabled):not(.disabled):active {
        background-color: ${primaryButtonActiveBackground};
        border-color: ${primaryButtonActiveBackground};
      }

      &:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 0.2rem ${primaryButtonFocusShadowColor};
      }
    `}
  ${({ theme }: ButtonProps) =>
    theme === 'light' &&
    css`
      color: #212529;
      background-color: #f8f9fa;
      border-color: #f8f9fa;

      &:hover {
        background-color: #e2e6ea;
        border-color: #dae0e5;
      }

      &:not(:disabled):not(.disabled):active {
        background-color: #dae0e5;
        border-color: #d3d9df;
      }

      &:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);
      }
    `};

  ${({ theme }: ButtonProps) =>
    theme === 'danger' &&
    css`
      color: white;
      background-color: ${dangerButtonBackground};
      border-color: ${dangerButtonBackground};

      &:hover {
        background-color: ${dangerButtonHoverBackground};
        border-color: ${dangerButtonHoverBackground};
      }

      &:not(:disabled):not(.disabled):active {
        background-color: ${dangerButtonActiveBackground};
        border-color: ${dangerButtonActiveBackground};
      }

      &:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 0.2rem ${dangerButtonFocusShadowColor};
      }
    `};
`;

interface ButtonProps {
  onClick: () => void;
  theme?: 'primary' | 'light' | 'danger';
}

export const Button: FunctionComponent<ButtonProps> = ({ children, onClick, theme }): ReactElement => {
  return (
    <StyledButton onClick={onClick} theme={theme || 'primary'}>
      {children}
    </StyledButton>
  );
};
