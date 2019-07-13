import React, { ReactElement, FunctionComponent, ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import { StyledLabel, StyledFormElement } from './_styles';

const StyledInput = styled(StyledFormElement)`
  padding-top: 14px;
  padding-bottom: 14px;
`;

interface InputProps {
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
}

export const Input: FunctionComponent<InputProps> = memo(
  ({ type, value, onChange, label }): ReactElement => {
    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput value={value} type={type || 'text'} onChange={onChange} />
      </>
    );
  },
);
