# Project Section Restructure — Thumbnails & Date Sorting

## Context

Benchmarking https://mushenghe.github.io/ for its projects section. That site presents
each project as a card with an animated GIF/thumbnail, tech tags, and reverse-chronological
ordering with visible dates.

The current site (`_data/projects.yml` + `_includes/section-projects.html`) already has
tags and a "More →" link to a separate detail page (`_portfolio/*.md` + `project-detail.html`
layout) — that navigation pattern stays as-is. What's missing versus the benchmark:
a visual thumbnail on the card, and chronological ordering with a visible date.

Overall visual style (black+green neumorphism, typography) is out of scope — this is a
structural change to the projects section only.

## Goals

1. Each project card shows a thumbnail/GIF preview area, with a graceful placeholder when
   no media is set yet.
2. Cards are sorted reverse-chronologically by a new `date` field, with the date displayed
   on the card.
3. `notes.html` (currently has a detail page but is missing from the main card list) is
   added to `_data/projects.yml`.
4. Scaffolding only — actual `date` values and thumbnail image/GIF files are placeholders
   for now, to be filled in collaboratively in a follow-up pass.

## Out of scope

- Actual GIF/image assets — added later to `assets/img/projects/<project>/thumb.gif`
- Accordion/inline expansion of project details on the main page (keep existing separate
  detail-page navigation)
- Sitewide re-theme (colors, fonts, layout of other sections)
- Rewriting detail-page content (`_portfolio/*.md` Overview/Features/Demo sections)

## Design

### 1. Data model — `_data/projects.yml`

Add two optional fields to each project entry:

```yaml
- name: SLAM-based Autonomous Navigation Robot
  name_kr: SLAM 기반 자율주행 로봇 시스템
  date: "" # placeholder, e.g. "2026-03"
  thumb: "" # placeholder, e.g. "/assets/img/projects/slam/thumb.gif"
  descr: "..."
  ...
```

Add a 5th entry for `notes.html`, matching the existing `_portfolio/notes-html.md` detail
page (`project_name: notes.html`), with `date` and `thumb` left as placeholders and tags
copied from the front matter (`[JavaScript, Supabase, Markdown]`).

Empty-string `date`/`thumb` (rather than omitting the key) keeps the sort/conditional Liquid
logic simple to write now and easy to fill in later without touching template code.

### 2. Card template — `_includes/section-projects.html`

- Before the `{% for project in site.data.projects %}` loop, sort by date descending:
  `{% assign sorted_projects = site.data.projects | sort: "date" | reverse %}`, then loop
  over `sorted_projects`. Empty-string dates sort last after reverse, which is acceptable
  placeholder behavior until real dates are filled in.
- Inside each `.project` card, add a thumbnail block above the existing title:
  ```html
  <div class="project-thumb">
    {% if project.thumb and project.thumb != "" %}
      <img src="{{ project.thumb | prepend: site.baseurl }}" alt="{{ project.name }}">
    {% else %}
      <div class="project-thumb-placeholder"></div>
    {% endif %}
  </div>
  ```
- Add a date badge next to/under the title, rendered only when `project.date` is non-empty:
  ```html
  {% if project.date and project.date != "" %}
    <span class="project-date">{{ project.date }}</span>
  {% endif %}
  ```
- The open-source projects loop (GitHub API-driven section) is untouched — it has no
  `date`/`thumb` data source and is out of scope.

### 3. Styles — `_sass/main.scss`

- `.project-thumb`: fixed 16:9 aspect-ratio container, `border-radius` matching existing
  card radius, `overflow: hidden`, `margin-bottom` before the title.
- `.project-thumb img`: `width: 100%; height: 100%; object-fit: cover;`
- `.project-thumb-placeholder`: same box, using the existing `.neumorphism-card` inset
  shadow recipe so it reads as an intentional empty state rather than a missing image.
- `.project-date`: small `IBM Plex Mono` text, muted green (`rgba(0, 200, 150, 0.7)` or
  similar existing accent), positioned inline near the title.
- Run `npx gulp styles` after editing `_sass/main.scss` per this repo's existing workflow
  (CLAUDE.md) to regenerate `assets/css/main.min.css`.

## Testing

- `bundle exec jekyll serve --livereload`, visually confirm:
  - All 5 projects (including notes.html) render as cards with placeholder thumbnails
    and no date badge (since dates are still empty placeholders).
  - No layout break on mobile/tablet/desktop breakpoints (existing `.projects-wrapper`
    flex rules).
  - EN/KR toggle still works (unaffected by this change).
