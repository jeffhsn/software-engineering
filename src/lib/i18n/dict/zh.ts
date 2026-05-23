import type { Dict } from "../types";

export const zh: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "所有科目",
    language: "语言",
  },
  home: {
    pill: "笔记本",
    title: "选一本笔记本。",
    subtitle: "每个科目都有自己的笔记本 — 讲座、练习、考试、总结。",
  },
  subject: {
    notebook: "笔记本",
    areasCount: (n) => `${n} 个部分`,
    read: "阅读",
    practice: "练习",
    lecture: "讲座",
    previous: "上一节",
    next: "下一节",
  },
  section: {
    emptyTitle: "暂无内容",
    emptyBody: "上传资料，我们一起搭建练习区域。",
  },
  sections: {
    lectures: "讲座",
    exercises: "练习",
    exams: "考试",
    summaries: "总结",
    flashcards: "闪卡",
    cheatsheets: "速查表",
    code: "代码",
  },
};
