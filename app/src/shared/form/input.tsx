import React, { ReactElement, useState, FunctionComponent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { StyledLabel, StyledFormElement } from './_styles';

const StyledInput = styled(StyledFormElement)`
  padding: 14px 22px;
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
