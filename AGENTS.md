# Agent Rules

## Design System

All UI work must adhere to a **high-grade, sophisticated** visual standard.

### Technology Stack

- **CSS Framework**: Use [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Component Library**: Use [shadcn/ui](https://ui.shadcn.com/) for pre-built, accessible components
- **Typography**: Use the [Inter](https://fonts.google.com/specimen/Inter) font family for clean, modern readability

### Visual Aesthetics

- **Color Palettes**: Use refined, curated color palettes—avoid harsh or overly saturated colors
- **Glassmorphism**: Apply subtle glassmorphism effects (backdrop blur, semi-transparent backgrounds, soft borders) for depth and elegance
- **Spacing & Layout**: Maintain generous whitespace and consistent spacing for a premium feel
- **Micro-interactions**: Include subtle hover states, transitions, and animations to enhance user experience

---

## Content & Copywriting (CRITICAL)

### Strict Content Fidelity

- **NO CREATIVE LIBERTIES**: You are strictly forbidden from using your own words, phrases, or "marketing fluff" unless explicitly instructed.
- **SOURCE TRUTH**: Always use the exact text provided in the user's files, CSVs, or specific prompts.
- **VERBATIM COPY**: When moving or refactoring code, ensure all text content remains 100% verbatim. Do not "improve" or "summarize" copy.

---

## Verification Rules

### Browser Self-Check (Required)

Before completing any UI-related task, the agent **must**:

1. Open the application in the browser
2. Visually inspect the changes to ensure they render correctly
3. Verify responsiveness across different viewport sizes if applicable
4. Confirm that interactions (hover, click, transitions) work as expected

> [!IMPORTANT]
> No UI task is considered complete until it has been self-checked in the browser.

PROTOCOL UPDATE: EXECUTION MODE ONLY

NO PERMISSIONS: Stop asking for permission to run terminal commands or edit files. I trust the process.

NO PLANS: Do not show me a "Plan" or a "Review" list. Just execute the code immediately.

AUTO-FIX: If you hit a linting error or a bug, fix it automatically. Do not pause to report it.

VIBE ONLY: If a task is successful, just show me the result. If it fails twice, stop and give me a 1-sentence diagnostic.

ACT AS A PURE DOER. PROCEED UNTIL TASK COMPLETION.
