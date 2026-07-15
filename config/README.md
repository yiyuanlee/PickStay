# Tooling configs

Kept out of the repository root so GitHub’s file list stays readable.

| File | Used by |
|------|---------|
| `eslint.config.mjs` | `npm run lint` |
| `vitest.config.ts` | `npm run test` |
| `playwright.config.ts` | `npm run test:e2e` |

Next.js still expects `next.config.ts`, `postcss.config.mjs`, and `tsconfig.json` at the repo root.
