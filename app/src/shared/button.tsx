import React, { ReactElement, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

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
      background-color: #6201ed;
      border-color: #6201ed;

      &:hover {
        background-color: #5201c7;
        border-color: #4d01ba;
      }

      &:not(:disabled):not(.disabled):active {
        background-color: #4d01ba;
        border-color: #4801ae;
      }

      &:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 0.2rem rgba(122, 39, 240, 0.5);
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
      background-color: #ff3366;
      border-color: #ff3366;

      &:hover {
        background-color: #ff0d49;
        border-color: #ff0040;
      }

      &:not(:disabled):not(.disabled):active {
        background-color: #ff0040;
        border-color: #f2003d;
      }

      &:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 82, 125, 0.5);
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
