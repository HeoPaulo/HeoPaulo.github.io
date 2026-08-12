const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Chanyoung Heo";
pres.title = "Chanyoung Heo Portfolio";

const C = {
  darkBg:   "0E1512",
  midBg:    "132019",
  lightBg:  "F4F7F4",
  accent:   "00C896",
  white:    "FFFFFF",
  dark:     "1A2E23",
  muted:    "607868",
  divider:  "D6E8DE",
  cardBg:   "FFFFFF",
  subText:  "90A89A",
};

const makeShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.1
});

function addSlideHeader(slide, labelEn, titleKr) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.09, h: 5.625,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  slide.addText(labelEn, {
    x: 0.42, y: 0.32, w: 7, h: 0.3,
    fontSize: 8.5, fontFace: "Calibri", color: C.accent,
    bold: true, charSpacing: 5, margin: 0
  });
  slide.addText(titleKr, {
    x: 0.42, y: 0.58, w: 9.2, h: 0.62,
    fontSize: 28, fontFace: "Georgia", color: C.dark,
    bold: true, margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.26, w: 9.2, h: 0.016,
    fill: { color: C.divider }, line: { color: C.divider }
  });
}

// ─── SLIDE 1: Cover ────────────────────────────────────────────────────
const s1 = pres.addSlide();
s1.background = { color: C.darkBg };

s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.07,
  fill: { color: C.accent }, line: { color: C.accent }
});
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.09, h: 5.625,
  fill: { color: C.accent }, line: { color: C.accent }
});

s1.addText("ROBOTICS ENGINEER", {
  x: 0.5, y: 1.6, w: 8, h: 0.38,
  fontSize: 10, fontFace: "Calibri", color: C.accent,
  charSpacing: 7, bold: true, margin: 0
});

s1.addText([
  { text: "허찬영", options: { color: C.white, bold: true } },
  { text: "  Chanyoung Heo", options: { color: "6DB89E", bold: false } }
], {
  x: 0.5, y: 2.0, w: 9.2, h: 1.0,
  fontSize: 44, fontFace: "Georgia", margin: 0
});

s1.addText("하드웨어 감각과 소프트웨어 역량을 함께 갖춘 기계공학자", {
  x: 0.5, y: 3.15, w: 9, h: 0.45,
  fontSize: 13.5, fontFace: "Calibri", color: "7AAAA0",
  italic: true, margin: 0
});

s1.addShape(pres.shapes.LINE, {
  x: 0.5, y: 4.05, w: 9, h: 0,
  line: { color: "1E3A2C", width: 1 }
});

s1.addText([
  { text: "수원대학교 기계공학 학사", options: { color: "6DB89E" } },
  { text: "  |  ", options: { color: "2A5040" } },
  { text: "ROKEY Doosan Robotics", options: { color: C.accent, bold: true } },
  { text: "  |  ", options: { color: "2A5040" } },
  { text: "nagilvin@gmail.com", options: { color: "6DB89E" } }
], {
  x: 0.5, y: 4.15, w: 9.2, h: 0.38,
  fontSize: 10.5, fontFace: "Calibri", margin: 0
});

s1.addText("01", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: "1E3A2C",
  bold: true, align: "right", margin: 0
});

// ─── SLIDE 2: About Me ─────────────────────────────────────────────────
const s2 = pres.addSlide();
s2.background = { color: C.lightBg };
addSlideHeader(s2, "ABOUT ME", "소개");

s2.addText(
  '"Mechanical engineer with a software edge —\n bridging hardware intuition and robotics software."',
  {
    x: 0.42, y: 1.42, w: 5.7, h: 1.1,
    fontSize: 13, fontFace: "Georgia", color: C.dark,
    italic: true, margin: 0
  }
);

s2.addText(
  "기계공학을 기반으로 ROS2, Python, 컴퓨터 비전 등 로봇 소프트웨어 역량을 갖추고 있습니다. " +
  "하드웨어 설계부터 소프트웨어 통합까지 전반적인 로봇 시스템 개발 경험을 보유하고 있으며, " +
  "로봇 소프트웨어 엔지니어로서 실무에 기여하고자 합니다.",
  {
    x: 0.42, y: 2.6, w: 5.7, h: 1.3,
    fontSize: 11.5, fontFace: "Calibri", color: C.muted, margin: 0
  }
);

