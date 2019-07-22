import { useState } from 'react';

export function useFormValue<ValueType>(
  initialValue?: ValueType,
): [ValueType, { value: ValueType; onChange: (value: ValueType) => void }, (value: ValueType) => void] {
  const [value, setValue] = useState<ValueType>(initialValue);

  return [
    value,
    {
      value,
      onChange: (value: ValueType) => {
        setValue(value);
      },
    },
    setValue,
  ];
}
