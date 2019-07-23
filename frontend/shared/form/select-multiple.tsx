import React, { ReactElement, FunctionComponent, ChangeEvent, memo, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { StyledLabel } from './_styles';

const Container = styled.div`
  margin-bottom: 5px;
`;
const InputCheckbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;
const Label = styled.label`
  position: relative;
  top: 2px;
  cursor: pointer;
`;

interface SelectProps {
  value?: any[];
  onChange?: (value: any) => void;
  label?: string;
  options: { label: string; value: any }[];
  toUniqueString?: (value: any) => string;
}

export const SelectMultiple: FunctionComponent<SelectProps> = memo(
  ({ options, value, onChange, label, toUniqueString }): ReactElement => {
    const name = useRef<string>(`${Math.random() * 10000}`);

    const getId = useCallback((value: any) => (toUniqueString ? toUniqueString(value) : value), [toUniqueString]);

    const onChangeInput = useCallback(
      (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
          onChange([...value, key]);
        } else {
          const copy = [...value];
          copy.splice(value.map(getId).indexOf(getId(key)), 1);
          onChange(copy);
        }
      },
      [getId, onChange, value],
    );

    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        {options.map(option => {
          const id = getId(option.value);
          return (
            <Container key={option.label}>
              <InputCheckbox
                type="checkbox"
                checked={value.map(getId).includes(id)}
                id={id}
                name={name.current}
                onChange={onChangeInput(option.value)}
              />
              <Label htmlFor={id}>{option.label}</Label>
            </Container>
          );
        })}
        <br />
      </>
    );
  },
);
