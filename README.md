# HeoPaulo.github.io

> 허찬영(Chanyoung Heo)의 GitHub Pages 포트폴리오 사이트.
> Jekyll + Neumorphism 테마 기반 | 블랙+그린 커스텀 디자인 | 한/영 이중 언어

배포 URL: **https://HeoPaulo.github.io**

---

## 목차

* [프로젝트 소개](#프로젝트-소개)
  * [기술 스택](#기술-스택)
  * [주요 기능](#주요-기능)
* [로컬 환경 세팅](#로컬-환경-세팅)
  * [사전 요구사항](#사전-요구사항)
  * [의존성 설치](#의존성-설치)
* [로컬 서버 실행](#로컬-서버-실행)
* [커스터마이징](#커스터마이징)
  * [_config.yml](#_configyml)
  * [_data/*.yml](#_datayml)
  * [스타일 (SCSS)](#스타일-scss)
  * [파티클 배경](#파티클-배경)
* [배포](#배포)
* [라이선스](#라이선스)

---

## 프로젝트 소개

[longpdo/neumorphism](https://github.com/longpdo/neumorphism) 템플릿을 fork해서 개인 포트폴리오로 커스터마이징한 사이트입니다.  
로봇 소프트웨어 엔지니어 포지션을 목표로 하는 신입 구직자 허찬영의 이력/프로젝트/기술 스택을 소개합니다.

### 기술 스택

* [Jekyll](https://jekyllrb.com/) — 정적 사이트 생성
* [GitHub Pages](https://pages.github.com/) — 호스팅
* [GitHub Actions](https://github.com/features/actions) — 자동 배포
* [particles.js](https://vincentgarreau.com/particles.js/) — 랜딩 배경 애니메이션
* [AOS](https://michalsnik.github.io/aos/) — 스크롤 애니메이션
* Gulp + SCSS + BrowserSync — 빌드 워크플로우

### 주요 기능

* **한/영 언어 토글** — 버튼 클릭으로 전환, `localStorage`로 새로고침 후에도 유지
* **블랙+그린 커스텀 디자인** — 배경 `#0e1512` + 포인트 컬러 `#00c896`
* **IBM Plex Sans / IBM Plex Mono 폰트** 적용
* **Neumorphism 다크 디자인** — 모바일 퍼스트 반응형
* **타이핑 캐러셀** — 직군/역할 자동 순환 텍스트
* **GitHub API** — Open Source Projects 섹션 자동 연동
* **다크 그린 파티클** 배경 (기존 빨강 → 커스텀 변경)

---

## 로컬 환경 세팅

> **주의:** Ruby 3.3 사용 금지 — jekyll Logger 호환 오류 발생. **Ruby 3.2** 사용.

### 사전 요구사항

```powershell
# Ruby 3.2 (winget으로 설치)
winget install RubyInstallerTeam.RubyWithDevKit.3.2

# Node.js LTS
winget install OpenJS.NodeJS.LTS
```

설치 후 **새 터미널**을 열어야 PATH가 반영됩니다.

### 의존성 설치

```powershell
# Ruby PATH 명시 (터미널 재시작 전까지 필요)
$env:PATH = "C:\Ruby32-x64\bin;" + "C:\Program Files\nodejs\;" + "C:\Users\$env:USERNAME\AppData\Roaming\npm;" + $env:PATH

gem install jekyll bundler
npm install -g yarn

cd HeoPaulo.github.io
yarn install
bundle install
```

---

## 로컬 서버 실행

```powershell
$env:PATH = "C:\Ruby32-x64\bin;" + "C:\Program Files\nodejs\;" + "C:\Users\$env:USERNAME\AppData\Roaming\npm;" + $env:PATH

bundle exec jekyll serve --livereload
```

브라우저에서 → **http://127.0.0.1:4000/**

> `_config.yml` 변경 시 서버를 재시작해야 반영됩니다.  
> `_data/*.yml`, `_includes/*.html` 변경은 자동 반영됩니다.

---

## 커스터마이징

### _config.yml

사이트 기본 정보(이름, 소개, 소셜 링크, CV 다운로드 링크 등)를 수정합니다.  
변경 후 서버 재시작 필요.

| 항목 | 설명 |
|------|------|
| `username` | GitHub 유저명 |
| `full_name` | 표시 이름 |
| `email` | 연락처 이메일 |
| `cv_download_link` | 이력서 PDF 링크 |
| `repository` | GitHub Metadata 연동용 저장소명 |

### _data/*.yml

포트폴리오 콘텐츠를 수정합니다.

| 파일 | 용도 |
|------|------|
| `_data/i18n.yml` | 한국어 번역 전체 |
| `_data/timeline.yml` | 학력/경력 (`subtitle` / `subtitle_kr`) |
| `_data/projects.yml` | 프로젝트 (`name_kr`, `descr_kr` 포함) |
| `_data/skills-*.yml` | 기술 스택 (weight 1~5) |

### 스타일 (SCSS)

`_sass/main.scss`를 수정한 뒤 반드시 CSS 재컴파일이 필요합니다.

```powershell
npx gulp styles
```

`assets/css/main.min.css`로 빌드됩니다.

### 파티클 배경

`assets/particles.json`을 수정해 랜딩 페이지 배경 애니메이션을 커스터마이징합니다.  
현재 다크 그린(`#00c896` 계열) 파티클로 설정되어 있습니다.

---

## 배포

GitHub Actions로 `master` 브랜치에 push 시 자동 배포됩니다.

```
.github/workflows/deploy.yml
```

> **최초 1회 수동 설정 필요:**  
> GitHub 저장소 → Settings → Pages → Source를 **GitHub Actions**로 변경

---

## 라이선스

MIT License — 원본 템플릿: [longpdo/neumorphism](https://github.com/longpdo/neumorphism)
