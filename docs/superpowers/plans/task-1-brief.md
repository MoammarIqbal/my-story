# Task 1 Brief

## Global Constraints
- **Stack**: React (Vite, TypeScript), Tailwind CSS (v4), Framer Motion, Lucide React.
- **Styling**: 
  - Colors: Warm ivory (#F5F1E8 base, #ECE6DA secondary), #252321 text, #77716A muted text.
  - Vibe: warm paper, personal journal, minimalist, calm.
  - No flashy gradients or neon.
  - Respect `prefers-reduced-motion`.
- **Assets**: The image `ammar-by-maisara.jpeg` must be moved to `public/ammar-by-maisara.jpeg` and used as the hero artwork.
- **Components**: Everything should be in a single page app.
- **Accessibility**: Semantic HTML, accessible buttons, `alt` text for images.

## Task Details
- Use a bash/node script or PowerShell to move `ammar-by-maisara.jpeg` from `C:\laragon\www\art\` to `public/ammar-by-maisara.jpeg`.
- Configure `vite.config.ts` to use `@tailwindcss/vite` plugin (if Tailwind v4) or initialize `tailwind.config.js` properly. 
- Update `src/index.css` to import Tailwind and set the base background color (`#F5F1E8`) and text color (`#252321`) on `body`. Add a subtle noise background using CSS if possible (or keep it clean).
- Clear `src/App.css`.
- Update `src/App.tsx` to be a simple empty React component.

## Context
This is the first task of the project to initialize the basic styling, setup tailwind CSS and move the image to the correct location.
