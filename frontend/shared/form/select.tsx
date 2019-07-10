import React, { ReactElement, FunctionComponent, ChangeEvent, memo, useCallback } from 'react';
import styled from 'styled-components';
import { StyledLabel, styledFormElementBase } from './_styles';

const StyledSelect = styled.select`
  ${styledFormElementBase};
  height: 46px;
`;

interface SelectProps {
  value?: any;
  onChange?: (value: any) => void;
  label?: string;
  placeholder?: string;
  toInteger?: boolean;
  options: { label: string; value: any }[];
}

export const Select: FunctionComponent<SelectProps> = memo(
  ({ options, value, onChange, label, placeholder, toInteger }): ReactElement => {
    const onChangeSelect = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        let value: any = event.target.value;
        if (toInteger) {
          value = parseInt(value);
        }
        onChange(value);
      },
      [onChange, toInteger],
    );

    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledSelect value={value || ''} onChange={onChangeSelect}>
          <option value="" disabled hidden>
            {placeholder || 'Choose here'}
          </option>

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
