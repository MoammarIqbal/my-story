# Task 3 Brief

## Global Constraints
- **Stack**: React (Vite, TypeScript), Tailwind CSS, Framer Motion, Lucide React.
- **Styling**: 
  - Colors: Warm ivory (#F5F1E8 base, #ECE6DA secondary), #252321 text, #77716A muted text.
  - Vibe: warm paper, personal journal, minimalist, calm.
  - No flashy gradients or neon.
  - Respect `prefers-reduced-motion` (disable Framer Motion animations if user prefers reduced motion).
- **Story text**: Must be EXACTLY the provided text.
- **Image**: `ammar-by-maisara.jpeg`

## EXACT STORY TEXT TO USE
hii, so... this is me.

my name is Moammar Iqbal.

you can call me Iqbal, Ammar, or whatever the hell you want.

i’m a tech guy.

i love building useful stuff, especially software, and somehow that became my job.

and honestly? i love what i do.
but today... bro, i was DONE.

work was just too much.
too many things, too much thinking, too much everything.

i could feel myself getting close to burnout, so i just zoned out for a while, let my brain wander, and smoked a cigarette or two to deal with the exhaustion.

then i got home...
and somehow, i found this beautiful drawing from a girl named Maisaraa.

and idk... it just made me smile.
funny how sometimes, after a really shitty day, something small can make everything feel a little better.

thank you, Maisaraa.
you made this tired guy's day a little less tiring.

## Task Details
- Create `src/components/Story.tsx`.
- Layout: Large illustration on one side (desktop) or top (mobile). Text on the other side/bottom. Ensure generous whitespace and strong visual hierarchy.
- State: `storyStarted` (boolean).
- "read a story" button: Minimalist, lowercase, subtle hover effect. Positioned elegantly on the initial screen. Clicking it sets `storyStarted = true`.
- Transition: Use Framer Motion to fade out the button and smoothly transition into the text container.
- Once `storyStarted` is true, render the `Typewriter` component with the EXACT story text provided above.
- Include subtle "skip" and "restart" controls (e.g., minimalist buttons with Lucide icons or small text) that control the `Typewriter` props.
- Include `- art by maisaraa` at the end, appearing AFTER typing finishes (using the `onComplete` callback from `Typewriter`).
- Ensure responsive layout works beautifully on mobile and desktop without horizontal scrolling.

## Context
This component orchestrates the main interaction of the website, combining the hero image, the "read a story" button, and the typewriter component built in Task 2.
