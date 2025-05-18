import { useCallback, useState } from 'react';

export const useCheckboxArray = (
  initialValue: number[] = [],
  isMutuallyExclusive = false,
) => {
  const [values, setValues] = useState<number[]>(initialValue);

  const toggle = useCallback(
    (value: number) => {
      if (values.includes(value)) {
        setValues(values.filter((item: number) => item !== value));
      } else {
        setValues(isMutuallyExclusive ? [value] : [...values, value]);
      }

      return value;
    },
    [values, isMutuallyExclusive],
  );

  return { values, toggle, setValues };
};
