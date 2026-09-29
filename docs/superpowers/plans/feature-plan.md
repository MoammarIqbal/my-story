# Implementation Plan: Personal Story Website

## Global Constraints
- **Stack**: React (Vite, TypeScript), Tailwind CSS, Framer Motion, Lucide React.
- **Styling**: 
  - Colors: Warm ivory (#F5F1E8 base, #ECE6DA secondary), #252321 text, #77716A muted text.
  - Vibe: warm paper, personal journal, minimalist, calm.
  - No flashy gradients or neon.
  - Respect `prefers-reduced-motion`.
- **Assets**: The image `ammar-by-maisara.jpeg` must be moved to `public/ammar-by-maisara.jpeg` and used as the hero artwork.
- **Story text**: Must be exactly the provided text, respecting line breaks, punctuation, and lowercase style.
- **Animation**: 
  - Smooth cinematic transitions.
  - Typewriter effect for the story (actual characters typing, ~25-45ms per character).
  - Cursor blinking, disappears when done.
  - Subtle floating/parallax for the image.
- **Components**: Everything should be in a single page app.
- **Accessibility**: Semantic HTML, accessible buttons, `alt` text for images.

## Tasks

### Task 1: Setup structure, styling, and assets
- Use a bash/node script or PowerShell to move `ammar-by-maisara.jpeg` from `C:\laragon\www\art\` to `public/ammar-by-maisara.jpeg`.
- Configure `vite.config.ts` to use `@tailwindcss/vite` plugin (if Tailwind v4) or initialize `tailwind.config.js` properly. 
- Update `src/index.css` to import Tailwind and set the base background color (`#F5F1E8`) and text color (`#252321`) on `body`. Add a subtle noise background using CSS if possible (or keep it clean).
- Clear `src/App.css`.

### Task 2: Implement Typewriter Component
- Create `src/components/Typewriter.tsx`.
- Accept props: `text` (string), `onComplete` (optional function), `speed` (number, default 35), `skip` (boolean).
- Implement typing logic using `useState` and `useEffect`.
- Handle skipping (instantly reveal all text).
- Include a blinking cursor `|` at the end that disappears when `onComplete` is reached.
- Ensure line breaks are preserved (render strings with `\n` using whitespace `pre-wrap`).

### Task 3: Implement Story Layout and Interactions
- Create `src/components/Story.tsx`.
- Layout: Large illustration on one side (desktop) or top (mobile), text on the other.
- State: `storyStarted` (boolean).
- "read a story" button: Minimalist, lowercase, subtle hover effect. Clicking it sets `storyStarted = true`.
- Transition: Use Framer Motion to fade out the button and fade in the text container smoothly.
- Once `storyStarted` is true, render the `Typewriter` component with the exact story text.
- Include subtle "skip" and "restart" controls.
- Include "- art by maisaraa" at the end, appearing after typing finishes.

### Task 4: Assemble App and Polish
- Update `src/App.tsx` to render the `Story` component.
- Ensure the image has a subtle parallax or floating effect using Framer Motion (disable if `prefers-reduced-motion`).
- Ensure responsive design works across mobile and desktop.
