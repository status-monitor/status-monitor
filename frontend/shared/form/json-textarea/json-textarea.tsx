import React, { ReactElement, FunctionComponent, memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { StyledLabel } from '../_styles';

//@ts-ignore
const Ace = dynamic(import('./ace').then(mod => mod.Ace), {
  ssr: false,
});

interface CodeTextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export const JsonTextarea: FunctionComponent<CodeTextareaProps> = memo(
  ({ value, onChange, label }): ReactElement => {
    const onChangeCode = useCallback((value: string) => onChange(value), [onChange]);

    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        <Ace value={value} onChange={onChangeCode} />
      </>
    );
  },
);