const aboutCards = [
  { label: "학력", value: "수원대학교 기계공학\nGPA 4.0 / 4.5" },
  { label: "부트캠프", value: "ROKEY — Doosan Robotics\n지능형 로보틱스 엔지니어 과정 (845h)" },
  { label: "어학", value: "TOEIC Speaking — Advanced Low 160점\nJLPT N4" },
];

aboutCards.forEach((card, i) => {
  const cx = 6.5;
  const cy = 1.42 + i * 1.35;
  const cardH = 1.15;
  s2.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: 3.2, h: cardH,
    fill: { color: C.cardBg }, shadow: makeShadow()
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: 0.065, h: cardH,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  s2.addText(card.label, {
    x: cx + 0.15, y: cy + 0.1, w: 2.9, h: 0.26,
    fontSize: 8.5, fontFace: "Calibri", color: C.accent,
    bold: true, margin: 0
  });
  s2.addText(card.value, {
    x: cx + 0.15, y: cy + 0.38, w: 2.9, h: 0.68,
    fontSize: 11, fontFace: "Calibri", color: C.dark,
    bold: true, margin: 0
  });
});

s2.addText("02", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: C.divider,
  bold: true, align: "right", margin: 0
});

// ─── SLIDE 3: Timeline ─────────────────────────────────────────────────
const s3 = pres.addSlide();
s3.background = { color: C.lightBg };
addSlideHeader(s3, "EXPERIENCE & EDUCATION", "이력 & 학력");

const timeline = [
  { date: "Dec 2025 – Jun 2026", title: "ROKEY — Doosan Robotics",        desc: "지능형 로보틱스 엔지니어 과정 (845시간) · ROS2, Python, CV, DevOps", highlight: true },
  { date: "Sep 2024",            title: "TOEIC Speaking — Advanced Low (160점)", desc: "영어 말하기 능력 검정",                                          highlight: false },
  { date: "Feb 2018 – Aug 2024", title: "수원대학교 기계공학과",            desc: "학사 졸업 · GPA 4.0 / 4.5",                                          highlight: false },
  { date: "Jun 2023",            title: "ICROS 논문 — 제3저자",            desc: "안전한 고하중 협동로봇 구동기 설계 · CAD / FEA / MATLAB",               highlight: false },
  { date: "Apr 2023",            title: "KSME 논문 — 제2저자",             desc: "ANN 기반 역기구학 고하중 협동로봇 · CAD / FEA / MATLAB",                highlight: false },
  { date: "Dec 2021",            title: "JLPT N4",                         desc: "일본어능력시험 N4 취득",                                               highlight: false },
];

function drawTimelineItem(slide, item, cx, cy) {
  slide.addShape(pres.shapes.OVAL, {
    x: cx, y: cy + 0.07, w: 0.17, h: 0.17,
    fill: { color: item.highlight ? C.accent : "B0C8B8" },
    line: { color: item.highlight ? C.accent : "B0C8B8" }
  });
  slide.addText(item.date, {
    x: cx + 0.25, y: cy + 0.02, w: 3.8, h: 0.22,
    fontSize: 8.5, fontFace: "Calibri",
    color: item.highlight ? C.accent : C.muted,
    bold: item.highlight, margin: 0
  });
  slide.addText(item.title, {
    x: cx + 0.25, y: cy + 0.24, w: 3.8, h: 0.28,
    fontSize: 11.5, fontFace: "Calibri", color: C.dark,
    bold: true, margin: 0
  });
  slide.addText(item.desc, {
    x: cx + 0.25, y: cy + 0.52, w: 3.8, h: 0.3,
    fontSize: 9.5, fontFace: "Calibri", color: C.muted, margin: 0
  });
}

[0, 2, 4].forEach((idx, row) => drawTimelineItem(s3, timeline[idx], 0.42, 1.42 + row * 1.3));
[1, 3, 5].forEach((idx, row) => drawTimelineItem(s3, timeline[idx], 5.1,  1.42 + row * 1.3));

s3.addShape(pres.shapes.LINE, {
  x: 4.85, y: 1.42, w: 0, h: 3.8,
  line: { color: C.divider, width: 1.2 }
});

