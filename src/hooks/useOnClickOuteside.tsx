// hooks/useOnClickOutside.ts

import { RefObject, useEffect } from 'react';

// Define the type for the event to be either a mouse or touch event
type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
) {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      // Do nothing if the ref is not yet set or if the click is inside the ref's element
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Add event listeners
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove the event listeners
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Re-run the effect if ref or handler changes
}

export default useOnClickOutside;
