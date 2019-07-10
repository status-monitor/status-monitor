import React, { ReactElement, FunctionComponent, ChangeEvent, memo, useCallback } from 'react';
import styled from 'styled-components';
import { StyledLabel, styledFormElementBase } from './_styles';

const StyledInput = styled.input`
  ${styledFormElementBase};
  padding-top: 14px;
  padding-bottom: 14px;
`;

interface InputProps {
  value?: any;
  onChange?: (value: any) => void;
  label?: string;
  type?: string;
}

export const Input: FunctionComponent<InputProps> = memo(
  ({ type, value, onChange, label }): ReactElement => {
    const onChangeInput = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange],
    );

    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput value={value} type={type || 'text'} onChange={onChangeInput} />
      </>
    );
  },
);
