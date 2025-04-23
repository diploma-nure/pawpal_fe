import { useCallback, useState } from 'react';

type UseDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export const useDisclosure = (
  initialState: boolean = false,
): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, onOpen, onClose, onToggle };
};
