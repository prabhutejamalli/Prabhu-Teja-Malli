import { useState, useEffect, RefObject } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Returns true once the referenced element enters the viewport.
 * By default triggers only once (for reveal animations).
 */
const useIntersection = (
  ref: RefObject<Element | null>,
  { threshold = 0.15, rootMargin = '0px', triggerOnce = true }: Options = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isIntersecting;
};

export default useIntersection;
