import { useState, useCallback, useRef } from 'react';

/**
 * Hook: useTypingAnimation
 * Cycles through an array of words with a typewriter effect.
 * Returns the currently displayed text.
 */
export function useTypingAnimation(words: string[], speed = 80, pause = 1800): string {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const word = words[wordIdx] ?? '';

    if (!deleting) {
      if (charIdx < word.length) {
        setDisplayed(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIdx > 0) {
        setDisplayed(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
        timeoutRef.current = setTimeout(tick, speed / 2);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
        timeoutRef.current = setTimeout(tick, speed);
      }
    }
  }, [words, wordIdx, charIdx, deleting, speed, pause]);

  // Start on mount
  useState(() => {
    timeoutRef.current = setTimeout(tick, speed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  });

  return displayed;
}

export default useTypingAnimation;
