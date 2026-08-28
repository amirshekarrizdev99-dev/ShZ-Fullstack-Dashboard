# ShZ Dashboard

A feature-based admin dashboard built with Next.js and React. It provides UI and utilities for managing users, orders, products, sales, notifications and analytics. The project uses TypeScript, Tailwind CSS, React Query and Supabase for common backend interactions.

> Version: 2.3.0

---

## Quick overview

This repository is a modern Next.js (v16) application written in TypeScript and organized using a feature-based architecture. Features are grouped under `src/features/` so each domain (dashboard, auth, orders, users, etc.) contains its own components, hooks, api clients and types. This improves encapsulation, discoverability, and testability.

Key files and folders:

- package configuration: [package.json]
- application entry & routes: [src/app/] 
- feature modules: [src/features/] 
- reusable UI components: [src/components/] 
- shared utilities: [src/shared/] 
- project helpers/libs: [src/lib/] 
- CSV sample data: [src/database/csv/] 
- tests and test setup: [src/tests/] 

Example feature:
- [src/features/dashboard/] 
  - exposes components and hooks from [src/features/dashboard/index.ts]

---

## Tech stack

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: shadcn / @base-ui/react
- State & data-fetching: @tanstack/react-query
- Backend / Auth: Supabase (@supabase/supabase-js, @supabase/ssr)
- Charts / Maps: chart.js, react-chartjs-2, @react-jvectormap
- Animations: framer-motion, gsap
- Forms & validation: react-hook-form, zod
- Testing: Vitest + Testing Library

All dependencies and devDependencies are listed in [package.json].

---

## Feature-based architecture (details)

This codebase follows a feature-based structure: each domain of the application has its own folder under `src/features/<feature-name>/`. A feature typically contains:

- components/ � feature-scoped React components
- hooks/ � custom hooks used only by the feature
- api/ � data fetching and client wrappers
- types/ � TypeScript types and DTOs
- utils/ � small utilities specific to the feature

Benefits:
- Easier onboarding: developers can focus on one feature at a time
- Better encapsulation: feature internals don't leak into the global scope
- Simpler testing: tests can be colocated with the feature and mock boundaries

Recommended conventions when adding a new feature:
- Create `src/features/<name>/` and include subfolders as needed (components, hooks, api, types)
- Export a public surface (components/hooks) from `src/features/<name>/index.ts`
- Place feature tests under `src/tests/features/<name>/`

---

## Local setup

Prerequisites:
- Node.js (recommended 18.x or newer)
- npm, yarn or pnpm

Install and run locally:

```bash
# install dependencies
npm install

# development server (hot reload)
npm run dev

# build for production
npm run build

# run production build locally
npm start
```

Useful scripts (from [package.json]):
- `dev` � next dev
- `build` � next build
- `start` � next start
- `lint` � eslint .
- `test` � vitest (interactive / watch)
- `test:run` � vitest run (CI-friendly)
- `test:ui` � vitest with UI


---

## Testing

This project uses Vitest with Testing Library for unit and DOM tests. Test utilities and setup are under:

- [src/tests/setup.ts]
- feature tests: [src/tests/features/] 

Run tests:

```bash
# interactive / watch mode
npm run test

# run once (CI)
npm run test:run

```

Testing guidance:
- Put unit tests for hooks and small utilities next to the feature under `src/tests/features/<feature>`
- Mock network requests (Supabase) for unit tests to keep them deterministic and fast
- Use Testing Library for integration-like component tests that assert DOM behavior

---

## Working with data

There are CSV sample files in [src/database/csv/] that can be used to seed sample data for local development or stories.

For Supabase-backed flows, ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in `.env.local` and point to the correct project.

---

## Linting and code quality

- ESLint is configured; run `npm run lint` to check for issues. Consider adding formatters (Prettier) and pre-commit hooks (Husky) if desired.
- Keep feature boundaries clear and avoid cross-feature imports unless the target module is explicitly exported from `src/shared/` or `src/components/`.

---

## Deployment

Recommended platforms:
- Vercel (seamless for Next.js)
- Netlify / custom Node server

Deployment checklist:
- Add required environment variables in the platform dashboard
- Build and test in CI (use `npm run build` and `npm run test:run`)
- Configure any Supabase or external service credentials securely

---

## Troubleshooting

1. Node version mismatch: use Node 18+; update with nvm or install.
2. Supabase auth errors: verify environment variables and project settings.
3. Tailwind or style issues: ensure `tailwindcss` is installed and the PostCSS pipeline runs during build.

---

## Contributing

- Run lint and tests before opening a PR: `npm run lint` and `npm run test:run`.
- Keep changes confined to a feature when possible and add or update tests for new behavior.
- For large changes, open an issue describing the plan first.

---

## References

- package manifest: [package.json]
- dashboard feature: [src/features/dashboard/index.ts]
- test setup: [src/tests/setup.ts] 
- sample CSVs: [src/database/csv/] 

---


