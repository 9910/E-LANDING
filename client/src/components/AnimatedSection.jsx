import { forwardRef } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const AnimatedSection = forwardRef(({ children, className = '' }, forwardedRef) => {
  const animRef = useAnimateOnScroll();

  const mergeRefs = (el) => {
    animRef.current = el;
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(el);
      } else {
        forwardedRef.current = el;
      }
    }
  };

  return (
    <div ref={mergeRefs} className={`animated-section w-full ${className}`}>
      {children}
    </div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
