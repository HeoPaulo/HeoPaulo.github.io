# Claude Code Context

## 이 프로젝트
허찬영(HeoPaulo)의 GitHub Pages 포트폴리오 사이트.
템플릿: longpdo/neumorphism (fork)
배포 URL: https://HeoPaulo.github.io

## 유저 정보
- 이름: 허찬영 (Chanyoung Heo)
- GitHub: HeoPaulo
- LinkedIn: https://www.linkedin.com/in/chanyoung-heo-509bbb419/
- 이메일: nagilvin@gmail.com
- 학력: 기계공학 학사
- 부트캠프: ROKEY (수료 2026.06.11)
- 상황: 신입 구직자, 경력 없음

## 로컬 환경 세팅 (새 PC)

### 필요 도구 설치
```powershell
# Ruby 3.2 (3.3 사용 금지 — jekyll 3.9 호환 안 됨)
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
→ http://127.0.0.1:4000/neumorphism/ 에서 확인

## 주의사항
- Ruby 3.3은 jekyll 3.9의 Liquid `tainted?` 오류로 사용 불가
- `github-pages` gem은 Gemfile에서 제거됨 (nokogiri 빌드 실패, Jekyll 버전 충돌)
- 배포 시 `_config.yml`의 `baseurl: "/neumorphism"` → `baseurl: ""`로 변경 필요
- GitHub Actions로 배포 예정 (github-pages gem 불필요)

## 완료된 작업
- [x] longpdo/neumorphism fork → HeoPaulo.github.io
- [x] 로컬 환경 세팅 (Ruby 3.2, Node.js, yarn, bundle)
- [x] 로컬 서버 정상 실행 확인

## 다음 작업 (여기서부터 이어서)
- [ ] `_config.yml` 내용 채우기 (이름, 직함, 소개글, SNS)
- [ ] `_data/skills-languages.yml` — 언어 스킬
- [ ] `_data/skills-frameworks.yml` — 프레임워크
- [ ] `_data/skills-tools.yml` — 툴
- [ ] `_data/timeline.yml` — 학력 (경력 없음)
- [ ] `_data/projects.yml` — 프로젝트 목록
- [ ] `_config.yml` baseurl 수정 후 GitHub Actions 배포 설정

## 채워야 할 내용 (유저에게 확인 필요)
- 목표 포지션 (백엔드/프론트엔드/풀스택 등)
- 기술스택 (언어, 프레임워크, 툴 및 숙련도 1~5)
- ROKEY 부트캠프 프로젝트 목록
- 개인 프로젝트: notes.html (단일 파일 노트앱, Supabase 클라우드 싱크, 마크다운 에디터, 캘린더, 체크리스트)
- 자기소개 문단
