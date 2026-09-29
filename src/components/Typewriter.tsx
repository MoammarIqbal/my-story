import React, { useState, useEffect, useRef } from 'react';

export interface TypewriterProps {
  /** The full text to type out. Line breaks (\n) are preserved. */
  text: string;
  /** Optional callback fired when typing is finished or skipped. */
  onComplete?: () => void;
  /** Optional callback fired every time a new character is displayed. */
  onCharTyped?: () => void;
  /** Speed in milliseconds per standard character (default 35). */
  speed?: number;
  /** If true, immediately reveals all text and skips the animation. */
  skip?: boolean;
  /** Optional CSS class name for the wrapper element. */
  className?: string;
}

/**
 * Computes delay for the next character.
 * Punctuation marks (. , ? !) and line breaks get a longer pause to feel human.
 */
function getCharacterDelay(prevChar: string, baseSpeed: number): number {
  if (/[.!?]/.test(prevChar)) {
    return Math.max(baseSpeed * 5, 175);
  }
  if (/[,;:]/.test(prevChar)) {
    return Math.max(baseSpeed * 3.5, 120);
  }
  if (prevChar === '\n') {
    return Math.max(baseSpeed * 4, 140);
  }
  return baseSpeed;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  onComplete,
  onCharTyped,
  speed = 40,
  skip = false,
  className = '',
}) => {
  // Ref to callbacks so prop changes don't re-trigger timers
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  
  const onCharTypedRef = useRef(onCharTyped);
  onCharTypedRef.current = onCharTyped;

  const hasCompletedRef = useRef<boolean>(false);

  // Determine whether typing animation should be bypassed
  const shouldBypass = skip;

  // Track the number of displayed characters
  const [displayedIndex, setDisplayedIndex] = useState<number>(() => {
    return shouldBypass || text.length === 0 ? text.length : 0;
  });

  // Reset or adjust if text changes
  const prevTextRef = useRef(text);
  if (prevTextRef.current !== text) {
    prevTextRef.current = text;
    hasCompletedRef.current = false;
    setDisplayedIndex(shouldBypass || text.length === 0 ? text.length : 0);
  }

  // When skip becomes true, reveal all text
  useEffect(() => {
    if (skip) {
      setDisplayedIndex(text.length);
    }
  }, [skip, text.length]);

  // Trigger onCharTyped when displayedIndex changes
  useEffect(() => {
    if (displayedIndex > 0 && displayedIndex < text.length) {
      onCharTypedRef.current?.();
    }
  }, [displayedIndex, text.length]);

  // Derived completion state
  const isComplete = shouldBypass || displayedIndex >= text.length;

  // Trigger onComplete when completion is reached
  useEffect(() => {
    if (isComplete && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [isComplete]);

  // Typing effect loop
  useEffect(() => {
    if (isComplete) {
      return;
    }

    const prevChar = displayedIndex > 0 ? text[displayedIndex - 1] : '';
    const delay = getCharacterDelay(prevChar, speed);

    const timer = setTimeout(() => {
      setDisplayedIndex((prev) => Math.min(prev + 1, text.length));
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedIndex, isComplete, text, speed]);

  const displayedText = isComplete ? text : text.slice(0, displayedIndex);

  return (
    <span className={`whitespace-pre-wrap ${className}`.trim()}>
      {displayedText}
      {!isComplete && (
        <span
          aria-hidden="true"
          className="typewriter-cursor inline-block font-normal ml-0.5 select-none opacity-70"
        >
          |
        </span>
      )}
    </span>
  );
};

export default Typewriter;
