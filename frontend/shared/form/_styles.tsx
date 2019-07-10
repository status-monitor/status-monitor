import styled from 'styled-components';
import {
  formElementBorderColor,
  formElementBackground,
  textColor,
  formElementActiveBorderColor,
} from '@app/styles/variables';

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.4rem;
  vertical-align: top;
  margin-bottom: 0.5rem;
`;

export const StyledFormElement = styled.input`
  border: 1px solid ${formElementBorderColor};
  font-weight: 400;
  font-size: 0.875rem;
  box-shadow: none;
  outline: 0;
  background-color: ${formElementBackground};
  width: 100%;
  display: block;
  color: ${textColor};
  margin-bottom: 1rem;
  padding-left: 14px;
  padding-right: 14px;

  &:focus {
    border-color: ${formElementActiveBorderColor};
  }
`;
