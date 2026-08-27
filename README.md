# create-dev-portfolio

CLI orchestrator for [dev-portfolio-template](https://github.com/rishu1601/dev-portfolio-template).
Clones the template, asks a handful of questions about you, writes the
answers into `config/profile.json`, and verifies the site builds.

Part of a 3-repo MVP:
- `dev-portfolio-template` — the Next.js site, config-driven.
- `create-dev-portfolio` (this repo) — CLI that clones the template and runs the interview.
- `portfolio-agent` — (later) generates richer content from a resume/GitHub profile.

## What it does

1. Clones the template repo (fresh git history, not a fork).
2. Interviews you for name, title, bio, GitHub username, LinkedIn, email,
   website, and location.
3. Merges those answers into the cloned repo's `config/profile.json` —
   everything else (experience, skills, education, projects) stays as the
   template's placeholder content for you to fill in by hand, or for a
   future `portfolio-agent` pass to generate from a resume.
4. Runs `npm install` and `npm run build` to verify the site builds.
5. Makes an initial commit.

GitHub repo creation and Vercel deployment are not automated yet — that's
a separate pass once this core flow is solid.

## Usage

```bash
npm install
npm run build
node dist/index.js my-portfolio
```

Or once published: `npx create-tech-dev-portfolio my-portfolio` (the npm package
is `create-tech-dev-portfolio` — `create-dev-portfolio` was already taken).

Options:
- `--template <url>` — clone a different template repo (default: `dev-portfolio-template`).

## Development

```bash
npm install
npm run dev -- my-portfolio   # builds + runs in one step
```
