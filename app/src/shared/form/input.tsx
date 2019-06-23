import React, { ReactElement, useState, FunctionComponent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { textColor } from '@app/styles/variables';

const StyledInput = styled.input`
  border: 1px solid rgba(46, 50, 74, 0.7);
  font-weight: 400;
  font-size: 0.875rem;
  box-shadow: none;
  outline: 0;
  background-color: #2b2e4c;
  padding: 14px 22px;
  width: 100%;
  display: block;
  color: ${textColor};
  margin-bottom: 1rem;

  &:focus {
    border-color: #80bdff;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.4rem;
  vertical-align: top;
  margin-bottom: 0.5rem;
`;

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
}

export const useInput = (
  initialValue: string = '',
): [string, { value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }, (value: string) => void] => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
    },
    setValue,
  ];
};

export const Input: FunctionComponent<InputProps> = ({ type, value, onChange, label }): ReactElement => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput value={value} type={type || 'text'} onChange={onChange} />
    </>
  );
};
