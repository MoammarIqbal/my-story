# Task 2 Brief

## Global Constraints
- **Stack**: React (Vite, TypeScript), Tailwind CSS, Framer Motion, Lucide React.
- **Styling**: 
  - Colors: Warm ivory (#F5F1E8 base, #ECE6DA secondary), #252321 text, #77716A muted text.
  - Vibe: warm paper, personal journal, minimalist, calm.
  - Respect `prefers-reduced-motion` (disable typing effect/animations if user prefers reduced motion; show immediately instead).
- **Animation**: 
  - Typewriter effect for the story (actual characters typing, ~25-45ms per character).
  - Cursor blinking, disappears when done.

## Task Details
- Create `src/components/Typewriter.tsx`.
- Accept props: `text` (string), `onComplete` (optional function), `speed` (number, default 35), `skip` (boolean).
- Implement typing logic using `useState` and `useEffect`. Wait ~25-45ms between characters.
- Punctuation (e.g., `.`, `,`, `?`, `!`) should optionally have a slightly longer pause to feel human.
- Handle skipping (if `skip` becomes true, instantly reveal all text and call `onComplete`).
- If `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true on mount, immediately reveal the text and skip animation.
- Include a blinking cursor `|` at the end of the text that disappears when `onComplete` is reached.
- Ensure line breaks are preserved (render strings with `\n` using whitespace `pre-wrap` via Tailwind class like `whitespace-pre-wrap`).
- Do not render the story itself here, just create the reusable component.

## Context
This component will be used to render the story text character by character in the next task.
