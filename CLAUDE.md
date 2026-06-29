# Claude Code Context

## 이 프로젝트
허찬영(HeoPaulo)의 GitHub Pages 포트폴리오 사이트.
템플릿: longpdo/neumorphism (fork)
배포 URL: https://HeoPaulo.github.io

## 유저 정보
- 이름: 허찬영 (Chanyoung Heo)
- GitHub: HeoPaulo
- LinkedIn: https://www.linkedin.com/in/chanyoung-heo-509bbb419/
- 이메일: nagilvin@gmail.com (포트폴리오용: heopaulo70@gmail.com)
- 학력: 수원대학교 기계공학과 학사 (4.0/4.5)
- 부트캠프: 두산로보틱스 ROKEY 지능형 로보틱스 엔지니어 과정 (수료 2026.06)
- 상황: 신입 구직자, 로봇 소프트웨어 엔지니어 포지션 지원 중

## 로컬 환경 세팅 (새 PC)

### 필요 도구 설치
```powershell
# Ruby 3.2 (3.3 사용 금지 — jekyll Logger 호환 오류)
winget install RubyInstallerTeam.RubyWithDevKit.3.2

# Node.js LTS
winget install OpenJS.NodeJS.LTS

# 설치 후 새 터미널 열기
```

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

### 로컬 서버 실행
```powershell
$env:PATH = "C:\Ruby32-x64\bin;" + "C:\Program Files\nodejs\;" + "C:\Users\$env:USERNAME\AppData\Roaming\npm;" + $env:PATH
cd HeoPaulo.github.io
bundle exec jekyll serve --livereload
```
→ http://127.0.0.1:4000/ 에서 확인

### SCSS 수정 후 CSS 재컴파일
```powershell
npx gulp styles
```
(`_sass/main.scss` → `assets/css/main.min.css`)

## 주의사항
- Ruby 3.3 사용 금지 — jekyll Logger 호환 오류
- `github-pages` gem 없음 (nokogiri 빌드 실패 이력 → Gemfile에서 제거됨)
- `_config.yml` 변경 시 서버 재시작 필요 (jekyll 자동 감지 안 함)
- `_data/*.yml`, `_includes/*.html` 변경은 자동 반영

## 완료된 작업
- [x] longpdo/neumorphism fork → HeoPaulo.github.io
- [x] 로컬 환경 세팅 (Ruby 3.2, Node.js, yarn, bundle)
- [x] 개인 콘텐츠 입력 (이름, 소개, 학력/경력, 프로젝트, 기술 스택, 연락처)
- [x] EN/KR 이중 언어 토글 (_data/i18n.yml, localStorage 유지, 새로고침 지원)
- [x] 컬러 리디자인: 블랙+그린 (#0e1512 배경 + #00c896 포인트)
- [x] 폰트 변경: IBM Plex Sans (본문) + IBM Plex Mono (숫자)
- [x] 파티클 색상 빨강 → 다크 그린 (assets/particles.json)
- [x] TxtRotate KR 초기화 버그 수정 (DOMContentLoaded 사용)
- [x] 푸터 이름 업데이트 (허찬영 / Chanyoung Heo)
- [x] GitHub Actions 배포 워크플로우 추가 (.github/workflows/deploy.yml)

## 남은 작업
- [ ] GitHub 저장소 Settings > Pages > Source를 **GitHub Actions**로 변경 (수동)
- [ ] CV 다운로드 링크: `_config.yml`의 `cv_download_link: "#"` → 실제 이력서 URL로 교체
- [ ] 오픈소스 프로젝트 섹션 정리 (현재 GitHub API로 자동 가져오는 중)

## 주요 파일 구조
| 파일 | 용도 |
|------|------|
| `_config.yml` | 기본 설정, 영문 콘텐츠 (변경 시 서버 재시작) |
| `_data/i18n.yml` | 한국어 번역 전체 |
| `_data/timeline.yml` | 학력/경력 (subtitle / subtitle_kr) |
| `_data/projects.yml` | 프로젝트 (name_kr, descr_kr 포함) |
| `_data/skills-*.yml` | 기술 스택 (weight 1~5) |
| `_sass/main.scss` | 스타일 (수정 후 npx gulp styles 필요) |
| `assets/particles.json` | 배경 파티클 설정 |
| `_layouts/default.html` | 전체 레이아웃, 언어 토글 JS |