s3.addText("03", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: C.divider,
  bold: true, align: "right", margin: 0
});

// ─── SLIDE 4: Skills ───────────────────────────────────────────────────
const s4 = pres.addSlide();
s4.background = { color: C.lightBg };
addSlideHeader(s4, "TECHNICAL SKILLS", "기술 스택");

const skillGroups = [
  {
    catLabel: "Frameworks & Libraries",
    catKr: "프레임워크 / 라이브러리",
    skills: [
      { name: "ROS2",              lv: 4 },
      { name: "YOLOv8",            lv: 4 },
      { name: "OpenCV",            lv: 3 },
      { name: "IsaacSim / Gazebo", lv: 3 },
    ]
  },
  {
    catLabel: "Programming Languages",
    catKr: "프로그래밍 언어",
    skills: [
      { name: "Python",  lv: 3 },
      { name: "C++",     lv: 2 },
      { name: "MATLAB",  lv: 2 },
    ]
  },
  {
    catLabel: "Tools & DevOps",
    catKr: "도구 / DevOps",
    skills: [
      { name: "Git / GitHub",   lv: 5 },
      { name: "VS Code",        lv: 5 },
      { name: "Ubuntu / Linux", lv: 3 },
      { name: "Docker",         lv: 2 },
    ]
  }
];

const colXArr = [0.42, 3.62, 6.82];

skillGroups.forEach((group, gi) => {
  const cx = colXArr[gi];
  s4.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.42, w: 2.9, h: 3.85,
    fill: { color: C.cardBg }, shadow: makeShadow()
  });
  s4.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.42, w: 2.9, h: 0.065,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  s4.addText(group.catLabel, {
    x: cx + 0.15, y: 1.52, w: 2.6, h: 0.28,
    fontSize: 9.5, fontFace: "Calibri", color: C.dark, bold: true, margin: 0
  });
  s4.addText(group.catKr, {
    x: cx + 0.15, y: 1.78, w: 2.6, h: 0.22,
    fontSize: 8.5, fontFace: "Calibri", color: C.muted, margin: 0
  });
  group.skills.forEach((sk, si) => {
    const sy = 2.12 + si * 0.78;
    s4.addText(sk.name, {
      x: cx + 0.15, y: sy, w: 2.6, h: 0.26,
      fontSize: 11, fontFace: "Calibri", color: C.dark, margin: 0
    });
    for (let d = 0; d < 5; d++) {
      s4.addShape(pres.shapes.OVAL, {
        x: cx + 0.15 + d * 0.44, y: sy + 0.3, w: 0.26, h: 0.26,
        fill: { color: d < sk.lv ? C.accent : "D9E8DE" },
        line: { color: d < sk.lv ? C.accent : "D9E8DE" }
      });
    }
  });
});

s4.addText("04", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: C.divider,
  bold: true, align: "right", margin: 0
});

// ─── SLIDE 5: Projects ─────────────────────────────────────────────────
const s5 = pres.addSlide();
s5.background = { color: C.lightBg };
addSlideHeader(s5, "PROJECTS", "프로젝트");

const projects = [
  {
    name: "SLAM 자율주행 로봇",
    tags: "ROS2 · SLAM · LiDAR · Python",
    desc: "ROS2 환경에서 SLAM으로 실시간 지도 생성 및 자율주행 구현. 센서 융합과 경로 계획 알고리즘 개발."
  },
  {
    name: "팬케이크 자동화 로봇",
    tags: "ROS2 · Robot Arm · Python  ★ PM",
    desc: "ROS2 기반 팬케이크 제조 자동화 시스템. PM 담당, 다단계 조리 워크플로우 로봇 동작 설계·구현."
  },
  {
    name: "AI 협동로봇 Pick & Place",
    tags: "YOLOv8 · OpenCV · ROS2 · IsaacSim  ★ PM",
    desc: "YOLOv8 기반 견과류 감지·파지 시스템. 로봇 동작, 시뮬레이션, 모델 학습, PM 총괄."
  },
  {
    name: "Digital Twin 로봇 시뮬레이션",
    tags: "IsaacSim · CAD · ROS2 · Python",
    desc: "로봇 자동화 공정을 가상 재현하는 Digital Twin 플랫폼. CAD 모델 구축 및 시뮬레이션 환경 통합."
  }
];

