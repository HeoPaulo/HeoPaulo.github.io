# Claude Code Context

## 이 프로젝트
허찬영(HeoPaulo)의 GitHub Pages 포트폴리오 사이트.
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
# Node.js LTS
winget install OpenJS.NodeJS.LTS

# 설치 후 새 터미널 열기
```

### 의존성 설치
```powershell
npm install -g yarn

cd HeoPaulo.github.io
yarn install
```

### 로컬 서버 실행
```powershell
cd HeoPaulo.github.io
npx serve .
```
→ 안내되는 포트(기본 http://localhost:3000)에서 확인. `index.html`을 `file://`로 직접 열면 `assets/particles.json` fetch가 브라우저 보안 정책에 막히니 반드시 정적 서버를 통해 열 것.

### SCSS 수정 후 CSS 재컴파일
```powershell
npx gulp styles
```
(`_sass/main.scss` → `assets/css/main.min.css`)

## 주의사항
- `github-pages` gem 없음 (nokogiri 빌드 실패 이력 → Gemfile에서 제거됨)

## 완료된 작업
- [x] 로컬 환경 세팅 (Ruby 3.2, Node.js, yarn, bundle)
- [x] 개인 콘텐츠 입력 (이름, 소개, 학력/경력, 프로젝트, 기술 스택, 연락처)
- [x] EN/KR 이중 언어 토글 (_data/i18n.yml, localStorage 유지, 새로고침 지원)
- [x] 컬러 리디자인: 라이트 (#eef2f0 배경 + #047857 포인트)
- [x] 폰트: Pretendard Variable
- [x] TxtRotate KR 초기화 버그 수정 (DOMContentLoaded 사용)
- [x] 푸터 이름 업데이트 (허찬영 / Chanyoung Heo)
- [x] GitHub Actions 배포 워크플로우 추가 (.github/workflows/deploy.yml)
- [x] 프로젝트 상세 모달, nav 바, 프로젝트 카드 썸네일 (mushenghe 스타일 리디자인)
- [x] Jekyll/Ruby 제거, index.html 단일 정적 파일로 마이그레이션 (2026-08-12)
- [x] GitHub 저장소 Settings > Pages > Source를 GitHub Actions로 변경 (2026-08-12)
- [x] git 히스토리 squash, 잔여 stale 브랜치(feature/project-card-thumbnails, work/project-card-thumbnails-impl) 삭제 (2026-08-12)
- [x] 프로젝트 모달이 상단 nav바에 가리던 z-index 버그 수정 (2026-08-13)

## 남은 작업
- [ ] CV 다운로드 링크: 현재 index.html에 CV 링크가 없음 (Timeline 섹션이 꺼진 상태) — 이력서 URL이 정해지면 Timeline 섹션을 다시 켜고 링크 추가 필요
- [ ] 프로젝트 카드 썸네일 이미지 누락: `/assets/img/projects/cobot1.gif`, `cobot2.gif`가 한 번도 커밋된 적 없어 Pick-and-Place·Pancake Robot 카드 썸네일이 깨져 있음 (마이그레이션 이전부터 있던 문제)

## 주요 파일 구조
| 파일 | 용도 |
|------|------|
| `index.html` | 단일 정적 파일 — 프로젝트/타임라인/스킬 데이터와 EN/KR 텍스트가 모두 하드코딩됨 |
| `_sass/main.scss` | 스타일 (수정 후 npx gulp styles 필요) |
| `assets/particles.json` | 배경 파티클 설정 |
