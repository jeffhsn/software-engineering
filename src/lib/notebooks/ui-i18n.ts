import type { LocalizedText } from "@/lib/i18n/types";

/**
 * In-app UI micro-copy for the quiz player and the explanation reader, fully
 * localized across all 32 locales. These are the interactive chrome words
 * (Frage, Weiter, Ergebnis, …) that sit next to the already-translated chips;
 * resolved via tr(UI.key) in the components. Numbers are interpolated around
 * the word (e.g. `${n} ${tr(UI.fragen)}`).
 *
 * Locale order: de en tr ar ru it es fr zh pl pt uk fa ja ko vi hi ur nl el cs
 * hu ro sq sr hr bg sv fi id th sw.
 */
export const UI: Record<string, LocalizedText> = {
  // "{n} Fragen" — questions count.
  fragen: {
    de: "Fragen", en: "questions", tr: "soru", ar: "أسئلة", ru: "вопросов", it: "domande",
    es: "preguntas", fr: "questions", zh: "题", pl: "pytań", pt: "perguntas", uk: "запитань",
    fa: "سؤال", ja: "問", ko: "문항", vi: "câu hỏi", hi: "प्रश्न", ur: "سوالات", nl: "vragen",
    el: "ερωτήσεις", cs: "otázek", hu: "kérdés", ro: "întrebări", sq: "pyetje", sr: "питања",
    hr: "pitanja", bg: "въпроса", sv: "frågor", fi: "kysymystä", id: "soal", th: "ข้อ", sw: "maswali",
  },
  notAttempted: {
    de: "noch nicht versucht", en: "not attempted yet", tr: "henüz denenmedi", ar: "لم تُحاوَل بعد",
    ru: "ещё не пройдено", it: "non ancora provato", es: "aún sin intentar", fr: "pas encore tenté",
    zh: "尚未尝试", pl: "jeszcze nie próbowano", pt: "ainda não tentado", uk: "ще не пройдено",
    fa: "هنوز امتحان نشده", ja: "未挑戦", ko: "아직 시도 안 함", vi: "chưa thử", hi: "अभी तक प्रयास नहीं",
    ur: "ابھی کوشش نہیں کی", nl: "nog niet geprobeerd", el: "δεν δοκιμάστηκε ακόμη", cs: "zatím nezkoušeno",
    hu: "még nem próbáltad", ro: "neîncercat încă", sq: "ende e patentuar", sr: "још није покушано",
    hr: "još nije pokušano", bg: "още не е опитвано", sv: "inte försökt än", fi: "ei vielä yritetty",
    id: "belum dicoba", th: "ยังไม่ได้ลอง", sw: "bado kujaribiwa",
  },
  // "{n}× versucht"
  attempted: {
    de: "versucht", en: "attempts", tr: "deneme", ar: "محاولة", ru: "попыток", it: "tentativi",
    es: "intentos", fr: "tentatives", zh: "次尝试", pl: "prób", pt: "tentativas", uk: "спроб",
    fa: "بار", ja: "回", ko: "회 시도", vi: "lần thử", hi: "बार", ur: "بار", nl: "pogingen",
    el: "προσπάθειες", cs: "pokusů", hu: "próba", ro: "încercări", sq: "përpjekje", sr: "покушаја",
    hr: "pokušaja", bg: "опита", sv: "försök", fi: "yritystä", id: "percobaan", th: "ครั้ง", sw: "majaribio",
  },
  last: {
    de: "zuletzt", en: "last", tr: "son", ar: "آخر", ru: "последний", it: "ultimo", es: "último",
    fr: "dernier", zh: "最近", pl: "ostatnio", pt: "último", uk: "останній", fa: "آخرین", ja: "前回",
    ko: "최근", vi: "gần nhất", hi: "अंतिम", ur: "آخری", nl: "laatste", el: "τελευταίο", cs: "naposledy",
    hu: "utolsó", ro: "ultima", sq: "fundit", sr: "последњи", hr: "zadnji", bg: "последно", sv: "senast",
    fi: "viimeksi", id: "terakhir", th: "ล่าสุด", sw: "mwisho",
  },
  mastered: {
    de: "sitzt", en: "nailed", tr: "tamam", ar: "أتقنته", ru: "освоено", it: "padroneggiato",
    es: "dominado", fr: "maîtrisé", zh: "已掌握", pl: "opanowane", pt: "dominado", uk: "засвоєно",
    fa: "مسلط", ja: "完璧", ko: "완벽", vi: "thành thạo", hi: "पक्का", ur: "مہارت", nl: "beheerst",
    el: "το κατέκτησες", cs: "zvládnuto", hu: "megvan", ro: "stăpânit", sq: "e zotëruar", sr: "савладано",
    hr: "savladano", bg: "усвоено", sv: "klart", fi: "hallussa", id: "dikuasai", th: "แม่นแล้ว", sw: "umeimudu",
  },
  best: {
    de: "Beste", en: "Best", tr: "En iyi", ar: "الأفضل", ru: "Лучший", it: "Migliore", es: "Mejor",
    fr: "Meilleur", zh: "最佳", pl: "Najlepszy", pt: "Melhor", uk: "Найкращий", fa: "بهترین", ja: "最高",
    ko: "최고", vi: "Tốt nhất", hi: "सर्वश्रेष्ठ", ur: "بہترین", nl: "Beste", el: "Καλύτερο", cs: "Nejlepší",
    hu: "Legjobb", ro: "Cel mai bun", sq: "Më i miri", sr: "Најбоље", hr: "Najbolje", bg: "Най-добро",
    sv: "Bästa", fi: "Paras", id: "Terbaik", th: "ดีที่สุด", sw: "Bora",
  },
  neu: {
    de: "neu", en: "new", tr: "yeni", ar: "جديد", ru: "новый", it: "nuovo", es: "nuevo", fr: "nouveau",
    zh: "新", pl: "nowy", pt: "novo", uk: "новий", fa: "جدید", ja: "新規", ko: "신규", vi: "mới",
    hi: "नया", ur: "نیا", nl: "nieuw", el: "νέο", cs: "nové", hu: "új", ro: "nou", sq: "i ri",
    sr: "ново", hr: "novo", bg: "ново", sv: "ny", fi: "uusi", id: "baru", th: "ใหม่", sw: "mpya",
  },
  quizList: {
    de: "Quiz-Liste", en: "Quiz list", tr: "Test listesi", ar: "قائمة الاختبارات", ru: "Список тестов",
    it: "Elenco quiz", es: "Lista de cuestionarios", fr: "Liste des quiz", zh: "测验列表", pl: "Lista quizów",
    pt: "Lista de quizzes", uk: "Список тестів", fa: "فهرست آزمونک‌ها", ja: "クイズ一覧", ko: "퀴즈 목록",
    vi: "Danh sách trắc nghiệm", hi: "क्विज़ सूची", ur: "کوئز کی فہرست", nl: "Quizlijst", el: "Λίστα κουίζ",
    cs: "Seznam kvízů", hu: "Kvízlista", ro: "Lista testelor", sq: "Lista e kuizeve", sr: "Листа квизова",
    hr: "Popis kvizova", bg: "Списък с тестове", sv: "Quizlista", fi: "Tietovisalista", id: "Daftar kuis",
    th: "รายการแบบทดสอบ", sw: "Orodha ya majaribio",
  },
  leaveQuiz: {
    de: "Quiz verlassen", en: "Leave quiz", tr: "Testten çık", ar: "مغادرة الاختبار", ru: "Выйти из теста",
    it: "Esci dal quiz", es: "Salir del cuestionario", fr: "Quitter le quiz", zh: "退出测验", pl: "Opuść quiz",
    pt: "Sair do quiz", uk: "Вийти з тесту", fa: "خروج از آزمونک", ja: "クイズを終了", ko: "퀴즈 나가기",
    vi: "Thoát trắc nghiệm", hi: "क्विज़ छोड़ें", ur: "کوئز چھوڑیں", nl: "Quiz verlaten", el: "Έξοδος από το κουίζ",
    cs: "Opustit kvíz", hu: "Kilépés a kvízből", ro: "Părăsește testul", sq: "Dil nga kuizi", sr: "Напусти квиз",
    hr: "Napusti kviz", bg: "Изход от теста", sv: "Lämna quizet", fi: "Poistu tietovisasta", id: "Keluar dari kuis",
    th: "ออกจากแบบทดสอบ", sw: "Toka kwenye jaribio",
  },
  points: {
    de: "Punkte", en: "Points", tr: "Puan", ar: "النقاط", ru: "Очки", it: "Punti", es: "Puntos",
    fr: "Points", zh: "得分", pl: "Punkty", pt: "Pontos", uk: "Бали", fa: "امتیاز", ja: "得点", ko: "점수",
    vi: "Điểm", hi: "अंक", ur: "پوائنٹس", nl: "Punten", el: "Πόντοι", cs: "Body", hu: "Pont", ro: "Puncte",
    sq: "Pikë", sr: "Поени", hr: "Bodovi", bg: "Точки", sv: "Poäng", fi: "Pisteet", id: "Poin", th: "คะแนน",
    sw: "Pointi",
  },
  // "Frage {n}"
  question: {
    de: "Frage", en: "Question", tr: "Soru", ar: "سؤال", ru: "Вопрос", it: "Domanda", es: "Pregunta",
    fr: "Question", zh: "问题", pl: "Pytanie", pt: "Pergunta", uk: "Запитання", fa: "سؤال", ja: "問題",
    ko: "문제", vi: "Câu hỏi", hi: "प्रश्न", ur: "سوال", nl: "Vraag", el: "Ερώτηση", cs: "Otázka",
    hu: "Kérdés", ro: "Întrebarea", sq: "Pyetja", sr: "Питање", hr: "Pitanje", bg: "Въпрос", sv: "Fråga",
    fi: "Kysymys", id: "Pertanyaan", th: "คำถาม", sw: "Swali",
  },
  correct: {
    de: "Richtig", en: "Correct", tr: "Doğru", ar: "صحيح", ru: "Верно", it: "Corretto", es: "Correcto",
    fr: "Correct", zh: "正确", pl: "Poprawnie", pt: "Correto", uk: "Правильно", fa: "درست", ja: "正解",
    ko: "정답", vi: "Đúng", hi: "सही", ur: "درست", nl: "Juist", el: "Σωστό", cs: "Správně", hu: "Helyes",
    ro: "Corect", sq: "Saktë", sr: "Тачно", hr: "Točno", bg: "Вярно", sv: "Rätt", fi: "Oikein", id: "Benar",
    th: "ถูกต้อง", sw: "Sahihi",
  },
  notQuite: {
    de: "Nicht ganz", en: "Not quite", tr: "Tam değil", ar: "ليس تمامًا", ru: "Не совсем", it: "Non proprio",
    es: "No del todo", fr: "Pas tout à fait", zh: "不太对", pl: "Niezupełnie", pt: "Não exatamente",
    uk: "Не зовсім", fa: "نه دقیقاً", ja: "惜しい", ko: "아쉬워요", vi: "Chưa đúng", hi: "बिलकुल नहीं",
    ur: "بالکل نہیں", nl: "Net niet", el: "Όχι ακριβώς", cs: "Ne tak docela", hu: "Nem egészen",
    ro: "Nu chiar", sq: "Jo plotësisht", sr: "Не баш", hr: "Ne baš", bg: "Не съвсем", sv: "Inte riktigt",
    fi: "Ei aivan", id: "Belum tepat", th: "ยังไม่ใช่", sw: "Si kabisa",
  },
  back: {
    de: "Zurück", en: "Back", tr: "Geri", ar: "رجوع", ru: "Назад", it: "Indietro", es: "Atrás",
    fr: "Retour", zh: "上一题", pl: "Wstecz", pt: "Voltar", uk: "Назад", fa: "قبلی", ja: "戻る", ko: "이전",
    vi: "Quay lại", hi: "पीछे", ur: "پیچھے", nl: "Terug", el: "Πίσω", cs: "Zpět", hu: "Vissza", ro: "Înapoi",
    sq: "Mbrapa", sr: "Назад", hr: "Natrag", bg: "Назад", sv: "Tillbaka", fi: "Takaisin", id: "Kembali",
    th: "ย้อนกลับ", sw: "Nyuma",
  },
  next: {
    de: "Weiter", en: "Next", tr: "İleri", ar: "التالي", ru: "Далее", it: "Avanti", es: "Siguiente",
    fr: "Suivant", zh: "下一题", pl: "Dalej", pt: "Próximo", uk: "Далі", fa: "بعدی", ja: "次へ", ko: "다음",
    vi: "Tiếp", hi: "आगे", ur: "آگے", nl: "Volgende", el: "Επόμενο", cs: "Další", hu: "Tovább", ro: "Înainte",
    sq: "Tjetra", sr: "Даље", hr: "Dalje", bg: "Напред", sv: "Nästa", fi: "Seuraava", id: "Lanjut",
    th: "ถัดไป", sw: "Endelea",
  },
  finishQuiz: {
    de: "Quiz abschließen", en: "Finish quiz", tr: "Testi bitir", ar: "إنهاء الاختبار", ru: "Завершить тест",
    it: "Completa il quiz", es: "Terminar cuestionario", fr: "Terminer le quiz", zh: "完成测验", pl: "Zakończ quiz",
    pt: "Concluir quiz", uk: "Завершити тест", fa: "پایان آزمونک", ja: "クイズを終了", ko: "퀴즈 완료",
    vi: "Hoàn thành", hi: "क्विज़ पूरा करें", ur: "کوئز مکمل کریں", nl: "Quiz afronden", el: "Ολοκλήρωση κουίζ",
    cs: "Dokončit kvíz", hu: "Kvíz befejezése", ro: "Finalizează testul", sq: "Përfundo kuizin",
    sr: "Заврши квиз", hr: "Završi kviz", bg: "Завърши теста", sv: "Avsluta quizet", fi: "Lopeta tietovisa",
    id: "Selesaikan kuis", th: "จบแบบทดสอบ", sw: "Maliza jaribio",
  },
  result: {
    de: "Ergebnis", en: "Result", tr: "Sonuç", ar: "النتيجة", ru: "Результат", it: "Risultato",
    es: "Resultado", fr: "Résultat", zh: "结果", pl: "Wynik", pt: "Resultado", uk: "Результат", fa: "نتیجه",
    ja: "結果", ko: "결과", vi: "Kết quả", hi: "परिणाम", ur: "نتیجہ", nl: "Resultaat", el: "Αποτέλεσμα",
    cs: "Výsledek", hu: "Eredmény", ro: "Rezultat", sq: "Rezultati", sr: "Резултат", hr: "Rezultat",
    bg: "Резултат", sv: "Resultat", fi: "Tulos", id: "Hasil", th: "ผลลัพธ์", sw: "Matokeo",
  },
  newBest: {
    de: "Neue Bestleistung", en: "New best", tr: "Yeni rekor", ar: "أفضل نتيجة جديدة", ru: "Новый рекорд",
    it: "Nuovo record", es: "Nuevo récord", fr: "Nouveau record", zh: "新纪录", pl: "Nowy rekord",
    pt: "Novo recorde", uk: "Новий рекорд", fa: "رکورد جدید", ja: "自己ベスト更新", ko: "최고 기록 경신",
    vi: "Kỷ lục mới", hi: "नया सर्वश्रेष्ठ", ur: "نیا بہترین", nl: "Nieuw record", el: "Νέο ρεκόρ",
    cs: "Nový rekord", hu: "Új csúcs", ro: "Record nou", sq: "Rekord i ri", sr: "Нови рекорд",
    hr: "Novi rekord", bg: "Нов рекорд", sv: "Nytt rekord", fi: "Uusi ennätys", id: "Rekor baru",
    th: "สถิติใหม่", sw: "Rekodi mpya",
  },
  bestScore: {
    de: "Bestleistung", en: "Best", tr: "En iyi", ar: "الأفضل", ru: "Лучший результат", it: "Migliore",
    es: "Mejor", fr: "Meilleur", zh: "最佳成绩", pl: "Najlepszy", pt: "Melhor", uk: "Найкращий результат",
    fa: "بهترین", ja: "自己ベスト", ko: "최고 기록", vi: "Tốt nhất", hi: "सर्वश्रेष्ठ", ur: "بہترین",
    nl: "Beste", el: "Καλύτερο", cs: "Nejlepší", hu: "Legjobb", ro: "Cel mai bun", sq: "Më i miri",
    sr: "Најбоље", hr: "Najbolje", bg: "Най-добро", sv: "Bästa", fi: "Paras", id: "Terbaik", th: "ดีที่สุด",
    sw: "Bora",
  },
  history: {
    de: "Verlauf", en: "History", tr: "Geçmiş", ar: "السجل", ru: "История", it: "Cronologia", es: "Historial",
    fr: "Historique", zh: "记录", pl: "Historia", pt: "Histórico", uk: "Історія", fa: "تاریخچه", ja: "履歴",
    ko: "기록", vi: "Lịch sử", hi: "इतिहास", ur: "تاریخ", nl: "Geschiedenis", el: "Ιστορικό", cs: "Historie",
    hu: "Előzmények", ro: "Istoric", sq: "Historiku", sr: "Историја", hr: "Povijest", bg: "История",
    sv: "Historik", fi: "Historia", id: "Riwayat", th: "ประวัติ", sw: "Historia",
  },
  // "{n} Versuche"
  attemptsPlural: {
    de: "Versuche", en: "attempts", tr: "deneme", ar: "محاولات", ru: "попыток", it: "tentativi",
    es: "intentos", fr: "tentatives", zh: "次尝试", pl: "prób", pt: "tentativas", uk: "спроб", fa: "تلاش",
    ja: "回", ko: "회", vi: "lần thử", hi: "प्रयास", ur: "کوششیں", nl: "pogingen", el: "προσπάθειες",
    cs: "pokusů", hu: "próba", ro: "încercări", sq: "përpjekje", sr: "покушаја", hr: "pokušaja",
    bg: "опита", sv: "försök", fi: "yritystä", id: "percobaan", th: "ครั้ง", sw: "majaribio",
  },
  // "und {n} weitere"
  and: {
    de: "und", en: "and", tr: "ve", ar: "و", ru: "и", it: "e", es: "y", fr: "et", zh: "还有", pl: "i",
    pt: "e", uk: "та", fa: "و", ja: "他", ko: "외", vi: "và", hi: "और", ur: "اور", nl: "en", el: "και",
    cs: "a", hu: "és", ro: "și", sq: "dhe", sr: "и", hr: "i", bg: "и", sv: "och", fi: "ja", id: "dan",
    th: "และ", sw: "na",
  },
  more: {
    de: "weitere", en: "more", tr: "tane daha", ar: "أخرى", ru: "ещё", it: "altri", es: "más", fr: "autres",
    zh: "条", pl: "więcej", pt: "mais", uk: "ще", fa: "مورد دیگر", ja: "件", ko: "개 더", vi: "lần nữa",
    hi: "और", ur: "مزید", nl: "meer", el: "ακόμη", cs: "dalších", hu: "további", ro: "altele", sq: "të tjera",
    hr: "još", sr: "још", bg: "още", sv: "till", fi: "lisää", id: "lagi", th: "รายการ", sw: "zaidi",
  },
  otherQuizzes: {
    de: "Andere Quizzes", en: "Other quizzes", tr: "Diğer testler", ar: "اختبارات أخرى", ru: "Другие тесты",
    it: "Altri quiz", es: "Otros cuestionarios", fr: "Autres quiz", zh: "其他测验", pl: "Inne quizy",
    pt: "Outros quizzes", uk: "Інші тести", fa: "آزمونک‌های دیگر", ja: "他のクイズ", ko: "다른 퀴즈",
    vi: "Trắc nghiệm khác", hi: "अन्य क्विज़", ur: "دیگر کوئز", nl: "Andere quizzen", el: "Άλλα κουίζ",
    cs: "Další kvízy", hu: "Más kvízek", ro: "Alte teste", sq: "Kuize të tjera", sr: "Други квизови",
    hr: "Drugi kvizovi", bg: "Други тестове", sv: "Andra quiz", fi: "Muut tietovisat", id: "Kuis lain",
    th: "แบบทดสอบอื่น", sw: "Majaribio mengine",
  },
  retake: {
    de: "Nochmal versuchen", en: "Try again", tr: "Tekrar dene", ar: "حاول مرة أخرى", ru: "Пройти снова",
    it: "Riprova", es: "Reintentar", fr: "Réessayer", zh: "再试一次", pl: "Spróbuj ponownie", pt: "Tentar de novo",
    uk: "Спробувати ще раз", fa: "تلاش دوباره", ja: "もう一度", ko: "다시 풀기", vi: "Thử lại", hi: "फिर से प्रयास",
    ur: "دوبارہ کوشش", nl: "Opnieuw proberen", el: "Δοκίμασε ξανά", cs: "Zkusit znovu", hu: "Újra",
    ro: "Încearcă din nou", sq: "Provo sërish", sr: "Покушај поново", hr: "Pokušaj ponovno", bg: "Опитай пак",
    sv: "Försök igen", fi: "Yritä uudelleen", id: "Coba lagi", th: "ลองอีกครั้ง", sw: "Jaribu tena",
  },
  // "ca. {n} Min. Lesezeit" → `${n} ${minAbbr} ${readingTime}`
  minAbbr: {
    de: "Min.", en: "min", tr: "dk", ar: "د", ru: "мин", it: "min", es: "min", fr: "min", zh: "分钟",
    pl: "min", pt: "min", uk: "хв", fa: "دقیقه", ja: "分", ko: "분", vi: "phút", hi: "मिनट", ur: "منٹ",
    nl: "min", el: "λεπτά", cs: "min", hu: "perc", ro: "min", sq: "min", sr: "мин", hr: "min", bg: "мин",
    sv: "min", fi: "min", id: "mnt", th: "นาที", sw: "dk",
  },
  readingTime: {
    de: "Lesezeit", en: "read", tr: "okuma", ar: "قراءة", ru: "чтения", it: "di lettura", es: "de lectura",
    fr: "de lecture", zh: "阅读", pl: "czytania", pt: "de leitura", uk: "читання", fa: "مطالعه", ja: "の読了時間",
    ko: "읽기", vi: "đọc", hi: "पढ़ने का समय", ur: "پڑھنے کا وقت", nl: "leestijd", el: "ανάγνωσης",
    cs: "čtení", hu: "olvasás", ro: "de citit", sq: "lexim", sr: "читања", hr: "čitanja", bg: "четене",
    sv: "lästid", fi: "lukuaika", id: "baca", th: "อ่าน", sw: "kusoma",
  },
  // "{n} Abschnitte"
  sectionsWord: {
    de: "Abschnitte", en: "sections", tr: "bölüm", ar: "أقسام", ru: "разделов", it: "sezioni", es: "secciones",
    fr: "sections", zh: "节", pl: "sekcji", pt: "seções", uk: "розділів", fa: "بخش", ja: "節", ko: "섹션",
    vi: "phần", hi: "खंड", ur: "حصے", nl: "secties", el: "ενότητες", cs: "sekcí", hu: "szakasz", ro: "secțiuni",
    sq: "seksione", sr: "одељака", hr: "odjeljaka", bg: "раздела", sv: "avsnitt", fi: "osiota", id: "bagian",
    th: "ส่วน", sw: "sehemu",
  },
  close: {
    de: "Schließen", en: "Close", tr: "Kapat", ar: "إغلاق", ru: "Закрыть", it: "Chiudi",
    es: "Cerrar", fr: "Fermer", zh: "关闭", pl: "Zamknij", pt: "Fechar", uk: "Закрити",
    fa: "بستن", ja: "閉じる", ko: "닫기", vi: "Đóng", hi: "बंद करें", ur: "بند کریں", nl: "Sluiten",
    el: "Κλείσιμο", cs: "Zavřít", hu: "Bezárás", ro: "Închide", sq: "Mbyll", sr: "Затвори",
    hr: "Zatvori", bg: "Затвори", sv: "Stäng", fi: "Sulje", id: "Tutup", th: "ปิด", sw: "Funga",
  },
  progress: {
    de: "Fortschritt", en: "Progress", tr: "İlerleme", ar: "التقدّم", ru: "Прогресс", it: "Avanzamento",
    es: "Progreso", fr: "Progression", zh: "进度", pl: "Postęp", pt: "Progresso", uk: "Прогрес", fa: "پیشرفت",
    ja: "進捗", ko: "진행", vi: "Tiến độ", hi: "प्रगति", ur: "پیش رفت", nl: "Voortgang", el: "Πρόοδος",
    cs: "Postup", hu: "Haladás", ro: "Progres", sq: "Përparimi", sr: "Напредак", hr: "Napredak", bg: "Напредък",
    sv: "Framsteg", fi: "Edistyminen", id: "Kemajuan", th: "ความคืบหน้า", sw: "Maendeleo",
  },
};
