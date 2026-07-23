# Project Card Thumbnails & Date Sorting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a thumbnail preview area and reverse-chronological date sorting to the project cards on the HeoPaulo.github.io main page, without changing the existing detail-page navigation or overall visual theme.

**Architecture:** This is a static Jekyll site (Liquid templates + SCSS compiled by gulp). Data lives in `_data/projects.yml`, cards render in `_includes/section-projects.html`, styles compile from `_sass/main.scss` to `assets/css/main.min.css` via `npx gulp styles`. Verification is done by building the site with `bundle exec jekyll build` and grepping the generated `_site/index.html` / `assets/css/main.min.css`, since this repo has no JS/Ruby test framework.

**Tech Stack:** Jekyll (Ruby 3.2, NOT 3.3), Liquid templating, SCSS, gulp 4.

## Global Constraints

- Ruby 3.2 must be on PATH for any `bundle`/`jekyll` command — Ruby 3.3 causes a Logger
  incompatibility with this repo's pinned `jekyll` gem (per `CLAUDE.md`). In this repo,
  Ruby 3.2 lives at `/c/Ruby32-x64/bin` (git-bash path) / `C:\Ruby32-x64\bin` (PowerShell path).
- After any `_sass/main.scss` edit, run `npx gulp styles` to regenerate
  `assets/css/main.min.css` — Jekyll does not do this automatically.
- `date` and `thumb` values added in this plan are intentionally empty-string placeholders
  (`""`), not real content — real dates/media are a follow-up task with the user.
- Existing detail-page navigation (`_portfolio/*.md` + `project-detail.html` layout) is not
  touched by this plan.
- Existing "Open Source Projects" section (GitHub-API-driven loop in the same
  `_includes/section-projects.html` file) is not touched by this plan — it has no
  `date`/`thumb` data source.

---

### Task 1: Add `date`/`thumb` fields to `_data/projects.yml` and add the missing `notes.html` entry

**Files:**
- Modify: `C:\Users\hetaa\HeoPaulo.github.io\_data\projects.yml`

**Interfaces:**
- Produces: each project entry in `_data/projects.yml` has keys `name`, `name_kr`, `date`
  (string, `""` for now), `thumb` (string, `""` for now), `descr`, `descr_kr`, `tags`
  (array of `{tag: ...}`), and optionally `demo`. Exactly 5 entries total. Task 2 consumes
  the `date` and `thumb` keys.

- [ ] **Step 1: Write the verification script**

Create `C:\Users\hetaa\HeoPaulo.github.io\docs\superpowers\verify_projects_yml.rb`:

```ruby
require 'yaml'

data = YAML.load_file(File.join(__dir__, '..', '..', '_data', 'projects.yml'))

raise "expected 5 projects, got #{data.length}" unless data.length == 5

data.each do |p|
  raise "#{p['name']}: missing 'date' key" unless p.key?('date')
  raise "#{p['name']}: missing 'thumb' key" unless p.key?('thumb')
  raise "#{p['name']}: missing 'name_kr'" unless p.key?('name_kr')
end

names = data.map { |p| p['name'] }
raise "notes.html entry missing, got #{names}" unless names.include?('notes.html')

puts "OK: 5 projects, all have date/thumb keys, notes.html present"
```

- [ ] **Step 2: Run it to confirm it fails (file not yet updated)**

