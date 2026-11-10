# DevLaunch — Learn, Build & Grow

A responsive, single-page website for a student-led coding community, built for **ApnoAI Web Development Internship — Task 1: Ship Your First Web Page**.

Built with **HTML5, CSS3, and vanilla JavaScript** only. No React, Bootstrap, Tailwind, or any other framework. No backend, no database — the site is ready to host on GitHub Pages, Vercel, Netlify, or any static host.

**Live demo:** <https://my-portfolio-webpage-tld4.vercel.app/>
**Repository:** <https://github.com/rushi380/apnoai-task-1>

---

## 1. Live Preview

**Live site (Vercel):** <https://my-portfolio-webpage-tld4.vercel.app/>

To run locally, open `index.html` directly in a browser, or use VS Code Live Server (recommended — see section 4).

---

## 2. Project Structure

```
apnoai-task-1/
├── index.html      → Page structure, content and inline SVG icon sprite
├── style.css       → Design system, themes, layout, animations, media queries
├── script.js       → Theme toggle, mobile menu, scroll effects, form validation
└── README.md       → This documentation
```

The project folder must stay together. `style.css` and `script.js` are linked with relative paths, so uploading the whole folder to GitHub or Vercel just works.

---

## 3. Features

### Sections
| Section | What's inside |
| --- | --- |
| **Home** | Sticky glass navbar, logo, nav links, hero headline "Learn to Code. Build Your Future.", intro copy, two CTA buttons, stats, animated code-window visual, tech strip |
| **About** | "About DevLaunch", three paragraphs, club rhythm panel, and the three highlights: **Learn / Build / Grow** |
| **Services** | Three cards — Web Development, Project Building, Developer Community — each with icon, description, topic tags, link, and hover animation |
| **Contact** | "Let's Connect", email/GitHub/LinkedIn links, name/email/message form with JavaScript validation, demo mailto submission |

### Bonus: dark / light mode
- Toggle button in the navbar with accessible label.
- Changes the entire palette through CSS custom properties.
- Saves the choice in `localStorage` under `devlaunch-theme`.
- Restores the saved theme after refresh **without a flash** (a small script runs in `<head>` before CSS paints).
- Defaults to dark to match the brand palette.

### Design & UX
- Modern dark-navy and electric-blue palette with purple/cyan gradients.
- Rounded cards, soft shadows, smooth hover transitions.
- Scroll-reveal animations (disabled automatically for users who prefer reduced motion).
- Active nav link follows the section in view.
- Back-to-top button, skip-to-content link, visible focus states.
- Semantic HTML5 landmarks and a clean heading hierarchy (one `h1`, `h2` per section, `h3` for cards).

### Responsive behaviour
| Width | Layout |
| --- | --- |
| 320px–480px | Single column, stacked buttons, hamburger menu, compact spacing |
| 768px | Single-column cards and two-column content collapses cleanly |
| 1024px | Three service cards side by side, two-column hero |
| 1440px+ | Wider container (1260px), full desktop layout |

No horizontal scrolling at any size — decorative glows are clipped by `overflow: hidden`.

---

## 4. Run the Website in VS Code

