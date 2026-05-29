import type { Notebook } from "../types";
import { LBL } from "../labels-i18n";

const BASE = "/content/cybersicherheit/2025";

const L = {
  vorlesung: LBL.vorlesung,
  uebung: LBL.uebung,
  uebungCIntro: {
    de: "Übung (C-Einführung)", en: "Exercise (C primer)", tr: "Alıştırma (C'ye giriş)",
    ar: "تمرين (مقدمة C)", ru: "Упражнение (введение в C)", it: "Esercizio (introduzione a C)",
    es: "Ejercicio (introducción a C)", fr: "Exercice (initiation au C)", zh: "练习（C 入门）",
    pl: "Ćwiczenie (wprowadzenie do C)", pt: "Exercício (introdução a C)", uk: "Вправа (вступ до C)",
    fa: "تمرین (مقدمه C)", ja: "演習（C 入門）", ko: "연습 (C 입문)", vi: "Bài tập (nhập môn C)",
    hi: "अभ्यास (C परिचय)", ur: "مشق (C کا تعارف)", nl: "Oefening (C-introductie)",
    el: "Άσκηση (εισαγωγή στη C)", cs: "Cvičení (úvod do C)", hu: "Gyakorlat (C-bevezető)",
    ro: "Exercițiu (introducere în C)", sq: "Ushtrim (hyrje në C)", sr: "Вежба (увод у C)",
    hr: "Vježba (uvod u C)", bg: "Упражнение (въведение в C)", sv: "Övning (introduktion till C)",
    fi: "Harjoitus (johdatus C:hen)", id: "Latihan (pengantar C)", th: "แบบฝึกหัด (เริ่มต้น C)",
    sw: "Zoezi (utangulizi wa C)",
  },
  uebungExploits: {
    de: "Übung (Exploits)", en: "Exercise (Exploits)", tr: "Alıştırma (Exploit'ler)",
    ar: "تمرين (Exploits)", ru: "Упражнение (эксплойты)", it: "Esercizio (exploit)",
    es: "Ejercicio (exploits)", fr: "Exercice (exploits)", zh: "练习（漏洞利用）",
    pl: "Ćwiczenie (exploity)", pt: "Exercício (exploits)", uk: "Вправа (експлойти)",
    fa: "تمرین (اکسپلویت‌ها)", ja: "演習（エクスプロイト）", ko: "연습 (익스플로잇)",
    vi: "Bài tập (khai thác)", hi: "अभ्यास (एक्सप्लॉइट)", ur: "مشق (ایکسپلائٹس)",
    nl: "Oefening (exploits)", el: "Άσκηση (exploits)", cs: "Cvičení (exploity)",
    hu: "Gyakorlat (exploitok)", ro: "Exercițiu (exploituri)", sq: "Ushtrim (exploits)",
    sr: "Вежба (експлоити)", hr: "Vježba (exploiti)", bg: "Упражнение (експлойти)",
    sv: "Övning (exploits)", fi: "Harjoitus (hyväksikäytöt)", id: "Latihan (eksploitasi)",
    th: "แบบฝึกหัด (ช่องโหว่)", sw: "Zoezi (exploits)",
  },
  uebungModi: {
    de: "Übung (Betriebsmodi & RSA)", en: "Exercise (block modes & RSA)",
    tr: "Alıştırma (çalışma modları & RSA)", ar: "تمرين (أنماط التشغيل و RSA)",
    ru: "Упражнение (режимы работы и RSA)", it: "Esercizio (modalità operative & RSA)",
    es: "Ejercicio (modos de operación & RSA)", fr: "Exercice (modes opératoires & RSA)",
    zh: "练习（工作模式与 RSA）", pl: "Ćwiczenie (tryby pracy & RSA)",
    pt: "Exercício (modos de operação & RSA)", uk: "Вправа (режими роботи та RSA)",
    fa: "تمرین (حالت‌های عملیاتی و RSA)", ja: "演習（利用モードと RSA）", ko: "연습 (운영 모드 & RSA)",
    vi: "Bài tập (chế độ hoạt động & RSA)", hi: "अभ्यास (ऑपरेशन मोड & RSA)",
    ur: "مشق (آپریشن موڈز & RSA)", nl: "Oefening (bewerkingsmodi & RSA)",
    el: "Άσκηση (τρόποι λειτουργίας & RSA)", cs: "Cvičení (provozní režimy & RSA)",
    hu: "Gyakorlat (működési módok & RSA)", ro: "Exercițiu (moduri de operare & RSA)",
    sq: "Ushtrim (mënyrat e operimit & RSA)", sr: "Вежба (режими рада и RSA)",
    hr: "Vježba (načini rada & RSA)", bg: "Упражнение (режими на работа & RSA)",
    sv: "Övning (driftlägen & RSA)", fi: "Harjoitus (toimintatilat & RSA)",
    id: "Latihan (mode operasi & RSA)", th: "แบบฝึกหัด (โหมดการทำงาน & RSA)",
    sw: "Zoezi (modi za uendeshaji & RSA)",
  },
  uebungWdh: {
    de: "Übung (Wiederholung)", en: "Exercise (recap)", tr: "Alıştırma (tekrar)",
    ar: "تمرين (مراجعة)", ru: "Упражнение (повторение)", it: "Esercizio (ripasso)",
    es: "Ejercicio (repaso)", fr: "Exercice (révision)", zh: "练习（复习）",
    pl: "Ćwiczenie (powtórka)", pt: "Exercício (revisão)", uk: "Вправа (повторення)",
    fa: "تمرین (مرور)", ja: "演習（復習）", ko: "연습 (복습)", vi: "Bài tập (ôn tập)",
    hi: "अभ्यास (पुनरावृत्ति)", ur: "مشق (اعادہ)", nl: "Oefening (herhaling)",
    el: "Άσκηση (επανάληψη)", cs: "Cvičení (opakování)", hu: "Gyakorlat (ismétlés)",
    ro: "Exercițiu (recapitulare)", sq: "Ushtrim (përsëritje)", sr: "Вежба (понављање)",
    hr: "Vježba (ponavljanje)", bg: "Упражнение (повторение)", sv: "Övning (repetition)",
    fi: "Harjoitus (kertaus)", id: "Latihan (ulasan)", th: "แบบฝึกหัด (ทบทวน)",
    sw: "Zoezi (marudio)",
  },
  aufgaben: LBL.aufgaben,
  loesung: LBL.loesung,
  zusatzhilfe: LBL.zusatzhilfe,
  mitschrift: LBL.mitschrift,
  loesungMultics: LBL.loesungMultics,
};