Run: `ruby docs/superpowers/verify_projects_yml.rb`
Expected: raises `expected 5 projects, got 4` (or similar — the file doesn't have `date`/`thumb`/`notes.html` yet)

- [ ] **Step 3: Update `_data/projects.yml`**

Replace the full file contents with:

```yaml
# > name / name_kr: Project name
# > date: Reverse-chronological sort key, "YYYY-MM" (placeholder "" until filled in)
# > thumb: Path to a GIF/image under /assets/img/projects/ (placeholder "" until filled in)
# > descr / descr_kr: Description
# > demo: Link (optional)
# > tags: Technologies used

- name: SLAM-based Autonomous Navigation Robot
  name_kr: SLAM 기반 자율주행 로봇 시스템
  date: ""
  thumb: ""
  descr: "Autonomous mobile robot system using SLAM for real-time mapping and navigation. Implemented sensor fusion and path planning algorithms in a ROS2 environment on Ubuntu 22.04."
  descr_kr: "SLAM을 활용한 실시간 지도 생성 및 자율주행 로봇 시스템. ROS2 환경(Ubuntu 22.04)에서 센서 융합 및 경로 계획 알고리즘을 구현했습니다."
  tags:
    - tag: ROS2
    - tag: SLAM
    - tag: Python
    - tag: LiDAR
    - tag: Ubuntu

- name: Pancake Automation Robot
  name_kr: 팬케이크 자동화 로봇
  date: ""
  thumb: ""
  descr: "ROS2-based robotic process automation system for pancake manufacturing. Led the project as PM and developed robot motion planning and coordination logic for a multi-step cooking workflow."
  descr_kr: "팬케이크 제조 공정을 자동화한 ROS2 기반 로봇 시스템. PM을 담당하며 다단계 조리 워크플로우에 맞춘 로봇 동작 계획 및 협조 로직을 개발했습니다."
  demo: "https://github.com/HeoPaulo/pancake_machine"
  tags:
    - tag: ROS2
    - tag: Python
    - tag: Robot Arm
    - tag: Ubuntu

- name: AI-assisted Collaborative Robot (Pick & Place)
  name_kr: AI 기반 협동로봇 작업 어시스턴트 (견과류 Pick & Place)
  date: ""
  thumb: ""
  descr: "Computer vision-based robot assistant that detects and picks nuts using YOLOv8 and a collaborative robot arm. Responsible for robot motion, simulation, model training, and project management."
  descr_kr: "YOLOv8과 협동로봇 암을 연동해 견과류를 감지·파지하는 컴퓨터 비전 기반 로봇 시스템. 로봇 동작, 시뮬레이션, 모델 학습, PM을 담당했습니다."
  tags:
    - tag: ROS2
    - tag: YOLOv8
    - tag: OpenCV
    - tag: Python
    - tag: IsaacSim

- name: Digital Twin Robot Simulation System
  name_kr: Digital Twin 기반 로봇 자동화 시뮬레이션
  date: ""
  thumb: ""
  descr: "Digital twin platform for robotic process automation simulation. Built CAD models and integrated simulation environments to mirror real-world robot behavior for testing and validation."
  descr_kr: "로봇 자동화 공정을 가상에서 재현하는 Digital Twin 플랫폼. CAD 모델 구축 및 시뮬레이션 환경을 통합해 실제 로봇 동작을 검증했습니다."
  tags:
    - tag: IsaacSim
    - tag: CAD
    - tag: ROS2
    - tag: Python

- name: notes.html
  name_kr: notes.html
  date: ""
  thumb: ""
  descr: "A feature-rich, single-file web app for personal note-taking, with real-time Supabase cloud sync, a Markdown editor, dark/light theme toggle, search, calendar, and checklists — all with zero build step."
  descr_kr: "실시간 Supabase 클라우드 동기화, 마크다운 에디터, 다크/라이트 테마, 검색, 캘린더, 체크리스트를 갖춘 단일 HTML 파일 노트 앱. 빌드 과정이 전혀 필요 없습니다."
  tags:
    - tag: JavaScript
    - tag: Supabase
    - tag: Markdown
```

- [ ] **Step 4: Run the verification script to confirm it passes**

Run: `ruby docs/superpowers/verify_projects_yml.rb`
Expected: `OK: 5 projects, all have date/thumb keys, notes.html present`

- [ ] **Step 5: Commit**

```bash
git add _data/projects.yml docs/superpowers/verify_projects_yml.rb
git commit -m "Add date/thumb fields to projects.yml and notes.html entry"
```

---

### Task 2: Render thumbnails, date badges, and date-sorted order in `_includes/section-projects.html`

**Files:**
- Modify: `C:\Users\hetaa\HeoPaulo.github.io\_includes\section-projects.html:1-9` (the
  `{% if site.show_projects %}` block through the start of the `{% for project ... %}` loop)

**Interfaces:**
- Consumes: `project.date` (string, possibly `""`) and `project.thumb` (string, possibly
  `""`) from Task 1's `_data/projects.yml`.
- Produces: rendered markup with classes `.project-thumb`, `.project-thumb-placeholder`,
  and `.project-date` for Task 3 to style. Task 3 consumes these exact class names.

- [ ] **Step 1: Edit the card loop**

In `_includes/section-projects.html`, replace lines 6-9:

```html
  <div class="projects-wrapper">
    {% for project in site.data.projects %}
      {% assign detail_page = site.portfolio | where: "project_name", project.name | first %}
      <div class="project neumorphism-card" data-aos="zoom-in-down">
        <div class="name-link-wrapper">
          <h3>
```

with:

```html
  <div class="projects-wrapper">
    {% assign sorted_projects = site.data.projects | sort: "date" | reverse %}
    {% for project in sorted_projects %}
      {% assign detail_page = site.portfolio | where: "project_name", project.name | first %}
      <div class="project neumorphism-card" data-aos="zoom-in-down">
        <div class="project-thumb">
          {% if project.thumb and project.thumb != "" %}
            <img src="{{ project.thumb | prepend: site.baseurl }}" alt="{{ project.name }}">
          {% else %}
            <div class="project-thumb-placeholder"></div>
          {% endif %}
        </div>
        <div class="name-link-wrapper">
          <h3>
```

- [ ] **Step 2: Add the date badge next to the title**

In the same file, find:

```html
          <h3>
            <span class="lang-en">{{project.name}}</span>
            <span class="lang-kr">{{project.name_kr | default: project.name}}</span>
          </h3>
```

Replace with:

```html
          <h3>
            <span class="lang-en">{{project.name}}</span>
            <span class="lang-kr">{{project.name_kr | default: project.name}}</span>
          </h3>
          {% if project.date and project.date != "" %}
            <span class="project-date">{{ project.date }}</span>
          {% endif %}
```

- [ ] **Step 3: Build the site**

Run:

```bash
PATH="/c/Ruby32-x64/bin:/c/Program Files/nodejs:$PATH" bundle exec jekyll build
```

Expected: `done in N seconds` with no errors, in `C:\Users\hetaa\HeoPaulo.github.io`.

- [ ] **Step 4: Verify the rendered output**

Run:

```bash
grep -c 'class="project-thumb-placeholder"' _site/index.html
grep -c 'class="project-date"' _site/index.html
```

Expected: first command outputs `5` (all 5 projects have empty `thumb`, so all render the
placeholder). Second command outputs `0` (all 5 projects have empty `date`, so the badge
is never rendered).

- [ ] **Step 5: Commit**

```bash
git add _includes/section-projects.html
git commit -m "Render project card thumbnails, date badges, and date-sorted order"
```

---

### Task 3: Style the thumbnail and date badge in `_sass/main.scss`

**Files:**
- Modify: `C:\Users\hetaa\HeoPaulo.github.io\_sass\main.scss:519-525` (the `/* Projects
  Card */` section, right before the existing `.project` rule)

**Interfaces:**
- Consumes: `.project-thumb`, `.project-thumb-placeholder`, `.project-date` class names
  from Task 2. Consumes existing `$primary-color` and `$font-family-numbers` SCSS
  variables (defined at the top of `main.scss`, lines 11 and 22).

- [ ] **Step 1: Add the SCSS rules**

In `_sass/main.scss`, find:

```scss
/* Projects Card */

.project {
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
}
```

Replace with:

```scss
/* Projects Card */

.project {
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
}

.project-thumb {
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.project-thumb-placeholder {
  width: 100%;
  height: 100%;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 1),
    inset -2px -2px 4px rgba(0, 80, 55, 0.35);
}

.project-date {
  font-family: $font-family-numbers;
  color: rgba(0, 200, 150, 0.7);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}
```

- [ ] **Step 2: Recompile CSS**

Run: `npx gulp styles`
Expected: task completes with no error (gulp prints the `styles` task finishing).

- [ ] **Step 3: Verify the compiled CSS contains the new rules**

Run:

```bash
grep -o '\.project-thumb[a-z-]*{[^}]*}' assets/css/main.min.css | head -5
grep -o '\.project-date{[^}]*}' assets/css/main.min.css
```

Expected: both commands print non-empty minified CSS rules (exact minified formatting
may vary, but the selectors must be present).

- [ ] **Step 4: Rebuild the full site and manually verify in the browser**

Run:

```bash
PATH="/c/Ruby32-x64/bin:/c/Program Files/nodejs:$PATH" bundle exec jekyll build
```

Then start a local server and open it:

```bash
PATH="/c/Ruby32-x64/bin:/c/Program Files/nodejs:$PATH" bundle exec jekyll serve --livereload
```

Open `http://127.0.0.1:4000/` and confirm:
- All 5 project cards (including notes.html) show a dark placeholder thumbnail box above
  the title, with no visual overflow or layout break.
- No date badge is visible (since all dates are still empty placeholders).
- The EN/KR language toggle still works.

Stop the server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add _sass/main.scss assets/css/main.min.css
git commit -m "Style project card thumbnails and date badge"
```

---

## Follow-up (not part of this plan)

- Fill in real `date` values (`YYYY-MM`) for each project in `_data/projects.yml`.
- Add real thumbnail GIFs/images under `assets/img/projects/<project>/thumb.gif` and set
  each project's `thumb` field to point at them.
