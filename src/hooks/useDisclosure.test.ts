import { act, renderHook } from '@testing-library/react';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  it('should initialize with the default state', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with a custom state', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('should open when onOpen is called', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => {
      result.current.onOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should close when onClose is called', () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle state when onToggle is called', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
