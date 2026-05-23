import type { Dict } from "../types";

export const ko: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "모든 과목", language: "언어" },
  home: {
    pill: "노트",
    title: "노트를 골라보세요.",
    subtitle: "각 과목마다 전용 노트가 있어요 — 강의, 연습, 시험, 요약.",
  },
  subject: {
    notebook: "노트",
    areasCount: (n) => `${n}개 섹션`,
    read: "읽기",
    practice: "연습",
    lecture: "강의",
    previous: "이전",
    next: "다음",
  },
  section: {
    emptyTitle: "아직 콘텐츠가 없습니다",
    emptyBody: "자료를 업로드하면 연습 공간을 함께 만들어요.",
  },
  sections: {
    lectures: "강의",
    exercises: "연습",
    exams: "시험",
    summaries: "요약",
    flashcards: "플래시카드",
    cheatsheets: "치트시트",
    code: "코드",
  },
};
