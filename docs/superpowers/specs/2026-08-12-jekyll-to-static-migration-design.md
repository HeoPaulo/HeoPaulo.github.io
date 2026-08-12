# Jekyll → 순수 정적 HTML/CSS/JS 마이그레이션 설계

## 배경

현재 사이트(https://heopaulo.github.io/)는 Jekyll(Ruby)로 빌드된다. `index.html`이 `_layouts/default.html` +
`_includes/*.html` + `_data/*.yml`(projects, timeline, skills, i18n)을 Liquid 템플릿으로 조합해서 만들어진다.

로컬 개발 환경에 Ruby 버전 호환성 이슈(3.3에서 jekyll Logger 오류, 3.2 고정 필요) 등 Jekyll/Ruby 툴체인 자체의
유지보수 부담이 있어, Jekyll을 완전히 제거하고 지금과 동일한 결과물을 순수 정적 HTML/CSS/JS로 유지하기로 했다.

이 저장소는 원래 [mushenghe.github.io](https://mushenghe.github.io/) 스타일을 참고해 리디자인해온 결과물이며,
이번 마이그레이션은 그 디자인/구조를 유지한 채 빌드 엔진만 걷어내는 작업이다. **디자인 변경은 범위 밖.**

## 목표

- 지금 렌더링되는 `index.html`과 동일한 결과물을 Jekyll/Ruby 없이 서빙
- 프로젝트/타임라인/스킬 데이터는 YAML이 아니라 `index.html`에 직접 하드코딩 (빌드 도구 없음, 사용자 선택)
- CSS는 지금처럼 `_sass/main.scss` → `npx gulp styles`로 로컬 컴파일 유지 (Node/gulp는 남김, Ruby만 제거)
- GitHub Actions 배포 워크플로우에서 Ruby/Jekyll 빌드 스텝 제거

## 아키텍처

- **`index.html`을 완전히 self-contained 단일 파일로 평탄화.** Liquid 태그, `{% include %}`, YAML 루프가 모두
  사라지고, 현재 Jekyll이 렌더링한 최종 HTML(EN/KR 두 언어 span, 프로젝트 카드, 모달 안의 rich-detail 패널
  6종 등)이 리터럴로 그대로 파일에 들어간다.
- **`assets/`(css/js/img/favicon/particles.json)는 변경 없음.** 원래도 순수 정적 파일이라 Jekyll과 무관했다.
- **`_sass/` + `gulpfile.js` + `package.json`은 유지.** CSS 편집 시 로컬에서 `npx gulp styles`로 계속 컴파일.
  CI 파이프라인에는 포함되지 않는다 (컴파일된 `assets/css/main.min.css`를 커밋해서 배포).
- 언어 토글(`data-lang` attribute + localStorage, `setLang()`)은 이미 순수 JS 로직이라 변경 불필요. Jekyll의
  역할은 빌드 시점에 KR 텍스트를 두 `<span class="lang-en">`/`<span class="lang-kr">`에 주입하는 것뿐이었고,
  평탄화된 HTML에는 이미 두 언어가 리터럴로 박혀 있으므로 그대로 동작한다.

## 제거 대상

- `_config.yml`, `Gemfile`, `Gemfile.lock`, `_layouts/`, `_includes/`, `_data/`, `_site/`(빌드 산출물)
- **`_portfolio/`(digital-twin.md, notes-html.md, pancake-robot.md, pick-and-place.md,
  slam-navigation.md) + `_layouts/project-detail.html`** — 조사 중 발견한 고아 코드. `/projects/슬러그/`
  개별 페이지를 빌드하지만 현재 사이트 어디에서도 링크되지 않는다 (실제 프로젝트 카드는 별도의
  `_includes/project-details/*.html` 6개를 모달로 사용). 이전 반복 작업의 잔재로, 삭제 대상에 포함한다.

## 배포 워크플로우 변경

현재 `.github/workflows/deploy.yml`은 Ruby 설치 → `bundle exec jekyll build` → 산출물 업로드 순서다.
Ruby/Jekyll 빌드 스텝을 제거하고, `index.html` + `assets/`만 모아 업로드하도록 단순화한다:

```yaml
- name: Checkout
- name: Setup Pages
- name: Assemble deploy dir
  run: |
    mkdir _deploy
    cp index.html _deploy/
    cp -r assets _deploy/
- name: Upload artifact (path: _deploy)
- name: Deploy to GitHub Pages
```

Ruby 설치 스텝, `bundle exec jekyll build` 스텝은 삭제한다. (GitHub Pages Source는 이번 세션에서 이미
`workflow` build_type으로 전환 완료 — 레거시 자동 빌드와의 중복 빌드 문제 해소됨.)

## 트레이드오프 (사용자 확인 완료)

- 프로젝트/타임라인/스킬 항목 추가·수정은 앞으로 YAML 편집이 아니라 `index.html`을 직접 편집해야 한다.
  항목이 늘어날수록 중복 HTML이 늘어나는 점을 감수하기로 함.
- `_portfolio` 고아 페이지는 완전히 삭제 (나중에 필요하면 다시 만들 수 있음, 현재는 아무 곳에서도 참조되지
  않으므로 유지 비용만 발생).

## 마이그레이션 절차

1. `bundle exec jekyll build`를 마지막으로 실행해 `_site/index.html`(완전히 렌더링된 최종 HTML)을 추출
2. 그 결과를 repo 루트 `index.html`로 교체, 에셋 경로(`/assets/...`)가 정상인지 확인 (baseurl이 ""이므로
   루트 상대경로 그대로여야 함)
3. Jekyll 전용 파일 삭제: `_config.yml`, `Gemfile`, `Gemfile.lock`, `_layouts/`, `_includes/`, `_data/`,
   `_portfolio/`, `_site/`
4. `.github/workflows/deploy.yml`을 위 설계대로 수정
5. `CLAUDE.md`의 로컬 개발 안내를 갱신: `bundle exec jekyll serve` 안내 제거, "정적 서버로 index.html 열기"
   안내로 교체. gulp/SCSS 안내는 유지
6. 로컬 정적 서버(`npx serve` 등, `file://`는 particles.json fetch가 막힐 수 있어 지양)로 열어서 다음을
   기존 라이브 사이트와 비교 검증:
   - 언어 토글(EN/KR) 정상 동작
   - 프로젝트 카드 6개 + 모달 rich-detail 패널 6종 정상 표시
   - 파티클 배경 정상 로드
   - 네비게이션, Contact 섹션 링크 정상
7. 커밋 → push → Actions 배포 성공 확인 → 실제 https://heopaulo.github.io/ 에서 최종 확인

## 테스트 / 검증 방법

빌드 도구가 없는 프로젝트라 자동화된 테스트 스위트는 없음. 검증은 위 6번 절차의 브라우저 수동 확인과,
마이그레이션 전/후 렌더링된 HTML의 시각적 diff(스크린샷 비교)로 진행한다.
