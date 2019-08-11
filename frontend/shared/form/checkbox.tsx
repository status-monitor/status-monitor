import React, { ReactElement, FunctionComponent, ChangeEvent, memo, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { StyledLabel } from './_styles';

const InputCheckbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;
interface CheckboxProps {
  value?: boolean;
  onChange?: (value: any) => void;
  label: string;
}

export const Checkbox: FunctionComponent<CheckboxProps> = memo(
  ({ value, onChange, label }): ReactElement => {
    const onClickCheckbox = useCallback(() => {
      console.log(value);
      onChange(!value);
    }, [onChange, value]);

    return (
      <>
        <label>
          <InputCheckbox type="checkbox" checked={!!value} onChange={onClickCheckbox} /> {label}
        </label>
        <br />
      </>
    );
  },
);
