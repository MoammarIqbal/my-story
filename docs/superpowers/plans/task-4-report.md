# Task 4 Report

## Changes Made
- Added `Inter` and `Lora` Google Fonts via `<link>` in `index.html`.
- Updated `index.css` to define `--font-sans` and `--font-serif`.
- Added `@keyframes float` to `index.css` for a subtle floating animation on the image, and disabled it inside `@media (prefers-reduced-motion: reduce)`.
- Added the `floating-image` class to the image container in `Story.tsx` to implement the parallax/float effect.
- Applied `font-serif` to the story text wrapper in `Story.tsx`.
- The background noise was already present and kept as its current form (< 0.05 opacity).

## Test Summary
- Ran `npm run build`, successfully completed with no errors.

## Concerns
- None.

## Task 4 Fixes
- Removed `bg-[#F5F1E8]` from the root element of `Story.tsx` to stop obscuring the SVG noise texture in `index.css`.
- Moved `.floating-image` class from the `motion.div` wrapper to the inner `<img>` element in `Story.tsx` to resolve the CSS transform collision with Framer Motion `scale` animation.
- Verified fixes by running `npm run lint` and `npm run build` successfully.
