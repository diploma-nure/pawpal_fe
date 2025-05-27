import { fireEvent } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('should call the handler when clicking outside the element', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    const element = document.createElement('div');
    document.body.appendChild(element);
    result.current.current = element;

    fireEvent.mouseDown(document.body);

    expect(handler).toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it('should not call the handler when clicking inside the element', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    const element = document.createElement('div');
    document.body.appendChild(element);
    result.current.current = element;

    fireEvent.mouseDown(element);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });
});
