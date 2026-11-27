# GitHub Workflow — VERDANTIA

Repository: `https://github.com/varshinisathasivam/3D-Adventure-Website.git`

## Branch & Commit Conventions
- `main` is the stable integration branch.
- Feature branches follow `feature/<number>-<short-name>` (e.g. `feature/01-project-scaffold`, `feature/05-planet-scene`, `feature/10-forest-missions`).
- Commits follow Conventional Commits:
  - `feat(scope): ...`
  - `fix(scope): ...`
  - `test(scope): ...`
  - `docs(scope): ...`

## Standard PR Flow
1. `git checkout main && git pull origin main`
2. `git checkout -b feature/<name>`
3. Implement feature & run `npm run build`, `npm run lint`, and `npm test`
4. `git add <files> && git commit -m "feat(...): ..."`
5. `git push -u origin feature/<name>`
6. Open Pull Request against `main` with summary and test verification results.
