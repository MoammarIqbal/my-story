import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { Typewriter } from './Typewriter';

describe('Typewriter Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Default window.matchMedia mock returning false
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders with whitespace-pre-wrap and displays cursor while typing', () => {
    const { container } = render(<Typewriter text="hello world" speed={35} />);
    const rootSpan = container.firstElementChild as HTMLElement;

    expect(rootSpan.className).toContain('whitespace-pre-wrap');
    // Before timer advances, initial index is 0, text is empty, cursor is visible
    expect(rootSpan.textContent).toContain('|');
  });

  it('preserves line breaks in the rendered text', () => {
    const textWithNewlines = 'first line\nsecond line\n\nthird line';
    const { container } = render(<Typewriter text={textWithNewlines} skip={true} />);
    const rootSpan = container.firstElementChild as HTMLElement;

    expect(rootSpan.textContent).toBe(textWithNewlines);
    expect(rootSpan.className).toContain('whitespace-pre-wrap');
  });

  it('types character by character and calls onComplete once done', () => {
    const onComplete = vi.fn();
    const { container } = render(
      <Typewriter text="abc" speed={30} onComplete={onComplete} />
    );

    // Initial state: index 0
    expect(container.textContent).toBe('|');
    expect(onComplete).not.toHaveBeenCalled();

    // After 1st char ('a')
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('a|');
    expect(onComplete).not.toHaveBeenCalled();

    // After 2nd char ('b')
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('ab|');
    expect(onComplete).not.toHaveBeenCalled();

    // After 3rd char ('c')
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('abc');
    // Cursor disappears when done
    expect(container.querySelector('.typewriter-cursor')).toBeNull();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('pauses longer after punctuation marks to feel human', () => {
    const onComplete = vi.fn();
    const { container } = render(
      <Typewriter text="a. b" speed={30} onComplete={onComplete} />
    );

    // char 1: 'a' (speed = 30)
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('a|');

    // char 2: '.' (speed = 30, since prevChar was 'a')
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('a.|');

    // After '.' is typed, next char (' ') should have a longer delay (> 30ms, ~175ms)
    act(() => {
      vi.advanceTimersByTime(50);
    });
    // Should still be waiting because of punctuation pause
    expect(container.textContent).toBe('a.|');

    // Advance past punctuation pause
    act(() => {
      vi.advanceTimersByTime(130);
    });
    expect(container.textContent).toBe('a. |');

    // char 4: 'b' (prev was ' ', speed = 30)
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toBe('a. b');
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('instantly reveals text and calls onComplete when skip is initially true', () => {
    const onComplete = vi.fn();
    const { container } = render(
      <Typewriter text="instant text" skip={true} onComplete={onComplete} />
    );

    expect(container.textContent).toBe('instant text');
    expect(container.querySelector('.typewriter-cursor')).toBeNull();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('instantly completes when skip prop changes to true mid-typing', () => {
    const onComplete = vi.fn();
    const { container, rerender } = render(
      <Typewriter text="hello world" speed={30} skip={false} onComplete={onComplete} />
    );

    // Advance 2 characters step by step
    act(() => {
      vi.advanceTimersByTime(30);
    });
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.textContent).toContain('he|');
    expect(onComplete).not.toHaveBeenCalled();

    // Update skip to true
    rerender(
      <Typewriter text="hello world" speed={30} skip={true} onComplete={onComplete} />
    );

    expect(container.textContent).toBe('hello world');
    expect(container.querySelector('.typewriter-cursor')).toBeNull();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('skips animation and immediately reveals text if prefers-reduced-motion is true', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const onComplete = vi.fn();
    const { container } = render(
      <Typewriter text="calm reduced motion" onComplete={onComplete} />
    );

    expect(container.textContent).toBe('calm reduced motion');
    expect(container.querySelector('.typewriter-cursor')).toBeNull();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('handles empty text gracefully without error', () => {
    const onComplete = vi.fn();
    const { container } = render(<Typewriter text="" onComplete={onComplete} />);

    expect(container.textContent).toBe('');
    expect(container.querySelector('.typewriter-cursor')).toBeNull();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('resets and types new text when text prop changes', () => {
    const onComplete = vi.fn();
    const { container, rerender } = render(
      <Typewriter text="hi" speed={25} onComplete={onComplete} />
    );

    act(() => {
      vi.advanceTimersByTime(25);
    });
    act(() => {
      vi.advanceTimersByTime(25);
    });
    expect(container.textContent).toBe('hi');
    expect(onComplete).toHaveBeenCalledTimes(1);

    // Change text
    rerender(<Typewriter text="bye" speed={25} onComplete={onComplete} />);
    expect(container.textContent).toBe('|');

    act(() => {
      vi.advanceTimersByTime(25);
    });
    act(() => {
      vi.advanceTimersByTime(25);
    });
    act(() => {
      vi.advanceTimersByTime(25);
    });
    expect(container.textContent).toBe('bye');
    expect(onComplete).toHaveBeenCalledTimes(2);
  });
});
