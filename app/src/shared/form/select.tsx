import React, { ReactElement, useState, FunctionComponent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { StyledLabel, StyledFormElement } from './_styles';

const StyledSelect = styled(StyledFormElement)`
  height: 46px;
`;

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  options: { label: string; value: string }[];
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

export const Select: FunctionComponent<InputProps> = ({ options, value, onChange, label }): ReactElement => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledSelect as="select" value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};
