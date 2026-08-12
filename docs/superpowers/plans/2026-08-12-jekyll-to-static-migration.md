# Jekyll → 순수 정적 HTML/CSS/JS 마이그레이션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `heopaulo.github.io`를 Jekyll/Ruby 빌드 없이, 지금과 동일하게 보이는 단일 정적 `index.html` + `assets/`로 서빙되게 만든다.

**Architecture:** 현재 Jekyll이 렌더링하는 `index.html`(Liquid 태그 없는 최종 HTML)을 그대로 repo 루트 파일로
확정하고, Jekyll 전용 소스(`_config.yml`, `_layouts/`, `_includes/`, `_data/`, `Gemfile*`)와 고아 콜렉션
(`_portfolio/`)을 삭제한다. `.github/workflows/deploy.yml`은 Ruby 빌드 스텝을 없애고 `index.html` + `assets/`만
모아 업로드하도록 단순화한다. `_sass/` + `gulpfile.js`(Node 기반 CSS 컴파일)는 그대로 남긴다.

**Tech Stack:** 순수 HTML/CSS/JS, Node/gulp(로컬 CSS 빌드 전용), GitHub Actions(`actions/upload-pages-artifact`,
`actions/deploy-pages`)

## Global Constraints

- `_sass/main.scss` → `assets/css/main.min.css` 컴파일 파이프라인(`npx gulp styles`)은 유지 — 삭제하거나 CI에 넣지 않는다.
- 언어 토글(EN/KR), 프로젝트 모달, 파티클 배경 등 기존 동작은 픽셀 단위로 동일해야 한다 — 이번 작업은 엔진 교체이지 리디자인이 아니다.
- 최종 배포 산출물은 `index.html` + `assets/`만 포함한다 — `README.md`, `CLAUDE.md`, `*.pptx`, `*.py`, `package-lock.json` 등 저장소의 다른 파일은 배포 artifact에 포함하지 않는다 (현재 `https://heopaulo.github.io/README.md`, `/CLAUDE.md`가 200으로 공개 접근 가능한 상태이며, 이번 마이그레이션으로 자동 해소됨).
- `git status`로 확인한 결과 `_site/`는 이미 `.gitignore`에 포함되어 있으므로 별도 `git rm` 불필요.

---

### Task 1: Jekyll 렌더링 결과를 마이그레이션 소스로 확보

**Files:**
- 생성 없음 — `_site/index.html`(gitignore 대상, 로컬 빌드 산출물)을 소스로 사용

**Interfaces:**
- Produces: 검증된 `_site/index.html` — Task 2가 이 파일을 repo 루트로 복사한다.

- [ ] **Step 1: Ruby 3.2로 Jekyll 빌드 실행**

이 머신에는 Ruby 4.0/3.3/3.2가 공존하며 `bundle`/`jekyll`이 기본 PATH에서 3.3을 가리켜 gem 불일치 오류가 난다.
Ruby 3.2를 명시적으로 PATH 앞에 둬야 한다.

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
export PATH="/c/Ruby32-x64/bin:/c/Program Files/nodejs:$PATH"
bundle exec jekyll build --baseurl ""
```

Expected: `done in N seconds` 로그, exit 0. (`GitHub Metadata` 관련 경고는 무시 — 인증 없이 로컬 빌드 시 항상 뜨는 무해한 경고.)

- [ ] **Step 2: Liquid 태그가 남아있지 않은지 확인**

Run:
```bash
grep -c '{{\|{%' "_site/index.html"
```

Expected: `0` (렌더링 후이므로 Liquid 문법이 전혀 남아있으면 안 됨)

- [ ] **Step 3: 에셋 경로가 루트 상대경로인지 확인**

Run:
```bash
grep -o 'href="/assets/[^"]*"\|src="/assets/[^"]*"' "_site/index.html" | sort -u | head -5
```

Expected: `/assets/css/main.min.css` 등 `/assets/`로 시작하는 절대경로들. (`baseurl`이 빈 문자열이므로 별도 prefix 없이 루트 기준 경로여야 함 — GitHub Pages가 `heopaulo.github.io` user site라 정확함.)

---

### Task 2: repo 루트 `index.html`을 평탄화된 정적 파일로 교체

**Files:**
- Modify: `index.html` (repo 루트, Jekyll front-matter가 있던 파일 → `_site/index.html` 내용으로 완전 교체)

**Interfaces:**
- Consumes: Task 1에서 검증한 `_site/index.html`
- Produces: Jekyll 없이도 그대로 열리는 최종 `index.html`

- [ ] **Step 1: 기존 index.html 백업 없이 바로 교체 (git이 히스토리 보존)**

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
cp _site/index.html index.html
```

