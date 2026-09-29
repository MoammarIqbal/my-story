# Task 3 Report

## Changes Made
- Created `src/components/Story.tsx` to handle the main page layout and orchestrate the interactions.
- Set up a responsive layout that splits the screen into an image section and a content section, stacking vertically on mobile and side-by-side on desktop.
- Integrated the provided image (`ammar-by-maisara.jpeg`) with a soft animation on load.
- Added a "read a story" button with minimalist styling and Lucide icons.
- Implemented Framer Motion transitions (`AnimatePresence`) for a smooth, fade-based switch from the start button to the story text.
- Integrated the `Typewriter` component (created in Task 2) with the exact provided story text.
- Added subtle "skip" and "restart" controls that interact directly with the `Typewriter`'s state.
- Displayed `- art by maisaraa` after the `Typewriter` fires its `onComplete` callback.
- Updated `src/App.tsx` to render the new `Story` component.

## Tests Run
- `npm run lint` - Passed without warnings.
- `npm run build` - Completed successfully.
- Manually checked for layout and responsive design elements in the code (ensuring horizontal scrolling isn't triggered and whitespace is generous).

## Status
DONE

## Post-Review Fixes
- Addressed accessibility: Wrapped the entire layout in `<MotionConfig reducedMotion="user">` so that Framer Motion automatically skips animations if the user prefers reduced motion.
- Fixed top truncation on short displays: Replaced `justify-center` on the scroll container with `my-auto` on the inner text content, ensuring long text starts from the top.
- Corrected colors: Used the constraint-defined `#ECE6DA` instead of `#E5DFD3` for selection and borders.
- Cleaned up classes: Removed the undefined `scrollbar-hide` utility class.
- Fixed artwork cropping: Changed `object-cover` to `object-contain` for the main image to preserve the complete drawing without cropping.
