import type { Notebook } from "../types";
import type { LocalizedText } from "@/lib/i18n/types";
import { LBL } from "../labels-i18n";

const BASE = "/content/cybersicherheit/2026";

/** „Übung (…)" with the leading word localized and the technical suffix kept. */
function uebungWith(suffix: string): LocalizedText {
  const base = LBL.uebung as Record<string, string>;
  const out: Record<string, string> = {};
  for (const k of Object.keys(base)) out[k] = `${base[k]} (${suffix})`;
  return out;
}

const L = {
  vorlesung: LBL.vorlesung,
  uebung: LBL.uebung,
  uebungVernam: uebungWith("Vernam & DES-S-Boxen"),
  uebungDesRunde: uebungWith("DES-Runde & Avalanche"),
  aufgabenDe: LBL.aufgabenDe,
  aufgabenEn: LBL.aufgabenEn,
  loesung: LBL.loesung,
};

/**
 * Cybersicherheit SoSe 2026 — Davi, Universität Duisburg-Essen.
 *
 * Lesson↔Übung pairing was verified against the actual MD content of each sheet
 * (not by filename alone). The Übungsblatt number is NOT the lesson number:
 * lecture 1 (course-intro) is pure course-organisation + IT-security motivation
 * and teaches no cipher, so it carries no Übung. The classical-crypto sheet
 * (Übung 1) therefore tests lecture 2 (crypto-intro). Lecture 3 (DES) carries
 * TWO sheets: Übung 2 (Vernam/OTP + DES S-boxes) and Übung 2.2 (a full DES round,
 * avalanche, decryption). Übung 3 (Betriebsmodi + AES brute-force) sits on lecture
 * 4 (AES & Betriebsmodi), and Übung 4 (RSA + AES↔RSA comparison) on lecture 5 (RSA).
 * Lecture 6 (signatures/hash/MAC) has no Übung yet.
 *
 * Each Aufgaben sheet exists in German AND English — both are listed in the
 * exercise's `aufgaben` array so the reader can pick either language.
 */
