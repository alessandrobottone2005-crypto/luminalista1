# Lumina project rules

## Start here

1. Read [`README.md`](README.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
2. Treat [`LogoLumina_Animazione.blend`](LogoLumina_Animazione.blend), [`public/Logo.svg`](public/Logo.svg) and [`lumina-lista-1-project-brief.md`](lumina-lista-1-project-brief.md) as visual sources of truth.
3. Keep provisional content clearly labelled until official content arrives.
4. Run `npm run check` before committing.
5. End each work session with one explicit next action.

## Engineering rules

- Keep route composition in `src/pages`, reusable structure in `src/components`, copy in `src/content`, generated media config in `src/config`, effects in `src/motion`, and form transport in `src/features/ideas`.
- Use GSAP only for timelines and scroll-linked choreography. Use Motion for React state transitions and CSS for simple hover or press feedback. Style with plain CSS in `src/styles`; do not reintroduce Tailwind or UI kits.
- Render changes to the hero from the approved `.blend` source (`npm run media:hero:render`); never reproduce its materials or animation by eye.
- Respect `prefers-reduced-motion`, keyboard focus, 44 px touch targets and readable 16 px functional copy.
- Never commit `.env.local`, credentials, Google account data or spreadsheet exports.

## Visual rules

- Preserve the black, warm white and Lumina yellow palette.
- Use square editorial geometry, strong type hierarchy and deliberate whitespace.
- Let motion reveal meaning: darkness → light → participation.
- Use the uploaded logo without redrawing or replacing its paths.
- Avoid generic gradients, glass cards, random floating objects and decorative motion without narrative purpose.