- [ ] **Step 2: front-matter(`---\nlayout: default\n---`)가 사라졌는지 확인**

Run:
```bash
head -5 index.html
```

Expected: 첫 줄이 `<!DOCTYPE html>`로 시작 (기존 Jekyll 소스 `index.html`은 `---\nlayout: default\n---`로 시작했었음).

- [ ] **Step 3: 파일 크기/줄 수가 `_site/index.html`과 동일한지 확인**

Run:
```bash
diff _site/index.html index.html
```

Expected: 출력 없음 (완전히 동일한 파일).

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "index.html을 Jekyll 렌더링 결과로 평탄화"
```

---

### Task 3: Jekyll 전용 파일 및 고아 콜렉션 삭제

**Files:**
- Delete: `_config.yml`, `Gemfile`, `Gemfile.lock`, `_layouts/default.html`, `_layouts/project-detail.html`, `_includes/` 전체, `_data/` 전체, `_portfolio/` 전체

**Interfaces:**
- Consumes: Task 2에서 완성된 `index.html` (더 이상 이 파일들을 참조하지 않음)
- Produces: Jekyll 소스 없는 저장소 상태 — Task 4가 배포 워크플로우에서 Jekyll 빌드 스텝을 제거할 수 있는 전제 조건

- [ ] **Step 1: 삭제 대상 목록 확정 및 다른 곳에서 참조 없는지 확인**

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
grep -rl "_config.yml\|_layouts\|_includes\|_data/\|_portfolio" --include="*.yml" --include="*.js" --include="*.json" .github gulpfile.js package.json 2>/dev/null
```

Expected: 빈 출력 (`.github/workflows/deploy.yml`이 `bundle exec jekyll build`를 호출하는 부분만 있을 수 있는데, 이건 Task 4에서 같이 정리하므로 지금은 grep 결과에 나와도 무방 — 이후 Task 4에서 해당 라인 자체를 삭제함)

- [ ] **Step 2: 파일 삭제**

Run:
```bash
git rm -r _config.yml Gemfile Gemfile.lock _layouts _includes _data _portfolio
```

Expected: 각 경로에 대해 `rm '경로'` 출력, exit 0.

- [ ] **Step 3: 커밋**

```bash
git commit -m "Jekyll 전용 소스 및 고아 _portfolio 콜렉션 삭제"
```

주의: 이 시점에서 `git push`는 하지 않는다 — `.github/workflows/deploy.yml`이 아직 `bundle exec jekyll build`를 호출하므로, 지금 push하면 다음 배포가 실패한다. Task 4까지 마친 뒤 Task 8에서 한 번에 push한다.

---

### Task 4: 배포 워크플로우에서 Ruby/Jekyll 빌드 제거

**Files:**
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: Task 3에서 삭제된 Jekyll 소스 (더 이상 빌드 대상이 없음)
- Produces: `index.html` + `assets/`만 업로드하는 워크플로우 — Task 8의 push 후 이 워크플로우가 실행됨

- [ ] **Step 1: 현재 내용 확인**

Run:
```bash
cat "C:\Users\hetaa\HeoPaulo.github.io\.github\workflows\deploy.yml"
```

(Ruby 설치 + `bundle exec jekyll build` + `actions/upload-pages-artifact@v3`(경로 미지정 → 기본 `_site`) 순서인지 확인)