export const cybersicherheit2026: Notebook = {
  subject: "cybersicherheit",
  year: 2026,
  term: "SoSe 2026",
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
        walkthroughId: "cs-2026-l01",
        quizBankId: "cs-2026-l1",
      },
      // Reine Orga + Motivation — kein Übungsblatt.
      exercises: [],
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
        walkthroughId: "cs-2026-l02",
        quizBankId: "cs-2026-l2",
      },
      // Übungsblatt 1 — klassische Kryptografie (Caesar, Transposition, Vigenère).
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/01/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/01/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` }],
          walkthroughId: "cs-2026-u01",
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
        walkthroughId: "cs-2026-l03",
        quizBankId: "cs-2026-l3",
      },
      // Lecture 3 trägt zwei Blätter: Übung 2 (Vernam/OTP + DES-S-Boxen) und
      // Übung 2.2 (erste DES-Runde, Avalanche-Effekt, DES-Entschlüsselung).
      exercises: [
        {
          label: L.uebungVernam,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/02/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/02/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` }],
          walkthroughId: "cs-2026-u02",
        },
        {
          label: L.uebungDesRunde,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/02_2/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/02_2/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/02_2/loesung.pdf` }],
          walkthroughId: "cs-2026-u02_2",
        },
      ],
    },
    {
      number: 4,
      title: {
        de: "Symmetrische Kryptografie: AES & Betriebsmodi",
        en: "Symmetric cryptography: AES & block-cipher modes",
        tr: "Simetrik kriptografi: AES & çalışma modları", ar: "التشفير المتماثل: AES وأنماط التشغيل",
        ru: "Симметричная криптография: AES и режимы работы", it: "Crittografia simmetrica: AES & modalità operative",
        es: "Criptografía simétrica: AES & modos de operación", fr: "Cryptographie symétrique : AES & modes opératoires",
        zh: "对称密码学：AES 与工作模式", pl: "Kryptografia symetryczna: AES & tryby pracy",
        pt: "Criptografia simétrica: AES & modos de operação", uk: "Симетрична криптографія: AES та режими роботи",
        fa: "رمزنگاری متقارن: AES و حالت‌های عملیاتی", ja: "対称暗号：AES と利用モード", ko: "대칭 암호: AES & 운영 모드",
        vi: "Mật mã đối xứng: AES & chế độ hoạt động", hi: "सममित क्रिप्टोग्राफ़ी: AES & ऑपरेशन मोड",
        ur: "متناظر کرپٹوگرافی: AES & آپریشن موڈز", nl: "Symmetrische cryptografie: AES & bewerkingsmodi",
        el: "Συμμετρική κρυπτογραφία: AES & τρόποι λειτουργίας", cs: "Symetrická kryptografie: AES & provozní režimy",
        hu: "Szimmetrikus kriptográfia: AES & működési módok", ro: "Criptografie simetrică: AES & moduri de operare",
        sq: "Kriptografia simetrike: AES & mënyrat e operimit", sr: "Симетрична криптографија: AES и режими рада",
        hr: "Simetrična kriptografija: AES & načini rada", bg: "Симетрична криптография: AES & режими на работа",
        sv: "Symmetrisk kryptografi: AES & driftlägen", fi: "Symmetrinen kryptografia: AES & toimintatilat",
        id: "Kriptografi simetris: AES & mode operasi", th: "การเข้ารหัสแบบสมมาตร: AES & โหมดการทำงาน",
        sw: "Kriptografia linganifu: AES & modi za uendeshaji",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` },
        walkthroughId: "cs-2026-l04",
        quizBankId: "cs-2026-l4",
      },
      // Übungsblatt 3 — Wiederholung + AES-Brute-Force + Betriebsmodi (ECB/CBC/OFB).
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/03/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/03/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` }],
          walkthroughId: "cs-2026-u03",
        },
      ],
    },
    {
      number: 5,
      title: {
        de: "Asymmetrische Kryptografie: RSA", en: "Asymmetric cryptography: RSA",
        tr: "Asimetrik kriptografi: RSA", ar: "التشفير غير المتماثل: RSA", ru: "Асимметричная криптография: RSA",
        it: "Crittografia asimmetrica: RSA", es: "Criptografía asimétrica: RSA", fr: "Cryptographie asymétrique : RSA",
        zh: "非对称密码学：RSA", pl: "Kryptografia asymetryczna: RSA", pt: "Criptografia assimétrica: RSA",
        uk: "Асиметрична криптографія: RSA", fa: "رمزنگاری نامتقارن: RSA", ja: "非対称暗号：RSA",
        ko: "비대칭 암호: RSA", vi: "Mật mã bất đối xứng: RSA", hi: "असममित क्रिप्टोग्राफ़ी: RSA",
        ur: "غیر متناظر کرپٹوگرافی: RSA", nl: "Asymmetrische cryptografie: RSA", el: "Ασύμμετρη κρυπτογραφία: RSA",
        cs: "Asymetrická kryptografie: RSA", hu: "Aszimmetrikus kriptográfia: RSA", ro: "Criptografie asimetrică: RSA",
        sq: "Kriptografia asimetrike: RSA", sr: "Асиметрична криптографија: RSA", hr: "Asimetrična kriptografija: RSA",
        bg: "Асиметрична криптография: RSA", sv: "Asymmetrisk kryptografi: RSA", fi: "Epäsymmetrinen kryptografia: RSA",
        id: "Kriptografi asimetris: RSA", th: "การเข้ารหัสแบบอสมมาตร: RSA", sw: "Kriptografia isiyo linganifu: RSA",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` },
        walkthroughId: "cs-2026-l05",
        quizBankId: "cs-2026-l5",
      },
      // Übungsblatt 4 — RSA (Schlüsselerzeugung, Ver-/Entschlüsselung) + AES↔RSA-Vergleich.
      // Noch keine offizielle Lösung veröffentlicht.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/04/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/04/aufgaben.en.pdf` },
          ],
          solutions: [],
          walkthroughId: "cs-2026-u04",
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
        walkthroughId: "cs-2026-l06",
        quizBankId: "cs-2026-l6",
      },
      // Noch kein Übungsblatt zu diesem Kapitel.
      exercises: [],
    },
  ],
};
