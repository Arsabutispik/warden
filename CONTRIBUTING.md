# Contributing to Warden

First off, thank you for considering contributing to Warden! It's people like you that make open-source software such a great community.

This document outlines the process, standards, and workflow for contributing to the project to ensure a smooth experience for everyone.

## Before You Start

*   **Check Existing Issues:** Before writing any code, please check the [Issues](../../issues) tab to see if someone is already working on the feature or bug you've found.
*   **Open a Discussion:** If you plan on adding a major new feature, please open an Issue to discuss it first. This ensures your hard work aligns with the project's roadmap and won't be rejected.

## Local Development Setup

To get Warden running on your machine, please follow the **Local Development** section in our [README.md](README.md).

**Quick Reminder:** We use `pnpm` (v11) as our package manager. Please do not submit PRs containing `package-lock.json` or `yarn.lock` files.

## Branching Strategy

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork to your local machine.
3.  **Create a branch** for your feature or bug fix. Use a descriptive naming convention:
    *   `feat/add-auto-mod`
    *   `fix/database-connection-error`
    *   `docs/update-readme`

## Code Standards

Warden is built on a modern, strict TypeScript stack. To keep the codebase clean and reliable, please adhere to the following:

*   **TypeScript Strict Mode:** We embrace strong typing. Avoid using `any` wherever possible. If you must bypass the compiler, use `@ts-expect-error` with a comment explaining *why*.
*   **Native ESM:** We use Node.js Native ESM. Remember to include `.js` extensions in your relative local imports (e.g., `import { logger } from './lib/logger.js';`).
*   **Subpath Imports:** Use our defined `#lib` and `#database` aliases where appropriate instead of long, ugly relative paths (`../../`).
*   **Linting & Formatting:** Ensure your code passes standard ESLint and Prettier checks before committing.

## Database Changes (Drizzle ORM)

If your feature requires a database schema change:
1.  Update the schemas in `src/database/schema.ts`.
2.  Run `pnpm run db:generate` to create the SQL migration file.
3.  **CRITICAL:** You must commit both your changes to `schema.ts` AND the newly generated `.sql` file in the `drizzle/` folder. Do not edit the `.sql` files manually!

## Commit Messages

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/). This makes it easy to read the history and automatically generate changelogs.

*   `feat:` A new feature.
*   `fix:` A bug fix.
*   `docs:` Documentation changes.
*   `style:` Formatting, missing semicolons, etc.
*   `refactor:` Refactoring production code.
*   `test:` Adding missing tests.
*   `chore:` Updating build tasks, package manager configs, etc.

*Example: `feat: add warning threshold to auto-mod engine`*

## Submitting a Pull Request

1.  Push your branch to your forked repository.
2.  Open a Pull Request against the `main` branch of the official Warden repository.
3.  Fill out the PR template completely.
4.  Ensure your code builds successfully locally (`pnpm run build`).
5.  Be prepared to engage in code review! We might ask for some tweaks before merging.

Thank you for helping make Warden better!