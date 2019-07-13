import React, { ReactElement, FunctionComponent, ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import { StyledLabel, StyledFormElement } from './_styles';

const StyledSelect = styled(StyledFormElement)`
  height: 46px;
`;

interface SelectProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  options: { label: string; value: string }[];
}

export const Select: FunctionComponent<SelectProps> = memo(
  ({ options, value, onChange, label }): ReactElement => {
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
  },
);
