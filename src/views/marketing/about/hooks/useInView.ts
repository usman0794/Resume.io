// ─── useInView.ts ─────────────────────────────────────────────
// Hook: fires `visible = true` once element enters viewport.
// Used by every section for fade-up entrance animation.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible] as const;
}
