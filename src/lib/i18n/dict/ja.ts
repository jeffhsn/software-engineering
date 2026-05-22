import type { Dict } from "../types";

export const ja: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "すべての科目", language: "言語" },
  home: {
    pill: "ノート",
    title: "ノートを選んでください。",
    subtitle:
      "各科目に専用のノートがあります — 講義、演習、試験、まとめ。",
  },
  subject: { notebook: "ノート", areasCount: (n) => `${n} セクション` },
  section: {
    emptyTitle: "まだコンテンツはありません",
    emptyBody: "資料をアップロードすれば、練習エリアを一緒に作りましょう。",
  },
  sections: {
    lectures: "講義",
    exercises: "演習",
    exams: "試験",
    summaries: "まとめ",
    flashcards: "フラッシュカード",
    cheatsheets: "チートシート",
    code: "コード",
  },
};
