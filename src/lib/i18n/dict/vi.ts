import type { Dict } from "../types";

export const vi: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Tất cả môn học", language: "Ngôn ngữ" },
  home: {
    pill: "Sổ tay",
    title: "Chọn một quyển sổ.",
    subtitle:
      "Mỗi môn có một quyển sổ riêng — bài giảng, bài tập, kỳ thi, tóm tắt.",
  },
  subject: { notebook: "Sổ tay", areasCount: (n) => `${n} phần` },
  section: {
    emptyTitle: "Chưa có nội dung",
    emptyBody: "Tải tài liệu lên và chúng ta sẽ xây dựng khu vực luyện tập.",
  },
  sections: {
    lectures: "Bài giảng",
    exercises: "Bài tập",
    exams: "Kỳ thi",
    summaries: "Tóm tắt",
    flashcards: "Thẻ ghi nhớ",
    cheatsheets: "Tóm tắt nhanh",
    code: "Mã",
  },
};
