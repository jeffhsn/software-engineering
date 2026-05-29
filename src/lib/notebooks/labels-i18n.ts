import type { LocalizedText } from "@/lib/i18n/types";

/**
 * Shared, fully-localized chip/material labels used across every notebook
 * (Vorlesung, Übung, Lösung, …). German is canonical; this is the dedicated
 * translation pass for the navigation layer, so each label carries all 32
 * supported locales. Notebook-specific labels (e.g. „Übung (Vernam …)") stay
 * inline in the data files.
 *
 * Locale order mirrors LOCALES: de en tr ar ru it es fr zh pl pt uk fa ja ko
 * vi hi ur nl el cs hu ro sq sr hr bg sv fi id th sw.
 */
export const LBL: Record<string, LocalizedText> = {
  // „Vorlesung" — the lecture material.
  vorlesung: {
    de: "Vorlesung", en: "Lecture", tr: "Ders", ar: "محاضرة", ru: "Лекция",
    it: "Lezione", es: "Clase", fr: "Cours", zh: "讲座", pl: "Wykład",
    pt: "Aula", uk: "Лекція", fa: "درس", ja: "講義", ko: "강의",
    vi: "Bài giảng", hi: "व्याख्यान", ur: "لیکچر", nl: "College", el: "Διάλεξη",
    cs: "Přednáška", hu: "Előadás", ro: "Curs", sq: "Leksion", sr: "Предавање",
    hr: "Predavanje", bg: "Лекция", sv: "Föreläsning", fi: "Luento",
    id: "Kuliah", th: "การบรรยาย", sw: "Mhadhara",
  },
  // „Übung" — the exercise sheet.
  uebung: {
    de: "Übung", en: "Exercise", tr: "Alıştırma", ar: "تمرين", ru: "Упражнение",
    it: "Esercizio", es: "Ejercicio", fr: "Exercice", zh: "练习", pl: "Ćwiczenie",
    pt: "Exercício", uk: "Вправа", fa: "تمرین", ja: "演習", ko: "연습",
    vi: "Bài tập", hi: "अभ्यास", ur: "مشق", nl: "Oefening", el: "Άσκηση",
    cs: "Cvičení", hu: "Gyakorlat", ro: "Exercițiu", sq: "Ushtrim", sr: "Вежба",
    hr: "Vježba", bg: "Упражнение", sv: "Övning", fi: "Harjoitus",
    id: "Latihan", th: "แบบฝึกหัด", sw: "Zoezi",
  },
  // „Lösung" — the worked solution.
  loesung: {
    de: "Lösung", en: "Solution", tr: "Çözüm", ar: "الحل", ru: "Решение",
    it: "Soluzione", es: "Solución", fr: "Corrigé", zh: "解答", pl: "Rozwiązanie",
    pt: "Solução", uk: "Розв'язок", fa: "حل", ja: "解答", ko: "풀이",
    vi: "Lời giải", hi: "हल", ur: "حل", nl: "Oplossing", el: "Λύση",
    cs: "Řešení", hu: "Megoldás", ro: "Soluție", sq: "Zgjidhja", sr: "Решење",
    hr: "Rješenje", bg: "Решение", sv: "Lösning", fi: "Ratkaisu",
    id: "Solusi", th: "เฉลย", sw: "Suluhisho",
  },
  // „Aufgaben" — the task/problem sheet.
  aufgaben: {
    de: "Aufgaben", en: "Exercises", tr: "Sorular", ar: "تمارين", ru: "Задания",
    it: "Esercizi", es: "Ejercicios", fr: "Exercices", zh: "习题", pl: "Zadania",
    pt: "Exercícios", uk: "Завдання", fa: "مسائل", ja: "課題", ko: "문제",
    vi: "Bài tập", hi: "प्रश्न", ur: "سوالات", nl: "Opgaven", el: "Ασκήσεις",
    cs: "Úlohy", hu: "Feladatok", ro: "Exerciții", sq: "Detyrat", sr: "Задаци",
    hr: "Zadaci", bg: "Задачи", sv: "Uppgifter", fi: "Tehtävät",
    id: "Soal", th: "โจทย์", sw: "Mazoezi",
  },
  // „Aufgaben (deutsch)" — the German-language sheet.
  aufgabenDe: {
    de: "Aufgaben (deutsch)", en: "Exercises (German)", tr: "Sorular (Almanca)",
    ar: "تمارين (بالألمانية)", ru: "Задания (немецкий)", it: "Esercizi (tedesco)",
    es: "Ejercicios (alemán)", fr: "Exercices (allemand)", zh: "习题（德语）",
    pl: "Zadania (niemiecki)", pt: "Exercícios (alemão)", uk: "Завдання (німецька)",
    fa: "مسائل (آلمانی)", ja: "課題（ドイツ語）", ko: "문제 (독일어)",
    vi: "Bài tập (tiếng Đức)", hi: "प्रश्न (जर्मन)", ur: "سوالات (جرمن)",
    nl: "Opgaven (Duits)", el: "Ασκήσεις (γερμανικά)", cs: "Úlohy (němčina)",
    hu: "Feladatok (német)", ro: "Exerciții (germană)", sq: "Detyrat (gjermanisht)",
    sr: "Задаци (немачки)", hr: "Zadaci (njemački)", bg: "Задачи (немски)",
    sv: "Uppgifter (tyska)", fi: "Tehtävät (saksa)", id: "Soal (Jerman)",
    th: "โจทย์ (เยอรมัน)", sw: "Mazoezi (Kijerumani)",
  },
  // „Aufgaben (englisch)" — the English-language sheet.
  aufgabenEn: {
    de: "Aufgaben (englisch)", en: "Exercises (English)", tr: "Sorular (İngilizce)",
    ar: "تمارين (بالإنجليزية)", ru: "Задания (английский)", it: "Esercizi (inglese)",
    es: "Ejercicios (inglés)", fr: "Exercices (anglais)", zh: "习题（英语）",
    pl: "Zadania (angielski)", pt: "Exercícios (inglês)", uk: "Завдання (англійська)",
    fa: "مسائل (انگلیسی)", ja: "課題（英語）", ko: "문제 (영어)",
    vi: "Bài tập (tiếng Anh)", hi: "प्रश्न (अंग्रेज़ी)", ur: "سوالات (انگریزی)",
    nl: "Opgaven (Engels)", el: "Ασκήσεις (αγγλικά)", cs: "Úlohy (angličtina)",
    hu: "Feladatok (angol)", ro: "Exerciții (engleză)", sq: "Detyrat (anglisht)",
    sr: "Задаци (енглески)", hr: "Zadaci (engleski)", bg: "Задачи (английски)",
    sv: "Uppgifter (engelska)", fi: "Tehtävät (englanti)", id: "Soal (Inggris)",
    th: "โจทย์ (อังกฤษ)", sw: "Mazoezi (Kiingereza)",
  },
  // „Mitschrift" — handwritten lecture/solution notes.
  mitschrift: {
    de: "Mitschrift", en: "Transcript", tr: "Ders notu", ar: "ملاحظات", ru: "Конспект",
    it: "Appunti", es: "Apuntes", fr: "Notes", zh: "笔记", pl: "Notatki",
    pt: "Anotações", uk: "Конспект", fa: "یادداشت", ja: "ノート", ko: "필기",
    vi: "Ghi chép", hi: "नोट्स", ur: "نوٹس", nl: "Aantekeningen", el: "Σημειώσεις",
    cs: "Zápisky", hu: "Jegyzet", ro: "Notițe", sq: "Shënime", sr: "Белешке",
    hr: "Bilješke", bg: "Записки", sv: "Anteckningar", fi: "Muistiinpanot",
    id: "Catatan", th: "บันทึก", sw: "Madokezo",
  },
  // „Zusatzhilfe" — bundled extra-help material.
  zusatzhilfe: {
    de: "Zusatzhilfe", en: "Extra help", tr: "Ek yardım", ar: "مساعدة إضافية",
    ru: "Доп. материал", it: "Aiuto extra", es: "Ayuda extra", fr: "Aide complémentaire",
    zh: "额外帮助", pl: "Dodatkowa pomoc", pt: "Ajuda extra", uk: "Додаткова допомога",
    fa: "کمک اضافی", ja: "補助資料", ko: "보조 자료", vi: "Trợ giúp thêm",
    hi: "अतिरिक्त सहायता", ur: "اضافی مدد", nl: "Extra hulp", el: "Επιπλέον βοήθεια",
    cs: "Doplňková pomoc", hu: "Plusz segítség", ro: "Ajutor suplimentar",
    sq: "Ndihmë shtesë", sr: "Додатна помоћ", hr: "Dodatna pomoć",
    bg: "Допълнителна помощ", sv: "Extra hjälp", fi: "Lisäapu", id: "Bantuan tambahan",
    th: "ตัวช่วยเพิ่มเติม", sw: "Msaada wa ziada",
  },
  // „Folien" — the slide source of a lecture.
  folien: {
    de: "Folien", en: "Slides", tr: "Slaytlar", ar: "الشرائح", ru: "Слайды",
    it: "Diapositive", es: "Diapositivas", fr: "Diapositives", zh: "幻灯片", pl: "Slajdy",
    pt: "Slides", uk: "Слайди", fa: "اسلایدها", ja: "スライド", ko: "슬라이드",
    vi: "Slide", hi: "स्लाइड", ur: "سلائیڈز", nl: "Dia's", el: "Διαφάνειες",
    cs: "Snímky", hu: "Diák", ro: "Diapozitive", sq: "Sllajdet", sr: "Слајдови",
    hr: "Slajdovi", bg: "Слайдове", sv: "Bilder", fi: "Diat", id: "Slide",
    th: "สไลด์", sw: "Slaidi",
  },
  // „Video" — the YouTube fallback.
  video: {
    de: "Video", en: "Video", tr: "Video", ar: "فيديو", ru: "Видео", it: "Video",
    es: "Vídeo", fr: "Vidéo", zh: "视频", pl: "Wideo", pt: "Vídeo", uk: "Відео",
    fa: "ویدئو", ja: "動画", ko: "비디오", vi: "Video", hi: "वीडियो", ur: "ویڈیو",
    nl: "Video", el: "Βίντεο", cs: "Video", hu: "Videó", ro: "Videoclip", sq: "Video",
    sr: "Видео", hr: "Video", bg: "Видео", sv: "Video", fi: "Video", id: "Video",
    th: "วิดีโอ", sw: "Video",
  },
  // „Erklärung" — the AI explanation (lecture context).
  erklaerung: {
    de: "Erklärung", en: "Explanation", tr: "Açıklama", ar: "شرح", ru: "Объяснение",
    it: "Spiegazione", es: "Explicación", fr: "Explication", zh: "讲解", pl: "Wyjaśnienie",
    pt: "Explicação", uk: "Пояснення", fa: "توضیح", ja: "解説", ko: "설명",
    vi: "Giải thích", hi: "व्याख्या", ur: "وضاحت", nl: "Uitleg", el: "Επεξήγηση",
    cs: "Vysvětlení", hu: "Magyarázat", ro: "Explicație", sq: "Shpjegim", sr: "Објашњење",
    hr: "Objašnjenje", bg: "Обяснение", sv: "Förklaring", fi: "Selitys", id: "Penjelasan",
    th: "คำอธิบาย", sw: "Maelezo",
  },
  // „Quiz" — the quiz bank.
  quiz: {
    de: "Quiz", en: "Quiz", tr: "Test", ar: "اختبار", ru: "Тест", it: "Quiz",
    es: "Cuestionario", fr: "Quiz", zh: "测验", pl: "Quiz", pt: "Quiz", uk: "Тест",
    fa: "آزمونک", ja: "クイズ", ko: "퀴즈", vi: "Trắc nghiệm", hi: "क्विज़", ur: "کوئز",
    nl: "Quiz", el: "Κουίζ", cs: "Kvíz", hu: "Kvíz", ro: "Test", sq: "Kuiz",
    sr: "Квиз", hr: "Kviz", bg: "Тест", sv: "Quiz", fi: "Tietovisa", id: "Kuis",
    th: "แบบทดสอบ", sw: "Jaribio",
  },
  // „Tief" — deep explanation mode.
  tief: {
    de: "Tief", en: "Deep", tr: "Derin", ar: "متعمّق", ru: "Подробно", it: "Approfondito",
    es: "Profundo", fr: "Approfondi", zh: "深入", pl: "Szczegółowo", pt: "Aprofundado",
    uk: "Докладно", fa: "عمیق", ja: "詳細", ko: "심화", vi: "Chuyên sâu", hi: "गहन",
    ur: "تفصیلی", nl: "Diepgaand", el: "Αναλυτικά", cs: "Podrobně", hu: "Részletes",
    ro: "Aprofundat", sq: "Thellë", sr: "Детаљно", hr: "Detaljno", bg: "Подробно",
    sv: "Djup", fi: "Syvä", id: "Mendalam", th: "เชิงลึก", sw: "Kwa kina",
  },
  // „Einfach" — simple explanation mode.
  einfach: {
    de: "Einfach", en: "Simple", tr: "Basit", ar: "مبسّط", ru: "Просто", it: "Semplice",
    es: "Sencillo", fr: "Simple", zh: "简明", pl: "Prosto", pt: "Simples", uk: "Просто",
    fa: "ساده", ja: "やさしく", ko: "쉽게", vi: "Đơn giản", hi: "सरल", ur: "آسان",
    nl: "Eenvoudig", el: "Απλά", cs: "Jednoduše", hu: "Egyszerű", ro: "Simplu",
    sq: "Thjeshtë", sr: "Једноставно", hr: "Jednostavno", bg: "Просто", sv: "Enkel",
    fi: "Helppo", id: "Sederhana", th: "ง่าย", sw: "Rahisi",
  },
  // „Lösungsweg" — the step-by-step worked walkthrough (exercise context).
  loesungsweg: {
    de: "Lösungsweg", en: "Walkthrough", tr: "Çözüm yolu", ar: "خطوات الحل", ru: "Разбор",
    it: "Procedimento", es: "Resolución paso a paso", fr: "Démarche", zh: "解题步骤",
    pl: "Tok rozwiązania", pt: "Resolução passo a passo", uk: "Розбір", fa: "روش حل",
    ja: "解き方", ko: "풀이 과정", vi: "Hướng dẫn giải", hi: "हल विधि", ur: "حل کا طریقہ",
    nl: "Stappenplan", el: "Βήματα λύσης", cs: "Postup řešení", hu: "Megoldás menete",
    ro: "Pași de rezolvare", sq: "Hapat e zgjidhjes", sr: "Поступак решавања",
    hr: "Postupak rješavanja", bg: "Ход на решението", sv: "Lösningsgång",
    fi: "Ratkaisun kulku", id: "Langkah penyelesaian", th: "วิธีทำ", sw: "Hatua za suluhisho",
  },
  // „Lösung (Multics)" — the Multics-specific solution variant.
  loesungMultics: {
    de: "Lösung (Multics)", en: "Solution (Multics)", tr: "Çözüm (Multics)",
    ar: "الحل (Multics)", ru: "Решение (Multics)", it: "Soluzione (Multics)",
    es: "Solución (Multics)", fr: "Corrigé (Multics)", zh: "解答（Multics）",
    pl: "Rozwiązanie (Multics)", pt: "Solução (Multics)", uk: "Розв'язок (Multics)",
    fa: "حل (Multics)", ja: "解答（Multics）", ko: "풀이 (Multics)",
    vi: "Lời giải (Multics)", hi: "हल (Multics)", ur: "حل (Multics)",
    nl: "Oplossing (Multics)", el: "Λύση (Multics)", cs: "Řešení (Multics)",
    hu: "Megoldás (Multics)", ro: "Soluție (Multics)", sq: "Zgjidhja (Multics)",
    sr: "Решење (Multics)", hr: "Rješenje (Multics)", bg: "Решение (Multics)",
    sv: "Lösning (Multics)", fi: "Ratkaisu (Multics)", id: "Solusi (Multics)",
    th: "เฉลย (Multics)", sw: "Suluhisho (Multics)",
  },
};