**Option A — Live Server (recommended)**
1. Install [VS Code](https://code.visualstudio.com/).
2. Open VS Code → Extensions (`Ctrl + Shift + X`) → search **Live Server** (by Ritwick Dey) → Install.
3. Open the `apnoai-task-1` folder: **File → Open Folder**.
4. Right-click `index.html` → **Open with Live Server**.
5. Your browser opens at `http://127.0.0.1:5500/index.html`. Edits reload automatically.

**Option B — no extension**
1. Open the folder in VS Code.
2. Double-click `index.html` (or right-click → Reveal in File Explorer → open it).
3. The site works from `file://` too; only the Google Fonts request needs internet.

**Option C — terminal static server**
```bash
cd apnoai-task-1
npx serve .
```
Then open the URL printed in the terminal.

> The contact form needs a configured mail app. If none opens, the page shows the email address as a fallback — no data is sent anywhere.

---

## 5. Test Mobile Responsiveness

### Chrome / Edge DevTools
1. Open the site in Chrome or Edge.
2. Press `F12` (or `Ctrl + Shift + I`) → click the **Toggle device toolbar** icon (`Ctrl + Shift + M`).
3. Test these presets and widths:

| Width | What to check |
| --- | --- |
| **320px** | No sideways scroll; hero text wraps; buttons stack; code window fits |
| **375px / 480px** | Hamburger menu opens/closes; theme toggle reachable; form fields full width |
| **768px** | Service cards stack; about/contact become one column; nav still usable |
| **1024px** | Three service cards in a row; hero is two columns |
| **1440px+** | Content stays centered; no stretched text lines |

4. **Horizontal scroll check:** in the DevTools Console run:
   ```js
   document.documentElement.scrollWidth <= window.innerWidth
   ```
   It must return `true` at every width.
5. **Menu check:** at ≤ 900px tap the hamburger — panel opens, links close it, `Esc` closes it, and the icon turns into an X.
6. **Theme check:** toggle theme, refresh the page — the chosen theme persists. Check the button label reads "Switch to light mode" / "Switch to dark mode".
7. **Form check:** submit empty → error messages appear under each field; enter an invalid email → only that field errors; submit valid data → success message appears and your email app opens.
8. Optional: DevTools → **Lighthouse** → run an audit for Performance, Accessibility, Best Practices, SEO.

### Real device
Open the Vercel URL on a phone. Test portrait and landscape, tap targets, and the mobile menu.

---

## 6. Upload to GitHub (step by step)

### Create the repository
1. Sign in at [github.com](https://github.com).
2. Click **+** (top right) → **New repository**.
3. Repository name: `apnoai-task-1`.
4. Choose **Public** (required for free Vercel hosting and mentor review).
5. Do **not** add a README, `.gitignore`, or license (you already have files).
6. Click **Create repository**.

### Push with Git (terminal in the project folder)
```bash
cd path/to/apnoai-task-1
git init
git add index.html style.css script.js README.md
git commit -m "Build DevLaunch coding club website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/apnoai-task-1.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

> First push asks for credentials. Use a **Personal Access Token** as the password (GitHub → Settings → Developer settings → Personal access tokens), or sign in with GitHub Desktop / VS Code's Git integration.

### Alternative: upload through the browser
1. On the new empty repository page, click **uploading an existing file**.
2. Drag in `index.html`, `style.css`, `script.js`, and `README.md`.
3. Commit message: `Build DevLaunch coding club website` → **Commit changes**.

### Optional: enable GitHub Pages
Repository → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**. Your site appears at `https://YOUR-USERNAME.github.io/apnoai-task-1/`.

---

## 7. Deploy to Vercel (step by step)

### Method A — Dashboard (recommended)
1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New… → Project**.
3. Find `apnoai-task-1` → **Import**. (If it is missing, click **Adjust GitHub App Permissions** and grant access.)
4. Configure the project:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (keep default)
   - **Build Command:** leave empty
   - **Output Directory:** leave empty
   - **Environment Variables:** none
5. Click **Deploy**. Your site is live in under a minute at `https://apnoai-task-1.vercel.app`.
6. Every future `git push` to `main` triggers an automatic redeploy.

### Method B — Vercel CLI
```bash
npm install -g vercel
cd path/to/apnoai-task-1
vercel
```
Answer the prompts (log in, link/create project, keep defaults). For production:
```bash
vercel --prod
```

### After deploying
- Open the live URL on desktop and mobile.
- Re-run the responsive and theme tests.
- Paste the Vercel URL into your ApnoAI submission.

---

## 8. Customise Before Submitting

| What | Where |
| --- | --- |
| Contact email | `index.html` (three `mailto:` links + `data-email` on the form) and `script.js` (`clubEmail` fallback) |
| GitHub / LinkedIn URLs | `index.html` — contact cards and footer (search for `https://github.com/` and `https://www.linkedin.com/`) |
| Member counts / stats | `index.html` — `.hero-stats` |
| Brand colours | `style.css` — `:root` custom properties and `[data-theme="light"]` overrides |
| Fonts | `index.html` Google Fonts link + `--font-body` / `--font-display` in `style.css` |

Keep the folder name `apnoai-task-1` if your submission instructions require it.

---

## 9. How the Main Pieces Work (for your review)

- **Theme:** `data-theme="light|dark"` is set on `<html>`. All colours are CSS variables, so one attribute restyles the site. The early `<head>` script reads `localStorage` before paint; the toggle in `script.js` writes it back.
- **Responsive nav:** at ≤ 900px the `.nav` element becomes a fixed panel below the header. `.is-open` fades it in; `aria-expanded` tracks the state.
- **Active link:** a `requestAnimationFrame`-throttled scroll handler compares each section's position with the header and applies `.is-active`.
- **Reveal animations:** an `IntersectionObserver` adds `.is-visible` when an element enters the viewport. Without JavaScript, `.reveal` is never hidden.
- **Validation:** each rule returns `true` or an error message. Errors are written into a linked `<p>` and `aria-invalid` is updated for screen readers. Valid submissions build a `mailto:` URL — there is no backend.

---

## 10. ApnoAI Task 1 — Final Checklist

### Technology
- [x] HTML5 semantic structure (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- [x] CSS3 with variables, gradients, transitions
- [x] Vanilla JavaScript only
- [x] CSS Flexbox used for navigation, buttons, lists and inline groups; CSS Grid for page sections and the footer
- [x] Responsive media queries (900px, 940px, 1080px, 640px, 480px, 360px, 1400px)
- [x] No React / Bootstrap / Tailwind / libraries
- [x] No backend or database — static hosting ready

### Sections
- [x] **Home** — navbar with logo + links, hero heading, description, "Explore Services" and "Contact Us" buttons, gradient background and visual elements
- [x] **About** — heading, three meaningful paragraphs, Learn / Build / Grow highlights
- [x] **Services** — three cards with icon, title, description, hover animation
- [x] **Contact** — "Let's Connect", Name/Email/Message, Send Message button, JavaScript validation, demo mailto flow, editable email/GitHub/LinkedIn links

### Design
- [x] Dark navy + electric blue palette with purple/blue gradients
- [x] Clean typography (Sora + Inter, system fallbacks)
- [x] Rounded cards and buttons, soft shadows, smooth transitions
- [x] Professional spacing, alignment, and footer
- [x] Polished desktop and mobile layouts

### Bonus
- [x] Working dark/light toggle in the navbar
- [x] Entire theme changes via CSS variables
- [x] Theme saved in `localStorage` and restored on refresh (no flash)
- [x] Accessible toggle with dynamic `aria-label` and `title`

### Responsive
- [x] Tested layout rules for 320–480px, 768px, 1024px, 1440px+
- [x] Hamburger menu on mobile, closes on link click / `Esc`
- [x] Service cards stack on mobile
- [x] No horizontal scroll; readable text; properly sized buttons and spacing

### Quality
- [x] SEO meta tags: description, keywords, author, robots, Open Graph, Twitter
- [x] Viewport meta and theme-color
- [x] Proper heading hierarchy and working navigation anchors
- [x] Comments explain key logic
- [x] No console errors, no unnecessary dependencies
- [x] Real content — no Lorem Ipsum

---

## 11. Credits

Design and code created for the ApnoAI Web Development Internship, Task 1. Icons are hand-written inline SVGs; fonts are loaded from Google Fonts with system fallbacks.
