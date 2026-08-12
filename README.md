# HeoPaulo Portfolio

허찬영(Chanyoung Heo)의 개인 포트폴리오 사이트입니다. 정적 HTML(`index.html`)로 작성되어 `GitHub Pages`에 배포됩니다.

🔗 https://HeoPaulo.github.io

## Built With

* Plain HTML/CSS/JS (single-page static site)
* [particles.js](https://vincentgarreau.com/particles.js/)
* [AOS](https://michalsnik.github.io/aos/) — 스크롤 애니메이션
* Gulp 기반 SCSS/JS 빌드 파이프라인

## Local Development

### Prerequisites

* Node.js LTS
* Yarn (`npm install -g yarn`)

### Setup

```sh
yarn install
```

### Run

```sh
npx serve .
```

안내되는 포트(기본 `http://localhost:3000`)에서 확인. `index.html`을 `file://`로 직접 열면 `assets/particles.json` fetch가 브라우저 보안 정책에 막히니 반드시 정적 서버를 통해 열 것.

### SCSS 수정 후 CSS 재컴파일

```sh
npx gulp styles
```

(`_sass/main.scss` → `assets/css/main.min.css`)

## Content

* `index.html`: 단일 정적 파일 — 프로젝트/타임라인/스킬 데이터와 EN/KR 텍스트가 모두 하드코딩됨
* `_sass/`: SCSS 소스
* `_js/`: JS 소스 (gulp가 `assets/js`로 컴파일)
* `assets/`: 컴파일된 CSS/JS, 이미지, `particles.json`, favicon 등

## Deploy

`master` 브랜치에 push하면 `.github/workflows/deploy.yml`을 통해 GitHub Pages로 자동 배포됩니다.
