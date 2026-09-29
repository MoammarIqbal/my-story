# Task 4 Brief

## Global Constraints
- **Stack**: React (Vite, TypeScript), Tailwind CSS, Framer Motion, Lucide React.
- **Styling**: 
  - Colors: Warm ivory (#F5F1E8 base, #ECE6DA secondary), #252321 text, #77716A muted text.
  - Vibe: warm paper, personal journal, minimalist, calm, cinematic.
  - No flashy gradients or neon.
  - Respect `prefers-reduced-motion`.
- **Image**: `ammar-by-maisara.jpeg` must be the hero.
- **Story text**: Must remain exactly as provided in the previous tasks.

## Task Details
- Integrate the `Story` component into `src/App.tsx`.
- Refine the global styles in `src/index.css`.
- Add a beautiful, extremely subtle CSS noise texture to the background in `index.css` to make it feel like "analog photography" or "warm paper". It should be barely visible (opacity < 0.05).
- Ensure the image has a very subtle parallax or floating effect (e.g. drifting 2-4px up and down over 10 seconds) using Framer Motion or pure CSS. Important: Disable this if `prefers-reduced-motion` is active.
- Review typography. If standard sans-serif feels too generic for the story, consider importing a beautiful Google Font like `Inter` (sans-serif) for UI and `Lora` or `Newsreader` (serif) for the story text. If you add a font, add it via a lightweight `<link>` in `index.html` and define it in Tailwind / CSS. Keep it elegant and highly readable.
- Add any final micro-interactions requested in the spec (subtle button hovers, smooth page transitions).
- Ensure the layout is absolutely responsive on all viewports (mobile, tablet, laptop, desktop).
- Fix any remaining accessibility issues or structural errors.

## Context
This is the final task to assemble the app, apply the finishing touches (like the subtle paper noise and typography), and ensure the whole experience feels like a deeply personal, cinematic digital diary.