const cardPositions = [
  { x: 0.42, y: 1.42 }, { x: 5.18, y: 1.42 },
  { x: 0.42, y: 3.38 }, { x: 5.18, y: 3.38 },
];
const cardW2 = 4.4, cardH2 = 1.68;

projects.forEach((proj, i) => {
  const p = cardPositions[i];
  s5.addShape(pres.shapes.RECTANGLE, {
    x: p.x, y: p.y, w: cardW2, h: cardH2,
    fill: { color: C.cardBg }, shadow: makeShadow()
  });
  s5.addShape(pres.shapes.RECTANGLE, {
    x: p.x, y: p.y, w: cardW2, h: 0.065,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  s5.addText(proj.name, {
    x: p.x + 0.18, y: p.y + 0.11, w: cardW2 - 0.36, h: 0.3,
    fontSize: 12.5, fontFace: "Calibri", color: C.dark, bold: true, margin: 0
  });
  s5.addText(proj.tags, {
    x: p.x + 0.18, y: p.y + 0.44, w: cardW2 - 0.36, h: 0.24,
    fontSize: 9, fontFace: "Calibri", color: C.accent, bold: true, margin: 0
  });
  s5.addText(proj.desc, {
    x: p.x + 0.18, y: p.y + 0.72, w: cardW2 - 0.36, h: 0.88,
    fontSize: 10, fontFace: "Calibri", color: C.muted, margin: 0
  });
});

s5.addText("05", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: C.divider,
  bold: true, align: "right", margin: 0
});

// ─── SLIDE 6: Contact ──────────────────────────────────────────────────
const s6 = pres.addSlide();
s6.background = { color: C.darkBg };

s6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.07,
  fill: { color: C.accent }, line: { color: C.accent }
});
s6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.09, h: 5.625,
  fill: { color: C.accent }, line: { color: C.accent }
});

s6.addText("CONTACT", {
  x: 0.5, y: 0.9, w: 9, h: 0.36,
  fontSize: 9, fontFace: "Calibri", color: C.accent,
  bold: true, charSpacing: 6, margin: 0
});
s6.addText("함께 일해요", {
  x: 0.5, y: 1.28, w: 9, h: 0.9,
  fontSize: 40, fontFace: "Georgia", color: C.white, bold: true, margin: 0
});
s6.addText("로봇 프로젝트, 협업 제안, 또는 단순한 안부 인사도 편하게 연락 주세요!", {
  x: 0.5, y: 2.3, w: 9, h: 0.44,
  fontSize: 12.5, fontFace: "Calibri", color: "6DB89E", margin: 0
});

[
  { label: "Email",    value: "nagilvin@gmail.com" },
  { label: "GitHub",   value: "github.com/HeoPaulo" },
  { label: "LinkedIn", value: "chanyoung-heo-509bbb419" },
].forEach((c, i) => {
  const cx = 0.5 + i * 3.16;
  s6.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 3.05, w: 2.95, h: 1.1,
    fill: { color: "0A1510" }, shadow: makeShadow()
  });
  s6.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 3.05, w: 2.95, h: 0.065,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  s6.addText(c.label, {
    x: cx + 0.14, y: 3.15, w: 2.67, h: 0.26,
    fontSize: 8.5, fontFace: "Calibri", color: C.accent, bold: true, margin: 0
  });
  s6.addText(c.value, {
    x: cx + 0.14, y: 3.43, w: 2.67, h: 0.6,
    fontSize: 10.5, fontFace: "Calibri", color: C.white, margin: 0
  });
});

s6.addText("허찬영 / Chanyoung Heo  ·  2026", {
  x: 0.5, y: 5.15, w: 9.2, h: 0.32,
  fontSize: 9, fontFace: "Calibri", color: "2A5040", margin: 0
});
s6.addText("06", {
  x: 9.2, y: 5.1, w: 0.6, h: 0.35,
  fontSize: 20, fontFace: "Georgia", color: "1E3A2C",
  bold: true, align: "right", margin: 0
});

// ─── SAVE ──────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "ChanyoungHeo_Portfolio.pptx" })
  .then(() => console.log("✅ 6슬라이드 원본 재생성 완료"))
  .catch(err => { console.error("❌", err); process.exit(1); });
