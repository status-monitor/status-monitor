import { ChangeEvent, useState } from 'react';

export function useFormValue<ValueType>(
  initialValue?: ValueType,
): [
  ValueType,
  { value: ValueType; onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void },
  (value: ValueType) => void,
] {
  const [value, setValue] = useState<ValueType>(initialValue);

  return [
    value,
    {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValue(event.target.value as any);
      },
    },
    setValue,
  ];
}
