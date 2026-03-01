import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  /** Target number to count up to */
  target?: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Whether to start the animation */
  triggered: boolean;
  /** Suffix to display after the number, e.g. "M+" */
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target = 10,
  duration = 1800,
  triggered,
  suffix = 'M+',
}) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
