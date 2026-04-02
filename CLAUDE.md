# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Build & Dev Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint
```

## Workflow Orchestration

### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

## Architecture

This is a **Next.js 16 portfolio site** (App Router, React 19, TypeScript 5) converted from a Framer design. It's a single-page marketing site with no API routes or dynamic data fetching.

### Key Architectural Decisions

- **Fixed footer reveal pattern**: Footer is `position: fixed; bottom: 0; z-0` and the main content wrapper sits at `relative z-[2]` with solid backgrounds, so scrolling past the last section reveals the footer underneath. A placeholder `<div>` at the end of content creates the scroll space.
- **Sticky stacking cards**: Services section uses `position: sticky; top: 420px` on each card with ascending z-index so cards stack on top of each other during scroll. The last card is NOT sticky.
- **All section components are client components** (`"use client"`) because they use framer-motion for scroll-triggered animations.

### Design System (from Framer)

- **Tailwind v4** with inline `@theme` config in `globals.css` — no separate tailwind.config file
- **19 custom text style classes** (`.text-h1` through `.text-h9`, `.text-body-*`, `.text-mono-*`, `.text-menu`) defined in `globals.css` — use these instead of raw Tailwind typography
- **Color palette**: `white-100/98/96` and `black-10` through `black-100` (grayscale only). Use as Tailwind classes: `bg-black-100`, `text-white-100`
- **Fonts**: Plus Jakarta Sans (sans) + Fragment Mono (mono), configured in `src/lib/fonts.ts` as CSS variables
- **Breakpoints**: Phone (default), Tablet (`md: 810px`), Desktop (`lg: 1200px`)

### Content & Data

All static content lives in `src/lib/data.ts` — testimonials, services, stats, bio text, social links, project data. Edit this file to change site content.

### Component Organization

- `src/components/sections/` — Full-page sections (Hero, About, Projects, Services, Stats, Testimonials, BookACall)
- `src/components/layout/` — Navigation and Footer
- `src/components/ui/` — Reusable pieces (AnimatedNumber, MarqueeTicker, HeroSlideshow, ServiceCard, SocialIcon, LiveClock)
- `src/lib/` — Fonts config and data

### Animation Patterns

All animations use `framer-motion`. Scroll-triggered animations use `useInView` with `once: true`. The marquee ticker uses CSS `@keyframes` with a `--marquee-duration` CSS variable.

### Images

Currently using external Unsplash URLs as placeholders. Production images should be downloaded to `public/images/` and served via `next/image`.
