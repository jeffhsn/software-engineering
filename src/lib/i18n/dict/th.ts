import type { Dict } from "../types";

export const th: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "ทุกวิชา", language: "ภาษา" },
  home: {
    pill: "สมุด",
    title: "เลือกสมุดเล่มหนึ่ง",
    subtitle:
      "แต่ละวิชามีสมุดของตัวเอง — บรรยาย แบบฝึกหัด ข้อสอบ สรุป",
  },
  subject: { notebook: "สมุด", areasCount: (n) => `${n} ส่วน` },
  section: {
    emptyTitle: "ยังไม่มีเนื้อหา",
    emptyBody: "อัปโหลดสื่อแล้วเราจะสร้างพื้นที่ฝึกฝนด้วยกัน",
  },
  sections: {
    lectures: "บรรยาย",
    exercises: "แบบฝึกหัด",
    exams: "ข้อสอบ",
    summaries: "สรุป",
    flashcards: "แฟลชการ์ด",
    cheatsheets: "สรุปย่อ",
    code: "โค้ด",
  },
};