- [ ] **Step 2: 전체 내용을 아래로 교체**

`.github/workflows/deploy.yml` 전체를 다음으로 교체:

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Assemble deploy directory
        run: |
          mkdir _deploy
          cp index.html _deploy/
          cp -r assets _deploy/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _deploy

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: YAML 문법 확인**

Run:
```bash
node -e "require('js-yaml') ? null : null" 2>/dev/null; python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml'))" 2>&1 || echo "python3/yaml 없으면 생략 가능 — 다음 grep으로 대체 확인"
grep -c "runs-on" ".github/workflows/deploy.yml"
```

Expected: 파싱 에러 없음, 마지막 grep 결과 `1`.

- [ ] **Step 4: 커밋**

```bash
git add .github/workflows/deploy.yml
git commit -m "배포 워크플로우에서 Ruby/Jekyll 빌드 제거, 정적 파일 직접 업로드"
```

---

### Task 5: CLAUDE.md 로컬 개발 안내 갱신

**Files:**
- Modify: `CLAUDE.md` (repo 루트)

**Interfaces:**
- Consumes: 없음 (문서 전용 변경)
- Produces: Jekyll/Ruby 없는 새 로컬 개발 워크플로우 안내

- [ ] **Step 1: 기존 "로컬 환경 세팅"/"로컬 서버 실행" 섹션을 Ruby 없는 버전으로 교체**

`CLAUDE.md`에서 다음 섹션들을 찾아 교체한다 (Ruby/Jekyll 설치·실행 안내를 제거하고, Node/gulp 안내만 남기고, 정적
서버 안내를 추가):

- "필요 도구 설치"에서 Ruby 관련 winget 명령 제거, Node.js만 남김
- "의존성 설치"에서 `gem install jekyll bundler`, `bundle install` 제거
- "로컬 서버 실행"을 `bundle exec jekyll serve --livereload` 대신 다음으로 교체:

