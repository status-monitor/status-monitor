import styled from 'styled-components';
import { inputBorderColor, inputBackground, textColor, inputActiveBorderColor } from '@app/styles/variables';

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.4rem;
  vertical-align: top;
  margin-bottom: 0.5rem;
`;

export const StyledFormElement = styled.input`
  border: 1px solid ${inputBorderColor};
  font-weight: 400;
  font-size: 0.875rem;
  box-shadow: none;
  outline: 0;
  background-color: ${inputBackground};
  width: 100%;
  display: block;
  color: ${textColor};
  margin-bottom: 1rem;

  &:focus {
    border-color: ${inputActiveBorderColor};
  }
`;
