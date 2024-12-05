import { useEffect, useRef } from 'react';

export const useSmoothScroll = (
  scrollValue: number,
  setScrollValue: (value: React.SetStateAction<number>) => void,
) => {
  const animationRef = useRef<number>(0);
  let lastUpdateTime = 0;

  const smoothScrollTo = (targetScrollLeft: number) => {
    const duration = 300; // Animation duration in milliseconds
    const start = scrollValue; // Initial scroll position
    const change = targetScrollLeft - start; // Total distance to scroll
    const startTime = performance.now(); // Starting time of the animation

    const easeInOutQuad = (t: number): number =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function for smooth scroll

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime; // Time elapsed since the animation started
      const progress = Math.min(elapsed / duration, 1); // Progress fraction (clamped to 1)
      const easedProgress = easeInOutQuad(progress); // Apply easing function

      const nextScrollLeft = start + change * easedProgress; // Compute next scroll position

      const now = performance.now();
      if (now - lastUpdateTime > 16) {
        // Update at most 60 fps
        setScrollValue(nextScrollLeft);
        lastUpdateTime = now;
      }

      if (progress < 1) {
        // If the animation isn't complete, schedule the next frame
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Clean up when the animation completes
        cancelAnimationFrame(animationRef.current!);
      }
    };
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { smoothScrollTo };
};
