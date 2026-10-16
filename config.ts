/**
 * Root config shim.
 *
 * The TypeScript path alias `@/*` resolves to the project root, so all
 * consumer files that import from `@/config` resolve here first.
 * This file re-exports the full config barrel from `config/index.ts`,
 * which in turn aggregates `site-config.ts` and `skills-config.ts`.
 *
 * Do NOT add config values directly to this file.
 */
export * from "./config/index";
