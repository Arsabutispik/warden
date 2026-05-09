## Description
<!-- Please include a summary of the change and which issue is fixed. -->
<!-- Context is important! Why is this change necessary? -->

Fixes # (issue)

## Type of change
<!-- Please delete options that are not relevant. -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Chore (refactoring, dependency upgrades, etc.)

## How Has This Been Tested?
<!-- Please describe the tests that you ran to verify your changes. Feel free to add more checklists if needed -->
- [ ] Ran the bot locally via `pnpm run dev` and verified functionality.
- [ ] Built and ran the Docker container successfully (`docker compose up --build`).
- [ ] Verified database migrations applied cleanly (if applicable).

## Checklist:
- [ ] My code follows the strict TypeScript guidelines of this project.
- [ ] I have performed a self-review of my own code.
- [ ] I have commented my code, particularly in hard-to-understand areas.
- [ ] My changes generate no new ESLint or TypeScript compiler warnings.
- [ ] **Database changes:** I have included the generated Drizzle `.sql` migration file in the `drizzle/` folder (if applicable).