```markdown
### 로컬 서버 실행
```powershell
cd HeoPaulo.github.io
npx serve .
```
→ 안내되는 포트(기본 http://localhost:3000)에서 확인. `index.html`을 `file://`로 직접 열면 `assets/particles.json` fetch가 브라우저 보안 정책에 막히니 반드시 정적 서버를 통해 열 것.
```

- "주의사항"에서 "Ruby 3.3 사용 금지", "`_config.yml` 변경 시 서버 재시작 필요", "`_data/*.yml`, `_includes/*.html` 변경은 자동 반영" 항목 제거 (더 이상 해당 파일들이 존재하지 않음)
- "주요 파일 구조" 표에서 `_config.yml`, `_data/i18n.yml`, `_data/timeline.yml`, `_data/projects.yml`, `_data/skills-*.yml` 행 제거, `index.html`(단일 파일, 프로젝트/타임라인/스킬 데이터와 EN/KR 텍스트가 모두 하드코딩됨) 행 추가

- [ ] **Step 2: "완료된 작업"에 이번 마이그레이션 항목 추가**

`CLAUDE.md`의 "완료된 작업" 목록 끝에 추가:

```markdown
- [x] Jekyll/Ruby 제거, index.html 단일 정적 파일로 마이그레이션 (2026-08-12)
```

- [ ] **Step 3: 커밋**

```bash
git add CLAUDE.md
git commit -m "CLAUDE.md 로컬 개발 안내를 정적 사이트 기준으로 갱신"
```

---

### Task 6: 로컬 정적 서버로 기능 검증

**Files:**
- 변경 없음 — 검증 전용 태스크

**Interfaces:**
- Consumes: Task 2~5에서 완성된 최종 `index.html` + `assets/`
- Produces: 검증 통과 확인 — Task 7(diff 재확인)과 Task 8(push)의 전제 조건

- [ ] **Step 1: 정적 서버 기동**

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
npx serve . -l 4321
```
(백그라운드 실행 또는 별도 터미널)

- [ ] **Step 2: 브라우저로 열어 시각 비교**

`http://localhost:4321`을 열어 다음을 실제 라이브 사이트(`https://heopaulo.github.io/`)와 비교:
- 히어로/nav/스킬/컨택트 섹션 레이아웃 동일
- 우측 상단 EN/KR 버튼 클릭 시 전체 텍스트 전환 (localStorage에 `lang` 저장되는지도 새로고침으로 확인)
- 프로젝트 카드 6개 각각 클릭 → 모달에 rich-detail 패널(슬램 로봇, 진도, 넛봇, 팬케이크 로봇, 캡스톤, 컨베이어) 정상 표시, 닫기(X, ESC, 바깥 클릭) 정상 동작
- 배경 파티클 애니메이션 정상 로드 (콘솔에 404/fetch 에러 없는지 `read_console_messages`로 확인)
- Contact 섹션의 GitHub/LinkedIn/이메일 링크 정상

Expected: 모든 항목이 라이브 사이트와 동일하게 동작. 문제 발견 시 해당 단계로 돌아가 수정 후 재검증.

- [ ] **Step 3: 정적 서버 종료**

검증 끝나면 서버 프로세스 종료.

---

### Task 7: 배포 artifact 구성 로컬 재현 검증

**Files:**
- 변경 없음 — 검증 전용 태스크 (Task 4의 워크플로우가 실제로 하는 일을 로컬에서 미리 재현)

**Interfaces:**
- Consumes: Task 4의 워크플로우 정의, Task 2의 `index.html`
- Produces: 배포 artifact가 정확히 `index.html` + `assets/`만 담는지에 대한 사전 확인

- [ ] **Step 1: 워크플로우의 "Assemble deploy directory" 스텝을 로컬에서 그대로 실행**

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
rm -rf _deploy
mkdir _deploy
cp index.html _deploy/
cp -r assets _deploy/
```

- [ ] **Step 2: 배포될 파일 목록에 불필요한 파일이 없는지 확인**

Run:
```bash
find _deploy -maxdepth 1
```

Expected: `_deploy`, `_deploy/index.html`, `_deploy/assets`만 출력 — `README.md`, `CLAUDE.md`, `*.pptx`, `*.py` 등 다른 파일이 섞여 있지 않아야 함.

- [ ] **Step 3: 임시 디렉터리 정리**

```bash
rm -rf _deploy
```

---

### Task 8: 커밋 review, push, 실제 배포 확인

**Files:**
- 변경 없음 — 최종 push 및 배포 검증 태스크

**Interfaces:**
- Consumes: Task 1~7의 모든 결과물
- Produces: `https://heopaulo.github.io/`에 반영된 최종 정적 사이트

- [ ] **Step 1: 지금까지의 로컬 커밋 review**

Run:
```bash
cd "C:\Users\hetaa\HeoPaulo.github.io"
git log --oneline origin/master..HEAD
git status
```

Expected: Task 2~5에서 만든 커밋들이 순서대로 보이고, working tree는 깨끗함(`_site`, `_deploy`는 gitignore 대상이라 안 보임).

- [ ] **Step 2: push**

Run:
```bash
git push origin master
```

- [ ] **Step 3: Actions 실행 확인**

Run:
```bash
gh run watch
```
Expected: `Deploy static site to GitHub Pages` 워크플로우가 성공(`✓`)으로 완료.

- [ ] **Step 4: 실제 라이브 사이트 확인**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://heopaulo.github.io/
curl -s -o /dev/null -w "%{http_code}\n" https://heopaulo.github.io/README.md
curl -s -o /dev/null -w "%{http_code}\n" https://heopaulo.github.io/projects/pancake-robot/
```

Expected: 첫 번째는 `200`, 나머지 두 개는 `404` (더 이상 `README.md`, 고아 프로젝트 페이지가 공개되지 않음 — 마이그레이션 전에는 셋 다 `200`이었음).

브라우저로 `https://heopaulo.github.io/`를 열어 Task 6에서 확인한 항목(언어 토글, 프로젝트 모달 6종, 파티클, 링크)을 실제 배포본에서 최종 재확인.