/**
 * Cybersicherheit SoSe 2025 — Davi, Universität Duisburg-Essen.
 *
 * Lesson↔Übung pairing was verified against the actual MD content of each
 * Übungsblatt (not by filename or number alone). Titles below reflect the
 * lecture content, not the cover-slide titles that pdf-to-md extracted.
 *
 * The Übungsblatt number is NOT the lesson number: lecture 1 (11.04.) is pure
 * course-organisation + motivation and teaches no cipher, so it carries no
 * Übung. The first sheet (Übungsblatt 1, klassische Kryptografie) tests the
 * Caesar/Vigenère + modulare Arithmetik introduced in lecture 2 (25.04.).
 * Hence Übungsblätter 1–3 sit on lectures 2–4. Lecture 4 (AES, schliesst die
 * symmetrische Kryptografie ab) carries two sheets: Ü3 (Betriebsmodi/AES/RSA)
 * and the symmetric-crypto recap Ü4 (Grundlagen + AES-Brute-Force + Stromchiffre,
 * kein RSA). From lecture 5 on the numbers line up again (Ü5→L5 … Ü13→L12).
 * Lecture 13 is a pure Klausur-recap and likewise carries no Übung.
 */
export const cybersicherheit2025: Notebook = {
  subject: "cybersicherheit",
  year: 2025,
  term: "SoSe 2025",
  exams: [],
  lessons: [
    {
      number: 1,
      title: {
        de: "Kursorganisation & Einführung in die IT-Sicherheit",
        en: "Course organisation & introduction to IT security",
        tr: "Ders organizasyonu & BT güvenliğine giriş",
        ar: "تنظيم المقرر ومقدمة في أمن المعلومات",
        ru: "Организация курса и введение в ИБ",
        it: "Organizzazione del corso e introduzione alla sicurezza informatica",
        es: "Organización del curso e introducción a la seguridad informática",
        fr: "Organisation du cours & introduction à la sécurité informatique",
        zh: "课程组织与信息安全导论",
        pl: "Organizacja kursu i wprowadzenie do bezpieczeństwa IT",
        pt: "Organização do curso e introdução à segurança da informação",
        uk: "Організація курсу та вступ до інформаційної безпеки",
        fa: "سازماندهی درس و مقدمه‌ای بر امنیت فناوری اطلاعات",
        ja: "コース運営とITセキュリティ入門",
        ko: "강의 운영 및 IT 보안 입문",
        vi: "Tổ chức khóa học & nhập môn an toàn thông tin",
        hi: "कोर्स संगठन और आईटी सुरक्षा का परिचय",
        ur: "کورس کی تنظیم اور آئی ٹی سیکیورٹی کا تعارف",
        nl: "Cursusorganisatie & inleiding tot IT-beveiliging",
        el: "Οργάνωση μαθήματος & εισαγωγή στην ασφάλεια πληροφορικής",
        cs: "Organizace kurzu a úvod do bezpečnosti IT",
        hu: "Kurzusszervezés és bevezetés az IT-biztonságba",
        ro: "Organizarea cursului și introducere în securitatea IT",
        sq: "Organizimi i kursit & hyrje në sigurinë e IT-së",
        sr: "Организација курса и увод у ИТ безбедност",
        hr: "Organizacija kolegija i uvod u IT sigurnost",
        bg: "Организация на курса и въведение в ИТ сигурността",
        sv: "Kursupplägg & introduktion till IT-säkerhet",
        fi: "Kurssin järjestelyt & johdatus IT-turvallisuuteen",
        id: "Organisasi kuliah & pengantar keamanan TI",
        th: "การจัดการรายวิชาและบทนำสู่ความมั่นคงปลอดภัยไอที",
        sw: "Mpangilio wa kozi & utangulizi wa usalama wa TEHAMA",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/01.pdf` },
        walkthroughId: "cs-2025-l01",
        quizBankId: "cs-2025-l1",
      },
      // Kein echtes Cyber-Übungsblatt (L1 ist Orga + Motivation), aber die
      // Grundlagenübung „Modulo & Binärrechnung" (die in den Folien als
      // freiwillige Wiederholung Modulo-Rechnung am 23.04. angekündigte
      // Mathe-Auffrischung) gehört genau hierher — reine Rechen-Vorbereitung,
      // noch keine Kryptografie. Die Datei liegt im Blatt-1-Bündel.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/01/zusatzhilfe.pdf` }],
          walkthroughId: "cs-2025-u-prep",
          solutions: [],
        },
      ],
    },
    {
      number: 2,
      title: {
        de: "Einführung in die Kryptografie", en: "Introduction to cryptography",
        tr: "Kriptografiye giriş", ar: "مقدمة في التشفير", ru: "Введение в криптографию",
        it: "Introduzione alla crittografia", es: "Introducción a la criptografía",
        fr: "Introduction à la cryptographie", zh: "密码学导论", pl: "Wprowadzenie do kryptografii",
        pt: "Introdução à criptografia", uk: "Вступ до криптографії", fa: "مقدمه‌ای بر رمزنگاری",
        ja: "暗号学入門", ko: "암호학 입문", vi: "Nhập môn mật mã học",
        hi: "क्रिप्टोग्राफ़ी का परिचय", ur: "کرپٹوگرافی کا تعارف", nl: "Inleiding tot de cryptografie",
        el: "Εισαγωγή στην κρυπτογραφία", cs: "Úvod do kryptografie", hu: "Bevezetés a kriptográfiába",
        ro: "Introducere în criptografie", sq: "Hyrje në kriptografi", sr: "Увод у криптографију",
        hr: "Uvod u kriptografiju", bg: "Въведение в криптографията", sv: "Introduktion till kryptografi",
        fi: "Johdatus kryptografiaan", id: "Pengantar kriptografi", th: "บทนำสู่วิทยาการรหัสลับ",
        sw: "Utangulizi wa kriptografia",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/02.pdf` },
        walkthroughId: "cs-2025-l02",
        quizBankId: "cs-2025-l2",
      },
      // Übungsblatt 1 — klassische Kryptografie (Caesar, Transposition, Vigenère).
      // Die Zusatzhilfe (Modulo & Binär) ist KEINE Lösung dieses Blatts, sondern
      // eigenständige Rechen-Vorbereitung — sie hängt an Lecture 1.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/01/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u01",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` },
          ],
        },
      ],
    },
    {
      number: 3,
      title: {
        de: "Symmetrische Kryptografie: Stromchiffren & DES",
        en: "Symmetric cryptography: stream ciphers & DES",
        tr: "Simetrik kriptografi: akış şifreleri & DES", ar: "التشفير المتماثل: تشفير التدفق و DES",
        ru: "Симметричная криптография: потоковые шифры и DES", it: "Crittografia simmetrica: cifrari a flusso & DES",
        es: "Criptografía simétrica: cifrados de flujo & DES", fr: "Cryptographie symétrique : chiffrements par flot & DES",
        zh: "对称密码学：流密码与 DES", pl: "Kryptografia symetryczna: szyfry strumieniowe & DES",
        pt: "Criptografia simétrica: cifras de fluxo & DES", uk: "Симетрична криптографія: потокові шифри та DES",
        fa: "رمزنگاری متقارن: رمزهای جریانی و DES", ja: "対称暗号：ストリーム暗号と DES", ko: "대칭 암호: 스트림 암호 & DES",
        vi: "Mật mã đối xứng: mã dòng & DES", hi: "सममित क्रिप्टोग्राफ़ी: स्ट्रीम सिफर & DES",
        ur: "متناظر کرپٹوگرافی: اسٹریم سائفر & DES", nl: "Symmetrische cryptografie: stroomcijfers & DES",
        el: "Συμμετρική κρυπτογραφία: κρυπτογράφηση ροής & DES", cs: "Symetrická kryptografie: proudové šifry & DES",
        hu: "Szimmetrikus kriptográfia: folyamtitkosítók & DES", ro: "Criptografie simetrică: cifruri de flux & DES",
        sq: "Kriptografia simetrike: shifrat rrjedhëse & DES", sr: "Симетрична криптографија: проточне шифре и DES",
        hr: "Simetrična kriptografija: protočne šifre & DES", bg: "Симетрична криптография: поточни шифри & DES",
        sv: "Symmetrisk kryptografi: strömchiffer & DES", fi: "Symmetrinen kryptografia: jonosalaajat & DES",
        id: "Kriptografi simetris: sandi aliran & DES", th: "การเข้ารหัสแบบสมมาตร: สตรีมไซเฟอร์ & DES",
        sw: "Kriptografia linganifu: misimbo ya mtiririko & DES",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/03.pdf` },
        walkthroughId: "cs-2025-l03",
        quizBankId: "cs-2025-l3",
      },
      // Übungsblatt 2 — Vernam/Stromchiffre, DES, S-Boxen, Feistelnetzwerk.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/02/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u02",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/02/loesung-mitschrift.pdf` },
          ],
        },
      ],
    },
    {
      number: 4,
      title: {
        de: "AES & asymmetrische Kryptografie: RSA-Schlüsselerzeugung",
        en: "AES & asymmetric cryptography: RSA key generation",
        tr: "AES & asimetrik kriptografi: RSA anahtar üretimi", ar: "AES والتشفير غير المتماثل: توليد مفاتيح RSA",
        ru: "AES и асимметричная криптография: генерация ключей RSA", it: "AES & crittografia asimmetrica: generazione delle chiavi RSA",
        es: "AES & criptografía asimétrica: generación de claves RSA", fr: "AES & cryptographie asymétrique : génération de clés RSA",
        zh: "AES 与非对称密码学：RSA 密钥生成", pl: "AES & kryptografia asymetryczna: generowanie kluczy RSA",
        pt: "AES & criptografia assimétrica: geração de chaves RSA", uk: "AES та асиметрична криптографія: генерація ключів RSA",
        fa: "AES و رمزنگاری نامتقارن: تولید کلید RSA", ja: "AES と非対称暗号：RSA 鍵生成", ko: "AES & 비대칭 암호: RSA 키 생성",
        vi: "AES & mật mã bất đối xứng: tạo khóa RSA", hi: "AES & असममित क्रिप्टोग्राफ़ी: RSA कुंजी जनन",
        ur: "AES & غیر متناظر کرپٹوگرافی: RSA کلید جنریشن", nl: "AES & asymmetrische cryptografie: RSA-sleutelgeneratie",
        el: "AES & ασύμμετρη κρυπτογραφία: δημιουργία κλειδιών RSA", cs: "AES & asymetrická kryptografie: generování klíčů RSA",
        hu: "AES & aszimmetrikus kriptográfia: RSA-kulcsgenerálás", ro: "AES & criptografie asimetrică: generarea cheilor RSA",
        sq: "AES & kriptografia asimetrike: gjenerimi i çelësave RSA", sr: "AES и асиметрична криптографија: генерисање RSA кључева",
        hr: "AES & asimetrična kriptografija: generiranje RSA ključeva", bg: "AES & асиметрична криптография: генериране на RSA ключове",
        sv: "AES & asymmetrisk kryptografi: RSA-nyckelgenerering", fi: "AES & epäsymmetrinen kryptografia: RSA-avainten luonti",
        id: "AES & kriptografi asimetris: pembuatan kunci RSA", th: "AES และการเข้ารหัสแบบอสมมาตร: การสร้างกุญแจ RSA",
        sw: "AES & kriptografia isiyo linganifu: uzalishaji wa funguo za RSA",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` },
        walkthroughId: "cs-2025-l04",
        quizBankId: "cs-2025-l4",
      },
      // Lecture 4 schliesst die symmetrische Kryptografie ab und trägt zwei
      // Blätter: Ü3 (Betriebsmodi/AES/RSA) und die Wiederholung Ü4
      // (Grundlagen + AES-Brute-Force + Stromchiffre, noch ohne RSA-Tiefe).
      exercises: [
        {
          label: L.uebungModi,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/03/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u03",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/03/loesung-mitschrift.pdf` },
          ],
        },
        {
          label: L.uebungWdh,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/04/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u04",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/04/loesung.pdf` }],
        },
      ],
    },
    {
      number: 5,
      title: {
        de: "RSA-Verschlüsselung, digitale Signaturen & Hash-Einführung",
        en: "RSA encryption, digital signatures & hash intro",
        tr: "RSA şifreleme, dijital imzalar & hash'e giriş", ar: "تشفير RSA، التواقيع الرقمية ومقدمة في التجزئة",
        ru: "Шифрование RSA, цифровые подписи и введение в хеши", it: "Crittografia RSA, firme digitali & introduzione agli hash",
        es: "Cifrado RSA, firmas digitales & introducción a los hash", fr: "Chiffrement RSA, signatures numériques & introduction au hachage",
        zh: "RSA 加密、数字签名与哈希导论", pl: "Szyfrowanie RSA, podpisy cyfrowe & wprowadzenie do skrótów",
        pt: "Cifragem RSA, assinaturas digitais & introdução aos hashes", uk: "Шифрування RSA, цифрові підписи та вступ до хешів",
        fa: "رمزگذاری RSA، امضای دیجیتال و مقدمه درهم‌سازی", ja: "RSA 暗号化、デジタル署名とハッシュ入門",
        ko: "RSA 암호화, 전자 서명 & 해시 입문", vi: "Mã hóa RSA, chữ ký số & nhập môn hàm băm",
        hi: "RSA एन्क्रिप्शन, डिजिटल हस्ताक्षर & हैश परिचय", ur: "RSA خفیہ کاری، ڈیجیٹل دستخط & ہیش کا تعارف",
        nl: "RSA-versleuteling, digitale handtekeningen & hash-introductie", el: "Κρυπτογράφηση RSA, ψηφιακές υπογραφές & εισαγωγή στον κατακερματισμό",
        cs: "Šifrování RSA, digitální podpisy & úvod do hašování", hu: "RSA-titkosítás, digitális aláírások & hash-bevezető",
        ro: "Criptare RSA, semnături digitale & introducere în hash", sq: "Enkriptimi RSA, nënshkrimet dixhitale & hyrje në hash",
        sr: "RSA шифровање, дигитални потписи и увод у хеш", hr: "RSA enkripcija, digitalni potpisi & uvod u hash",
        bg: "RSA криптиране, цифрови подписи & въведение в хешове", sv: "RSA-kryptering, digitala signaturer & hash-introduktion",
        fi: "RSA-salaus, digitaaliset allekirjoitukset & johdatus tiivisteisiin", id: "Enkripsi RSA, tanda tangan digital & pengantar hash",
        th: "การเข้ารหัส RSA, ลายเซ็นดิจิทัล & บทนำแฮช", sw: "Usimbaji RSA, saini za kidijitali & utangulizi wa hashi",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` },
        walkthroughId: "cs-2025-l05",
        quizBankId: "cs-2025-l5",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/05/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u05",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/05/loesung.pdf` }],
        },
      ],
    },
    {
      number: 6,
      title: {
        de: "Digitale Signaturen, Hash-Funktionen & MAC",
        en: "Digital signatures, hash functions & MAC",
        tr: "Dijital imzalar, hash fonksiyonları & MAC", ar: "التواقيع الرقمية ودوال التجزئة و MAC",
        ru: "Цифровые подписи, хеш-функции и MAC", it: "Firme digitali, funzioni hash & MAC",
        es: "Firmas digitales, funciones hash & MAC", fr: "Signatures numériques, fonctions de hachage & MAC",
        zh: "数字签名、哈希函数与 MAC", pl: "Podpisy cyfrowe, funkcje skrótu & MAC",
        pt: "Assinaturas digitais, funções hash & MAC", uk: "Цифрові підписи, хеш-функції та MAC",
        fa: "امضای دیجیتال، توابع درهم‌سازی و MAC", ja: "デジタル署名、ハッシュ関数と MAC",
        ko: "전자 서명, 해시 함수 & MAC", vi: "Chữ ký số, hàm băm & MAC",
        hi: "डिजिटल हस्ताक्षर, हैश फलन & MAC", ur: "ڈیجیٹل دستخط، ہیش فنکشنز & MAC",
        nl: "Digitale handtekeningen, hashfuncties & MAC", el: "Ψηφιακές υπογραφές, συναρτήσεις κατακερματισμού & MAC",
        cs: "Digitální podpisy, hašovací funkce & MAC", hu: "Digitális aláírások, hash-függvények & MAC",
        ro: "Semnături digitale, funcții hash & MAC", sq: "Nënshkrimet dixhitale, funksionet hash & MAC",
        sr: "Дигитални потписи, хеш функције и MAC", hr: "Digitalni potpisi, hash funkcije & MAC",
        bg: "Цифрови подписи, хеш функции & MAC", sv: "Digitala signaturer, hashfunktioner & MAC",
        fi: "Digitaaliset allekirjoitukset, tiivistefunktiot & MAC", id: "Tanda tangan digital, fungsi hash & MAC",
        th: "ลายเซ็นดิจิทัล ฟังก์ชันแฮช & MAC", sw: "Saini za kidijitali, vitendakazi vya hashi & MAC",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/06.pdf` },
        walkthroughId: "cs-2025-l06",
        quizBankId: "cs-2025-l6",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/06/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u06",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/06/loesung.pdf` }],
        },
      ],
    },
    {
      number: 7,
      title: {
        de: "Bitcoin & Hashing-Anwendungen", en: "Bitcoin & hashing use cases",
        tr: "Bitcoin & hash uygulamaları", ar: "بيتكوين وتطبيقات التجزئة", ru: "Bitcoin и применения хеширования",
        it: "Bitcoin & applicazioni dell'hashing", es: "Bitcoin & aplicaciones del hashing",
        fr: "Bitcoin & applications du hachage", zh: "比特币与哈希应用", pl: "Bitcoin & zastosowania haszowania",
        pt: "Bitcoin & aplicações de hashing", uk: "Bitcoin та застосування хешування", fa: "بیت‌کوین و کاربردهای درهم‌سازی",
        ja: "ビットコインとハッシュの応用", ko: "비트코인 & 해싱 활용", vi: "Bitcoin & ứng dụng băm",
        hi: "बिटकॉइन & हैशिंग अनुप्रयोग", ur: "بٹ کوائن & ہیشنگ کے استعمال", nl: "Bitcoin & hashingtoepassingen",
        el: "Bitcoin & εφαρμογές κατακερματισμού", cs: "Bitcoin & aplikace hašování", hu: "Bitcoin & hash-alkalmazások",
        ro: "Bitcoin & aplicații ale hashing-ului", sq: "Bitcoin & zbatimet e hashimit", sr: "Bitcoin и примене хеширања",
        hr: "Bitcoin & primjene hashiranja", bg: "Bitcoin & приложения на хеширането", sv: "Bitcoin & hashningstillämpningar",
        fi: "Bitcoin & tiivisteiden sovellukset", id: "Bitcoin & penerapan hashing", th: "บิตคอยน์ & การประยุกต์แฮช",
        sw: "Bitcoin & matumizi ya hashi",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/07.pdf` },
        walkthroughId: "cs-2025-l07",
        quizBankId: "cs-2025-l7",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/07/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u07",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/07/loesung.pdf` }],
        },
      ],
    },
    {
      number: 8,
      title: {
        de: "Sicherheitsprotokolle & Schlüsselvereinbarung",
        en: "Security protocols & key agreement",
        tr: "Güvenlik protokolleri & anahtar anlaşması", ar: "بروتوكولات الأمان والاتفاق على المفاتيح",
        ru: "Протоколы безопасности и согласование ключей", it: "Protocolli di sicurezza & accordo sulle chiavi",
        es: "Protocolos de seguridad & acuerdo de claves", fr: "Protocoles de sécurité & accord de clés",
        zh: "安全协议与密钥协商", pl: "Protokoły bezpieczeństwa & uzgadnianie kluczy",
        pt: "Protocolos de segurança & acordo de chaves", uk: "Протоколи безпеки та узгодження ключів",
        fa: "پروتکل‌های امنیتی و توافق کلید", ja: "セキュリティプロトコルと鍵共有", ko: "보안 프로토콜 & 키 합의",
        vi: "Giao thức bảo mật & thỏa thuận khóa", hi: "सुरक्षा प्रोटोकॉल & कुंजी समझौता",
        ur: "سیکیورٹی پروٹوکولز & کلید معاہدہ", nl: "Beveiligingsprotocollen & sleutelovereenkomst",
        el: "Πρωτόκολλα ασφαλείας & συμφωνία κλειδιού", cs: "Bezpečnostní protokoly & dohoda o klíči",
        hu: "Biztonsági protokollok & kulcsmegegyezés", ro: "Protocoale de securitate & acord de chei",
        sq: "Protokollet e sigurisë & marrëveshja e çelësave", sr: "Безбедносни протоколи и договор о кључу",
        hr: "Sigurnosni protokoli & dogovor o ključu", bg: "Протоколи за сигурност & споразумение за ключове",
        sv: "Säkerhetsprotokoll & nyckelöverenskommelse", fi: "Tietoturvaprotokollat & avaintenvaihto",
        id: "Protokol keamanan & kesepakatan kunci", th: "โพรโทคอลความปลอดภัย & การตกลงกุญแจ",
        sw: "Itifaki za usalama & makubaliano ya funguo",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/08.pdf` },
        walkthroughId: "cs-2025-l08",
        quizBankId: "cs-2025-l8",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/08/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u08",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/08/loesung.pdf` }],
        },
      ],
    },
    {
      number: 9,
      title: {
        de: "DoS, Input Validation & Web-Sicherheit",
        en: "DoS, input validation & web security",
        tr: "DoS, girdi doğrulama & web güvenliği", ar: "DoS، التحقق من المدخلات وأمن الويب",
        ru: "DoS, проверка ввода и веб-безопасность", it: "DoS, validazione dell'input & sicurezza web",
        es: "DoS, validación de entradas & seguridad web", fr: "DoS, validation des entrées & sécurité web",
        zh: "DoS、输入验证与 Web 安全", pl: "DoS, walidacja danych & bezpieczeństwo webowe",
        pt: "DoS, validação de entrada & segurança web", uk: "DoS, перевірка введення та веб-безпека",
        fa: "DoS، اعتبارسنجی ورودی و امنیت وب", ja: "DoS、入力検証とWebセキュリティ", ko: "DoS, 입력 검증 & 웹 보안",
        vi: "DoS, kiểm tra đầu vào & bảo mật web", hi: "DoS, इनपुट सत्यापन & वेब सुरक्षा",
        ur: "DoS، ان پٹ ویلیڈیشن & ویب سیکیورٹی", nl: "DoS, invoervalidatie & webbeveiliging",
        el: "DoS, επικύρωση εισόδου & ασφάλεια web", cs: "DoS, validace vstupů & bezpečnost webu",
        hu: "DoS, bemenetellenőrzés & webbiztonság", ro: "DoS, validarea intrărilor & securitate web",
        sq: "DoS, validimi i hyrjes & siguria e web-it", sr: "DoS, валидација уноса и веб безбедност",
        hr: "DoS, validacija unosa & web sigurnost", bg: "DoS, валидиране на вход & уеб сигурност",
        sv: "DoS, indatavalidering & webbsäkerhet", fi: "DoS, syötteen validointi & verkkoturvallisuus",
        id: "DoS, validasi input & keamanan web", th: "DoS, การตรวจสอบอินพุต & ความปลอดภัยเว็บ",
        sw: "DoS, uthibitishaji wa ingizo & usalama wa wavuti",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/09.pdf` },
        walkthroughId: "cs-2025-l09",
        quizBankId: "cs-2025-l9",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/09/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u09",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/09/loesung.pdf` }],
        },
      ],
    },
    {
      // Lecture 10 spans two weeks; two matching Übungsblätter:
      //   Ü10 — C-Einführung (no official Lösung)
      //   Ü11 — Software-Exploits (with Lösung)
      number: 10,
      title: {
        de: "Software-Exploits", en: "Software exploits", tr: "Yazılım açıkları", ar: "ثغرات البرمجيات",
        ru: "Программные эксплойты", it: "Exploit software", es: "Exploits de software", fr: "Exploits logiciels",
        zh: "软件漏洞利用", pl: "Exploity oprogramowania", pt: "Exploits de software", uk: "Програмні експлойти",
        fa: "اکسپلویت‌های نرم‌افزاری", ja: "ソフトウェアの脆弱性攻撃", ko: "소프트웨어 익스플로잇", vi: "Khai thác phần mềm",
        hi: "सॉफ़्टवेयर एक्सप्लॉइट", ur: "سافٹ ویئر ایکسپلائٹس", nl: "Software-exploits", el: "Exploits λογισμικού",
        cs: "Softwarové exploity", hu: "Szoftveres exploitok", ro: "Exploituri software", sq: "Exploite softueri",
        sr: "Софтверски експлоити", hr: "Softverski exploiti", bg: "Софтуерни експлойти", sv: "Programvaruexploits",
        fi: "Ohjelmistohyväksikäytöt", id: "Eksploitasi perangkat lunak", th: "การเจาะช่องโหว่ซอฟต์แวร์",
        sw: "Exploit za programu",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/10.pdf` },
        walkthroughId: "cs-2025-l10",
        quizBankId: "cs-2025-l10",
      },
      exercises: [
        {
          label: L.uebungCIntro,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/10/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u10",
          solutions: [],
        },
        {
          label: L.uebungExploits,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/11/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u11",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/11/loesung.pdf` }],
        },
      ],
    },
    {
      number: 11,
      title: {
        de: "Betriebssystemsicherheit: Multics & TEE",
        en: "OS security: Multics & TEE",
        tr: "İşletim sistemi güvenliği: Multics & TEE", ar: "أمن أنظمة التشغيل: Multics و TEE",
        ru: "Безопасность ОС: Multics и TEE", it: "Sicurezza dei sistemi operativi: Multics & TEE",
        es: "Seguridad de sistemas operativos: Multics & TEE", fr: "Sécurité des systèmes d'exploitation : Multics & TEE",
        zh: "操作系统安全：Multics 与 TEE", pl: "Bezpieczeństwo systemów operacyjnych: Multics & TEE",
        pt: "Segurança de sistemas operacionais: Multics & TEE", uk: "Безпека ОС: Multics та TEE",
        fa: "امنیت سیستم‌عامل: Multics و TEE", ja: "OS セキュリティ：Multics と TEE", ko: "운영체제 보안: Multics & TEE",
        vi: "Bảo mật hệ điều hành: Multics & TEE", hi: "ऑपरेटिंग सिस्टम सुरक्षा: Multics & TEE",
        ur: "آپریٹنگ سسٹم سیکیورٹی: Multics & TEE", nl: "Besturingssysteembeveiliging: Multics & TEE",
        el: "Ασφάλεια λειτουργικών συστημάτων: Multics & TEE", cs: "Bezpečnost operačních systémů: Multics & TEE",
        hu: "Operációs rendszer biztonsága: Multics & TEE", ro: "Securitatea sistemelor de operare: Multics & TEE",
        sq: "Siguria e sistemit operativ: Multics & TEE", sr: "Безбедност оперативних система: Multics и TEE",
        hr: "Sigurnost operacijskih sustava: Multics & TEE", bg: "Сигурност на операционни системи: Multics & TEE",
        sv: "Operativsystemssäkerhet: Multics & TEE", fi: "Käyttöjärjestelmän turvallisuus: Multics & TEE",
        id: "Keamanan sistem operasi: Multics & TEE", th: "ความปลอดภัยของระบบปฏิบัติการ: Multics & TEE",
        sw: "Usalama wa mfumo wa uendeshaji: Multics & TEE",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/11.pdf` },
        walkthroughId: "cs-2025-l11",
        quizBankId: "cs-2025-l11",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/12/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u12",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/12/loesung.pdf` },
            { label: L.loesungMultics, src: `${BASE}/uebungen/12/loesung-multics.pdf` },
          ],
        },
      ],
    },
    {
      number: 12,
      title: {
        de: "Reverse Engineering & Malware", en: "Reverse engineering & malware",
        tr: "Tersine mühendislik & kötü amaçlı yazılım", ar: "الهندسة العكسية والبرمجيات الخبيثة",
        ru: "Обратная разработка и вредоносное ПО", it: "Reverse engineering & malware",
        es: "Ingeniería inversa & malware", fr: "Rétro-ingénierie & malware", zh: "逆向工程与恶意软件",
        pl: "Inżynieria wsteczna & malware", pt: "Engenharia reversa & malware", uk: "Зворотна розробка та шкідливе ПЗ",
        fa: "مهندسی معکوس و بدافزار", ja: "リバースエンジニアリングとマルウェア", ko: "리버스 엔지니어링 & 악성코드",
        vi: "Dịch ngược & phần mềm độc hại", hi: "रिवर्स इंजीनियरिंग & मैलवेयर", ur: "ریورس انجینئرنگ & مالویئر",
        nl: "Reverse engineering & malware", el: "Αντίστροφη μηχανική & κακόβουλο λογισμικό",
        cs: "Reverzní inženýrství & malware", hu: "Visszafejtés & malware", ro: "Inginerie inversă & malware",
        sq: "Inxhinieri e kundërt & malware", sr: "Реверзни инжењеринг и малвер", hr: "Obrnuti inženjering & malware",
        bg: "Обратно инженерство & злонамерен софтуер", sv: "Reverse engineering & skadlig kod",
        fi: "Takaisinmallinnus & haittaohjelmat", id: "Rekayasa balik & malware",
        th: "วิศวกรรมย้อนกลับ & มัลแวร์", sw: "Uhandisi rejeshi & programu hasidi",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/12.pdf` },
        walkthroughId: "cs-2025-l12",
        quizBankId: "cs-2025-l12",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/13/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u13",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/13/loesung.pdf` }],
        },
      ],
    },
    {
      // Pure recap / exam-prep lecture — no Übung.
      number: 13,
      title: {
        de: "Zusammenfassung & Klausurvorbereitung",
        en: "Summary & exam preparation",
        tr: "Özet & sınav hazırlığı", ar: "ملخص وتحضير للامتحان", ru: "Итоги и подготовка к экзамену",
        it: "Riepilogo & preparazione all'esame", es: "Resumen & preparación del examen",
        fr: "Résumé & préparation à l'examen", zh: "总结与考试准备", pl: "Podsumowanie & przygotowanie do egzaminu",
        pt: "Resumo & preparação para o exame", uk: "Підсумок та підготовка до іспиту", fa: "جمع‌بندی و آمادگی آزمون",
        ja: "まとめと試験対策", ko: "요약 & 시험 준비", vi: "Tổng kết & ôn thi",
        hi: "सारांश & परीक्षा तैयारी", ur: "خلاصہ & امتحان کی تیاری", nl: "Samenvatting & tentamenvoorbereiding",
        el: "Σύνοψη & προετοιμασία εξετάσεων", cs: "Shrnutí & příprava na zkoušku", hu: "Összefoglalás & vizsgafelkészülés",
        ro: "Recapitulare & pregătire pentru examen", sq: "Përmbledhje & përgatitje për provim",
        sr: "Резиме и припрема за испит", hr: "Sažetak & priprema za ispit", bg: "Обобщение & подготовка за изпит",
        sv: "Sammanfattning & tentaförberedelse", fi: "Yhteenveto & tenttiin valmistautuminen",
        id: "Ringkasan & persiapan ujian", th: "สรุป & เตรียมสอบ", sw: "Muhtasari & maandalizi ya mtihani",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/13.pdf` },
        walkthroughId: "cs-2025-l13",
        quizBankId: "cs-2025-l13",
      },
      // Reine Zusammenfassung / Klausurvorbereitung — kein Übungsblatt.
      exercises: [],
    },
  ],
};
