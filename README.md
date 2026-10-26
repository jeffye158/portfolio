# Zhefeng Ye — Web Development Portfolio

Capstone Project 1: a multi-page, responsive portfolio website showcasing every project completed in the Web Development Bootcamp.

**Live site:** _add your GitHub Pages URL here after deploying_

## Pages

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Hero with typing animation, showreel video, featured projects, toolbox, call to action |
| Projects | `projects.html` | All projects with technology filter buttons |
| Project Detail | `project.html?id=<project-id>` | Case study: overview, features, challenges, tech stack, links |
| About | `about.html` | Bio, animated skill bars, bootcamp timeline, audio player |
| Contact | `contact.html` | Validated contact form with success message |
| Not found | `404.html` | Friendly error page (GitHub Pages serves it automatically) |

## Features

- Responsive layout with Bootstrap 5 (phone, tablet, desktop) and a collapsing mobile menu
- Light/dark theme toggle, remembered with `localStorage`
- Project cards and detail pages generated from one data file (`js/projects.js`)
- Filter projects by technology
- **Video:** 30-second showreel (`assets/video/showreel.mp4`) with soundtrack
- **Audio:** soundtrack player with animated equalizer (`assets/audio/`)
- **Animations:** typing effect, drifting gradient blobs, scroll-reveal sections, card hover lift, animated skill bars
- Accessibility: skip link, keyboard focus styles, alt text, `aria` labels, `prefers-reduced-motion` support

## Folder structure

```
portfolio/
├── index.html, projects.html, project.html, about.html, contact.html, 404.html
├── css/style.css        Theme tokens, layout, animations
├── js/projects.js       Project data (edit this to add or change projects)
├── js/main.js           Theme toggle, active nav link, typing effect, scroll reveal
├── js/pages.js          Renders cards and detail pages, filters, skill bars, form
└── assets/
    ├── images/          Project previews (SVG), showreel poster, favicon
    ├── video/           showreel.mp4
    └── audio/           soundtrack.mp3, soundtrack.ogg
```

## Updating content

- **Add or edit a project:** open `js/projects.js`, copy one object, change the fields. Set `liveUrl` / `repoUrl` to real links (leave `""` to hide a button). Set `featured: true` to show it on Home.
- **Replace preview images:** save a 1280 × 800 screenshot in `assets/images/` and update the project's `image` path.
- **Replace the showreel:** export a new MP4 (H.264, 16:9) as `assets/video/showreel.mp4`.

## Run locally

Open the folder in VS Code and use the **Live Server** extension, or run:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Deploy to GitHub Pages

1. Create a new repository on GitHub named `portfolio`.
2. Upload or push this folder's contents to the `main` branch.
3. In the repo go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/portfolio/`.
5. Re-run the testing checklist on the live URL and add the link at the top of this README.

## Built with

HTML5 · CSS3 · JavaScript (ES6) · Bootstrap 5 · Bootstrap Icons · Google Fonts (Space Grotesk, DM Sans, JetBrains Mono)
