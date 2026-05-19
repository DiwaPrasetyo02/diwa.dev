# diwa.dev

Personal portfolio website of **Diwa Prasetyo** — AI Engineer. Built with Astro, React, TailwindCSS, and Framer Motion.

## 🚀 Tech Stack

- **[Astro](https://astro.build)** — static site framework
- **[React](https://react.dev)** — interactive UI components
- **[TailwindCSS v4](https://tailwindcss.com)** — utility-first styling (via `@tailwindcss/vite`)
- **[Framer Motion](https://www.framer.com/motion/)** — animations
- **[Biome](https://biomejs.dev)** — linting & formatting
- **[Bun](https://bun.sh)** — package manager & runtime

## 📁 Project Structure

```text
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components (React + Astro)
│   ├── data/        # Site content & data
│   ├── layouts/     # Base page layouts
│   ├── lib/         # Shared utilities
│   ├── pages/       # Routes
│   ├── partials/    # Page section components
│   └── styles/      # Global styles
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `bun install`     | Install dependencies                             |
| `bun dev`         | Start local dev server at `localhost:4321`       |
| `bun build`       | Build production site to `./dist/`               |
| `bun preview`     | Preview the production build locally             |
| `bun lint`        | Run Biome linter                                 |
| `bun format`      | Format code with Biome                           |
| `bun check`       | Run Biome checks and auto-fix                    |
| `bun astro ...`   | Run Astro CLI commands (e.g. `astro add`)        |
