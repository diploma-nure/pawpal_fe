import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);

  return ref;
};
