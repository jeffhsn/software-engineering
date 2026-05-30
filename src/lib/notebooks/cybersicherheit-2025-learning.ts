import type { Explanation } from "./explanation-types";

/**
 * Source-grounded explanations for Cybersicherheit SoSe 2025.
 *
 * Each lecture gets ONE explanation, written from the corresponding
 * `lectures/NN.md` (the pdf-to-md script next to the PDF) — never from prior
 * knowledge. German canonical. All follow the SAME standardized skeleton
 * (see AGENTS.md → Quality bar → Explanation): a framing lead, "Das Wichtigste
 * in Kürze", lecture-specific body sections, then "Begriffe & Notation",
 * "Typische Fallen", "Klausur-Fokus" and "Mehr dazu". Goal: understand a
 * horrible slide set on first read and prep the exam fast.
 */

const lecture01: Explanation = {
  id: "cs-2025-l01",
  lesson: 1,
  title: {
    de: "Einführung in die IT-Sicherheit: Schutzziele, Denkweise und der Start in die Kryptografie", en: "Introduction to IT security: protection goals, mindset and the start of cryptography", tr: "BT güvenliğine giriş: koruma hedefleri, zihniyet ve kriptografinin başlangıcı", ar: "مقدمة لأمن تكنولوجيا المعلومات: أهداف الحماية، والعقلية، وبدء التشفير", ru: "Введение в ИТ-безопасность: цели защиты, образ мышления и начало криптографии", it: "Introduzione alla sicurezza informatica: obiettivi di protezione, mentalità e l'avvio della crittografia", es: "Introducción a la seguridad informática: objetivos de protección, mentalidad y el inicio de la criptografía", fr: "Introduction à la sécurité informatique : objectifs de protection, état d'esprit et début de la cryptographie", zh: "IT 安全简介：保护目标、心态和密码学的开始", pl: "Wprowadzenie do bezpieczeństwa IT: cele ochrony, sposób myślenia i początki kryptografii", pt: "Introdução à segurança de TI: objetivos de proteção, mentalidade e o início da criptografia", uk: "Вступ до ІТ-безпеки: цілі захисту, мислення та початок криптографії", fa: "مقدمه ای بر امنیت فناوری اطلاعات: اهداف حفاظتی، طرز فکر و شروع رمزنگاری", ja: "IT セキュリティの概要: 保護の目標、考え方、暗号化の始まり", ko: "IT 보안 소개: 보호 목표, 사고방식 및 암호화의 시작", vi: "Giới thiệu về bảo mật CNTT: mục tiêu bảo vệ, tư duy và sự khởi đầu của mật mã", hi: "आईटी सुरक्षा का परिचय: सुरक्षा लक्ष्य, मानसिकता और क्रिप्टोग्राफी की शुरुआत", ur: "آئی ٹی سیکیورٹی کا تعارف: تحفظ کے اہداف، ذہنیت اور خفیہ نگاری کا آغاز", nl: "Inleiding tot IT-beveiliging: beschermingsdoelen, mentaliteit en het begin van cryptografie", el: "Εισαγωγή στην ασφάλεια πληροφορικής: στόχοι προστασίας, νοοτροπία και έναρξη της κρυπτογραφίας", cs: "Úvod do IT bezpečnosti: cíle ochrany, způsob myšlení a začátek kryptografie", hu: "Bevezetés az IT biztonságba: védelmi célok, gondolkodásmód és a kriptográfia kezdete", ro: "Introducere în securitatea IT: obiective de protecție, mentalitate și începutul criptografiei", sq: "Hyrje në sigurinë e IT: qëllimet e mbrojtjes, mendësia dhe fillimi i kriptografisë", sr: "Увод у ИТ безбедност: циљеви заштите, начин размишљања и почетак криптографије", hr: "Uvod u IT sigurnost: ciljevi zaštite, način razmišljanja i početak kriptografije", bg: "Въведение в ИТ сигурността: цели за защита, начин на мислене и началото на криптографията", sv: "Introduktion till IT-säkerhet: skyddsmål, tankesätt och början av kryptografi", fi: "Johdatus IT-turvallisuuteen: suojaustavoitteet, ajattelutapa ja kryptografian alku", id: "Pengantar keamanan TI: tujuan perlindungan, pola pikir, dan awal mula kriptografi", th: "ข้อมูลเบื้องต้นเกี่ยวกับการรักษาความปลอดภัยด้านไอที: เป้าหมายการป้องกัน แนวคิด และจุดเริ่มต้นของการเข้ารหัส", sw: "Utangulizi wa usalama wa IT: malengo ya ulinzi, mawazo na kuanza kwa cryptography",
  },
  content: {
    de: `Stell dir vor, du baust etwas — eine App, ein Online-Banking, ein ganzes Betriebssystem — und in genau dem Moment, in dem du fertig bist, setzt sich jemand auf die andere Seite, dessen einziges Ziel es ist, dein Werk zu belauschen, zu fälschen oder lahmzulegen. Dieser unsichtbare Gegner ist der heimliche Hauptdarsteller des ganzen Semesters. Bevor wir auch nur eine Zeile verschlüsseln, müssen wir drei Fragen beantworten, die alles andere tragen: Was heißt „sicher" überhaupt? Nach welchen eisernen Regeln verliert man dieses Spiel? Und wie muss man denken, um es zu gewinnen? Erst danach greifen wir zum ersten großen Werkzeug, der Kryptografie, und verschlüsseln am Ende dieser Lektion schon unsere erste Nachricht von Hand. Wenn du diese eine Stunde wirklich verinnerlichst, liest sich der gesamte Rest des Kurses — Verschlüsselung, Hashes, Exploits, Malware — wie immer dieselbe Geschichte in neuer Verkleidung.

## Sicherheit ist ein Zweikampf, kein Werkzeugkasten

Fangen wir mit einer Unterscheidung an, die fast alles erklärt. In den meisten Ingenieursdisziplinen kämpfst du gegen die Natur: gegen die Schwerkraft, gegen Materialermüdung, gegen den Zufall. Die Natur ist hart, aber sie ist nicht boshaft. Eine Brücke, die heute hält, stürzt morgen nicht ein, weil sich die Schwerkraft über Nacht eine fiese neue Variante ausgedacht hat. Du kannst die Natur ausrechnen, und wenn deine Rechnung stimmt, hält die Brücke.

In der Cybersicherheit ist das anders, und das ist der Kern des ganzen Faches: Du kämpfst gegen einen **denkenden Gegner**. Er hält sich an keine Regeln, er benutzt dein System auf eine Weise, für die es nie gedacht war, und er tut mit Vorliebe genau das, womit niemand gerechnet hat. Sicherheit ist deshalb keine Sammlung von Tricks, die man einmal anwendet und dann abhakt, sondern ein dauerhafter Zweikampf zwischen jemandem, der etwas absichern will, und jemandem, der es brechen will. Diese Sichtweise nennt man das **Adversarial Setting** — die Annahme, dass dir immer ein aktiver, kreativer Angreifer gegenübersitzt. Halte sie von der ersten Minute an fest, denn sie ist der Boden, auf dem alles Weitere steht.

Aus diesem Zweikampf folgt sofort ein brutales Ungleichgewicht, das du nie vergessen solltest. Der Verteidiger muss **jede** Tür, jedes Fenster und jeden Lüftungsschacht schließen — und zwar auch gegen Angriffstechniken, die vielleicht erst in zehn Jahren erfunden werden. Der Angreifer dagegen muss nur **eine einzige** offene Stelle finden. Verteidigen heißt, überall gleichzeitig gewinnen zu müssen; angreifen heißt, ein einziges Mal irgendwo zu gewinnen. Diese Asymmetrie ist der tiefere Grund, warum Verteidigung so viel schwerer ist als Angriff — und warum der Satz „wir haben doch eine Firewall" nie eine ausreichende Antwort ist.

> **Merksatz:** Der Verteidiger muss überall gewinnen, der Angreifer nur einmal irgendwo. Verteidigung ist deshalb strukturell im Nachteil — nicht aus Schlamperei, sondern aus Logik.

## Was „sicher" überhaupt bedeutet: die drei Schutzziele

„Mach das mal sicher" ist ein sinnloser Auftrag, solange niemand sagt, *was* sicher heißt. Die gesamte IT-Sicherheit beantwortet diese Frage mit drei Zielen, die zusammen die **CIA-Triade** heißen. Der Name hat nichts mit dem Geheimdienst zu tun — er ist ein Akronym aus den englischen Wörtern **C**onfidentiality, **I**ntegrity und **A**vailability. Diese drei Ziele sind das Maßband, mit dem wir den ganzen Kurs über messen, ob etwas „sicher" ist. Schauen wir sie einzeln an, denn jedes steht für eine völlig andere Art von Schaden.

Das erste Ziel, **Vertraulichkeit (Confidentiality)**, ist das, woran die meisten zuerst denken: Niemand außer den Befugten soll die Daten *lesen* können. Wenn du einer Freundin eine Nachricht schickst, soll genau sie sie lesen — nicht der Mobilfunkanbieter, nicht der Betreiber des Café-WLANs, nicht der Hacker am Nebentisch. Verletzt ist dieses Ziel in dem Augenblick, in dem ein Datenleck deine Passwörter ins Netz spült oder jemand deine Chats mitliest. Das klassische Gegenmittel kennst du schon dem Namen nach: Verschlüsselung. Genau sie ist Teil 1 des Kurses.

Das zweite Ziel ist subtiler und wird im Alltag ständig unterschätzt. **Integrität (Integrity)** bedeutet, dass niemand die Daten *unbemerkt verändern* kann. Stell dir vor, du überweist 100 € — und unterwegs macht jemand heimlich 10 000 € daraus oder tauscht die Empfänger-Kontonummer aus. Hier hat niemand etwas Geheimes „gelesen", und trotzdem ist ein Riesenschaden entstanden. Genauso wichtig: Wenn dein Rechner ein Software-Update lädt, willst du sicher sein, dass es *wirklich* vom Hersteller stammt und nicht unterwegs mit Schadcode gespickt wurde. Vertraulichkeit fragt „wer darf es sehen?", Integrität fragt „ist es noch echt und unverändert?" — zwei verschiedene Fragen, die man sauber trennen muss. Für Integrität sorgen später Hash-Funktionen und digitale Signaturen.

Das dritte Ziel klingt banal, ist aber im Ernstfall oft das, worauf es wirklich ankommt. **Verfügbarkeit (Availability)** heißt, dass das System *da ist, wenn man es braucht*. Die sicherste Datenbank der Welt nützt nichts, wenn ein Angreifer den Server mit Anfragen überflutet, bis kein echter Nutzer mehr durchkommt. Denk an ein Krankenhaus-System, das im Notfall einfach laufen muss. Verfügbarkeit rettet man übrigens nicht mit Mathematik, sondern mit ganz handfesten Dingen — Redundanz, Backups, mehrere Rechenzentren, Abwehr von Überlastungsangriffen. Merke dir diesen Punkt gut, denn er ist eine beliebte Klausurfalle: Verschlüsselung schützt Vertraulichkeit und Integrität, aber gegen einen abgestürzten oder überfluteten Server hilft keine Formel der Welt.

![Die CIA-Triade: Confidentiality, Integrity, Availability](https://upload.wikimedia.org/wikipedia/commons/c/c5/CIAJMK1209-en.svg "Die drei Schutzziele der IT-Sicherheit: Vertraulichkeit, Integrität und Verfügbarkeit. Sie sind das Maßband dafür, was Sicherheit überhaupt bedeutet.")

> **Eselsbrücke:** Drei Verben in fester Reihenfolge — **lesen** (C), **ändern** (I), **nutzen** (A). Wer darf lesen? Wer könnte unbemerkt ändern? Was blockiert das Nutzen? Wenn in der Klausur steht „welches Schutzziel ist hier verletzt?", ordnest du über genau diese drei Verben blitzschnell zu.

Jetzt kommt der Gedanke, der die Triade von einer Auswendiglern-Liste zu echtem Verständnis macht: **Diese drei Ziele ziehen gegeneinander.** Treibst du die Vertraulichkeit auf die Spitze — alles verschlüsselt, dreifach weggeschlossen, jeder Zugriff zehnmal geprüft —, dann leidet zwangsläufig die Verfügbarkeit, weil selbst die Berechtigten kaum noch an ihre Daten kommen. Sperrst du umgekehrt für maximale Verfügbarkeit alles weit auf, ist es um die Vertraulichkeit geschehen. Sicherheit ist deshalb nie „mehr Schloss = besser", sondern immer ein **Abwägen** zwischen drei Polen, das zur konkreten Situation passen muss. Diese Spannung ist der rote Faden durch den ganzen Stoff: Die Kryptografie der nächsten Wochen kümmert sich um Vertraulichkeit, Hashes und Signaturen um die Integrität, und für die Verfügbarkeit brauchen wir am Ende ganz andere Werkzeuge.

## Das schwächste Glied: warum Durchschnitt nicht zählt

Es gibt zwei Faustregeln, die so oft auftauchen, dass du sie wie Naturgesetze behandeln solltest. Die erste lautet: **Ein System ist nur so stark wie sein schwächstes Glied.** Stell dir eine Kette vor. Du kannst zehn ihrer Glieder aus gehärtetem Stahl schmieden — wenn das elfte aus Pappe ist, reißt die Kette genau dort, und die ganze Mühe an den anderen zehn war umsonst. Sicherheit funktioniert exakt so. Die teuerste, mathematisch perfekte Verschlüsselung ist wertlos, sobald das Passwort „1234" heißt oder auf einem gelben Zettel am Monitor klebt.

Daraus folgt eine Denkgewohnheit, die Anfänger oft falsch machen: Sicherheit ist **kein Durchschnitt, sondern ein Minimum**. Es zählt nicht „wie gut ist mein bestes Bauteil?", sondern „wie schwach ist mein schlechtestes?". Und weil das so ist, suchen kluge Angreifer nie die starke Stelle, sondern immer die schwächste. Erschreckend oft ist diese schwächste Stelle nicht die Technik, sondern der Mensch: Eine gut gemachte Phishing-Mail muss keine einzige Formel knacken — sie fragt den Schlüssel einfach freundlich ab, und ein gestresster Mitarbeiter gibt ihn heraus. Genau deshalb wirst du im Lauf des Kurses sehen, dass die spannendsten Angriffe selten die Mathematik brechen, sondern die Annahmen drumherum.

> **Merksatz:** Sicherheit ist ein Minimum, kein Durchschnitt. Frag immer „wo ist mein Pappglied?" — und rechne damit, dass es der Mensch ist.

## Defense in Depth: niemals alles an einer Annahme aufhängen

Die zweite Faustregel ist die direkte Antwort auf die erste. Wenn jeder einzelne Schutz irgendwann versagen kann und das schwächste Glied über alles entscheidet, dann darfst du dich eben **nicht auf einen einzigen Schutz verlassen**. Diese Strategie heißt **Defense in Depth** — Verteidigung in mehreren Schichten. Wird ein Sicherheitsmechanismus umgangen, fangen die anderen den Angreifer immer noch ab.

Das beste Bild dafür ist eine mittelalterliche Burg: zuerst der Wassergraben, dahinter die Mauer, dahinter die Wachen, und ganz innen das verschlossene Verlies für den Schatz. Wer den Graben durchschwimmt, steht immer noch vor der Mauer; wer über die Mauer klettert, läuft den Wachen direkt in die Arme. Kein einzelner Durchbruch gewinnt sofort das ganze Spiel. In der IT übersetzt sich das in ineinandergeschachtelte Schichten — Firewall *und* Authentifizierung *und* Verschlüsselung *und* Überwachung —, sodass niemals alles an einer einzigen Annahme („unsere Mauer hält schon irgendwie") hängt. Das folgende Zwiebel-Modell zeigt genau diese Idee: der Wert in der Mitte, ringsum Schale für Schale.

![Defense in Depth als Zwiebel-Modell](https://upload.wikimedia.org/wikipedia/commons/4/4c/Defense_In_Depth_-_Onion_Model.svg "Defense in Depth: mehrere unabhängige Schutzschichten um das schützenswerte Gut. Fällt eine Schale, halten die anderen.")

Schwächstes Glied und Defense in Depth sind zwei Seiten derselben Münze, und sie kommen in jedem späteren Kapitel wieder — von der Frage, wie lang ein Schlüssel sein muss, bis zur Ring-Architektur eines Betriebssystems. Wann immer du später eine Sicherheitsmaßnahme siehst, frag dich: Was ist hier das schwächste Glied, und welche zweite Schicht fängt es auf, wenn es bricht?

## Das Security Mindset: gewohnheitsmäßig wie ein Angreifer denken

Wenn der Gegner denkt, musst du lernen, **wie er** zu denken. Diese Haltung heißt **Security Mindset**, und sie ist die wichtigste Gewohnheit, die du dir in diesem Kurs antrainieren sollst. Sie besteht aus einer einzigen reflexartigen Frage, die du dir bei allem stellst: „Und was passiert, wenn ich das angreife, indem ich Folgendes tue …?" Normale Entwicklerinnen und Entwickler fragen, wie etwas *funktioniert*. Sicherheitsleute fragen, wie man es zum *Versagen* bringt.

Der Sicherheitsexperte Bruce Schneier hat das einmal sehr schön beschrieben: Wer das Security Mindset verinnerlicht hat, kann keinen Laden mehr betreten, ohne automatisch zu sehen, wie man hier stehlen oder die Kasse austricksen könnte — nicht aus krimineller Energie, sondern weil das Gehirn gar nicht mehr anders kann. Trainiere dir genau diesen Reflex an: Bei jedem Mechanismus, den wir in den nächsten Wochen lernen, soll sofort der Gegen-Gedanke aufpoppen — „und wie breche ich das wieder?". Wer Lust auf das Original hat, liest [Schneiers Essay „The Security Mindset"](https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html).

## Keine perfekte Sicherheit: Vertrauen, Insider und das Threat Model

Wenn man das Security Mindset ehrlich zu Ende denkt, landet man bei einer Erkenntnis, die anfangs frustriert, dann aber befreiend wirkt: **Es gibt keine perfekte Sicherheit.** Kein System ist gegen jeden denkbaren Angriff gefeit, und — fast noch wichtiger — du musst immer *irgendjemandem* vertrauen. Du vertraust dem Hersteller deiner Hardware, du vertraust dem Betriebssystem, du vertraust den Administratoren deines Unternehmens. Aus genau diesem unvermeidbaren Vertrauen erwächst eine eigene Gefahr, die man **Insider-Angriffe** nennt: Wer Vertrauen genießt, kann es eben auch missbrauchen, und gegen den vertrauten Insider helfen viele äußere Schutzmauern nichts.

Wenn „alles absichern" also unmöglich ist, brauchst du eine ehrlichere Frage: *Wogegen genau* will ich mich schützen? Die Antwort darauf ist das **Threat Model** (Bedrohungsmodell), und es ist eines der wichtigsten Werkzeuge des ganzen Fachs — obwohl es selbst gar keine Technik ist, sondern eine Denkübung. Ein Threat Model beantwortet zwei Fragen: Welche Daten und Prozesse sind mir überhaupt wertvoll genug, sie zu schützen? Und welche Angreifer nehme ich ernst? Ein Tagebuch gegen die neugierige kleine Schwester abzusichern ist eine völlig andere Aufgabe, als dasselbe Tagebuch gegen einen Geheimdienst zu verteidigen — anderer Gegner, anderer Aufwand, andere Mittel. Ohne festgelegtes Threat Model weißt du nie, ob du genug tust oder einfach das Falsche absicherst. Erschwerend kommt hinzu, dass die Aufgabe ständig härter wird: Systeme werden immer komplexer und verändern sich kontinuierlich, und mit jeder neuen Komponente wächst die Angriffsfläche.

> **Eselsbrücke:** Ein Threat Model beantwortet zwei W-Fragen — **Was** schütze ich, und **vor wem**? Steht eine dieser beiden Antworten nicht fest, ist jede Sicherheitsmaßnahme nur geraten.

## Teil 1 des Kurses: der Einstieg in die Kryptografie

Mit dieser Brille auf der Nase steigen wir in das erste große Werkzeug ein — und gleich zu Beginn werden drei Wörter ständig verwechselt, also trennen wir sie sofort sauber. Der Oberbegriff für die ganze Wissenschaft von Geheimschriften ist die **Kryptologie**. Sie hat zwei Hälften, die sich wie Schwert und Schild gegenüberstehen. Die **Kryptografie** ist die Kunst des Bauens und Absicherns — „wie verschlüssele ich eine Nachricht so, dass nur der Richtige sie lesen kann?". Die **Kryptanalyse** ist die Kunst des Brechens — „wie knacke ich diese Verschlüsselung wieder, ohne den Schlüssel zu kennen?". Das ist das Adversarial Setting in Reinform: Bauen gegen Brechen, im ewigen Wettlauf.

Diese Aufteilung hat eine Konsequenz, die du dir gut merken solltest, weil sie die Denkweise des ganzen Faches prägt: Ein Verfahren gilt **nicht** deshalb als sicher, weil sein Erfinder das behauptet, sondern erst, wenn die besten Kryptanalytikerinnen und Kryptanalytiker der Welt jahrelang erfolglos daran gescheitert sind. Sicherheit muss man sich verdienen, indem man Angriffe überlebt — nicht, indem man sie behauptet.

Die Kryptografie selbst zerfällt in drei Familien, und es lohnt sich, sie früh auseinanderzuhalten, weil der ganze Kurs an ihnen entlang gebaut ist. Erstens die **symmetrischen Verfahren** — die klassische Form, die es seit der Antike gibt: Beide Seiten teilen sich *einen* gemeinsamen geheimen Schlüssel, mit dem ver- *und* entschlüsselt wird (später die Chiffren DES und AES). Zweitens die **asymmetrischen** oder **Public-Key-Verfahren**, bei denen jede Person ein *Schlüsselpaar* aus einem öffentlichen und einem privaten Schlüssel besitzt — der öffentliche darf in alle Welt, der private bleibt geheim (vor allem RSA). Drittens die **Protokolle**, die diese Algorithmen zu echten Anwendungen zusammensetzen; das bekannteste ist TLS, das jedes „https" in deinem Browser absichert.

![Ein asymmetrisches Schlüsselpaar: öffentlicher und privater Schlüssel](https://upload.wikimedia.org/wikipedia/commons/7/70/Public_key_encryption_keys.svg "Bei Public-Key-Verfahren besitzt jede Person ein Schlüsselpaar: einen öffentlichen Schlüssel, den jeder kennen darf, und einen privaten, der geheim bleibt.")

Die eine Jahreszahl, die hier wirklich hängenbleiben sollte, ist **1976**. Von der Antike bis dahin gab es ausschließlich symmetrische Verfahren, und die schleppten ein quälendes Henne-Ei-Problem mit sich herum: Beide Seiten müssen denselben geheimen Schlüssel kennen — aber wie tauscht man diesen Schlüssel überhaupt sicher aus, wenn der Lauscher die Leitung längst abhört? 1976 wurde die Public-Key-Kryptografie veröffentlicht und löste genau dieses Problem; ein Jahr später, 1977, kam RSA. Wie ein *öffentlicher* Schlüssel funktionieren kann, ohne dass damit jeder entschlüsseln darf, nehmen wir später in aller Ruhe auseinander; [Computerphile erklärt die Grundidee sehr anschaulich](https://www.youtube.com/watch?v=GSIDS_lvRv4).

Ein letzter, wichtiger Satz zum großen Bild, bevor wir konkret werden: **Kryptografie ist nur dann nützlich, wenn der Rest des Systems sicher ist.** Du kannst lange darüber streiten, ob AES oder DES besser ist und ob der Schlüssel 128 oder 192 Bit haben soll — wenn der Schlüssel anschließend unter der Fußmatte liegt, war die ganze Diskussion umsonst. Das ist nichts anderes als das schwächste Glied in neuer Verkleidung, und es ist der Grund, warum wir erst die Prinzipien geklärt haben und jetzt erst die Mathematik anfassen.

## Die Bühne: Alice, Bob und der Lauscher Oskar

Fast jede Krypto-Erklärung im Kurs spielt mit derselben kleinen Besetzung, also lern sie gleich kennen — sie wird dir bis zur letzten Vorlesung begegnen. **Alice** möchte **Bob** eine Nachricht schicken. Dazwischen liegt das **Internet**, ein unsicherer Kanal, auf dem **Oskar** mitlauscht (in englischen Texten heißt er oft „Eve", von *eavesdropper*, dem Lauscher). Bei der symmetrischen Verschlüsselung haben Alice und Bob vorab über einen **sicheren Kanal** einen gemeinsamen geheimen Schlüssel vereinbart. Alice nimmt nun ihren lesbaren Text, verwandelt ihn mit dem Schlüssel in unleserlichen Salat und schickt diesen los. Oskar fängt den Salat zwar ab, kann aber ohne den Schlüssel nichts damit anfangen. Bob besitzt denselben Schlüssel und verwandelt den Salat wieder zurück in den lesbaren Text.

![Symmetrische Verschlüsselung mit einem geteilten Schlüssel](https://upload.wikimedia.org/wikipedia/commons/8/80/Simple_symmetric_encryption-en.svg "Symmetrische Verschlüsselung: derselbe Schlüssel ver- und entschlüsselt. Genau das ist die Bühne mit Alice, Bob und dem Lauscher.")

Damit du die kommenden Kapitel überhaupt lesen kannst, brauchst du ein kleines Vokabular, das ab jetzt wirklich überall auftaucht. Den lesbaren Text nennt man **x** (Klartext, englisch *plaintext*), den verschlüsselten Salat **y** (Chiffrat, Geheimtext oder Kryptogramm, englisch *ciphertext*) und den Schlüssel **k** (englisch *key*). Die Verschlüsselung ist eine Funktion **e** (von *encrypt*), die Entschlüsselung eine Funktion **d** (von *decrypt*). Alices Arbeit ist also **e(x) = y**, Bobs Arbeit ist **d(y) = x** — die eine Funktion macht exakt das rückgängig, was die andere getan hat. Die Menge *aller* überhaupt möglichen Schlüssel heißt **Schlüsselraum**, und seine Größe wird später entscheidend: Sie bestimmt, wie lange ein Angreifer bräuchte, der einfach stur alle Schlüssel der Reihe nach durchprobiert (ein sogenannter Brute-Force-Angriff). Daher kommt das berühmte „256-Bit"-Versprechen, das du sicher schon gehört hast.

> **Eselsbrücke:** Fünf Buchstaben, die du nie wieder verwechseln darfst — **x** ist der Klartext (lesbar), **y** das Chiffrat (Salat), **k** der Schlüssel, **e** verschlüsselt, **d** entschlüsselt. Sprich es einmal laut: „**e** macht aus **x** das **y**, **d** macht es mit **k** rückgängig."

## Klassische Chiffren von Hand: Substitution und Transposition

Jetzt wird es endlich praktisch — und genau das, was hier kommt, wirst du in der ersten Übung mit Bleistift und Papier rechnen müssen. Es gibt zwei grundverschiedene Grundideen, wie man aus Klartext Geheimtext macht, und der ganze Rest der klassischen Kryptografie ist eine Kombination aus beiden. Eine **Substitutionschiffre** *ersetzt* jedes Symbol durch ein anderes (aus A wird D, aus B wird E …) — die Buchstaben bleiben an ihrem Platz, ändern aber ihre Identität. Eine **Transpositionschiffre** macht das Gegenteil: Sie *vertauscht die Reihenfolge* der Symbole, ohne sie zu verändern — dieselben Buchstaben, nur in anderer Anordnung. Substitution tauscht das Was, Transposition tauscht das Wo. Diese Unterscheidung ist klausurrelevant, also präge sie dir ein.

Für das Rechnen brauchst du eine einzige Vereinbarung: Jeder Buchstabe bekommt eine Zahl von 0 bis 25. **A = 0, B = 1, C = 2, …, Z = 25.** Damit wird aus Buchstaben-Schieberei plötzlich simple Arithmetik. Und weil das Alphabet nur 26 Zeichen hat, rechnen wir „im Kreis": Nach Z (25) kommt wieder A (0). Dieses Im-Kreis-Rechnen heißt **modulo 26**, geschrieben **mod 26**, und es bedeutet schlicht: Teile durch 26 und behalte nur den Rest. So wird etwa aus 28 wieder 2 (denn 28 = 26 + 2), das heißt aus einem Schritt über Z hinaus landest du wieder bei C.

### Schritt für Schritt: Caesar verschlüsseln

Die berühmteste Substitutionschiffre ist die **Caesar-Chiffre**, auch **Shift-Chiffre** genannt, weil sie jeden Buchstaben um eine feste Anzahl Stellen im Alphabet weiterschiebt. Der Schlüssel **k** ist genau diese Schrittweite. Bei **k = 3** wird also aus A ein D, aus B ein E, aus C ein F — die ganze Idee in einem Bild:

![Caesar-Chiffre mit einer Verschiebung um 3](https://upload.wikimedia.org/wikipedia/commons/4/4a/Caesar_cipher_left_shift_of_3.svg "Caesar-Chiffre: jeder Buchstabe wird um eine feste Zahl k weitergeschoben. Hier eine Verschiebung um 3.")

Formal sieht die Verschlüsselung eines Klartextbuchstabens **x** mit Schlüssel **k** so aus: **y = (x + k) mod 26**. Und die Entschlüsselung dreht das einfach um — statt zu addieren, zieht man ab: **x = (y − k) mod 26**. Rechnen wir ein vollständiges Beispiel mit dem Wort **HALLO** und **k = 3**, Buchstabe für Buchstabe:

- **H** ist Position 7. 7 + 3 = 10. Position 10 ist **K**.
- **A** ist Position 0. 0 + 3 = 3. Position 3 ist **D**.
- **L** ist Position 11. 11 + 3 = 14. Position 14 ist **O**.
- **L** noch einmal: ebenfalls **O**.
- **O** ist Position 14. 14 + 3 = 17. Position 17 ist **R**.

Aus HALLO wird also **KDOOR**. Zur Probe entschlüsseln wir zurück: K (10) − 3 = 7 = H, D (3) − 3 = 0 = A, O (14) − 3 = 11 = L, O → L, R (17) − 3 = 14 = O. Wir landen wieder bei HALLO — die Umkehrung stimmt. Achte beim Abziehen auf den Kreis: Käme beim Entschlüsseln etwas Negatives heraus, etwa −2, dann addierst du 26 dazu (−2 + 26 = 24 = Y). Genau dafür ist das „mod 26" da.

> **Merksatz:** Caesar = ein einziger fester Shift. Verschlüsseln **+ k**, entschlüsseln **− k**, und immer **mod 26**, damit du nach Z wieder bei A landest.

### Schritt für Schritt: Caesar mit Häufigkeitsanalyse brechen

Caesar fühlt sich sicher an, ist es aber überhaupt nicht — und *warum* das so ist, ist die eigentliche Lehre dieser Aufgabe. Eine Substitutionschiffre vertauscht ja nur die Identität der Buchstaben, nicht ihre Häufigkeit. In jeder Sprache kommen bestimmte Buchstaben viel öfter vor als andere. Im Deutschen ist das **E** mit Abstand der häufigste Buchstabe (rund **17 %**), gefolgt von **N**, **I**, **S** und **R**. Diese Verteilung ist wie ein Fingerabdruck der Sprache:

![Häufigkeit der Buchstaben in der deutschen Sprache](https://upload.wikimedia.org/wikipedia/commons/e/ea/Buchstabenh%C3%A4ufigkeit_Deutsch.svg "Buchstabenhäufigkeit im Deutschen: E ist mit großem Abstand am häufigsten, dann folgen N, I, S, R. Diese Silhouette verrät die Sprache.")

Hier ist der entscheidende Trick: Eine Caesar-Verschiebung schiebt diesen ganzen Fingerabdruck einfach um **k** Stellen zur Seite — die Form bleibt, nur der höchste Berg sitzt jetzt woanders. Du machst also eine **Häufigkeitsanalyse**: Du zählst, welcher Buchstabe im Geheimtext am häufigsten vorkommt. Mit großer Wahrscheinlichkeit ist das das verschlüsselte **E**. Aus der Verschiebung von E auf diesen Buchstaben liest du sofort **k** ab. Ein konkretes Beispiel: Verschlüsselt jemand einen deutschen Text mit **k = 5**, dann wird aus jedem E (Position 4) der Buchstabe an Position 4 + 5 = 9, also **J**. Im Geheimtext wimmelt es nun von J's. Findest du als Angreifer heraus, dass J am häufigsten ist, rechnest du rückwärts: 9 − 4 = 5 — und hast den Schlüssel geknackt, ohne auch nur einen einzigen anderen Schlüssel auszuprobieren.

Daraus folgt eine zweite Beobachtung, die du in der Übung selbst nachstellst: Je **länger** der Text, desto deutlicher tritt diese Verteilung hervor, weil mehr Buchstaben mehr Statistik liefern. Bei drei Wörtern kann der Zufall die Häufigkeiten noch verzerren; bei drei Seiten passt die Silhouette fast perfekt auf die Tabelle. Genau deshalb ist Caesar gegen jeden, der zählen kann, hoffnungslos unterlegen.

> **Eselsbrücke:** Caesar verschiebt die Häufigkeits-Silhouette, er zerstört sie nicht. Suche den höchsten Berg im Geheimtext, nenne ihn E, miss den Abstand — das ist dein k.

### Schritt für Schritt: spaltenweise Transposition

Wechseln wir die Grundidee. Bei der **Transposition** bleiben die Buchstaben, was sie sind — wir verwürfeln nur ihre Reihenfolge. Schon die Griechen taten das in der Antike mit einer **Skytale**: einem Stab, um den ein Lederstreifen gewickelt wurde; man schrieb längs über die Wicklung, und nur wer einen Stab mit demselben Durchmesser besaß, konnte den Streifen wieder lesbar aufwickeln.

![Eine Skytale — frühe Transpositionschiffre der Antike](https://upload.wikimedia.org/wikipedia/commons/5/51/Skytale.png "Die Skytale: ein um einen Stab gewickelter Streifen. Der Stabdurchmesser ist der Schlüssel — eine antike Transpositionschiffre.")

Die moderne Variante, die du in der Übung rechnest, ist die **spaltenweise Transposition** mit einem Schlüsselwort. Sie geht in drei Schritten: erstens den Klartext zeilenweise in ein Gitter mit so vielen Spalten schreiben, wie das Schlüsselwort Buchstaben hat; zweitens die Spalten nach der alphabetischen Reihenfolge der Schlüsselbuchstaben umsortieren; drittens das umsortierte Gitter wieder zeilenweise ablesen. Machen wir das mit dem Klartext **BEISPIELE** und dem Schlüssel **HAL** (drei Buchstaben, also drei Spalten). Zeilenweise eingetragen ergibt sich:

| H | A | L |
|---|---|---|
| B | E | I |
| S | P | I |
| E | L | E |

Nun sortieren wir die Schlüsselbuchstaben alphabetisch: aus **H A L** wird **A H L**. Die Spalte unter A wandert also nach vorne, dann die unter H, dann die unter L. Wir stellen die Spalten in dieser neuen Reihenfolge auf:

| A | H | L |
|---|---|---|
| E | B | I |
| P | S | I |
| L | E | E |

Jetzt lesen wir dieses umsortierte Gitter **zeilenweise** ab — also Zeile für Zeile von links nach rechts: E, B, I, dann P, S, I, dann L, E, E. Das ergibt den Geheimtext **EBIPSILEE**. Dieselben neun Buchstaben wie im Klartext, nur neu angeordnet — reine Transposition, keine Substitution.

Das **Entschlüsseln** kehrt die Spaltenvertauschung um. Du weißt, in welche Reihenfolge der Schlüssel die Spalten gebracht hat, also stellst du sie wieder zurück. Nehmen wir die Übungsaufgabe: Geheimtext **YRCOTPCSILOO**, Schlüssel **SEC**. Zwölf Buchstaben bei drei Spalten ergeben vier Zeilen. Du schreibst den Geheimtext zuerst zeilenweise in ein Gitter — dessen Spalten stehen ja in alphabetischer Schlüsselreihenfolge (**C E S**). Dann ordnest du die Spalten in die ursprüngliche Schlüsselreihenfolge **S E C** zurück und liest erneut zeilenweise. Das Ergebnis ist das Gitter

| S | E | C |
|---|---|---|
| C | R | Y |
| P | T | O |
| I | S | C |
| O | O | L |

und zeilenweise gelesen kommt **CRYPTOISCOOL** heraus — „crypto is cool", passend zum Fach. Der ganze Trick beim Entschlüsseln ist also nur: Welche Spalte stand ursprünglich wo? Die alphabetische Sortierung des Schlüssels sagt es dir.

> **Merksatz:** Substitution ändert das *Was* (Buchstaben-Identität), Transposition ändert das *Wo* (Buchstaben-Reihenfolge). Bei der Transposition bleibt die Häufigkeitsverteilung der Buchstaben exakt gleich — eine Häufigkeitsanalyse läuft hier ins Leere.

### Schritt für Schritt: Vigenère — viele Caesars auf einmal

Caesar hatte eine offensichtliche Schwäche: ein einziger Shift für den ganzen Text, also bleibt die Häufigkeits-Silhouette erhalten. Die **Vigenère-Chiffre** repariert genau das, indem sie nicht *ein* Alphabet, sondern *viele* benutzt — man nennt das **polyalphabetische Substitution**. Der Schlüssel ist jetzt ein ganzes Wort, zum Beispiel **SICHER**, und jeder Buchstabe dieses Schlüsselworts gibt eine eigene Caesar-Verschiebung vor: S verschiebt um 18, I um 8, C um 2, H um 7, E um 4, R um 17. Der erste Klartextbuchstabe wird mit 18 verschoben, der zweite mit 8, der dritte mit 2 und so weiter. Ist der Klartext länger als das Schlüsselwort, fängst du beim Schlüssel einfach wieder von vorne an (zyklisch).

Zum Nachschlagen hat sich das **Vigenère-Quadrat** durchgesetzt — eine Tabelle, in der Zeile (Schlüsselbuchstabe) und Spalte (Klartextbuchstabe) den Geheimtextbuchstaben kreuzen:

![Das Vigenère-Quadrat](https://upload.wikimedia.org/wikipedia/commons/2/25/Vigen%C3%A8re_square.svg "Das Vigenère-Quadrat: Zeile = Schlüsselbuchstabe, Spalte = Klartextbuchstabe, Kreuzung = Geheimtextbuchstabe. Es ist nichts anderes als 26 gestapelte Caesar-Alphabete.")

Rechnen kannst du es aber auch ganz ohne Quadrat, denn jeder Schritt ist nur ein Caesar: **y = (x + k) mod 26**, wobei k diesmal von Buchstabe zu Buchstabe wechselt. Verschlüsseln wir den Anfang von **CYBER** mit dem Schlüssel **SICHER**:

- **C** (2) + **S** (18) = 20 → **U**
- **Y** (24) + **I** (8) = 32, und 32 mod 26 = 6 → **G**
- **B** (1) + **C** (2) = 3 → **D**
- **E** (4) + **H** (7) = 11 → **L**
- **R** (17) + **E** (4) = 21 → **V**

Aus CYBER wird also **UGDLV**. Beachte das **Y**: 24 + 8 = 32 sprengt das Alphabet, also rechnest du mod 26 und landest bei 6, einem G. Genau dafür ist der Kreis da. Entschlüsselt wird wieder durch Abziehen desselben Schlüsselbuchstabens: U (20) − S (18) = 2 = C, und so weiter.

Und jetzt der eigentliche Gewinn, den du in der Übung auch im Häufigkeitsdiagramm siehst: Weil dasselbe E im Klartext je nach Position mit *unterschiedlichen* Schlüsselbuchstaben verschlüsselt wird, landet es im Geheimtext mal als ein, mal als ein anderer Buchstabe. Die schöne, hohe E-Spitze aus dem deutschen Fingerabdruck wird dadurch **verschmiert** — die Häufigkeitsverteilung wird viel flacher und gleichmäßiger. Genau deshalb scheitert die simple Häufigkeitsanalyse, die Caesar sofort knackt, an Vigenère. (Wirklich unknackbar ist Vigenère trotzdem nicht — aber das ist eine Geschichte für später.)

> **Eselsbrücke:** Vigenère = viele Caesars im Reißverschluss. Der Schlüssel **SICHER** ist die Folge der Verschiebungen 18-8-2-7-4-17, die sich zyklisch wiederholt. Mehrere Shifts verschmieren die E-Spitze — und damit fällt die Häufigkeitsanalyse aus.

## Auf den Punkt

Jetzt, wo die ganze Geschichte erzählt ist, die Kurzfassung zum Wiederholen. IT-Sicherheit ist ein Zweikampf gegen einen **denkenden Gegner**, mit einer eingebauten Asymmetrie: Der Verteidiger muss überall gewinnen, der Angreifer nur einmal. „Sicher" misst man an drei Schutzzielen — **Vertraulichkeit, Integrität, Verfügbarkeit (CIA)** —, die gegeneinander ziehen und abgewogen werden müssen. Zwei eiserne Regeln ziehen sich durch alles: Ein System ist nur so stark wie sein **schwächstes Glied** (oft der Mensch), und deshalb verteidigt man in mehreren Schichten (**Defense in Depth**). Weil es **keine perfekte Sicherheit** gibt und man immer jemandem vertrauen muss (Insider-Gefahr), definiert man ein **Threat Model**: Was schütze ich, vor wem? Dann beginnt Teil 1, die Kryptografie: **Kryptologie = Kryptografie (bauen) + Kryptanalyse (brechen)**; drei Familien — **symmetrisch** (ein geteilter Schlüssel), **asymmetrisch** (Schlüsselpaar, seit **1976**) und **Protokolle** (z. B. TLS). Auf der Bühne stehen **Alice, Bob und der Lauscher Oskar**, mit der Notation **x, y, k, e, d** und dem **Schlüsselraum**. Und von Hand beherrschst du jetzt vier klassische Verfahren: **Caesar** (ein Shift, **+k / −k mod 26**), die **Häufigkeitsanalyse** (E ist der häufigste deutsche Buchstabe — sie bricht Caesar), die **spaltenweise Transposition** (Spalten nach Schlüssel sortieren) und **Vigenère** (viele Shifts, verschmiert die Häufigkeit).

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **x** | Klartext (plaintext) — die lesbare Nachricht |
| **y** | Chiffrat / Geheimtext (ciphertext) — der verschlüsselte Text |
| **k** | Schlüssel (key) |
| **e( )** | Verschlüsselung (encryption): aus x wird y |
| **d( )** | Entschlüsselung (decryption): aus y wird x |
| **Schlüsselraum** | Menge *aller* möglichen Schlüssel — bestimmt den Aufwand für Brute Force |
| **CIA-Triade** | Confidentiality, Integrity, Availability — die drei Schutzziele |
| **Schwächstes Glied** | Sicherheit ist ein Minimum, kein Durchschnitt |
| **Defense in Depth** | mehrere unabhängige Schutzschichten |
| **Threat Model** | Festlegung: was wird wogegen geschützt? |
| **Security Mindset** | reflexhaft fragen „wie breche ich das?" |
| **Kryptologie** | Oberbegriff: Kryptografie + Kryptanalyse |
| **Kryptografie / Kryptanalyse** | Verfahren bauen / Verfahren brechen |
| **Substitution / Transposition** | Symbole ersetzen / Reihenfolge vertauschen |
| **mod 26** | „im Kreis" rechnen: nur den Rest nach Teilung durch 26 behalten |

## Typische Fallen

- **CIA ist nicht der Geheimdienst.** Es steht für die drei Schutzziele. Klausur-Reflex: lesen → C, unbemerkt ändern → I, Ausfall → A.
- **Verschlüsselung liefert keine Verfügbarkeit.** Krypto schützt Vertraulichkeit und Integrität, aber gegen einen überfluteten oder abgestürzten Server hilft nur Redundanz, niemals eine Formel.
- **„Stärkste Komponente = sicher" ist falsch.** Es zählt das **schwächste** Glied. Sicherheit ist ein Minimum, kein Durchschnitt.
- **Asymmetrisch ist nicht „besser" als symmetrisch.** Es löst ein *anderes* Problem (den Schlüsselaustausch) und ist deutlich langsamer. Beide werden gebraucht.
- **„Geheimes Verfahren = sicher" ist falsch.** Sicherheit muss im Schlüssel stecken, nicht in der Geheimhaltung des Algorithmus (formal: Kerckhoffs, nächste Vorlesung).
- **Substitution und Transposition werden verwechselt.** Substitution ersetzt Buchstaben (Caesar, Vigenère); Transposition vertauscht ihre Reihenfolge (Skytale, spaltenweise Transposition). Nur die Substitution verändert die Buchstaben-Identität.
- **Häufigkeitsanalyse gegen Transposition läuft ins Leere.** Da die Buchstaben nur umsortiert werden, bleibt ihre Häufigkeit gleich — das verrät der Analyse nichts über den Klartext.
- **Beim Entschlüsseln das „mod" nicht vergessen.** Wird beim Abziehen eine negative Zahl frei, addiere 26 dazu, sonst landest du außerhalb des Alphabets.

## Klausur-Fokus

Aus dieser Lektion kommen zwei Sorten Aufgaben. Die **Verständnisfragen** solltest du frei formulieren können: die **CIA-Triade** definieren und an einem Beispiel das verletzte Ziel zuordnen; **schwächstes Glied** und **Defense in Depth** mit einem eigenen Bild erklären; begründen, warum der **denkende Gegner** und die Asymmetrie Angreifer/Verteidiger Sicherheit so schwer machen; sagen, was ein **Threat Model** ist und warum es **keine perfekte Sicherheit** gibt; **Kryptologie / Kryptografie / Kryptanalyse** sauber trennen, die drei Familien (symmetrisch / asymmetrisch / Protokoll) einordnen, die Jahreszahl **1976** kennen und die Notation **x, y, k, e, d** flüssig lesen.

Die erste Übung zeigt aber, wohin der Professor praktisch will, und genau das wird *gerechnet*: klassische Kryptografie mit Bleistift und Papier. Du musst die **Caesar-Chiffre** mit **y = (x + k) mod 26** ver- und mit **x = (y − k) mod 26** entschlüsseln können (und dabei sicher mit dem A = 0 … Z = 25-Schema und dem „mod" umgehen); eine **Häufigkeitsanalyse** durchführen, also über den häufigsten deutschen Buchstaben **E** den Caesar-Schlüssel erraten und verstehen, warum längere Texte das leichter machen; eine **spaltenweise Transposition** mit einem Schlüsselwort ver- und entschlüsseln (Spalten alphabetisch nach dem Schlüssel ordnen, dann zeilenweise lesen); und die **Vigenère-Chiffre** per Hand anwenden sowie erklären, warum sie die Häufigkeitsverteilung verschmiert und damit die einfache Analyse aushebelt. Wenn du diese vier Verfahren einmal sauber von Hand gerechnet hast, ist die Übung — und der dazugehörige Klausurteil — geschenkt.

## Mehr dazu

- **Professor Messer — The CIA Triad** (~5 Min., EN): die drei Schutzziele knapp mit Beispielen. https://www.youtube.com/watch?v=SBcDGb9l6yo
- **Bruce Schneier — „The Security Mindset"** (Essay, EN): Originalquelle des „Denke wie ein Angreifer"-Prinzips. https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html
- **Computerphile — Public Key Cryptography** (~6 Min., EN): warum ein öffentlicher Schlüssel funktionieren kann. https://www.youtube.com/watch?v=GSIDS_lvRv4
- **Khan Academy — Caesar Cipher** (interaktiv, EN): Shift-Chiffre und Häufigkeitsanalyse zum Ausprobieren. https://www.khanacademy.org/computing/computer-science/cryptography/crypt/v/caesar-cipher
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): lebendiger Bogen von Caesar bis AES. https://www.youtube.com/watch?v=jhXCTbFnK8o`,
  },
};

const lecture02: Explanation = {
  id: "cs-2025-l02",
  lesson: 2,
  title: {
    de: "Einführung in die Kryptografie: Substitutionschiffren, modulare Arithmetik und Stromchiffren", en: "Introduction to Cryptography: Substitution Ciphers, Modular Arithmetic, and Stream Ciphers", tr: "Kriptografiye Giriş: İkame Şifreleri, Modüler Aritmetik ve Akış Şifreleri", ar: "مقدمة في التشفير: الأصفار البديلة، والحساب المعياري، وأصفار الدفق", ru: "Введение в криптографию: шифры замены, модульная арифметика и потоковые шифры", it: "Introduzione alla crittografia: cifrari a sostituzione, aritmetica modulare e cifrari a flusso", es: "Introducción a la criptografía: cifrados de sustitución, aritmética modular y cifrados de flujo", fr: "Introduction à la cryptographie : chiffrements de substitution, arithmétique modulaire et chiffrements par flux", zh: "密码学简介：替换密码、模算术和流密码", pl: "Wprowadzenie do kryptografii: szyfry podstawieniowe, arytmetyka modułowa i szyfry strumieniowe", pt: "Introdução à criptografia: cifras de substituição, aritmética modular e cifras de fluxo", uk: "Вступ до криптографії: шифри підстановки, модульна арифметика та потокові шифри", fa: "مقدمه ای بر رمزنگاری: رمزهای جایگزین، محاسبات مدولار و رمزهای جریانی", ja: "暗号化の概要: 置換暗号、剰余算術、およびストリーム暗号", ko: "암호화 입문: 대체 암호, 모듈식 산술 및 스트림 암호", vi: "Giới thiệu về Mật mã: Mật mã thay thế, Số học mô-đun và Mật mã dòng", hi: "क्रिप्टोग्राफी का परिचय: प्रतिस्थापन सिफर, मॉड्यूलर अंकगणित और स्ट्रीम सिफर", ur: "کرپٹوگرافی کا تعارف: متبادل سائفرز، ماڈیولر ریاضی، اور سٹریم سائفرز", nl: "Inleiding tot cryptografie: substitutiecijfers, modulaire rekenkunde en stroomcijfers", el: "Εισαγωγή στην Κρυπτογραφία: Αντικατάσταση κρυπτογράφησης, αρθρωτή αριθμητική και κρυπτογράφηση ροής", cs: "Úvod do kryptografie: substituční šifry, modulární aritmetika a proudové šifry", hu: "Bevezetés a kriptográfiába: helyettesítő titkosítások, moduláris aritmetika és adatfolyam titkosítások", ro: "Introducere în Criptografie: Cifre de substituție, Aritmetică modulară și Cifre de flux", sq: "Hyrje në kriptografi: Shifrat zëvendësuese, aritmetika modulare dhe shifrat e rrjedhës", sr: "Увод у криптографију: супституционе шифре, модуларна аритметика и стрим шифре", hr: "Uvod u kriptografiju: supstitucijske šifre, modularna aritmetika i točne šifre", bg: "Въведение в криптографията: заместващи шифри, модулна аритметика и поточни шифри", sv: "Introduktion till kryptografi: substitutionsciphers, modulär aritmetik och strömchiffer", fi: "Johdatus kryptografiaan: korvaussalaukset, modulaarinen aritmetiikka ja virtasalaukset", id: "Pengantar Kriptografi: Sandi Substitusi, Aritmatika Modular, dan Sandi Aliran", th: "ความรู้เบื้องต้นเกี่ยวกับการเข้ารหัส: รหัสแทน, เลขคณิตแบบโมดูลาร์ และรหัสสตรีม", sw: "Utangulizi wa Crystalgraphy: Sifa za Ubadilishaji, Hesabu ya Kawaida, na Sifa za mtiririko",
  },
  content: {
    de: `Dieses Kapitel erzählt die Kryptografie als Wettlauf zwischen zwei Lagern: Eine Seite baut eine Geheimschrift, die andere versucht, sie zu zerbrechen. Aus diesem Hin und Her fällt die erste echte Lektion des Faches heraus, und sie ist erstaunlich unbequem — ein riesiger Vorrat an möglichen Schlüsseln macht eine Verschlüsselung noch lange nicht sicher. Auf dem Weg dorthin lernst du das mathematische Werkzeug kennen, das die gesamte spätere Kryptografie trägt: das Rechnen im Kreis, die modulare Arithmetik. Und am Ende steht der schlankste Verschlüsseler überhaupt, die Stromchiffre, die im Kern nur aus einer einzigen Bit-Operation besteht — wunderbar einfach und genau deshalb auch gefährlich leicht zu manipulieren. Lass uns die Geschichte von vorne aufrollen.

## Die erste Grundsatzfrage: was darf der Feind wissen?

Bevor wir irgendetwas verschlüsseln, müssen wir eine Frage klären, an der sich Anfänger und Profis unterscheiden: Wie viel von unserem Verfahren darf der Angreifer eigentlich kennen, ohne dass es unsicher wird? Die verlockende Anfängerantwort lautet: „Am besten gar nichts — wenn niemand weiß, *wie* ich verschlüssele, kann es auch keiner knacken." Diese Idee hat sogar einen Namen, **Security by Obscurity**, Sicherheit durch Verschleierung, und sie ist fast immer eine Falle.

Die richtige Antwort gibt das **Kerckhoffs'sche Prinzip**: Ein kryptografisches Verfahren muss auch dann sicher bleiben, wenn der Angreifer den Ver- und Entschlüsselungsalgorithmus *vollständig* kennt. Das Einzige, was geheim bleiben darf — und muss —, ist der **Schlüssel**. Warum diese strenge Forderung? Weil Algorithmen sich immer herumsprechen: Sie stecken in Software, die man auseinandernehmen kann, in Hardware, die man aufschneiden kann, in Köpfen von Mitarbeitern, die kündigen. Hängt deine Sicherheit an der Geheimhaltung des Verfahrens, dann ist sie in dem Moment verloren, in dem das Verfahren bekannt wird — und dieser Moment kommt mit Sicherheit. Hängt sie dagegen nur am Schlüssel, kannst du den Algorithmus sogar veröffentlichen und die ganze Welt jahrelang daran knabbern lassen. Genau das ist passiert: DES und AES sind komplett öffentlich, jede Zeile ihres Aufbaus ist bekannt — und trotzdem sicher, weil das Geheimnis ausschließlich im Schlüssel sitzt. Das ist auch dieselbe Idee wie das schwächste Glied aus dem ersten Kapitel: Verlass dich nie auf eine Annahme, die jederzeit zusammenbrechen kann.

> **Merksatz:** Geheim ist *nur der Schlüssel*, niemals das Verfahren. Ein Algorithmus, der nur sicher ist, solange ihn keiner kennt, ist gar nicht sicher — er hat bloß noch nicht verloren.

## Die Substitutionschiffre — und warum ein riesiger Schlüsselraum nichts nützt

Schauen wir uns die älteste Idee der Geheimschrift an, die **Substitutionschiffre**. Sie ersetzt jeden Buchstaben des Alphabets fest durch einen anderen — eine komplette Vertauschungstabelle, etwa C wird zu U, Y wird zu N, B wird zu I, E wird zu D, R wird zu E. Der Schlüssel ist hier nicht eine einzelne Zahl, sondern diese *ganze Tabelle*. Wendet man sie auf jeden Buchstaben an, entsteht ein Geheimtext, der auf den ersten Blick völlig unleserlich wirkt.

Jetzt kommt der entscheidende Gedanke: Wie schwer ist es, das zu knacken? Die naheliegende Idee ist der **Brute-Force-Angriff** — die vollständige Schlüsselsuche, bei der man stur jeden möglichen Schlüssel durchprobiert, bis lesbarer Text herauskommt. Also zählen wir, wie viele Schlüssel es überhaupt gibt, den **Schlüsselraum**. Für den ersten Buchstaben hast du 26 mögliche Bilder, für den zweiten bleiben 25, für den dritten 24, und so weiter. Das ergibt 26 × 25 × 24 × … × 2 × 1, also **26 Fakultät (26!)**, und das sind rund **2^88** Schlüssel — eine Zahl mit 27 Stellen, weit jenseits dessen, was irgendein Computer je durchprobieren könnte.

Und hier ist die große Überraschung, die du dir wirklich einprägen solltest: Obwohl dieser Schlüsselraum gigantisch ist, ist die Substitutionschiffre **trivial zu brechen**. Brute-Force scheitert zwar an den 2^88 Schlüsseln — aber es gibt einen viel klügeren Angriff, der den riesigen Schlüsselraum einfach umgeht. Wie groß der Schlüsselraum sein muss, damit Brute-Force aussichtslos ist, fasst man grob so zusammen:

| Schlüssellänge | Sicherheit gegen Brute-Force |
|---|---|
| 56–64 Bit | nur kurzfristig — in Stunden bis Tagen knackbar |
| 112–128 Bit | langfristig sicher (Jahrzehnte, solange es keine Quantencomputer gibt) |
| 256 Bit | langfristig sicher, selbst gegen Quantencomputer |

> **Eselsbrücke:** Großer Schlüsselraum ≠ sicher. Die Substitution hat 2^88 Schlüssel und fällt trotzdem in Minuten. Brute-Force ist nur *einer* von vielen Angriffen — und meist nicht der schlauste.

## Frequenzanalyse: der Fingerabdruck der Sprache verrät alles

Der Angriff, der die Substitutionschiffre erledigt, heißt **Frequenz- oder Häufigkeitsanalyse**, und sein Grundgedanke ist so einfach wie mächtig. Eine Substitution tarnt zwar die *Identität* jedes Buchstabens — aus E wird vielleicht ein D —, aber sie lässt eine Sache völlig unangetastet: *wie oft* jeder Buchstabe vorkommt. Wenn im deutschen Klartext jeder zwanzigste Buchstabe ein E ist, dann ist im Geheimtext eben jeder zwanzigste Buchstabe das Zeichen, durch das E ersetzt wurde. Die Häufigkeiten wandern mit, sie verschwinden nicht.

Und jede Sprache hat eine ganz charakteristische Häufigkeitsverteilung, einen statistischen Fingerabdruck. Im Deutschen ist das **E** mit rund **17 %** der mit Abstand häufigste Buchstabe, gefolgt von **N**, **I**, **S** und **R**. Diese Silhouette sieht so aus:

![Häufigkeit der Buchstaben in der deutschen Sprache](https://upload.wikimedia.org/wikipedia/commons/e/ea/Buchstabenh%C3%A4ufigkeit_Deutsch.svg "Buchstabenhäufigkeit im Deutschen: E ist mit großem Abstand am häufigsten, gefolgt von N, I, S, R. Dieser Fingerabdruck überlebt jede Substitution.")

Damit knackst du die Chiffre, ohne auch nur einen Schlüssel zu raten: Du zählst, welches Zeichen im Geheimtext am häufigsten auftaucht — das ist mit großer Wahrscheinlichkeit das verschlüsselte E. Das zweithäufigste ist wahrscheinlich N, dann I, und so weiter. Stück für Stück baust du die Vertauschungstabelle rückwärts auf, bis lesbarer Text erscheint. Je länger der Geheimtext, desto verlässlicher funktioniert das, denn mehr Buchstaben liefern mehr Statistik — bei drei Wörtern kann der Zufall die Verteilung noch verzerren, bei drei Seiten passt sie fast perfekt. [Crypto Corner zeigt das Schritt für Schritt an einem echten Text](https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html).

Daraus folgen die **zwei zentralen Lektionen** dieses Kapitels, und beide solltest du wörtlich parat haben:

> Erstens: Ein großer Schlüsselraum bedeutet **nicht** automatisch, dass ein Verfahren sicher ist. Zweitens: Eine gute Chiffre muss die **statistischen Eigenschaften** des Klartextes verbergen.

Genau an dieser zweiten Lektion entscheidet sich, warum manche klassischen Chiffren besser sind als andere. Die **Verschiebe- oder Cäsar-Chiffre** aus dem ersten Kapitel ist der Spezialfall der Substitution mit nur *einer* festen Verschiebung als Schlüssel; sie verschiebt die Häufigkeits-Silhouette bloß um k Stellen und ist deshalb noch leichter zu brechen (ihr Schlüsselraum ist sogar nur 26, da reicht schon Brute-Force in Sekunden). Die **Vigenère-Chiffre**, ebenfalls aus dem ersten Kapitel, verschlüsselt denselben Klartextbuchstaben je nach Position mit *unterschiedlichen* Verschiebungen und *verschmiert* damit die Häufigkeiten — die simple Frequenzanalyse läuft hier ins Leere. Und die **spaltenweise Transposition** ändert die Buchstaben gar nicht, sondern nur ihre Reihenfolge; ihre Häufigkeitsverteilung ist sogar identisch mit der des Klartextes, aber genau das verrät dem Angreifer nichts über den Inhalt. Wenn du diese drei noch einmal in Ruhe von Hand rechnen willst, findest du sie ausführlich im ersten Kapitel — hier ging es um die übergeordnete Einsicht, *warum* Substitution scheitert und Verschmieren hilft.

Übrigens ist die Frequenzanalyse nur ein Teil der **Kryptanalyse** insgesamt. Man unterscheidet die klassische Kryptanalyse (Statistik wie hier), die mathematische Kryptanalyse (Schwächen im mathematischen Aufbau), den reinen Brute-Force-Angriff, dazu Implementierungsangriffe (die nicht das Verfahren, sondern seine konkrete Umsetzung attackieren) und schließlich Social Engineering (den Menschen überlisten). Den ganzen Werkzeugkasten wirst du im Lauf des Semesters Stück für Stück öffnen.

## Modulare Arithmetik: das Rechnen, das die ganze Kryptografie trägt

Jetzt wird es kurz mathematisch, aber keine Sorge — du benutzt diese Mathematik längst jeden Tag. Fast alle Verschlüsselungsverfahren, die symmetrischen wie die asymmetrischen, rechnen nicht auf den unendlich vielen ganzen Zahlen, sondern auf einer *endlichen* Menge. Das beste Alltagsbild dafür ist eine Uhr: Auf dem Zifferblatt geht es nach der 12 nicht weiter zu 13, sondern wieder zurück zur 1. Die Zahlen laufen im Kreis. Genau das ist **modulare Arithmetik** — Rechnen, bei dem man nach Erreichen einer festen Grenze wieder von vorne beginnt.

![Modulare Arithmetik als Zifferblatt](https://upload.wikimedia.org/wikipedia/commons/a/a4/Clock_group.svg "Rechnen modulo 12 wie auf einer Uhr: nach der höchsten Zahl beginnt man wieder bei null. Genau dieses Im-Kreis-Rechnen trägt die gesamte Kryptografie.")

Etwas formaler schreibt man **a ≡ r (mod m)** und liest das als „a ist kongruent zu r modulo m". Es bedeutet schlicht: m teilt die Differenz a − r ohne Rest. Dabei heißt **m** der **Modul** und **r** der **Rest**. Bei einer Uhr ist m = 12; sagst du „in 100 Stunden", rechnest du 100 mod 12 und bekommst den Rest 4, also vier Stunden weiter auf dem Zifferblatt.

Ein Punkt verwirrt am Anfang fast jeden, also halte ihn bewusst fest: **Der Rest ist nicht eindeutig.** Es gibt zu jeder Zahl viele gültige Reste. So gilt zum Beispiel 12 ≡ 3 (mod 9), aber genauso 12 ≡ 21 (mod 9) und sogar 12 ≡ −6 (mod 9) — denn 9 teilt sowohl 12 − 3 als auch 12 − 21 als auch 12 − (−6). Alle Zahlen, die denselben Rest liefern, bilden zusammen eine **Restklasse**: Für unser Beispiel ist das die Menge …, −6, 3, 12, 21, 30, … . Damit man sich auf eine Schreibweise einigt, gilt die **Konvention**, stets den kleinsten positiven Rest zu wählen — hier also die 3.

Warum ist das für die Kryptografie Gold wert? Weil alle Zahlen einer Restklasse sich gleich verhalten, darf man **die Modulo-Reduktion schon auf Zwischenergebnisse anwenden** und so mit winzigen Zahlen rechnen, statt mit astronomisch großen. Diese eine Technik ist später bei RSA der Unterschied zwischen „läuft in Millisekunden" und „läuft nie".

### Schritt für Schritt: clever modulo rechnen

Nehmen wir die Aufgabe **3^8 mod 7** (drei hoch acht, modulo sieben). Der naive Weg wäre, erst 3^8 = 6561 auszurechnen und dann durch 7 zu teilen — schon bei diesen kleinen Zahlen unhandlich, bei kryptografischen Größen unmöglich. Der clevere Weg reduziert unterwegs:

- Zerlege die Potenz: 3^8 = 3^4 × 3^4.
- Rechne 3^4 = 81. Reduziere sofort: 81 = 11 × 7 + 4, also 81 ≡ 4 (mod 7).
- Setze das reduzierte Zwischenergebnis ein: 3^8 ≡ 4 × 4 = 16 (mod 7).
- Reduziere erneut: 16 = 2 × 7 + 2, also 16 ≡ 2 (mod 7).

Ergebnis: **3^8 ≡ 2 (mod 7)** — und du hast nie mit einer Zahl größer als 81 hantiert. Genau dieses „nach jedem Schritt klein machen" ist die Lektion, die du dir merken sollst.

> **Eselsbrücke:** Modulo ist eine Uhr — nach m fängt alles wieder bei 0 an. Und beim Potenzieren gilt: *erst reduzieren, dann weiterrechnen*, damit die Zahlen klein bleiben.

## Bits und Binärzahlen: die Sprache der Maschine

Damit die nächste Chiffre Sinn ergibt, brauchen wir noch eine zweite Rechen-Grundlage: das Binärsystem. Ein Computer kennt nur zwei Ziffern, **0** und **1**, und stellt jede Zahl als Folge solcher Bits dar. Das funktioniert genau wie unser gewohntes Dezimalsystem, nur mit der Basis 2 statt 10: Jede Stelle steht für eine Zweierpotenz. Die Binärzahl 1011 bedeutet also 1×2^3 + 0×2^2 + 1×2^1 + 1×2^0.

### Schritt für Schritt: binär ↔ dezimal und Binäraddition

Erst **binär nach dezimal**. Du multiplizierst jede Stelle mit ihrer Zweierpotenz und addierst: 1011 = 1×8 + 0×4 + 1×2 + 1×1 = 8 + 2 + 1 = **11**. Die Binärzahl 1011 ist also die dezimale 11.

Umgekehrt **dezimal nach binär** über fortgesetzte Division durch 2, bei der man sich die Reste merkt. Für die 13:

- 13 : 2 = 6 Rest **1**
- 6 : 2 = 3 Rest **0**
- 3 : 2 = 1 Rest **1**
- 1 : 2 = 0 Rest **1**

Die Reste von unten nach oben gelesen ergeben **1101** — und Probe: 1×8 + 1×4 + 0×2 + 1×1 = 13. Stimmt.

Und schließlich die **Binäraddition**, die genauso geht wie schriftliches Addieren im Dezimalen, nur dass schon 1 + 1 = 10 einen Übertrag erzeugt (denn binär gibt es keine Ziffer 2). Addieren wir 10101 und 11110:

- ganz rechts: 1 + 0 = 1
- nächste Stelle: 0 + 1 = 1
- nächste: 1 + 1 = 10 → schreibe 0, Übertrag 1
- nächste: 0 + 1 + Übertrag 1 = 10 → schreibe 0, Übertrag 1
- nächste: 1 + 1 + Übertrag 1 = 11 → schreibe 1, Übertrag 1
- der letzte Übertrag wandert nach vorne: 1

Ergebnis: **110011**. Probe im Dezimalen: 10101 = 21, 11110 = 30, und 110011 = 32 + 16 + 2 + 1 = 51 = 21 + 30. Passt.

## Stromchiffren: verschlüsseln Bit für Bit mit XOR

Jetzt zur schlanksten Chiffre überhaupt. Zuerst die große Einteilung, die du sicher beherrschen musst: **Stromchiffren** verschlüsseln eine Nachricht **Bit für Bit**, während **Blockchiffren** (DES und AES, die ab dem nächsten Kapitel kommen) immer ganze Blöcke von vielen Bits auf einmal verarbeiten.

Eine Stromchiffre erzeugt aus dem Schlüssel einen langen **Schlüsselstrom** s — eine Folge möglichst zufälliger Bits — und verknüpft jedes Klartextbit mit dem passenden Schlüsselstrombit durch Addition modulo 2. Verschlüsselung heißt dann **y_i = (x_i + s_i) mod 2** und Entschlüsselung **x_i = (y_i + s_i) mod 2**. Diese Addition modulo 2 hat einen berühmten Namen: Sie ist das **XOR**, das exklusive Oder, geschrieben als ⊕.

![Das Schaltsymbol des XOR-Gatters](https://upload.wikimedia.org/wikipedia/commons/1/17/XOR_ANSI_Labelled.svg "Das XOR-Gatter: Ausgang 1 genau dann, wenn die beiden Eingänge verschieden sind. Es ist nichts anderes als die Addition modulo 2.")

XOR gibt genau dann eine 1 aus, wenn die beiden Eingänge *verschieden* sind, und eine 0, wenn sie gleich sind. Für die Kryptografie ist es ideal, weil es perfekt **ausbalanciert** ist: Ist das Schlüsselstrombit zufällig, dann ist auch das Chiffratbit mit jeweils 50 % Wahrscheinlichkeit 0 oder 1 — der Geheimtext verrät statistisch nichts. Die vollständige Wahrheitstabelle:

| x | s | y = x ⊕ s |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Das Schönste daran ist die Symmetrie: Dieselbe XOR-Operation mit demselben Schlüsselstrom macht die Verschlüsselung wieder rückgängig, denn y ⊕ s = (x ⊕ s) ⊕ s = x. Ver- und Entschlüsseln sind also exakt dieselbe Rechnung.

### Schritt für Schritt: eine Stromchiffre von Hand

Verschlüsseln wir den Klartext **x = 1011** mit dem Schlüsselstrom **s = 1101**, Bit für Bit per XOR:

- 1 ⊕ 1 = 0
- 0 ⊕ 1 = 1
- 1 ⊕ 0 = 1
- 1 ⊕ 1 = 0

Das Chiffrat ist **y = 0110**. Zur Probe entschlüsseln wir mit demselben s zurück: 0 ⊕ 1 = 1, 1 ⊕ 1 = 0, 1 ⊕ 0 = 1, 0 ⊕ 1 = 1 — also wieder **1011**, der ursprüngliche Klartext. In der Praxis steckt genau so eine Stromchiffre zum Beispiel im Mobilfunkstandard GSM, dort heißt sie A5/1.

## Die gefährliche Kehrseite: Formbarkeit und der Bit-Flip-Angriff

Diese betörende Einfachheit hat eine Schattenseite, die in Übungen und Klausuren immer wieder auftaucht: die **Formbarkeit (Malleability)**. Weil das Chiffrat nichts anderes ist als „Klartext XOR Schlüsselstrom", kann ein Angreifer das Chiffrat **gezielt verändern, ohne den Klartext oder den Schlüssel zu kennen**. Der Grund steckt in der Algebra des XOR.

### Schritt für Schritt: ein Bit-Flip-Angriff

Stell dir vor, Oskar fängt das Chiffrat y ab und kippt darin ein einzelnes Bit an Position i, indem er es mit 1 XOR-t. Was passiert beim Entschlüsseln? Bob rechnet x' = (y ⊕ 1) ⊕ s an dieser Stelle. Umsortiert ist das (y ⊕ s) ⊕ 1 = x ⊕ 1 — der Schlüsselstrom s fällt sauber heraus, und genau das Klartextbit an Position i ist umgekippt. **Ein gekipptes Bit im Chiffrat = dasselbe gekippte Bit im Klartext.** Oskar muss überhaupt nicht wissen, welche Zahl im Klartext steht; überträgt jemand etwa einen Kontostand, kann der Angreifer durch das Kippen der richtigen höherwertigen Bits aus einer kleinen Zahl eine riesige machen. Kennt er den Klartext an einer Stelle sogar (ein known-plaintext-Szenario, etwa weil dort ein „m" steht), dann berechnet er den Schlüsselstrom direkt als s = y ⊕ „m" und baut das Chiffrat so um, dass an dieser Stelle plötzlich ein „p" steht.

Die Lehre daraus ist eine der wichtigsten des ganzen Kurses: Verschlüsselung schützt die **Vertraulichkeit**, aber sie garantiert **nicht** die **Integrität**. Eine Nachricht kann verschlüsselt *und* trotzdem unbemerkt manipuliert sein. Deshalb kombiniert man Verschlüsselung in der Praxis immer mit einem eigenen Integritätsschutz, einem MAC — aber das ist die Geschichte eines späteren Kapitels.

> **Eselsbrücke:** Bei der Stromchiffre gilt — *Bit im Chiffrat kippen = dasselbe Bit im Klartext kippt*. Der Angreifer braucht den Klartext nicht zu kennen, um ihn zu verändern. Vertraulichkeit ≠ Integrität.

## Zufall ist alles: RNGs und das One-Time-Pad

Wenn das Chiffrat nur so gut versteckt wie der Schlüsselstrom zufällig ist, dann hängt die ganze Sicherheit einer Stromchiffre an *einer* Frage: Woher kommt der Zufall? Man unterscheidet drei Sorten von Zufallsgeneratoren, und der Unterschied ist klausurrelevant. Ein **TRNG**, ein True Random Number Generator, schöpft echten physikalischen Zufall aus der Natur, etwa aus elektronischem Rauschen — unvorhersagbar, aber langsam und aufwendig. Ein **PRNG**, ein Pseudo Random Number Generator, berechnet seine Zahlenfolge aus einem Startwert, dem Seed; das ist schnell, aber die Folge ist reproduzierbar und damit grundsätzlich *vorhersagbar*. Und ein **CSPRNG**, ein Cryptographically Secure PRNG, ist ein PRNG, dessen Ausgabe sich nachweislich *nicht* vorhersagen lässt — und nur das ist gut genug für die Kryptografie.

Das theoretische Ideal der Stromchiffren ist das **One-Time-Pad (OTP)**. Sein Schlüsselstrom wird mit einem echten TRNG erzeugt, ist nur den legitimen Teilnehmern bekannt und wird **nur ein einziges Mal** verwendet. Unter diesen Bedingungen ist das OTP **beweisbar sicher** — und zwar informationstheoretisch, das heißt: Keine Rechenleistung der Welt, kein noch so guter Computer und kein Quantencomputer kann es brechen, weil der Geheimtext bei einem wirklich zufälligen Schlüssel schlicht *jeden* Klartext gleich wahrscheinlich macht.

![Schema des One-Time-Pads](https://upload.wikimedia.org/wikipedia/commons/6/60/One-time_pad.svg "One-Time-Pad: Klartext XOR ein echt zufälliger, gleich langer, nur einmal verwendeter Schlüsselstrom ergibt einen beweisbar sicheren Geheimtext.")

Wenn es beweisbar sicher ist — warum benutzt es dann fast niemand? Weil seine drei Bedingungen in der Praxis brutal teuer sind, vor allem die letzte: Der Schlüssel muss **genauso lang** sein wie die Nachricht selbst und darf sich nie wiederholen. Wer ein Gigabyte sicher verschicken will, muss vorher ein Gigabyte echten Zufallsschlüssel sicher austauschen — und hätte dann das ursprüngliche Problem (etwas Geheimes sicher übertragen) nur verschoben. Deshalb behilft man sich in der Praxis: Man nimmt einen kurzen geheimen Schlüssel k als Seed für einen CSPRNG und lässt diesen einen langen Schlüsselstrom erzeugen. Für effiziente Hardware baut man solche Stromchiffren gern aus linear rückgekoppelten Schieberegistern (LFSR), wie es A5/1 und A5/2 im GSM-Mobilfunk tun. Die [Wikipedia-Seite zum One-Time-Pad](https://en.wikipedia.org/wiki/One-time_pad) fasst Beweis und Bedingungen kompakt zusammen.

> **Eselsbrücke (OTP — die drei Bedingungen):** **Z-E-L** — der Schlüssel ist **Z**ufällig (echter Zufall), **E**inmalig (nie ein zweites Mal benutzt) und **L**ang (mindestens so lang wie die Nachricht). Fehlt nur eine dieser drei, bricht der Sicherheitsbeweis zusammen.

## Auf den Punkt

Die Kurzfassung der ganzen Geschichte: Sicherheit darf nur am Schlüssel hängen, nie an der Geheimhaltung des Verfahrens — das ist **Kerckhoffs' Prinzip**. Die klassische **Substitutionschiffre** hat zwar einen gewaltigen Schlüsselraum (26! ≈ 2^88), fällt aber trivial durch **Frequenzanalyse**, weil sie die Buchstaben tarnt, nicht ihre Häufigkeit. Daraus die zwei Kernlektionen: großer Schlüsselraum ≠ sicher, und eine gute Chiffre muss die **Statistik** des Klartextes verbergen (das schafft Vigenère durch mehrere Alphabete, Transposition durch Umstellen statt Ersetzen). Das Rechen-Fundament ist die **modulare Arithmetik** — Rechnen im Kreis, Reduktion schon auf Zwischenergebnisse — ergänzt um das **Binärsystem**. Die schlankste Chiffre ist die **Stromchiffre**: Klartext XOR Schlüsselstrom, ver- und entschlüsseln mit derselben Operation. Als **One-Time-Pad** (zufällig, einmalig, lang) ist sie beweisbar sicher, aber wegen der Schlüssellänge unpraktisch — und weil sie **formbar** ist (Bit-Flip!), garantiert sie allein keine Integrität.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Kerckhoffs' Prinzip** | nur der Schlüssel ist geheim, nicht der Algorithmus |
| **Security by Obscurity** | (falsche) Sicherheit allein durch Verschleierung des Verfahrens |
| **Substitutionschiffre** | jeder Buchstabe wird ersetzt; Schlüssel = ganze Tabelle |
| **Brute-Force** | alle Schlüssel des Schlüsselraums durchprobieren |
| **Frequenzanalyse** | Buchstabenhäufigkeiten ausnutzen, um Substitution zu brechen |
| **a ≡ r (mod m)** | m teilt a − r; m ist der Modul, r der Rest |
| **Restklasse** | alle Zahlen mit demselben Rest modulo m |
| **Stromchiffre** | Bit-für-Bit-Verschlüsselung per XOR |
| **Blockchiffre** | verschlüsselt ganze Blöcke (DES/AES) |
| **XOR (⊕)** | exklusives Oder = Addition modulo 2 |
| **TRNG / PRNG / CSPRNG** | echter / pseudozufälliger / krypto-sicherer Generator |
| **One-Time-Pad (OTP)** | beweisbar sichere Stromchiffre; Schlüssel zufällig, einmalig, lang |
| **Malleability** | Formbarkeit: Chiffrat gezielt änderbar ohne Schlüsselkenntnis |

## Typische Fallen

- **Großer Schlüsselraum = sicher? Nein.** 26! ist gewaltig, die Substitution fällt trotzdem durch Frequenzanalyse. Das ist *die* zentrale Aussage des Kapitels.
- **Geheimer Algorithmus = mehr Sicherheit? Nein.** Das verstößt gegen Kerckhoffs. Geheim ist ausschließlich der Schlüssel.
- **Der Rest ist eindeutig? Nein.** Zu jeder Zahl gehört eine ganze Restklasse möglicher Reste; per Konvention nimmt man den kleinsten positiven.
- **PRNG ist sicher genug? Nein.** Ein gewöhnlicher PRNG ist vorhersagbar; für Kryptografie braucht es einen CSPRNG.
- **Verschlüsselung = Integrität? Nein.** Eine Stromchiffre ist formbar — ein Bit-Flip im Chiffrat kippt gezielt das Klartextbit. Vertraulichkeit und Integrität sind zwei verschiedene Ziele.
- **OTP ist schwach, weil es kaum benutzt wird? Nein.** Es ist beweisbar sicher; unpraktisch ist nur die Schlüssellänge und die Einmaligkeit.

## Klausur-Fokus

Das erste Übungsblatt zu diesem Stoff ist fast reine **Rechnerei von Hand** — und genau so kommt es in der Klausur. Die vier Handchiffren aus dem ersten Kapitel musst du sicher beherrschen, vorwärts *und* rückwärts: die **Cäsar-Chiffre** mit y = (x + k) mod 26, die **Vigenère-Chiffre** mit einem Schlüsselwort (Verschiebung pro Position, zyklisch) und die **spaltenweise Transposition** (Spalten alphabetisch nach dem Schlüssel umsortieren). Dazu die **Häufigkeitsanalyse** mit der deutschen Verteilung (E ≈ 17 %, dann N, I, S, R) und die Begründung, warum sie Substitution und Cäsar bricht, Vigenère und Transposition aber nicht. Auf der Rechen-Seite solltest du sicher **modulo** rechnen — inklusive der cleveren Reduktion auf Zwischenergebnisse wie bei 3^8 mod 7 — und **zwischen binär und dezimal umrechnen** sowie **binär addieren**. Beim **One-Time-Pad / Vernam** wird gern der **Schlüsselraum gezählt** (für Länge n gibt es 26^n bzw. bei Bits 2^n Schlüssel) und daraus eine **Brute-Force-Dauer** abgeschätzt (Anzahl Schlüssel × Aufwand ÷ Rechenleistung). Und fast sicher drankommt die **Formbarkeit der Stromchiffre**: einen konkreten **Bit-Flip-Angriff** durchführen und bei bekanntem Klartext den Schlüsselstrom als s = y ⊕ x bestimmen. Halte außerdem die Konzepte parat: **Kerckhoffs**, die **XOR-Wahrheitstabelle**, der Unterschied **TRNG / PRNG / CSPRNG** und die drei OTP-Bedingungen **Z-E-L**.

## Mehr dazu

- **Crypto Corner — Frequency Analysis: Breaking the Code** (Artikel, EN): zeigt genau die Kernaussage, warum Substitution an der Buchstaben-Statistik zerbricht. https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html
- **Khan Academy — Cryptography** (interaktiv, EN): modulare Arithmetik, Substitution und Zufall zum Ausprobieren. https://www.khanacademy.org/computing/computer-science/cryptography
- **Wikipedia — One-Time Pad** (EN): die Bedingungen, der Beweis der perfekten Sicherheit und warum es praktisch kaum genutzt wird. https://en.wikipedia.org/wiki/One-time_pad
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): ordnet Substitution, Schlüssel und Stromchiffren historisch ein. https://www.youtube.com/watch?v=jhXCTbFnK8o`,
  },
};

const lecture03: Explanation = {
  id: "cs-2025-l03",
  lesson: 3,
  title: {
    de: "Symmetrische Kryptografie: der Data Encryption Standard (DES)", en: "Symmetric cryptography: the Data Encryption Standard (DES)", tr: "Simetrik şifreleme: Veri Şifreleme Standardı (DES)", ar: "التشفير المتماثل: معيار تشفير البيانات (DES)", ru: "Симметричная криптография: стандарт шифрования данных (DES)", it: "Crittografia simmetrica: il Data Encryption Standard (DES)", es: "Criptografía simétrica: el estándar de cifrado de datos (DES)", fr: "Cryptographie symétrique : le Data Encryption Standard (DES)", zh: "对称加密：数据加密标准 (DES)", pl: "Kryptografia symetryczna: standard szyfrowania danych (DES)", pt: "Criptografia simétrica: o padrão de criptografia de dados (DES)", uk: "Симетрична криптографія: стандарт шифрування даних (DES)", fa: "رمزنگاری متقارن: استاندارد رمزگذاری داده ها (DES)", ja: "対称暗号化: データ暗号化標準 (DES)", ko: "대칭 암호화: 데이터 암호화 표준(DES)", vi: "Mật mã đối xứng: Tiêu chuẩn mã hóa dữ liệu (DES)", hi: "सममित क्रिप्टोग्राफी: डेटा एन्क्रिप्शन मानक (डीईएस)", ur: "ہم آہنگ خفیہ نگاری: ڈیٹا انکرپشن سٹینڈرڈ (DES)", nl: "Symmetrische cryptografie: de Data Encryption Standard (DES)", el: "Συμμετρική κρυπτογραφία: το πρότυπο κρυπτογράφησης δεδομένων (DES)", cs: "Symetrická kryptografie: Data Encryption Standard (DES)", hu: "Szimmetrikus kriptográfia: az adattitkosítási szabvány (DES)", ro: "Criptografia simetrică: Standardul de criptare a datelor (DES)", sq: "Kriptografia simetrike: Standardi i Kriptimit të të Dhënave (DES)", sr: "Симетрична криптографија: Стандард шифровања података (ДЕС)", hr: "Simetrična kriptografija: Standard šifriranja podataka (DES)", bg: "Симетрична криптография: Стандартът за криптиране на данни (DES)", sv: "Symmetrisk kryptografi: Data Encryption Standard (DES)", fi: "Symmetrinen kryptografia: Data Encryption Standard (DES)", id: "Kriptografi simetris: Standar Enkripsi Data (DES)", th: "การเข้ารหัสแบบสมมาตร: มาตรฐานการเข้ารหัสข้อมูล (DES)", sw: "Usimbaji fiche linganifu: Kiwango cha Usimbaji Data (DES)",
  },
  content: {
    de: `Bisher waren unsere Chiffren entweder uralt (Caesar, Vigenère) oder so schlank, dass sie nur aus einer einzigen Bit-Operation bestanden (die Stromchiffre). Jetzt bauen wir die erste *echte* moderne Verschlüsselung — eine **Blockchiffre** namens DES, an der man begreift, wie industrielle Kryptografie überhaupt konstruiert ist. Das Rezept ist überraschend bodenständig: Man nimmt zwei einfache Zutaten, die Claude Shannon **Konfusion** und **Diffusion** nannte, und rührt sie viele Runden lang durcheinander, bis aus dem Klartext heilloser Salat geworden ist. Auf einem Schaubild sieht DES aus wie ein undurchdringlicher Pfeil-und-Kasten-Dschungel, aber dahinter steckt eine Kette aus genau vier Ideen, die wir der Reihe nach auseinandernehmen: ein Struktur-Trick (Feistel), ein Innenleben (die f-Funktion), ein Schlüsselfahrplan und am Ende der Grund, warum DES heute zu schwach geworden ist. Wer diese vier versteht, versteht auch AES, das im nächsten Kapitel kommt — denn es folgt demselben Bauplan.

## Etwas Geschichte — und warum ausgerechnet 56 Bit?

Die Geschichte erklärt eine Zahl, über die du in der Klausur stolpern wirst. 1972 schrieb die US-Behörde NBS (heute NIST) einen offenen Wettbewerb für einen Verschlüsselungsstandard aus. 1974 lieferte IBM den überzeugendsten Vorschlag, der auf einer **Feistel-Chiffre** beruhte und ursprünglich Blöcke von 64 Bit mit einem **128-Bit-Schlüssel** verschlüsselte. Dann kam die NSA ins Spiel, und zwei Gerüchte ranken sich bis heute darum. Das erste: Die NSA habe darauf gedrängt, die Schlüssellänge auf **56 Bit** zu reduzieren — was einen Brute-Force-Angriff überhaupt erst denkbar macht. Das zweite, schwerwiegendere: In den geheimnisvollen S-Boxen stecke eine absichtliche Hintertür. Dieser zweite Verdacht hat sich nie bestätigt; im Gegenteil, Jahrzehnte später stellte sich heraus, dass die S-Boxen *besonders robust* gegen Angriffe gewählt worden waren, die die Öffentlichkeit damals noch gar nicht kannte. 1977 wurde die Chiffre schließlich als **Data Encryption Standard** veröffentlicht. Merke dir die Spannung zwischen den beiden Zahlen: eingegeben werden 64 Bit, aber wirksam (effektiv) sind nur 56 — und genau diese Verkürzung ist später der Sargnagel von DES.

## Konfusion und Diffusion: die zwei Zutaten jeder Blockchiffre

Bevor wir DES aufschrauben, brauchst du die zwei Begriffe, mit denen Claude Shannon beschrieb, was eine Chiffre eigentlich leisten muss. Der erste ist die **Konfusion**: Sie soll den Zusammenhang zwischen Schlüssel und Chiffrat *verschleiern*, sodass man aus dem Geheimtext nicht auf den Schlüssel zurückrechnen kann. Wenn du ein einziges Schlüsselbit umlegst, soll sich das Chiffrat auf unvorhersehbare Weise verändern. Das typische Werkzeug dafür ist die Substitution — eine Tabelle, die Bitmuster durch andere ersetzt, in DES sind das die S-Boxen.

Der zweite Begriff ist die **Diffusion**: Sie soll den Einfluss *eines* Klartextsymbols über *viele* Chiffratsymbole *streuen*. Kippst du ein einziges Klartextbit, sollen sich möglichst viele Chiffratbits mitverändern, sodass jede lokale Struktur des Klartextes über den ganzen Block verschmiert wird. Das typische Werkzeug dafür ist die Permutation — das Umsortieren von Bits.

Eine einzige Runde Konfusion oder Diffusion reicht nie aus; die Kunst moderner Blockchiffren ist, beide **abwechselnd in vielen Runden hintereinanderzuschalten**, bis sich der Effekt aufschaukelt. DES tut das 16-mal. Behalte die Zuordnung im Kopf, denn sie ist eine klassische Klausurfrage: Konfusion kommt von den S-Boxen, Diffusion von Expansion und Permutation.

> **Eselsbrücke:** **K**onfusion verschleiert den Schlüssel (Substitution, S-Boxen); **D**iffusion verstreut den Klartext (Permutation). „Confusion confuses the *key*, diffusion diffuses the *text*."

## Die Feistel-Struktur: der geniale Trick

Jetzt der eine Einfall, der DES (und Dutzende spätere Chiffren) erst praktikabel macht. Der 64-Bit-Klartextblock durchläuft zuerst eine feste **Eingangspermutation IP**, die die Bits nach einer Tabelle umsortiert, und wird dann in zwei 32-Bit-Hälften zerlegt, eine linke **L₀** und eine rechte **R₀**. Jede der 16 Runden tut anschließend nur zwei Dinge, und die solltest du wirklich auswendig können:

Die neue linke Hälfte ist einfach die alte rechte: **Lᵢ = Rᵢ₋₁.** Und die neue rechte Hälfte ist die alte linke, XOR-verknüpft mit dem Ergebnis einer geheimnisvollen Funktion f, die auf die alte rechte Hälfte und den Rundenschlüssel angewandt wird: **Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ).** Das gesamte Schaubild von DES besteht aus dieser einen Idee, 16-mal gestapelt; ganz am Ende macht eine Ausgangspermutation **IP⁻¹** die Eingangspermutation wieder rückgängig (es gilt also IP⁻¹(IP(x)) = x), und heraus fällt das Chiffrat y = DESₖ(x).

![Die Gesamtstruktur von DES: Eingangspermutation, 16 Feistel-Runden, Ausgangspermutation](https://upload.wikimedia.org/wikipedia/commons/6/6a/DES-main-network.png "DES als Ganzes: nach der Eingangspermutation IP folgen 16 Feistel-Runden mit je einem eigenen Rundenschlüssel, am Ende die Ausgangspermutation IP⁻¹.")

Fällt dir die Schönheit auf? Pro Runde wird **nur eine Hälfte** wirklich verschlüsselt — die rechte wandert unverändert nach links. Konfusion und Diffusion stecken vollständig in der Funktion f. Und jetzt kommt der wahre Geniestreich: Diese Struktur ist **umkehrbar, ohne dass f selbst umkehrbar sein muss.** f darf eine völlig beliebige, nicht invertierbare Funktion sein — die Feistel-Anordnung garantiert trotzdem, dass man aus Lᵢ und Rᵢ die vorherigen Lᵢ₋₁ und Rᵢ₋₁ exakt zurückrechnen kann. Das ist der Grund, warum die Entschlüsselung im Wesentlichen *dieselbe* Operation ist wie die Verschlüsselung.

![Eine einzelne Feistel-Runde](https://upload.wikimedia.org/wikipedia/commons/f/fa/Feistel_cipher_diagram_en.svg "Eine Feistel-Runde: die rechte Hälfte geht durch f und wird mit der linken ge-XOR-t, dann tauschen die Hälften. Genau diese Anordnung ist auch rückwärts berechenbar.")

### Schritt für Schritt: eine Feistel-Runde vor- und rückwärts

Rechnen wir das einmal mit Mini-Hälften von je 4 Bit, damit der Mechanismus greifbar wird. Angenommen, nach der Eingangspermutation haben wir **L₀ = 1010** und **R₀ = 0110**, und die f-Funktion liefert für diesen Rundenschlüssel den Wert **f(R₀, k₁) = 1101** (die innere Rechnung tun wir gleich, hier nehmen wir das Ergebnis als gegeben an).

- Die neue linke Hälfte: **L₁ = R₀ = 0110.**
- Die neue rechte Hälfte: **R₁ = L₀ ⊕ f(R₀, k₁) = 1010 ⊕ 1101 = 0111.**

Nach Runde 1 steht also L₁ = 0110 und R₁ = 0111. Und jetzt die Entschlüsselung, die zeigt, warum f nicht invertierbar sein muss: Aus L₁ kennen wir sofort wieder **R₀ = L₁ = 0110.** Damit können wir f(R₀, k₁) erneut ausrechnen (es ist wieder 1101) und die linke Hälfte zurückgewinnen: **L₀ = R₁ ⊕ f(R₀, k₁) = 0111 ⊕ 1101 = 1010.** Wir sind exakt wieder bei L₀ = 1010, R₀ = 0110 — ohne f jemals umgekehrt zu haben. Genau dieser Trick wird in der Klausur abgefragt.

> **Eselsbrücke (Feistel):** „rechts geht rein, links wird ge-XOR-t, dann getauscht." Die zwei Zeilen **Lᵢ = Rᵢ₋₁** und **Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ)** musst du vorwärts *und* rückwärts rechnen können.

## Das Innenleben: die f-Funktion

Steigen wir in die f-Funktion hinab, denn dort sitzt die eigentliche Kryptografie. f bekommt zwei Dinge: die 32-Bit-Hälfte Rᵢ₋₁ und den 48-Bit-Rundenschlüssel kᵢ. In vier Schritten macht sie daraus 32 neue Bit.

Zuerst die **Expansion E**: Die 32 Eingangsbits werden auf 48 Bit aufgeweitet, indem die sogenannte E-Box jeweils 4-Bit-Gruppen auf 6 Bit streckt (manche Bits werden dabei doppelt verwendet). Das hat zwei Zwecke — es bringt die Länge auf die 48 Bit des Rundenschlüssels, und es erhöht die Diffusion. Im zweiten Schritt wird dieses 48-Bit-Ergebnis per **XOR mit dem Rundenschlüssel kᵢ** verknüpft; das ist die Stelle, an der das Schlüsselgeheimnis überhaupt in die Rechnung eingeht. Im dritten Schritt kommen die **S-Boxen**: Die 48 Bit werden in acht 6-Bit-Häppchen zerschnitten, und jedes läuft durch eine eigene S-Box (S1 bis S8), die aus 6 Bit genau 4 Bit macht — am Ende sind wir wieder bei 32 Bit. Im vierten Schritt verwürfelt eine **Permutation P** diese 32 Bit so, dass die Ausgangsbits einer einzelnen S-Box in der nächsten Runde gleich *mehrere* S-Boxen füttern — das streut den Einfluss weiter.

![Die vier Schritte der f-Funktion: Expansion, XOR mit dem Rundenschlüssel, S-Boxen, Permutation](https://upload.wikimedia.org/wikipedia/commons/a/a3/DES-f-function.png "Die f-Funktion von DES: Expansion E (32→48 Bit), XOR mit dem Rundenschlüssel, acht S-Boxen (je 6→4 Bit) und die Permutation P.")

> **Eselsbrücke (f-Funktion):** **E – X – S – P** = **E**xpansion → **X**OR mit kᵢ → **S**-Boxen → **P**ermutation. Nur das **S** ist nichtlinear und liefert die Konfusion; **E** und **P** liefern die Diffusion.

Die **S-Boxen sind das Herz von DES**, denn sie sind das einzige *nichtlineare* Element der ganzen Chiffre. Nichtlinear heißt: S(a) ⊕ S(b) ist im Allgemeinen *nicht* gleich S(a ⊕ b) — und genau diese Eigenschaft macht es unmöglich, DES durch simple lineare Gleichungen aufzulösen. Zusammen mit Expansion und Permutation erzeugen die S-Boxen den berühmten **Avalanche-Effekt** (Lawineneffekt): Schon nach der fünften Runde hängt jedes einzelne Chiffratbit von *jedem* Klartextbit und *jedem* Schlüsselbit ab. Eine gute S-Box muss dafür mehrere Kriterien erfüllen, die du als Stichworte kennen solltest: **Vollständigkeit** (jedes Ausgabebit hängt von jedem Eingabebit ab), **Avalanche** (das Kippen eines Eingabebits ändert im Mittel die Hälfte der Ausgabebits), **Nichtlinearität** und **Korrelationsimmunität** (aus einem Teil der Bits lässt sich nichts über den Rest schließen).

### Schritt für Schritt: eine S-Box nachschlagen

Das Nachschlagen einer S-Box wird fast immer abgefragt, also machen wir es einmal sauber vor. Eine S-Box bekommt 6 Bit und liefert 4 Bit, und der Trick steckt in der Adressierung: Die **äußeren beiden Bits** — das allererste und das allerletzte — bilden die **Zeilennummer** (0 bis 3), die **inneren vier Bits** die **Spaltennummer** (0 bis 15). Nimm als Beispiel die Eingabe **101101** für die S-Box 1:

- Äußere Bits: das erste ist 1, das letzte ist 1 → zusammen 11 binär = **Zeile 3**.
- Innere Bits: die mittleren vier sind 0110 → binär 6 = **Spalte 6**.
- In der offiziellen Tabelle der S-Box 1 steht in Zeile 3, Spalte 6 der Wert **1** — als 4-Bit-Zahl geschrieben **0001**.

Die Eingabe 101101 wird von S1 also auf 0001 abgebildet. Beachte, wie verlustreich das ist: Aus 64 möglichen Eingaben werden nur 16 mögliche Ausgaben — viele Eingaben landen auf demselben Ausgang, und genau das macht die S-Box nicht-umkehrbar (was dank Feistel kein Problem ist).

### Schritt für Schritt: Nichtlinearität einer S-Box beweisen

Hier ist die andere beliebte Aufgabe: zeigen, dass eine S-Box nichtlinear ist. Wäre S1 linear, müsste für alle Eingaben S1(x₁) ⊕ S1(x₂) = S1(x₁ ⊕ x₂) gelten. Wir suchen ein Gegenbeispiel mit x₁ = 000000 und x₂ = 000001:

- **S1(000000):** äußere Bits 0 und 0 → Zeile 0; innere 0000 → Spalte 0; Tabellenwert 14 = **1110**.
- **S1(000001):** äußere Bits 0 und 1 → Zeile 1; innere 0000 → Spalte 0; Tabellenwert 0 = **0000**.
- **x₁ ⊕ x₂ = 000001**, also S1(x₁ ⊕ x₂) = S1(000001) = **0000**.

Jetzt vergleichen wir: die linke Seite ist S1(x₁) ⊕ S1(x₂) = 1110 ⊕ 0000 = **1110**, die rechte Seite ist S1(x₁ ⊕ x₂) = **0000**. Da 1110 ≠ 0000, ist die Gleichung verletzt — die S-Box ist also **nichtlinear**. Mehr ist für den Beweis nicht nötig: ein einziges Gegenbeispiel genügt.

## Der Schlüsselfahrplan: woher die 16 Rundenschlüssel kommen

Jede der 16 Runden braucht ihren eigenen 48-Bit-Rundenschlüssel kᵢ, und alle werden aus dem einen 64-Bit-Hauptschlüssel erzeugt. Den Anfang macht die **Permuted Choice 1 (PC-1)**: Sie wirft jedes achte Bit weg — das waren ursprünglich Paritätsbits zur Fehlererkennung, daher die Lücke zwischen 64 eingegebenen und 56 wirksamen Bit — und permutiert den Rest auf 56 Bit, die in zwei 28-Bit-Hälften C₀ und D₀ zerfallen. In jeder Runde werden diese beiden Hälften dann **rotiert** (ein Linksrotieren, kein bloßes Schieben): um genau 1 Bit in den Runden 1, 2, 9 und 16, in allen übrigen Runden um 2 Bit. Aus den so verschobenen Hälften wählt die **Permuted Choice 2 (PC-2)** schließlich 48 Bit aus, und das ist der Rundenschlüssel kᵢ.

Ein hübsches Detail, das die Entschlüsselung erst möglich macht: Zählt man alle Rotationen zusammen, ergibt sich 4×1 + 12×2 = 28 — also genau eine volle Umdrehung der 28-Bit-Hälften. Deshalb gilt am Ende **C₀ = C₁₆ und D₀ = D₁₆**; der Schlüsselfahrplan schließt sich zum Kreis, und beim Entschlüsseln kann man ihn einfach rückwärts (rechts rotierend) durchlaufen.

> **Eselsbrücke (Rotationen):** nur **1 Bit** in den Runden **1, 2, 9, 16** — sonst immer **2 Bit**. Vier Einer plus zwölf Zweier ergeben 28 = eine volle Runde, also ist man am Ende wieder am Anfang (C₀ = C₁₆).

## Entschlüsselung und das Ende von DES

Dank der Feistel-Struktur ist die **Entschlüsselung dieselbe Operation** wie die Verschlüsselung — man dreht nur den Schlüsselfahrplan um: Die Rundenschlüssel werden in umgekehrter Reihenfolge k₁₆, k₁₅, …, k₁ angewandt, was man durch Rechtsrotieren statt Linksrotieren erreicht. Die erste Entschlüsselungsrunde macht die letzte Verschlüsselungsrunde rückgängig, und so weiter. Diese Symmetrie spart enorm Hardware, denn man braucht nur eine einzige Schaltung für beide Richtungen.

Wie steht es um die Sicherheit? Die ernüchternde Bilanz: **Mathematisch ist DES erstaunlich robust** — trotz jahrzehntelanger Angriffe wurde keine praktikable strukturelle Schwäche gefunden, und die S-Boxen haben sich als hervorragend gewählt erwiesen. Das Problem ist allein der **zu kurze 56-Bit-Schlüssel**: Mit heutiger Hardware lässt sich der Schlüsselraum von 2⁵⁶ in Stunden komplett durchprobieren. Die naheliegende Rettung heißt **Triple-DES (3DES)**: dreimal DES hintereinander im Muster Encrypt–Decrypt–Encrypt, was eine **effektive Schlüssellänge von 112 Bit** ergibt (nicht 168, weil ein Meet-in-the-Middle-Angriff einen Teil der Stärke auffrisst). Genau deshalb steckt DES beziehungsweise 3DES bis heute in EC-Karten und Ausweisdokumenten. Die Nachteile bleiben aber: DES ist in Software langsam (3DES dreimal langsamer), die Blockgröße von nur 64 Bit ist klein, und gegen Quantencomputer ist es ohnehin nicht gewappnet. Genau diese Schwächen motivieren den Nachfolger AES, den wir im nächsten Kapitel bauen.

## Auf den Punkt

Die Kurzfassung der ganzen Geschichte: DES ist eine **Blockchiffre** mit 64-Bit-Blöcken, 56 wirksamen Schlüssel-Bit und **16 Runden**. Jede Runde mischt die zwei Shannon-Zutaten — **Konfusion** (Schlüssel-Chiffrat-Zusammenhang verschleiern, über die S-Boxen) und **Diffusion** (ein Klartextbit über viele Chiffratbits streuen, über Expansion und Permutation). Zusammengehalten wird alles von der **Feistel-Struktur** Lᵢ = Rᵢ₋₁ und Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ), die das Entschlüsseln zur selben Operation macht und es erlaubt, dass f gar nicht umkehrbar ist. Im Inneren der f-Funktion sitzt die Kette **E-X-S-P** (Expansion, XOR mit dem Rundenschlüssel, die nichtlinearen S-Boxen, Permutation), die nach fünf Runden den **Avalanche-Effekt** erzeugt. Der **Schlüsselfahrplan** (PC-1, Rotationen, PC-2) liefert die 16 Rundenschlüssel und schließt sich zum Kreis (C₀ = C₁₆). Mathematisch ist DES robust, aber der Schlüssel ist zu kurz — daher **Triple-DES** mit 112 Bit effektiver Länge.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Blockchiffre** | verschlüsselt feste Blöcke (DES: 64 Bit) statt einzelner Bits |
| **Konfusion** | Zusammenhang Schlüssel ↔ Chiffrat verschleiern (S-Boxen) |
| **Diffusion** | ein Klartextbit auf viele Chiffratbits streuen (Expansion, Permutation) |
| **Feistel-Struktur** | Lᵢ = Rᵢ₋₁, Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ) |
| **f-Funktion** | E → XOR kᵢ → S-Boxen → P |
| **S-Box** | bildet 6 Bit auf 4 Bit ab; nichtlinear; kryptografischer Kern |
| **Avalanche-Effekt** | nach Runde 5 hängt jedes Bit von jedem Klartext- und Schlüsselbit ab |
| **IP / IP⁻¹** | Eingangs- und Ausgangspermutation (zueinander invers) |
| **PC-1 / PC-2** | Schlüsselfahrplan: 64 → 56 Bit / Auswahl des 48-Bit-Rundenschlüssels |
| **Triple-DES (3DES)** | dreimal DES (EDE), 112 Bit effektive Schlüssellänge |

## Typische Fallen

- **DES-Schlüssel: 64 oder 56 Bit?** Eingegeben werden 64, *wirksam* sind nur 56 — die 8 Paritätsbits fallen in PC-1 weg.
- **S-Boxen = Diffusion? Nein.** S-Boxen liefern **Konfusion** (sie sind nichtlinear). Die Diffusion kommt von Expansion und Permutation.
- **Feistel braucht eine umkehrbare f-Funktion? Nein** — gerade nicht. Der ganze Witz ist, dass f beliebig sein darf und die Struktur trotzdem umkehrbar bleibt.
- **DES ist mathematisch geknackt? Nein.** Es ist nur der *Schlüssel zu kurz* — der einzige praktikable Angriff ist Brute-Force.
- **3DES = dreifacher Schlüssel = 168 Bit Sicherheit? Nein.** Effektiv sind es nur **112 Bit** (Meet-in-the-Middle), und das Muster ist EDE (Encrypt-Decrypt-Encrypt), nicht EEE.
- **Zeile/Spalte der S-Box vertauscht?** Die *äußeren* zwei Bit sind die Zeile, die *inneren* vier die Spalte — nicht umgekehrt.

## Klausur-Fokus

Das zugehörige Übungsblatt mischt drei Welten, also bereite alle drei vor. Erstens die **Stromchiffren-Reste** aus dem letzten Kapitel: Du sollst die **Vernam-Chiffre** (Vigenère mit Schlüssel so lang wie der Klartext) per Hand verschlüsseln — Buchstaben in Zahlen, plus Schlüssel, mod 26; etwa wird aus „VORLESUNG" mit dem Schlüssel „SECUNIDUE" das Chiffrat „NSTFRAXHK". Du sollst den **Schlüsselraum zählen** (für Klartextlänge n gibt es 26ⁿ Schlüssel; eine doppelte Vernam-Verschlüsselung bringt nichts, weil zwei Additionen mod 26 wieder nur einer Addition entsprechen — der Raum bleibt 26ⁿ) und daraus eine **Brute-Force-Dauer** abschätzen (Anzahl Schlüssel × Operationen pro Schlüssel ÷ Operationen pro Sekunde). Und du sollst den **Bit-Flip-Angriff** auf eine Stromchiffre durchführen (Bit im Chiffrat kippen kippt dasselbe Klartextbit; bei bekanntem Klartext den Schlüsselstrom als s = y ⊕ x bestimmen) — die volle Mechanik dazu steht im vorigen Kapitel.

Zweitens das **DES-Wissen**: ein **Feistelnetzwerk skizzieren** (mindestens zwei Runden, mit IP, der Teilung in L und R, der f-Funktion und dem Tausch); **Konfusion und Diffusion** definieren und die DES-Bausteine zuordnen (Konfusion = S-Boxen, Diffusion = Expansion + Permutation); die **Schlüssellängen-Geschichte** kennen (ursprünglich 128 Bit, von der NSA auf effektiv 56 reduziert); die vier Schritte **E-X-S-P** und den **Avalanche-Effekt** erklären; und den **Schlüsselfahrplan** (PC-1 → Rotation → PC-2, C₀ = C₁₆) beschreiben.

Drittens die **Rechnerei an der S-Box**: eine **S-Box nachschlagen** (äußere Bits = Zeile, innere Bits = Spalte) und die **Nichtlinearität beweisen**, indem du an konkreten 6-Bit-Eingaben zeigst, dass S(x₁) ⊕ S(x₂) ≠ S(x₁ ⊕ x₂). Als Bonus tauchen die **schwachen Schlüssel** auf — Hauptschlüssel, deren Rundenschlüssel alle gleich sind, sodass Ver- und Entschlüsselung identisch werden (es gibt davon genau 4).

## Mehr dazu

- **Computerphile — Feistel Cipher** (~8 Min., EN): die Feistel-Idee anschaulich — warum Ver- und Entschlüsselung dieselbe Operation sind. https://www.youtube.com/watch?v=FGhj3CGxl8I
- **Neso Academy — Feistel Cipher Structure** (EN): ruhiger, tafelartiger Durchgang der Struktur und der Designparameter. https://www.youtube.com/watch?v=8l9xAvuGJFo
- **DES-Zusatzmaterial (Wikipedia)** — IP, Expansion E, alle S-Boxen und die Permutation P als fertige Tabellen zum Nachschlagen beim Üben. https://en.wikipedia.org/wiki/DES_supplementary_material`,
  },
};

const lecture04: Explanation = {
  id: "cs-2025-l04",
  lesson: 4,
  title: {
    de: "AES, Betriebsmodi und der Einstieg in die asymmetrische Kryptografie", en: "AES, operating modes and getting started with asymmetric cryptography", tr: "AES, çalışma modları ve asimetrik şifrelemeye başlama", ar: "AES وأوضاع التشغيل والبدء في التشفير غير المتماثل", ru: "AES, режимы работы и начало работы с асимметричной криптографией", it: "AES, modalità operative e introduzione alla crittografia asimmetrica", es: "AES, modos de funcionamiento y primeros pasos con la criptografía asimétrica", fr: "AES, modes de fonctionnement et initiation à la cryptographie asymétrique", zh: "AES、操作模式和非对称加密入门", pl: "AES, tryby pracy i pierwsze kroki z kryptografią asymetryczną", pt: "AES, modos de operação e introdução à criptografia assimétrica", uk: "AES, режими роботи та початок роботи з асиметричною криптографією", fa: "AES، حالت های عملیاتی و شروع با رمزنگاری نامتقارن", ja: "AES、動作モード、および非対称暗号化の開始", ko: "AES, 작동 모드 및 비대칭 암호화 시작하기", vi: "AES, các chế độ hoạt động và bắt đầu với mật mã bất đối xứng", hi: "एईएस, ऑपरेटिंग मोड और असममित क्रिप्टोग्राफी के साथ शुरुआत करना", ur: "AES، آپریٹنگ موڈز اور غیر متناسب خفیہ نگاری کے ساتھ شروعات کرنا", nl: "AES, bedieningsmodi en aan de slag met asymmetrische cryptografie", el: "AES, τρόποι λειτουργίας και έναρξη με ασύμμετρη κρυπτογραφία", cs: "AES, provozní režimy a začátky s asymetrickou kryptografií", hu: "AES, működési módok és az aszimmetrikus kriptográfia használatának megkezdése", ro: "AES, moduri de operare și început cu criptografia asimetrică", sq: "AES, mënyrat e funksionimit dhe fillimi me kriptografinë asimetrike", sr: "АЕС, режими рада и почетак рада са асиметричном криптографијом", hr: "AES, načini rada i početak rada s asimetričnom kriptografijom", bg: "AES, режими на работа и първи стъпки с асиметрична криптография", sv: "AES, driftlägen och komma igång med asymmetrisk kryptografi", fi: "AES, toimintatilat ja epäsymmetrisen salauksen aloittaminen", id: "AES, mode pengoperasian dan memulai kriptografi asimetris", th: "AES โหมดการทำงาน และการเริ่มต้นใช้งานการเข้ารหัสแบบอสมมาตร", sw: "AES, njia za uendeshaji na kuanza kutumia kriptografia isiyolinganishwa",
  },
  content: {
    de: `Dieses Kapitel hat drei Akte, und sie bauen aufeinander auf. Im ersten lernst du den Nachfolger von DES kennen — **AES**, die Chiffre, die heute fast das gesamte Internet verschlüsselt und ganz anders gebaut ist als DES (Schichten statt Feistel). Im zweiten klären wir eine Frage, die jede Blockchiffre offen lässt: Was tut man eigentlich mit Nachrichten, die länger sind als ein einzelner Block? Das beantworten die **Betriebsmodi** ECB, CBC und OFB — und einer davon (ECB) ist eine wunderschöne Lektion darüber, wie man eine starke Chiffre durch falsche Anwendung wieder kaputt macht. Im dritten Akt stoßen wir an die Wand, vor der alle symmetrischen Verfahren stehen: Wie tauschen Alice und Bob den geheimen Schlüssel überhaupt aus, wenn der einzige Kanal das abgehörte Internet ist? Die Antwort ist eine der größten Ideen der Informatik — die **asymmetrische Kryptografie** mit ihrem öffentlichen und privaten Schlüsselpaar, die wir hier aufschlagen und im nächsten Kapitel mit RSA vollenden.

## AES: vier Schichten statt einer Feistel-Struktur

Als klar wurde, dass DES mit seinen 56 Bit zu schwach geworden war, schrieb das NIST 1997 einen offenen, weltweiten Wettbewerb für einen Nachfolger aus — anders als bei DES diesmal völlig transparent, mit drei öffentlichen Evaluierungsrunden. Gefordert waren Effizienz in Software *und* Hardware, hohe Sicherheit und drei wählbare Schlüssellängen. 1999 erreichten fünf Finalisten die letzte Runde, und 2000 gewann der belgische Entwurf **Rijndael** von Joan Daemen und Vincent Rijmen — seither heißt er **Advanced Encryption Standard (AES)**. Stell ihn dir am besten im direkten Vergleich zu DES vor, denn die Unterschiede sind genau das, was abgefragt wird:

| | DES | AES |
|---|---|---|
| Blockgröße | 64 Bit | **128 Bit** |
| Schlüssel | 56 Bit | 128 / 192 / 256 Bit |
| Runden | 16 | **10 / 12 / 14** |
| Struktur | Feistel (nur eine Hälfte pro Runde) | **Schichten** (ganze 128 Bit pro Runde) |
| arbeitet auf | einzelnen Bits | ganzen **Bytes** |

Der wichtigste Unterschied steckt in der Zeile „Struktur". DES verschlüsselte pro Runde nur eine seiner zwei Hälften; AES bearbeitet in *jeder* Runde den **kompletten** 128-Bit-Block, indem es mehrere Schichten hintereinander anwendet. Die Anzahl der Runden hängt an der Schlüssellänge: 10 Runden bei 128 Bit, 12 bei 192, 14 bei 256. Man stellt sich den 128-Bit-Block dabei als eine 4×4-Matrix aus 16 Bytes vor, den sogenannten **State**, der von Schicht zu Schicht umgeformt wird.

## Die vier Schichten einer AES-Runde

Eine AES-Runde besteht aus vier Schichten, die der Reihe nach auf den State wirken. Verstehst du, was jede tut und ob sie für Konfusion oder Diffusion sorgt, hast du AES verstanden.

Die erste Schicht ist **SubBytes**, die Byte-Substitution: Jedes der 16 Bytes wird durch eine **S-Box** ersetzt. Hier zeigt sich der erste große Unterschied zu DES — AES hat nur *eine* einzige S-Box (8 Bit hinein, 8 Bit heraus), und sie ist keine zufällig aussehende Tabelle, sondern eine saubere mathematische Operation über dem endlichen Körper GF(2⁸), bestehend aus einer Inversenbildung und einer affinen Abbildung. SubBytes ist das **einzige nichtlineare** Element von AES und liefert damit die gesamte **Konfusion**.

![AES-Schicht SubBytes: jedes Byte des State wird durch die S-Box ersetzt](https://upload.wikimedia.org/wikipedia/commons/a/a4/AES-SubBytes.svg "SubBytes: jedes der 16 State-Bytes läuft durch dieselbe AES-S-Box. Das ist das einzige nichtlineare Element und liefert die Konfusion.")

Die zweite Schicht ist **ShiftRows**: Die vier Zeilen der State-Matrix werden zyklisch verschoben — die erste bleibt, die zweite um eine, die dritte um zwei, die vierte um drei Positionen. Das mischt Bytes über die Spaltengrenzen hinweg und sorgt für **Diffusion**.

![AES-Schicht ShiftRows: die Zeilen des State werden zyklisch verschoben](https://upload.wikimedia.org/wikipedia/commons/6/66/AES-ShiftRows.svg "ShiftRows: jede Zeile der State-Matrix wird um eine wachsende Zahl von Positionen zyklisch verschoben — eine Diffusionsschicht.")

Die dritte Schicht ist **MixColumns**: Jede Spalte des State wird mit einer festen 4×4-Matrix multipliziert (im Galois-Körper), wodurch sich die vier Bytes einer Spalte gründlich vermischen. ShiftRows und MixColumns zusammen erzeugen die Diffusion, und sie tun das so wirkungsvoll, dass schon nach **zwei Runden** jedes einzelne State-Byte von *allen 16* Klartext-Bytes abhängt.

![AES-Schicht MixColumns: jede Spalte wird mit einer festen Matrix multipliziert](https://upload.wikimedia.org/wikipedia/commons/7/76/AES-MixColumns.svg "MixColumns: jede Spalte des State wird mit einer festen Matrix multipliziert und dadurch durchmischt — die zweite Diffusionsschicht.")

Die vierte Schicht ist **AddRoundKey**: Der State wird Byte für Byte per XOR mit dem aktuellen Rundenschlüssel verknüpft — erst hier fließt das Schlüsselgeheimnis ein. Zwei Feinheiten solltest du dir merken, weil sie gern gefragt werden: AES benutzt **Key Whitening**, das heißt, es gibt ein zusätzliches AddRoundKey schon *vor* der ersten Runde und eines am Ende, damit der Angreifer nie einen unverschlüsselten Zwischenzustand sieht. Und die **allerletzte Runde lässt MixColumns weg** — das macht die Entschlüsselung symmetrischer, ohne die Sicherheit zu verändern. Die 16 Rundenschlüssel erzeugt ein wortbasierter **Schlüsselfahrplan** (ein Wort sind 32 Bit): Eine nichtlineare g-Funktion (Rotation, S-Box-Substitution, Addition einer Rundenkonstante) speist sich rekursiv durch die Wörter. AES ist dadurch in Soft- und Hardware sehr schnell — Intel-Prozessoren haben sogar einen eigenen Befehlssatz **AES-NI** dafür —, und die NSA gibt AES-128 für SECRET und AES-192/256 für TOP SECRET frei. [Spanning Tree animiert die ganze Runde sehr klar](https://www.youtube.com/watch?v=C4ATDMIz5wc).

> **Eselsbrücke (AES-Runde):** **S – S – M – A** = **S**ubBytes → **S**hiftRows → **M**ixColumns → **A**ddRoundKey. Nur das *erste* S (SubBytes) ist nichtlinear und liefert Konfusion; ShiftRows und MixColumns sind Diffusion. Und: die **letzte Runde ohne MixColumns**.

## Betriebsmodi: wie man mehr als einen Block verschlüsselt

AES verschlüsselt genau 16 Byte auf einmal, DES genau 8. Aber echte Nachrichten sind länger. Ein **Betriebsmodus** legt fest, wie man die Blockchiffre wiederholt anwendet, um eine beliebig lange Nachricht zu verschlüsseln — und die Wahl des Modus entscheidet über Sicherheit oder Desaster.

Der naive Modus heißt **ECB (Electronic Codebook)**: Man zerlegt die Nachricht in Blöcke, verschlüsselt jeden einzeln und hängt die Chiffrate aneinander; passt der letzte Block nicht genau, füllt man ihn mit einem Padding auf. Das klingt harmlos, hat aber einen tödlichen Fehler: ECB ist **deterministisch**. Derselbe Klartextblock ergibt bei demselben Schlüssel *immer* dasselbe Chiffrat. Verschlüsselt man damit ein Bild, bleiben alle Flächen gleicher Farbe auch im Chiffrat als gleiche Muster sichtbar — das berühmteste Beispiel ist der Linux-Pinguin Tux, dessen Umrisse nach der ECB-Verschlüsselung immer noch klar zu erkennen sind:

![Das Originalbild des Pinguins Tux vor der Verschlüsselung](https://upload.wikimedia.org/wikipedia/commons/5/56/Tux.jpg "Tux im Original — gleich sehen wir, was der ECB-Modus daraus macht.")

![Tux im ECB-Modus verschlüsselt — die Umrisse bleiben klar sichtbar](https://upload.wikimedia.org/wikipedia/commons/f/f0/Tux_ecb.jpg "Tux nach ECB-Verschlüsselung: weil gleiche Klartextblöcke immer gleich verschlüsselt werden, bleibt das Muster erhalten. Genau deshalb ist ECB unsicher.")

Schlimmer noch: Weil jeder Block für sich verschlüsselt wird, kann ein Angreifer ganze Chiffratblöcke austauschen oder umsortieren, ohne den Schlüssel zu kennen — etwa seine eigene verschlüsselte Kontonummer in den Block einer fremden Überweisung kopieren. Die Lehre: **ECB niemals für echte Daten benutzen.**

Die Rettung sind **probabilistische** Modi, die mit einem zufälligen **Initialisierungsvektor (IV)** dafür sorgen, dass gleiche Klartexte verschiedene Chiffrate ergeben. Der wichtigste ist **CBC (Cipher Block Chaining)**: Vor dem Verschlüsseln wird jeder Klartextblock per XOR mit dem *vorherigen Chiffratblock* verkettet, also yᵢ = eₖ(xᵢ ⊕ yᵢ₋₁); der allererste Block wird mit dem IV ge-XOR-t: y₁ = eₖ(x₁ ⊕ IV). So fließt jeder Block in den nächsten ein, und identische Klartextblöcke werden je nach Vorgeschichte unterschiedlich verschlüsselt. Der dritte Modus, **OFB (Output Feedback)**, verwandelt die Blockchiffre in eine Stromchiffre: Aus dem IV erzeugt man einen Schlüsselstrom (s₁ = eₖ(IV), sᵢ = eₖ(sᵢ₋₁)) und legt ihn per XOR auf den Klartext (yᵢ = sᵢ ⊕ xᵢ).

![Cipher Block Chaining (CBC): jeder Block wird vor der Verschlüsselung mit dem vorherigen Chiffrat verkettet](https://upload.wikimedia.org/wikipedia/commons/8/80/CBC_encryption.svg "CBC: jeder Klartextblock wird per XOR mit dem vorherigen Chiffrat verknüpft, der erste mit dem Initialisierungsvektor — so wird die Verschlüsselung probabilistisch.")

### Schritt für Schritt: ECB, CBC und OFB von Hand

Genau das rechnet das Übungsblatt, also machen wir es einmal vollständig vor. Wir nehmen die winzige Blockchiffre mit 5-Bit-Blöcken, die die Bits nur umsortiert: **e(b₁b₂b₃b₄b₅) = (b₂b₅b₄b₁b₃)**. Der Klartext ist x = **01101 11011 11010 00110**, und für CBC und OFB ist IV = **11001**.

**ECB** verschlüsselt jeden Block für sich. Beim ersten Block 01101 ist b₁=0, b₂=1, b₃=1, b₄=0, b₅=1, also e(01101) = (b₂,b₅,b₄,b₁,b₃) = 11001. Genauso die anderen drei Blöcke: 11011 → 11110, 11010 → 10110, 00110 → 00101. Das Chiffrat ist **y = 11001 11110 10110 00101**.

**CBC** verkettet. Zuerst x₁ ⊕ IV = 01101 ⊕ 11001 = 10100, dann e(10100) = 00011, also y₁ = **00011**. Der zweite Block: x₂ ⊕ y₁ = 11011 ⊕ 00011 = 11000, dann e(11000) = 10010, also y₂ = **10010**. Schon hier siehst du den Effekt — obwohl der erste und kein weiterer Block je gleich aussehen, hängt jedes Chiffrat von allem davor ab.

**OFB** erzeugt zuerst einen Schlüsselstrom aus dem IV. s₁ = e(IV) = e(11001) = 11010, und y₁ = s₁ ⊕ x₁ = 11010 ⊕ 01101 = **10111**. Dann s₂ = e(s₁) = e(11010) = 10110, und y₂ = s₂ ⊕ x₂ = 10110 ⊕ 11011 = **01101**. Hier wird die Blockchiffre nur noch benutzt, um Zufallsbits zu erzeugen — verschlüsselt wird wie bei einer Stromchiffre per XOR.

> **Eselsbrücke (ECB-Pinguin):** Erkennst du im Chiffrat noch den Pinguin, war es ECB. **Gleicher Block → gleiches Chiffrat** = deterministisch = unsicher. CBC und OFB würfeln das per IV durch.

## Die Wand der symmetrischen Kryptografie

So stark AES auch ist — es teilt mit jeder symmetrischen Chiffre drei eingebaute Schwächen, und genau die motivieren den nächsten großen Sprung. Die erste und schwerwiegendste ist das **Schlüsselaustauschproblem**: Alice und Bob brauchen denselben geheimen Schlüssel, aber der einzige Kanal zwischen ihnen ist das Internet — und genau dort lauscht Oskar. Schickt Alice den Schlüssel über diesen Kanal, hat Oskar ihn sofort. Die zweite Schwäche ist die **Anzahl der Schlüssel**: Jedes Paar von Teilnehmern braucht seinen eigenen geheimen Schlüssel, und das wächst quadratisch — bei 120 Mitarbeitern sind das schon 120·119/2 = 7140 Schlüssel, die alle erzeugt, verteilt und geheim gehalten werden müssen. Die dritte Schwäche ist die fehlende **Nichtabstreitbarkeit (Non-Repudiation)**: Weil beide Seiten denselben Schlüssel besitzen, kann man im Streitfall nicht beweisen, *wer* von beiden eine Nachricht erzeugt hat — beide hätten es gekonnt.

## Asymmetrische Kryptografie: der öffentliche Briefkasten

Die Lösung ist so elegant, dass sie bei der Veröffentlichung 1976 (durch Whitfield Diffie, Martin Hellman und Ralph Merkle; das RSA-Verfahren folgte 1977, und Großbritanniens Geheimdienst kannte das Prinzip schon 1972) wie ein Zaubertrick wirkte. Statt eines einzigen geheimen Schlüssels bekommt jede Person ein **Schlüsselpaar** aus einem öffentlichen Schlüssel k_pub und einem privaten Schlüssel k_pr. Und jetzt der verblüffende Teil: **Der Schlüssel zum Verschlüsseln ist nicht geheim.** Das beste Bild dafür ist ein öffentlicher Briefkasten. Jeder darf einen Brief einwerfen — das entspricht dem Verschlüsseln mit dem öffentlichen Schlüssel, den die ganze Welt kennen darf. Aber leeren, also entschlüsseln, kann den Kasten nur, wer den privaten Schlüssel besitzt. Will Bob also Alice etwas Geheimes schicken, verschlüsselt er es mit *Alices* öffentlichem Schlüssel; nur Alice kann es mit ihrem privaten wieder lesen — und das Schlüsselaustauschproblem löst sich in Luft auf, denn der öffentliche Schlüssel darf ruhig über den abgehörten Kanal wandern.

![Asymmetrische Verschlüsselung: mit dem öffentlichen Schlüssel verschlüsseln, mit dem privaten entschlüsseln](https://upload.wikimedia.org/wikipedia/commons/f/f0/Orange_blue_public_key_cryptography_en.svg "Asymmetrisch: verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers, entschlüsselt nur mit dessen privatem Schlüssel. Der öffentliche Briefkasten in einem Bild.")

Damit das überhaupt funktionieren kann, braucht jedes asymmetrische Verfahren eine **Einwegfunktion** — eine Funktion, deren Vorwärtsrichtung y = f(x) leicht zu berechnen ist, deren Umkehrung x = f⁻¹(y) aber praktisch unmöglich bleibt. Zwei solche Funktionen tragen die ganze Public-Key-Welt: die **Faktorisierung großer Zahlen** (man multipliziert zwei riesige Primzahlen mühelos, aber das Produkt wieder in seine Faktoren zu zerlegen ist aussichtslos) — darauf baut RSA — und der **diskrete Logarithmus**, auf dem Diffie-Hellman und die elliptischen Kurven beruhen. Mehr als diese drei großen Familien (RSA, Diffie-Hellman, elliptische Kurven) gibt es im Grunde nicht.

> **Eselsbrücke (öffentlich vs. privat):** **verschlüsseln mit öffentlich, entschlüsseln mit privat** — wie ein Briefkasten: einwerfen darf jeder, leeren nur der Besitzer.

### Schritt für Schritt: ein RSA-Schlüsselpaar erzeugen und benutzen

RSA setzt die Faktorisierungs-Einwegfunktion in fünf Schritten um, und das Übungsblatt lässt dich genau das mit kleinen Zahlen durchrechnen. Die fünf Schritte der Schlüsselerzeugung sind: **(1)** zwei große Primzahlen p und q wählen; **(2)** ihr Produkt N = p·q bilden; **(3)** Eulers Totient T = (p−1)·(q−1) berechnen; **(4)** zwei Zahlen e und d so wählen, dass (e·d) mod T = 1 ist (wobei e teilerfremd zu T und kleiner als T sein muss); **(5)** den öffentlichen Schlüssel als Paar (N, e) und den privaten als (N, d) festlegen. Verschlüsselt wird dann mit y = xᵉ mod N und entschlüsselt mit x = yᵈ mod N (für jeden Klartextwert x < N).

Rechnen wir das mit den winzigen Übungswerten p = 2, q = 7. Dann ist N = 2·7 = 14 und T = (2−1)·(7−1) = 6. Wir wählen e = 5 (teilerfremd zu 6) und suchen d mit (5·d) mod 6 = 1 — das ist d = 11, denn 5·11 = 55 und 55 mod 6 = 1. Damit ist der **öffentliche Schlüssel (14, 5)** und der **private Schlüssel (14, 11)**. Verschlüsseln wir die Nachricht **BCD**, also mit der Buchstabentabelle die Zahlen B = 1, C = 2, D = 3, jeweils mit y = x⁵ mod 14:

- B = 1: 1⁵ = 1, und 1 mod 14 = **1**.
- C = 2: 2⁵ = 32, und 32 mod 14 = **4**.
- D = 3: 3⁵ = 243, und 243 mod 14 = **5** (denn 17·14 = 238).

Das Chiffrat ist also die Zahlenfolge **1, 4, 5**. Zur Probe entschlüsseln wir mit x = y¹¹ mod 14: 1¹¹ mod 14 = 1 (B), 4¹¹ mod 14 = 2 (C) und 5¹¹ mod 14 = 3 (D) — wir landen wieder bei BCD. (Beim Nachrechnen der Potenzen reduzierst du natürlich nach jedem Schritt modulo 14, genau die clevere Technik aus dem zweiten Kapitel.) *Warum* RSA funktioniert — warum das Verschlüsseln mit e und das Entschlüsseln mit d sich exakt aufheben —, das ist die Mathematik des nächsten Kapitels.

## Warum man am Ende beides braucht: Hybridprotokolle

Es gibt einen Haken, der erklärt, warum die asymmetrische Kryptografie die symmetrische *nicht* ersetzt hat: Sie ist **dramatisch langsamer**. Rechne es am Beispiel eines 1-GB-Videos durch. Mit einer typischen RSA-Geschwindigkeit von 100 kbit/s bräuchtest du rund 80 000 Sekunden, also über 22 Stunden. Dasselbe Video mit AES bei 17 Mbit/s ist in etwa 8 Minuten fertig. Asymmetrische Verfahren sind also um Größenordnungen teurer, und sie brauchen für dieselbe Sicherheit auch viel längere Schlüssel — 128 Bit symmetrisch entsprechen grob 3072 Bit bei RSA. Deshalb vergleicht man Schlüssellängen niemals zwischen den beiden Welten.

| symmetrisch | elliptische Kurven | RSA / Diffie-Hellman |
|---|---|---|
| 64 Bit | 128 Bit | 700 Bit |
| 128 Bit | 256 Bit | 3072 Bit |

Die Praxis nimmt deshalb das Beste aus beiden Welten und kombiniert sie in einem **Hybridprotokoll**, wie es SSL/TLS hinter jedem „https" tut: Man benutzt die langsame asymmetrische Kryptografie nur ein einziges Mal am Anfang, um einen frischen symmetrischen Sitzungsschlüssel sicher auszutauschen — und verschlüsselt danach die eigentlichen, großen Datenmengen schnell und symmetrisch mit AES. So löst der asymmetrische Teil das Schlüsselaustauschproblem, und der symmetrische Teil liefert das Tempo.

## Auf den Punkt

Die Kurzfassung der drei Akte: **AES** löste DES ab und ist anders gebaut — 128-Bit-Blöcke, Schlüssel mit 128/192/256 Bit, 10/12/14 Runden, und statt Feistel arbeitet es mit vier Schichten, die jede Runde den ganzen Block bearbeiten: **SubBytes** (die einzige nichtlineare Schicht, Konfusion), **ShiftRows** und **MixColumns** (Diffusion) und **AddRoundKey** (Schlüssel per XOR einbringen), mit Key Whitening und ohne MixColumns in der letzten Runde. Für Nachrichten, die länger als ein Block sind, braucht man einen **Betriebsmodus**: **ECB** (deterministisch, deshalb unsicher — der Pinguin bleibt sichtbar), **CBC** (verkettet jeden Block per XOR mit dem vorherigen Chiffrat plus IV) oder **OFB** (macht aus der Blockchiffre eine Stromchiffre). Symmetrisch stößt an drei Grenzen — Schlüsselaustausch, quadratisch viele Schlüssel, keine Nichtabstreitbarkeit —, die die **asymmetrische Kryptografie** mit einem öffentlich/privaten Schlüsselpaar und einer **Einwegfunktion** löst (Faktorisierung bei RSA, diskreter Logarithmus bei Diffie-Hellman/ECC). Weil asymmetrisch viel langsamer ist, kombiniert die Praxis beides **hybrid** (TLS).

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **AES / Rijndael** | Schicht-Blockchiffre, 128-Bit-Block, 10/12/14 Runden |
| **State** | 4×4-Byte-Matrix, auf der AES arbeitet |
| **SubBytes** | S-Box-Ersetzung; einziges nichtlineares Element (Konfusion) |
| **ShiftRows / MixColumns** | Zeilen verschieben / Spalten mischen (Diffusion) |
| **AddRoundKey** | XOR des State mit dem Rundenschlüssel |
| **Key Whitening** | zusätzliches AddRoundKey am Anfang und Ende |
| **ECB / CBC / OFB** | Betriebsmodi: deterministisch / verkettet / strom-artig |
| **IV** | Initialisierungsvektor — macht einen Modus probabilistisch |
| **Einwegfunktion** | leicht vorwärts, praktisch unmöglich rückwärts |
| **RSA-Schlüsselpaar** | öffentlich (N, e), privat (N, d); y = xᵉ mod N |
| **Hybridprotokoll** | asymmetrischer Schlüsseltausch + symmetrische Daten (TLS) |
| **Non-Repudiation** | Nichtabstreitbarkeit — nur asymmetrisch möglich |

## Typische Fallen

- **AES ist eine Feistel-Chiffre? Nein** — AES nutzt Schichten und verschlüsselt jede Runde den ganzen Block; nur DES ist Feistel.
- **AES hat acht S-Boxen wie DES? Nein** — AES hat genau **eine** S-Box, mathematisch über GF(2⁸) definiert.
- **ECB ist okay für kurze oder „unwichtige" Daten? Nein** — die Determiniertheit ist immer ein Problem; ECB nie für echte Daten.
- **Die letzte AES-Runde ist wie alle anderen? Nein** — ihr fehlt MixColumns.
- **Asymmetrisch ersetzt symmetrisch? Nein** — es ist viel langsamer; die Praxis nutzt beides hybrid.
- **Gleiche Bitlänge = gleiche Sicherheit? Nein** — 128 Bit symmetrisch entsprechen grob 3072 Bit RSA. Schlüssellängen nicht zwischen den Welten vergleichen.

## Klausur-Fokus

Das Übungsblatt zeigt klar, wo gerechnet wird. Der erste große Block sind die **Betriebsmodi**: Du bekommst eine kleine Blockchiffre (etwa eine 5-Bit-Permutation) und sollst eine mehrteilige Nachricht in **ECB, CBC und OFB** verschlüsseln — die Formeln musst du sicher anwenden (ECB Block für Block, CBC mit yᵢ = eₖ(xᵢ ⊕ yᵢ₋₁) und dem IV für den ersten Block, OFB mit dem aus dem IV erzeugten Schlüsselstrom) und erklären können, warum ECB unsicher ist und wozu der IV dient. Der zweite Block ist **RSA per Hand**: ein Schlüsselpaar nach den fünf Schritten erzeugen (N = p·q, T = (p−1)(q−1), e·d ≡ 1 mod T), dann mit y = xᵉ mod N verschlüsseln und mit x = yᵈ mod N wieder entschlüsseln — etwa die Nachricht BCD mit (N=14, e=5, d=11). Dazu kommen zwei Vergleichs-Rechnungen: die **Anzahl der Schlüssel** in einem Unternehmen (rein symmetrisch n·(n−1)/2, asymmetrisch nur n Paare — bei 120 Mitarbeitern also 7140 gegenüber 120) und eine **Performance-Abschätzung** (1-GB-Datei bei gegebener AES- und RSA-Geschwindigkeit, woraus folgt, warum man hybrid arbeitet). Auf der Wissensseite: die **vier AES-Schichten** in Reihenfolge (nur SubBytes nichtlinear, letzte Runde ohne MixColumns), **DES gegen AES** abgrenzen, und die **Einwegfunktion** mit ihren zwei praktischen Beispielen (Faktorisierung, diskreter Logarithmus) sowie die drei Familien RSA/DH/ECC erklären.

## Mehr dazu

- **Computerphile — AES Explained** (EN, Mike Pound): die AES-Idee und ihre Schichten anschaulich. https://www.youtube.com/watch?v=O4xNJsjtN6E
- **Spanning Tree — AES: How to Design Secure Encryption** (~13 Min., EN): von Konfusion/Diffusion zur kompletten Runde, sehr klar animiert. https://www.youtube.com/watch?v=C4ATDMIz5wc
- **Computerphile — Public Key Cryptography** (~6 Min., EN): warum ein „öffentlicher" Schlüssel funktionieren kann — die Intuition hinter Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4`,
  },
};

const lecture05: Explanation = {
  id: "cs-2025-l05",
  lesson: 5,
  title: {
    de: "Das RSA-Kryptosystem: Schlüsselerzeugung, Square-and-Multiply und digitale Signaturen", en: "The RSA Cryptosystem: Key Generation, Square-and-Multiply, and Digital Signatures", tr: "RSA Şifreleme Sistemi: Anahtar Oluşturma, Kareleme ve Çarpma ve Dijital İmzalar", ar: "نظام التشفير RSA: إنشاء المفاتيح، والتربيع والضرب، والتوقيعات الرقمية", ru: "Криптосистема RSA: генерация ключей, возведение в квадрат и умножение и цифровые подписи", it: "Il sistema crittografico RSA: generazione di chiavi, Square-and-Multiply e firme digitali", es: "El criptosistema RSA: generación de claves, cuadrar y multiplicar y firmas digitales", fr: "Le cryptosystème RSA : génération de clés, quadrature et multiplication et signatures numériques", zh: "RSA 加密系统：密钥生成、平方乘法和数字签名", pl: "Kryptosystem RSA: generowanie kluczy, kwadratowanie i mnożenie oraz podpisy cyfrowe", pt: "O criptossistema RSA: geração de chaves, quadrado e multiplicação e assinaturas digitais", uk: "Криптосистема RSA: генерація ключів, квадрат і множення та цифрові підписи", fa: "سیستم رمزنگاری RSA: تولید کلید، مربع و ضرب، و امضاهای دیجیتال", ja: "RSA 暗号システム: 鍵の生成、二乗乗算、およびデジタル署名", ko: "RSA 암호화 시스템: 키 생성, 제곱 및 곱셈, 디지털 서명", vi: "Hệ thống mật mã RSA: Tạo khóa, bình phương và nhân và chữ ký số", hi: "आरएसए क्रिप्टोसिस्टम: मुख्य पीढ़ी, वर्ग-और-गुणा, और डिजिटल हस्ताक्षर", ur: "RSA کرپٹو سسٹم: کلیدی جنریشن، مربع اور ضرب، اور ڈیجیٹل دستخط", nl: "Het RSA-cryptosysteem: sleutelgeneratie, kwadrateren en vermenigvuldigen en digitale handtekeningen", el: "Το Κρυπτοσύστημα RSA: Δημιουργία Κλειδιών, Τετράγωνο-και-Πολλαπλασιασμός και Ψηφιακές Υπογραφές", cs: "Kryptosystém RSA: generování klíčů, čtvercové a násobící a digitální podpisy", hu: "Az RSA kriptorendszer: kulcsgenerálás, négyzet- és szorzás és digitális aláírás", ro: "Criptosistemul RSA: generare de chei, pătrare și multiplicare și semnături digitale", sq: "Kriptosistemi RSA: Gjenerimi kryesor, katrori dhe shumëzimi dhe nënshkrimet dixhitale", sr: "РСА криптосистем: генерисање кључева, квадрат и множење и дигитални потписи", hr: "RSA kriptosustav: generiranje ključeva, kvadrat i množenje i digitalni potpisi", bg: "Криптосистемата RSA: Генериране на ключове, квадрат и умножение и цифрови подписи", sv: "RSA-kryptosystemet: nyckelgenerering, kvadrat-och-multiplicera och digitala signaturer", fi: "RSA-salausjärjestelmä: avainten luominen, neliö- ja kertolasku ja digitaaliset allekirjoitukset", id: "Kriptosistem RSA: Pembuatan Kunci, Kuadrat dan Penggandaan, dan Tanda Tangan Digital", th: "ระบบเข้ารหัส RSA: การสร้างคีย์ สแควร์และทวีคูณ และลายเซ็นดิจิทัล", sw: "Mfumo wa Cryptosystem wa RSA: Uzalishaji Muhimu, Mraba-na-Kuzidisha, na Sahihi za Dijiti",
  },
  content: {
    de: `RSA ist das erste konkrete asymmetrische Verfahren — und mit Abstand das klausurrelevanteste Rechenthema des ganzen Kurses. Der rote Faden ist erstaunlich schlicht: Aus zwei Primzahlen baut man ein Schlüsselpaar, verschlüsselt eine Nachricht, indem man sie hoch einen Exponenten nimmt und modulo n reduziert, und entschlüsselt mit der passenden „Gegen-Potenz". Die ganze Sicherheit ruht auf einer einzigen Tatsache: Man kann zwei große Primzahlen mühelos multiplizieren, aber das Produkt praktisch nicht wieder in seine Faktoren zerlegen. Damit das in der Praxis überhaupt rechenbar wird, brauchst du zwei Werkzeuge, die wir hier auch von Hand durchspielen — den erweiterten Euklidischen Algorithmus (er liefert den privaten Schlüssel) und Square-and-Multiply (es macht die riesigen Potenzen berechenbar). Und ganz am Ende drehen wir RSA um und bekommen gratis die **digitale Signatur** — die mathematische Unterschrift, die beweist, wer eine Nachricht geschrieben hat.

## Die Grundidee: öffentlich verschlüsseln, privat entschlüsseln

RSA dreht die symmetrische Logik um. Jeder kennt deinen öffentlichen Schlüssel, ein Zahlenpaar (n, e), und kann dir damit verschlüsselte Nachrichten schicken: Die Verschlüsselung eines Klartextwertes x ist **y = xᵉ mod n**, die Entschlüsselung des Chiffrats y ist **x = yᵈ mod n** mit deinem geheimen privaten Schlüssel d. Beide Operationen sind im Kern dasselbe — „eine Zahl hoch einen Exponenten, modulo n". Der ganze Zauber steckt darin, dass e und d so zusammengewählt sind, dass das Hoch-d das Hoch-e *exakt* rückgängig macht. Wer d kennt, entschlüsselt mühelos; wer nur das öffentliche (n, e) hat, müsste zum Berechnen von d die Zahl n faktorisieren — und genau das ist für große n unmöglich.

![Asymmetrische Verschlüsselung: mit dem öffentlichen Schlüssel verschlüsseln, mit dem privaten entschlüsseln](https://upload.wikimedia.org/wikipedia/commons/f/f9/Public_key_encryption.svg "RSA-Verschlüsselung: Bob verschlüsselt mit Alices öffentlichem Schlüssel (n, e), nur Alice entschlüsselt mit ihrem privaten d.")

## RSA-Schlüsselerzeugung in fünf Schritten

Die Schlüsselerzeugung ist eine feste Abfolge, die du im Schlaf können musst. **Erstens** wählst du zwei große Primzahlen p und q — der mit Abstand teuerste Schritt, weil man dafür mit einem Zufallsgenerator Kandidaten zieht und sie mit einem Primzahltest (etwa dem Fermatschen Test) prüft, bis zwei Primzahlen gefunden sind. **Zweitens** berechnest du ihr Produkt n = p·q; dieses n ist der öffentliche Modul, und seine Bitlänge ist grob die Summe der Bitlängen von p und q (zwei 1024-Bit-Primzahlen ergeben ein ~2048-Bit-n). **Drittens** berechnest du Eulers Phi-Funktion φ(n) = (p−1)·(q−1). **Viertens** wählst du den öffentlichen Exponenten e aus dem Bereich von 1 bis φ(n)−1 so, dass e teilerfremd zu φ(n) ist, also ggT(e, φ(n)) = 1. **Fünftens** berechnest du den privaten Schlüssel d so, dass d·e ≡ 1 mod φ(n) gilt — mit anderen Worten, d ist das **modulare Inverse** von e modulo φ(n). Veröffentlicht wird am Ende das Paar (n, e); geheim bleiben d sowie p, q und φ(n).

> **Eselsbrücke (die 5 Schritte):** **p, q → n → φ → e → d.** Zwei Primzahlen, ihr Produkt n, daraus φ = (p−1)(q−1), dann ein e mit ggT(e, φ) = 1, und zuletzt d als Inverse von e modulo φ.

### Schritt für Schritt: ein komplettes RSA-Beispiel

Rechnen wir alles mit kleinen Zahlen durch, genau wie in der Klausur. Wir nehmen **p = 3** und **q = 11**. Dann ist **n = 3·11 = 33** und **φ(n) = (3−1)·(11−1) = 2·10 = 20**. Als öffentlichen Exponenten wählen wir **e = 3**, denn ggT(3, 20) = 1. Jetzt suchen wir d mit 3·d ≡ 1 mod 20 — durch Probieren oder mit dem gleich folgenden Algorithmus findet man **d = 7**, denn 3·7 = 21 = 20 + 1 ≡ 1 mod 20. Der öffentliche Schlüssel ist also **(33, 3)**, der private **(33, 7)**.

Verschlüsseln wir den Klartextwert **x = 4**: y = 4³ mod 33 = 64 mod 33 = **31**. Und entschlüsseln zur Probe: x = 31⁷ mod 33. Ein hübscher Rechentrick spart hier Arbeit — 31 ≡ −2 mod 33, also ist 31⁷ ≡ (−2)⁷ = −128, und −128 mod 33 = −128 + 4·33 = **4**. Wir landen wieder beim Klartext 4. Beachte die Bedingung x < n: Jeder Klartextwert muss kleiner als der Modul sein, sonst geht die eindeutige Umkehrung verloren.

## Warum es funktioniert: Eulers Phi-Funktion

Der Schlüssel zum *Verständnis* (nicht nur zum Rechnen) ist **Eulers Phi-Funktion φ(n)**: Sie zählt, wie viele Zahlen von 1 bis n teilerfremd zu n sind. Zwei Regeln tragen das ganze RSA. Erstens: Ist n selbst eine Primzahl, dann sind *alle* n−1 kleineren Zahlen teilerfremd zu n, also φ(n) = n−1 (zum Beispiel φ(7) = 6). Zweitens: Sind p und q beide prim, dann gilt φ(p·q) = φ(p)·φ(q) = (p−1)·(q−1). Und hier ist der entscheidende Punkt, der RSA sicher macht: φ(n) lässt sich *nur dann* leicht ausrechnen, wenn man p und q kennt. Ein Angreifer sieht nur n; um daraus φ(n) zu gewinnen, müsste er n in p und q zerlegen — und ohne φ(n) gibt es kein d. Die Sicherheit von RSA ist also exakt die Schwierigkeit der **Faktorisierung**.

### Schritt für Schritt: d finden mit dem erweiterten Euklidischen Algorithmus

Den fünften Schritt — d als Inverse von e zu bestimmen — erledigt man systematisch mit dem **erweiterten Euklidischen Algorithmus (EEA)**. Er berechnet zu zwei Zahlen nicht nur ihren größten gemeinsamen Teiler, sondern auch zwei Koeffizienten s und t, sodass ggT(φ(n), e) = s·φ(n) + t·e. Ist dieser ggT gleich 1 (was bei gültigem e der Fall ist), dann ist genau **t das gesuchte d** — das Inverse von e modulo φ(n). Der Algorithmus läuft iterativ: In jedem Schritt bildet man den Rest rᵢ = rᵢ₋₂ mod rᵢ₋₁, den Quotienten qᵢ₋₁ = (rᵢ₋₂ − rᵢ)/rᵢ₋₁ und führt s und t über die Regeln sᵢ = sᵢ₋₂ − qᵢ₋₁·sᵢ₋₁ und tᵢ = tᵢ₋₂ − qᵢ₋₁·tᵢ₋₁ mit, bis der Rest 0 wird. Machen wir das für unser Beispiel mit φ(n) = 20 und e = 3:

| i | rᵢ | qᵢ₋₁ | sᵢ | tᵢ |
|---|---|---|---|---|
| 0 | 20 | — | 1 | 0 |
| 1 | 3 | — | 0 | 1 |
| 2 | 20 mod 3 = 2 | 6 | 1 − 6·0 = 1 | 0 − 6·1 = −6 |
| 3 | 3 mod 2 = 1 | 1 | 0 − 1·1 = −1 | 1 − 1·(−6) = 7 |
| 4 | 2 mod 1 = 0 | — | — | — |

Der letzte von null verschiedene Rest ist r₃ = 1 = ggT(20, 3), also ist e gültig, und t₃ = **7** ist unser d. Zur Probe: s·20 + t·3 = (−1)·20 + 7·3 = −20 + 21 = 1. Stimmt — und 7 ist tatsächlich das Inverse von 3 modulo 20.

## Square-and-Multiply: riesige Potenzen schnell rechnen

Bei echten Schlüsseln steht im Exponenten eine 2048-Bit-Zahl. Die Potenz xᵉ naiv durch fortgesetztes Multiplizieren auszurechnen bräuchte astronomisch viele Schritte — für einen 1024-Bit-Exponenten in der Größenordnung von 10³⁰⁰ Multiplikationen, mehr als es Atome im beobachtbaren Universum gibt. **Square-and-Multiply** schafft dasselbe mit nur etwa anderthalb Operationen *pro Bit* des Exponenten, indem es die **Binärdarstellung des Exponenten** abarbeitet, vom höchstwertigen Bit (MSB) zum niedrigstwertigen (LSB). Die Regel ist denkbar einfach: Beim ersten Bit übernimmst du einfach die Basis. Bei jedem weiteren Bit quadrierst du das bisherige Zwischenergebnis — und *zusätzlich*, falls das Bit eine 1 ist, multiplizierst du noch einmal mit der Basis. Nach jedem Schritt reduzierst du modulo n, damit die Zahlen klein bleiben (genau die Reduktionstechnik aus dem zweiten Kapitel).

### Schritt für Schritt: Square-and-Multiply von Hand

Berechnen wir die Entschlüsselung 31⁷ mod 33 mit Square-and-Multiply. Der Exponent 7 ist binär **111**, also drei Einsen. Wir arbeiten sie von links ab:

| Bit (von links) | Operation | Rechnung mod 33 | Zwischenergebnis |
|---|---|---|---|
| 1 (MSB) | Basis übernehmen | — | 31 |
| 1 | quadrieren, dann × Basis | 31² = 961 ≡ 4; 4·31 = 124 ≡ 25 | 25 |
| 1 (LSB) | quadrieren, dann × Basis | 25² = 625 ≡ 31; 31·31 = 961 ≡ 4 | 4 |

Heraus kommt **4** — genau der Klartext, den wir oben schon mit dem (−2)-Trick gefunden hatten. Bei einem Bit 0 würde man in der entsprechenden Zeile *nur* quadrieren und das Multiplizieren weglassen.

> **Eselsbrücke (Square-and-Multiply):** Lies den Exponenten **binär von links**. **Bit 1 → quadrieren *und* multiplizieren (QM)**, **Bit 0 → nur quadrieren (Q)**, das MSB ist immer nur „Basis hinschreiben". Schreib für jedes Bit Q oder QM untereinander — das ist der Rechenweg.

## RSA umgedreht: die digitale Signatur

Jetzt der elegante Bonus, der ein ganz neues Schutzziel löst. Bisher hat RSA die *Vertraulichkeit* gesichert. Dreht man die beiden Schlüssel aber in der Reihenfolge um, bekommt man die **Nichtabstreitbarkeit** — den Beweis, *wer* eine Nachricht erzeugt hat. Das Verfahren heißt digitale Signatur. Alice **signiert** eine Nachricht m, indem sie sie mit ihrem *privaten* Schlüssel d „verschlüsselt": s = mᵈ mod n. Diese Zahl s ist die Signatur, und sie schickt das Paar (m, s) los. Jeder, der Alices *öffentlichen* Schlüssel e kennt, kann **verifizieren**: Er rechnet sᵉ mod n und prüft, ob das wieder die Nachricht m ergibt. Tut es das, kann die Signatur nur von Alice stammen — denn nur sie besitzt d. Beachte die Umkehrung der Rollen: Beim Verschlüsseln nutzt man den *öffentlichen* Schlüssel des Empfängers, beim Signieren den *eigenen privaten*.

![Digitale Signatur: mit dem privaten Schlüssel signieren, mit dem öffentlichen verifizieren](https://upload.wikimedia.org/wikipedia/commons/9/99/Digital_Signature_diagram_de.svg "Digitale Signatur: Alice signiert mit ihrem privaten Schlüssel, jeder verifiziert mit ihrem öffentlichen. Stimmt die Prüfung, stammt die Nachricht garantiert von Alice.")

### Schritt für Schritt: signieren und verifizieren

Bleiben wir bei unserem Schlüsselpaar (n = 33, e = 3, d = 7) und signieren die Nachricht m = 4. Alice rechnet die Signatur s = mᵈ mod n = 4⁷ mod 33. Mit Square-and-Multiply oder direkt: 4⁷ = 16384, und 16384 mod 33 = 16 (denn 496·33 = 16368). Also ist s = **16**. Bob verifiziert mit Alices öffentlichem e: sᵉ mod n = 16³ mod 33. Schrittweise: 16² = 256 ≡ 25 mod 33, dann 25·16 = 400 ≡ 4 mod 33. Heraus kommt **4** = m — die Signatur ist gültig, die Nachricht stammt von Alice.

In der Praxis signiert man aber keine ganzen Dokumente direkt, denn die wären viel größer als n. Stattdessen nutzt man **Hash-Signaturen**: Man jagt das Dokument zuerst durch eine kryptografische Hash-Funktion H, die einen kurzen Fingerabdruck x = H(m) erzeugt, und signiert *nur diesen Fingerabdruck*: s = H(m)ᵈ mod n. Der Empfänger berechnet den Hash der erhaltenen Nachricht selbst neu, entschlüsselt die Signatur mit dem öffentlichen Schlüssel und vergleicht beide Werte — stimmen sie überein, ist das Dokument unverändert *und* von Alice. (Im Übungsblatt dient als Spielzeug-Hash die Quersumme der Buchstabenwerte: Der Hash von „ABC" wäre 65+66+67 = 198; man signiert dann diese 198 statt der ganzen Nachricht.) Wie echte Hash-Funktionen aussehen und welche Eigenschaften sie haben müssen, ist das Thema des nächsten Kapitels.

> **Eselsbrücke (Verschlüsseln vs. Signieren):** **Verschlüsseln** = mit dem **öffentlichen** Schlüssel des Empfängers (nur er liest). **Signieren** = mit dem **eigenen privaten** Schlüssel (alle prüfen, nur du konntest es). Die zwei Schlüssel tauschen einfach die Rollen.

## Textbook-RSA ist gefährlich: Determinismus und der ×2-Angriff

Die reine Formel, die wir bisher benutzt haben, heißt „Textbook-RSA", und so wie sie dasteht, ist sie unsicher. Erstens ist sie **deterministisch**: Derselbe Klartext ergibt mit demselben Schlüssel immer dasselbe Chiffrat, sodass ein Angreifer Wiederholungen erkennt. Zweitens ist sie **manipulierbar (malleable)**, und das auf eine besonders hübsche Weise: Oskar sieht das Chiffrat y, berechnet selbst 2ᵉ mod n und multipliziert beides, schickt also y·2ᵉ mod n weiter. Beim Entschlüsseln kommt dann nicht x, sondern **2·x** heraus — Oskar hat den Klartext gezielt verdoppelt, ohne ihn je zu kennen. Die Lösung beider Probleme ist **Padding**: Vor dem Verschlüsseln baut man zufällige Daten in den Klartext ein, was RSA probabilistisch macht und die Manipulierbarkeit zerstört. Weitere Angriffsflächen, die du kennen solltest, sind schnellere Faktorisierungsalgorithmen (es gibt Fortschritte, aber für große n bleibt es chancenlos — historisch berühmt ist die RSA-129-Challenge) und **Seitenkanalangriffe**, bei denen etwa der Stromverbrauch während Square-and-Multiply den privaten Schlüssel verrät. Und nicht zu vergessen: RSA ist 100- bis 1000-mal langsamer als AES — ein weiterer Grund, es nur für den Schlüsseltausch und für Signaturen zu verwenden, nie für Massendaten.

## Auf den Punkt

Die Kurzfassung: RSA ist das erste konkrete asymmetrische Verfahren. Der öffentliche Schlüssel ist **(n, e)**, der private **d**; verschlüsselt wird mit **y = xᵉ mod n**, entschlüsselt mit **x = yᵈ mod n**. Den Schlüssel erzeugst du in fünf Schritten: zwei Primzahlen p, q → n = p·q → φ(n) = (p−1)(q−1) → ein e mit ggT(e, φ(n)) = 1 → d als Inverse von e modulo φ(n), bestimmt mit dem **erweiterten Euklidischen Algorithmus**. Die Sicherheit ruht allein auf der Schwierigkeit, n zu **faktorisieren** — ohne p und q kein φ(n), ohne φ(n) kein d. Damit die riesigen Potenzen rechenbar werden, nutzt man **Square-and-Multiply** (Binärexponent von links, Bit 1 = quadrieren und multiplizieren, Bit 0 = nur quadrieren). Dreht man die Schlüssel um, signiert man: **s = mᵈ mod n**, verifiziert mit **sᵉ mod n** — in der Praxis über den **Hash** des Dokuments. Und „Textbook-RSA" ohne **Padding** ist deterministisch und durch den ×2-Trick manipulierbar.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **(n, e)** | öffentlicher Schlüssel: Modul n und Exponent e |
| **d** | privater Schlüssel; d ≡ e⁻¹ mod φ(n) |
| **n = p·q** | Produkt zweier großer Primzahlen |
| **φ(n)** | Eulers Phi; für n = p·q ist φ(n) = (p−1)(q−1) |
| **ggT(e, φ(n)) = 1** | e teilerfremd zu φ(n) — Bedingung für ein gültiges e |
| **EEA** | erweiterter Euklid: liefert ggT *und* das Inverse d |
| **Square-and-Multiply** | schnelle modulare Exponentiation über die Bits von e |
| **Signatur** | s = mᵈ mod n (mit privatem d), Prüfung sᵉ mod n |
| **Hash-Signatur** | nicht m, sondern H(m) wird signiert |
| **Textbook-RSA** | RSA ohne Padding — deterministisch und manipulierbar |

## Typische Fallen

- **φ(n) = n − 1? Nur wenn n prim ist.** Bei RSA ist n = p·q, also φ(n) = (p−1)(q−1).
- **e frei wählbar? Fast** — aber es muss ggT(e, φ(n)) = 1 gelten, sonst existiert kein passendes d.
- **d aus n und e leicht berechenbar? Nur mit φ(n)** — und das setzt die Faktorisierung von n voraus, die genau das harte Problem ist.
- **Bei Square-and-Multiply erst am Ende modulo rechnen? Nein** — nach *jedem* Schritt reduzieren, sonst explodieren die Zwischenergebnisse.
- **Signieren = Verschlüsseln mit dem öffentlichen Schlüssel? Nein, umgekehrt** — signiert wird mit dem *privaten* Schlüssel, verifiziert mit dem öffentlichen.
- **Textbook-RSA ist sicher genug? Nein** — ohne Padding deterministisch und durch den ×2-Trick manipulierbar.

## Klausur-Fokus

RSA ist *das* Rechenthema, und das Übungsblatt macht es vor. Zuerst ein **komplettes RSA-Beispiel mit kleinen Zahlen**: die fünf Schritte der Schlüsselerzeugung (p, q → n → φ(n) → e mit ggT(e, φ(n)) = 1 → d mit e·d ≡ 1 mod φ(n)), dann eine Nachricht (oft Buchstaben über die A=0…Z=25-Tabelle) mit y = xᵉ mod n **verschlüsseln und mit x = yᵈ mod n wieder entschlüsseln**. Du musst ein gegebenes Schlüsselpaar **vervollständigen oder als ungültig erkennen** können (etwa prüfen, ob e teilerfremd zu φ(n) ist), sicher sagen, welches Paar der **öffentliche** und welches der **private** Schlüssel ist, und **d per EEA** bestimmen (die Tabelle mit rᵢ, qᵢ₋₁, sᵢ, tᵢ bis zum Rest 0). Für große Exponenten gehört **Square-and-Multiply** dazu (Binärexponent von links, Bit 1 = quadrieren und multiplizieren, Bit 0 = nur quadrieren, nach jedem Schritt mod n). Frisch zum Üben sind die **Signaturen**: eine **RSA-Signatur** erstellen (s = mᵈ mod n) und verifizieren (sᵉ mod n = m), sowie eine **Hash-Signatur** (erst H(m), dann signieren) — im Übungsblatt mit der Quersumme der Buchstabenwerte als Spielzeug-Hash. Auf der Verständnisseite: erklären, warum die **Faktorisierung** die Sicherheit trägt, was **Eulers φ** mit alldem zu tun hat, und warum **Textbook-RSA** (deterministisch, ×2-Manipulation) **Padding** braucht. Faktenwissen: RSA wurde 1977 von Rivest, Shamir und Adleman vorgeschlagen, beruht auf dem Faktorisierungsproblem, und für 128-Bit-symmetrische Sicherheit braucht es rund 3072 Bit RSA-Schlüssellänge.

## Mehr dazu

- **Practical Networking — RSA Algorithm, mit Beispiel** (EN): komplette Schlüsselerzeugung und Ver-/Entschlüsselung an Zahlen vorgerechnet. https://www.youtube.com/watch?v=Pq8gNbvfaoM
- **Eddie Woo — The RSA Encryption Algorithm (1 of 2: Computing an Example)** (EN): sehr ruhige, kleinschrittige Beispielrechnung. https://www.youtube.com/watch?v=4zahvcJ9glg
- **Art of the Problem — RSA Encryption** (EN): die Intuition (Trapdoor-Einwegfunktion, Euler) hinter RSA. https://www.youtube.com/watch?v=wXB-V_Keiu8
- **Square-and-Multiply — Rechenbeispiel** (EN): der Algorithmus an einer konkreten Potenz Schritt für Schritt. https://www.youtube.com/watch?v=cbGB__V8MNk`,
  },
};

const lecture06: Explanation = {
  id: "cs-2025-l06",
  lesson: 6,
  title: {
    de: "Digitale Signaturen, Hash-Funktionen und Message Authentication Codes (MAC)", en: "Digital signatures, hash functions and message authentication codes (MAC)", tr: "Dijital imzalar, karma işlevler ve mesaj kimlik doğrulama kodları (MAC)", ar: "التوقيعات الرقمية ووظائف التجزئة ورموز مصادقة الرسائل (MAC)", ru: "Цифровые подписи, хэш-функции и коды аутентификации сообщений (MAC)", it: "Firme digitali, funzioni hash e codici di autenticazione dei messaggi (MAC)", es: "Firmas digitales, funciones hash y códigos de autenticación de mensajes (MAC)", fr: "Signatures numériques, fonctions de hachage et codes d'authentification de message (MAC)", zh: "数字签名、哈希函数和消息验证码 (MAC)", pl: "Podpisy cyfrowe, funkcje skrótu i ​​kody uwierzytelniające wiadomości (MAC)", pt: "Assinaturas digitais, funções hash e códigos de autenticação de mensagens (MAC)", uk: "Цифрові підписи, хеш-функції та коди автентифікації повідомлень (MAC)", fa: "امضاهای دیجیتال، توابع هش و کدهای احراز هویت پیام (MAC)", ja: "デジタル署名、ハッシュ関数、メッセージ認証コード (MAC)", ko: "디지털 서명, 해시 함수 및 메시지 인증 코드(MAC)", vi: "Chữ ký số, hàm băm và mã xác thực tin nhắn (MAC)", hi: "डिजिटल हस्ताक्षर, हैश फ़ंक्शन और संदेश प्रमाणीकरण कोड (मैक)", ur: "ڈیجیٹل دستخط، ہیش فنکشنز اور میسج توثیقی کوڈز (MAC)", nl: "Digitale handtekeningen, hashfuncties en berichtauthenticatiecodes (MAC)", el: "Ψηφιακές υπογραφές, λειτουργίες κατακερματισμού και κωδικοί ελέγχου ταυτότητας μηνυμάτων (MAC)", cs: "Digitální podpisy, hashovací funkce a ověřovací kódy zpráv (MAC)", hu: "Digitális aláírások, hash-funkciók és üzenet-hitelesítési kódok (MAC)", ro: "Semnături digitale, funcții hash și coduri de autentificare a mesajelor (MAC)", sq: "Nënshkrimet dixhitale, funksionet hash dhe kodet e vërtetimit të mesazheve (MAC)", sr: "Дигитални потписи, хеш функције и кодови за потврду аутентичности порука (МАЦ)", hr: "Digitalni potpisi, hash funkcije i kodovi za provjeru autentičnosti poruka (MAC)", bg: "Цифрови подписи, хеш функции и кодове за удостоверяване на съобщения (MAC)", sv: "Digitala signaturer, hashfunktioner och meddelandeautentiseringskoder (MAC)", fi: "Digitaaliset allekirjoitukset, hash-toiminnot ja viestien todennuskoodit (MAC)", id: "Tanda tangan digital, fungsi hash, dan kode otentikasi pesan (MAC)", th: "ลายเซ็นดิจิทัล ฟังก์ชันแฮช และรหัสตรวจสอบข้อความ (MAC)", sw: "Sahihi za kidijitali, vitendaji vya heshi na misimbo ya uthibitishaji wa ujumbe (MAC)",
  },
  content: {
    de: `Bisher drehte sich alles ums Geheimhalten — um Vertraulichkeit. In diesem Kapitel geht es um die andere große Hälfte der Sicherheit, die man im Alltag genauso braucht und doch oft vergisst: *Wer hat das wirklich geschickt, und ist es unterwegs unverändert geblieben?* Das sind die Schutzziele **Authentizität** und **Integrität**. Drei Werkzeuge bauen wir dafür auf, und sie hängen eng zusammen: die **digitale Signatur** (die asymmetrische, fälschungssichere Unterschrift), die **Hash-Funktion** (der digitale Fingerabdruck, der Signaturen erst praktisch macht — und nebenbei Passwörter schützt) und der **MAC** (der schnelle, symmetrische Cousin der Signatur). Am Ende verstehst du auch, warum jede seriöse Webseite ein Schloss-Symbol trägt und warum dein Passwort niemals im Klartext in einer Datenbank stehen sollte.

## Digitale Signaturen: mit dem privaten Schlüssel unterschreiben

Erinnere dich an eine Schwäche der symmetrischen Kryptografie: Sie kann keine **Nichtabstreitbarkeit** (Non-Repudiation) garantieren. Weil beide Seiten denselben geheimen Schlüssel besitzen, lässt sich im Streitfall nie beweisen, *welche* von ihnen eine Nachricht erzeugt hat — beide hätten es gekonnt. Die digitale Signatur löst genau das, und sie tut es, indem sie die RSA-Logik einfach spiegelt. Beim Verschlüsseln benutzt man den *öffentlichen* Schlüssel des Empfängers; beim Signieren benutzt Alice ihren *eigenen privaten* Schlüssel. Sie erzeugt also s = sig(x) mit ihrem privaten Schlüssel und schickt das Paar (x, s) los. Jeder, der ihren öffentlichen Schlüssel kennt, kann anschließend verifizieren, ob die Signatur passt — das Ergebnis ist schlicht wahr oder falsch. Weil nur Alice ihren privaten Schlüssel besitzt, kann auch nur sie eine gültige Signatur erzeugen; und weil jeder mit dem öffentlichen Schlüssel prüfen kann, ist die Unterschrift öffentlich überprüfbar. Das liefert gleich drei Dinge auf einmal: **Integrität** (eine nachträglich geänderte Nachricht fällt bei der Prüfung durch), **Authentizität** (die Nachricht stammt nachweislich von Alice) und damit die ersehnte **Nichtabstreitbarkeit**. Das funktioniert mit jedem asymmetrischen Verfahren — RSA, Diffie-Hellman, elliptische Kurven —, und die konkrete RSA-Variante hast du im vorigen Kapitel schon von Hand gerechnet.

![Digitale Signatur: mit dem privaten Schlüssel signieren, mit dem öffentlichen verifizieren](https://upload.wikimedia.org/wikipedia/commons/9/99/Digital_Signature_diagram_de.svg "Die digitale Signatur ist das Spiegelbild der Verschlüsselung: signiert wird mit dem privaten Schlüssel, geprüft mit dem öffentlichen.")

> **Eselsbrücke (Spiegelbild):** **Verschlüsseln: öffentlich → privat.** **Signieren: privat → öffentlich.** Mit dem *privaten* Schlüssel unterschreibst du (das kann nur einer), mit dem *öffentlichen* prüft jeder.

## Der aktive Angreifer: Man-in-the-Middle

Bislang war Oskar ein *passiver* Lauscher, der nur mithörte. Jetzt tritt ein gefährlicherer Gegner auf: der **aktive** Angreifer, der Nachrichten nicht nur liest, sondern abfängt und verändert. Sein klassischer Trick ist der **Man-in-the-Middle (MITM)**: Er setzt sich heimlich zwischen Alice und Bob und **tauscht die öffentlichen Schlüssel aus**. Schickt Bob seinen öffentlichen Schlüssel an Alice, fängt Oskar ihn ab und ersetzt ihn durch *seinen eigenen*. Alice glaubt nun, sie habe Bobs Schlüssel, verschlüsselt (oder prüft Signaturen) in Wahrheit aber für Oskar — der alles mitliest, neu verschlüsselt und an Bob weiterreicht, ohne dass die beiden etwas merken. Das zeigt eine unbequeme Wahrheit: Ein öffentlicher Schlüssel allein nützt nichts, solange man nicht sicher weiß, *wem* er gehört.

## Zertifikate und PKI: wem gehört dieser Schlüssel?

Daraus folgt das Grundproblem der asymmetrischen Kryptografie: Sie braucht zwar keinen *geheimen* Kanal mehr, um öffentliche Schlüssel zu verteilen, aber sie braucht einen **authentisierten** — einen, auf dem man der Herkunft eines Schlüssels trauen kann. Die Lösung sind **Zertifikate**. Ein Zertifikat bindet einen öffentlichen Schlüssel fest an eine Identität, und diese Bindung wird von einer vertrauenswürdigen dritten Stelle, einer **Certificate Authority (CA)**, digital signiert. Ein Zertifikat für Alice sieht im Kern so aus: Es enthält ihren öffentlichen Schlüssel und ihre Identität, und darüber die Signatur der CA, also Cert_A = [ (kpub_A, ID_A), sig_CA(kpub_A, ID_A) ]. Wer der CA vertraut, kann diese Signatur prüfen und weiß dann sicher, dass der Schlüssel wirklich Alice gehört. Der Clou im Alltag: Die öffentlichen Schlüssel der großen CAs sind bereits in deinem Browser und Betriebssystem **vorinstalliert**, weshalb dein Browser jedes Webseiten-Zertifikat automatisch prüfen kann — daher das Schloss-Symbol. Das ganze organisatorische Drumherum (CAs, Identitätsprüfung, das Zurückrufen kompromittierter Zertifikate, die sichere Verteilung der CA-Schlüssel) heißt **Public-Key-Infrastruktur (PKI)**, und das Standardformat eines Zertifikats ist **X.509** mit Feldern wie Seriennummer, Aussteller, Gültigkeitsdauer, Inhaber, öffentlichem Schlüssel und der Signatur.

## Hash-Funktionen: der digitale Fingerabdruck

Jetzt zum vielleicht vielseitigsten Werkzeug der ganzen Kryptografie. Eine **Hash-Funktion h** nimmt einen beliebig langen Input und macht daraus einen **Fingerabdruck fester Länge** (typisch 128 bis 512 Bit). Anders als eine Chiffre hat sie **keinen Schlüssel** — jeder kann denselben Hash berechnen. Zwei Eigenschaften machen sie nützlich: Sie ist auch für sehr lange Nachrichten extrem schnell, und sie zeigt den **Avalanche-Effekt** (Lawineneffekt) — die kleinste Änderung am Input, ein einziges gekipptes Bit, verändert den Hash vollständig und unvorhersehbar.

![Eine kryptografische Hash-Funktion bildet beliebige Eingaben auf einen Fingerabdruck fester Länge ab](https://upload.wikimedia.org/wikipedia/commons/2/2b/Cryptographic_Hash_Function.svg "Eine Hash-Funktion verdichtet jede Eingabe — egal wie lang — zu einem Fingerabdruck fester Länge. Schon eine winzige Änderung der Eingabe liefert einen völlig anderen Hash.")

Wozu braucht man das bei Signaturen? Eine Signatur kann immer nur eine Nachricht von begrenzter Länge unterschreiben (bei RSA-2048 etwa 2048 Bit). Große Dokumente lassen sich nicht direkt signieren, und sie blockweise wie bei einer Blockchiffre zu signieren wäre viel zu teuer. Die elegante Lösung: **erst hashen, dann den Hash signieren.** Alice berechnet z = h(x), signiert nur diesen kurzen Fingerabdruck und schickt (x, s). Bob hasht das empfangene x selbst neu zu z′ = h(x) und prüft die Signatur gegen z′ — stimmen sie überein, ist das Dokument unverändert und von Alice. So unterschreibt man mit einer kurzen Signatur ein beliebig großes Dokument.

## Die drei Sicherheitseigenschaften — und das Geburtstagsparadoxon

Damit dieses Hash-dann-Signiere sicher ist, muss h drei Eigenschaften erfüllen, die du sauber auseinanderhalten musst. Die erste ist die **Urbildresistenz** (preimage resistance): Aus einem gegebenen Hashwert h(x) darf man den Eingabewert x nicht zurückrechnen können. Wäre das verletzt, könnte ein Angreifer aus einem signierten Hash den ursprünglichen Klartext gewinnen, ohne die Verschlüsselung zu brechen. Die zweite ist die **schwache Kollisionsresistenz** (auch second-preimage resistance): Zu einer *gegebenen* Nachricht x₁ darf man keine *andere* Nachricht x₂ ≠ x₁ finden, die denselben Hash hat. Wäre das verletzt, könnte ein aktiver Angreifer die signierte Nachricht x₁ heimlich gegen sein x₂ austauschen — die alte Signatur über h(x₁) = h(x₂) bliebe gültig. Die dritte und strengste ist die **starke Kollisionsresistenz**: Man darf *überhaupt kein* Paar x₁ ≠ x₂ mit gleichem Hash finden können (egal welches).

Hier kommt eine Pointe, die fast jeden überrascht. Kollisionen *müssen* existieren — es gibt unendlich viele mögliche Eingaben, aber nur endlich viele Hashwerte (Schubfachprinzip). Die Frage ist nur, *wie schwer* es ist, eine zu finden. Die Antwort gibt das **Geburtstagsparadoxon**: In einer Gruppe von nur 23 Personen ist die Wahrscheinlichkeit, dass zwei am selben Tag Geburtstag haben, bereits über 50 % — viel mehr, als die Intuition erwartet, weil es auf die Zahl der *Paare* ankommt, nicht der Personen. Übertragen auf einen n-Bit-Hash heißt das: Für eine Kollision braucht man nicht etwa 2ⁿ Versuche, sondern nur rund **2^(n/2)**. Ein 256-Bit-Hash bietet also nur etwa 128 Bit Kollisionssicherheit — weshalb man Hashes großzügig lang wählt. Die wichtigsten Hash-Funktionen kommen aus zwei Lagern: die **MD4-Familie** (zu der MD5, SHA-1 und SHA-2 gehören; sie rechnen auf 32-Bit-Werten mit booleschen Operationen wie AND, OR, XOR) und Hashes auf Basis von Blockchiffren; **SHA-3** gehört bewusst *nicht* zur MD4-Familie, weil es intern anders aufgebaut ist. SHA-1 etwa verarbeitet die Nachricht in 512-Bit-Blöcken über eine Kompressionsfunktion mit Padding und liefert 160 Bit — die typische Merkle-Damgård-Konstruktion:

![Merkle-Damgård-Konstruktion: die Nachricht wird blockweise durch eine Kompressionsfunktion gehasht](https://upload.wikimedia.org/wikipedia/commons/e/ed/Merkle-Damgard_hash_big.svg "Die Merkle-Damgård-Konstruktion (MD5, SHA-1, SHA-2): die gepaddete Nachricht läuft blockweise durch eine Kompressionsfunktion, das Ergebnis fließt jeweils in den nächsten Block.")

> **Eselsbrücke (Geburtstagsparadoxon):** Eine Kollision kostet nur die *halbe* Bitzahl im Exponenten — **2^(n/2)**, nicht 2ⁿ. Ein Hash ist also „doppelt so lang" wie die Sicherheit, die er liefert.

> **Eselsbrücke (drei Eigenschaften):** **Urbild** = von h(x) nicht auf x zurück. **Schwache Kollision** = zu einem *gegebenen* x kein zweites finden. **Starke Kollision** = *irgendein* Paar mit gleichem Hash finden (am leichtesten — daher das Geburtstagsparadoxon).

### Schritt für Schritt: Kollisionswahrscheinlichkeit abschätzen

Genau das lässt das Übungsblatt ausrechnen, und das Ergebnis verblüfft jedes Mal. Für N mögliche Hashwerte und k zufällig eingefügte Werte nähert man die Kollisionswahrscheinlichkeit mit **P ≈ 1 − e^(−k(k−1)/2N)**. Nehmen wir einen **48-Bit-Adressraum**, also N = 2⁴⁸ ≈ 2,8·10¹⁴, und **k = 2,3·10⁷** Dateien:

- Der Zähler im Exponenten ist k(k−1)/2 ≈ k²/2 = (2,3·10⁷)² / 2 ≈ 2,6·10¹⁴.
- Der Exponent ist also −2,6·10¹⁴ / 2,8·10¹⁴ ≈ −0,94.
- Damit P ≈ 1 − e^(−0,94) ≈ 1 − 0,39 ≈ **0,61**, also rund **60 %**.

Über 60 % Kollisionswahrscheinlichkeit bei „nur" 23 Millionen Einträgen in einem 281-Billionen-großen Raum — das ist die Wucht des Geburtstagsparadoxons, und genau deshalb wählt man Hashes lieber 256 als 128 Bit lang.

### Schritt für Schritt: eine Hash-Tabelle füllen

Hashes haben auch eine ganz unkryptografische Anwendung, die das Übungsblatt aufgreift: die **Hash-Tabelle**. Hier dient der Hash dazu, jeden Eintrag schnell einem von mehreren Behältern (buckets) zuzuordnen. Mit sechs Buckets ist die Hash-Funktion einfach H(k) = k mod 6, und bei einer Kollision hängt man den neuen Wert an eine Liste im selben Bucket (separate chaining). Fügen wir der Reihe nach 71, 36, 22, 38, 11, 10, 1, 6, 4, 112, 42 ein: 71 mod 6 = 5, 36 mod 6 = 0, 22 mod 6 = 4, 38 mod 6 = 2, 11 mod 6 = 5 (Kollision, hinter 71), 10 mod 6 = 4 (hinter 22), 1 mod 6 = 1, 6 mod 6 = 0 (hinter 36), 4 mod 6 = 4, 112 mod 6 = 4, 42 mod 6 = 0. Es ergeben sich die Buckets 0: {36, 6, 42}, 1: {1}, 2: {38}, 3: {}, 4: {22, 10, 4, 112}, 5: {71, 11}.

![Eine Hash-Tabelle mit separater Verkettung zur Kollisionsauflösung](https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg "Hash-Tabelle mit separate chaining: kollidierende Einträge landen im selben Bucket und werden zu einer Liste verkettet.")

Fügt man dieselben Zahlen in *anderer Reihenfolge* ein, fällt die wichtige Beobachtung an: Welche Zahl in welchem Bucket landet, hängt allein vom Hashwert ab, *nicht* von der Reihenfolge — die Bucket-Zugehörigkeit ist also identisch. Was sich unterscheidet, ist nur die *Reihenfolge innerhalb* einer Kette. Genau das ist der Punkt der Aufgabe.

## Passwörter richtig speichern: Hashing, Rainbow-Tables und Salting

Die vielleicht alltäglichste Anwendung von Hashes betrifft Passwörter. Speichert eine Webseite Benutzernamen und Passwörter **im Klartext**, ist ein einziges Datenleck katastrophal: Der Angreifer hat sofort alle Zugangsdaten — und weil viele Menschen Passwörter wiederverwenden, auch gleich die zu anderen Diensten. Deshalb speichert man niemals das Passwort selbst, sondern nur seinen **Hash**. Beim Login hasht der Server die Eingabe und vergleicht sie mit dem gespeicherten Hash; dank Urbildresistenz kann selbst ein Angreifer mit der ganzen Datenbank die Passwörter nicht zurückrechnen.

Ganz wasserdicht ist das aber noch nicht, denn Angreifer kommen mit einem **Rainbow-Table-Angriff**: riesigen, vorberechneten Tabellen, die zu Millionen gängiger Passwörter bereits den Hash enthalten. Ist ein Passwort-Hash in so einer Tabelle, ist das Passwort sofort entlarvt. Das Gegenmittel heißt **Salting**: Vor dem Hashen hängt man an jedes Passwort einen zufälligen, pro Nutzer verschiedenen Wert (den Salt) an und speichert ihn mit. Dadurch erzeugt selbst dasselbe Passwort bei zwei Nutzern völlig verschiedene Hashes, und eine vorberechnete Rainbow-Table wird nutzlos — der Angreifer müsste sie für jeden einzelnen Salt neu berechnen.

## MAC und HMAC: Integrität mit geteiltem Schlüssel

Manchmal will man Integrität und Authentizität sichern, braucht aber keine Nichtabstreitbarkeit und hätte gern mehr Tempo. Dafür gibt es den **MAC (Message Authentication Code)** — eine kryptografische Prüfsumme. Wie eine Signatur garantiert er, dass eine Nachricht echt und unverändert ist; anders als eine Signatur beruht er aber auf **symmetrischer** Kryptografie mit einem geteilten Schlüssel k_AB, ist dadurch deutlich **schneller** — und bietet eben **keine Nichtabstreitbarkeit**, weil beide Seiten denselben Schlüssel kennen und somit jeder von ihnen den MAC hätte erzeugen können.

Naheliegend wäre, einen MAC aus einer Hash-Funktion zu bauen, indem man den Schlüssel zusammen mit der Nachricht hasht. Zwei einfache Ansätze haben aber Schwächen. Beim **Secret-Prefix-MAC** h(k‖x) und beim **Secret-Suffix-MAC** h(x‖k) lässt sich jeweils ein Angriff finden — beim Secret-Suffix etwa nutzt Oskar eine Hash-Kollision: Findet er ein x_O mit h(x) = h(x_O), kann er x gegen x_O austauschen, und die Prüfsumme h(x‖k) = h(x_O‖k) bleibt gültig. Die robuste Standardlösung ist **HMAC** (1996 von Bellare, Canetti und Krawczyk): Sie hasht den Schlüssel in zwei verschachtelten Runden mit zwei festen Masken (ipad und opad) und ist dadurch sicher, selbst wenn die zugrunde liegende Hash-Funktion später Schwächen zeigt. HMAC steckt heute in TLS und IPSec; die Konstruktion lautet HMAC(x) = h( (k⁺ ⊕ opad) ‖ h( (k⁺ ⊕ ipad) ‖ x ) ).

![Die HMAC-Konstruktion: zwei verschachtelte Hash-Durchläufe mit gepolstertem Schlüssel](https://upload.wikimedia.org/wikipedia/commons/7/7f/SHAhmac.svg "HMAC: der gepolsterte Schlüssel wird mit ipad bzw. opad maskiert und in zwei verschachtelten Hash-Durchläufen mit der Nachricht verrechnet.")

> **Eselsbrücke (MAC vs. Signatur):** Beide sichern Integrität und Authentizität. Aber **MAC = symmetrisch, schnell, keine Nichtabstreitbarkeit**; **Signatur = asymmetrisch, langsamer, mit Nichtabstreitbarkeit**. Wer streiten können muss, *wer* es war, braucht eine Signatur.

## Auf den Punkt

Die Kurzfassung: In diesem Kapitel geht es um Integrität und Authentizität statt um Geheimhaltung. Eine **digitale Signatur** ist das Spiegelbild der Verschlüsselung — man signiert mit dem privaten und verifiziert mit dem öffentlichen Schlüssel, was Integrität, Authentizität und Nichtabstreitbarkeit liefert. Damit kein **Man-in-the-Middle** falsche öffentliche Schlüssel unterschiebt, bindet ein von einer **CA** signiertes **Zertifikat** den Schlüssel an eine Identität (PKI, X.509). **Hash-Funktionen** sind schlüssellose Fingerabdrücke fester Länge mit Avalanche-Effekt; man signiert immer den Hash, nicht die ganze Nachricht. Ihre drei Ziele sind Urbild-, schwache und starke Kollisionsresistenz — und wegen des **Geburtstagsparadoxons** genügt für eine Kollision ~2^(n/2) statt 2ⁿ Versuche. Hashes schützen auch **Passwörter** (mit **Salting** gegen Rainbow-Tables). Der **MAC** ist das symmetrische, schnellere Gegenstück zur Signatur ohne Nichtabstreitbarkeit; der sichere Standard ist **HMAC**.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **sig_kpr(x) / Verify_kpub(s, x)** | signieren mit privatem / prüfen mit öffentlichem Schlüssel |
| **Non-Repudiation** | Nichtabstreitbarkeit — nur asymmetrisch (Signatur) |
| **MITM** | Man-in-the-Middle: aktiver Angreifer tauscht Schlüssel aus |
| **Zertifikat / CA** | signierte Bindung Schlüssel↔Identität / ausstellende Stelle |
| **PKI / X.509** | Public-Key-Infrastruktur / Standard-Zertifikatsformat |
| **Hash h(x)** | schlüsselloser Fingerabdruck fester Länge |
| **Avalanche-Effekt** | kleinste Inputänderung → völlig anderer Hash |
| **Urbild- / Kollisionsresistenz** | die drei Sicherheitsziele einer Hash-Funktion |
| **Geburtstagsparadoxon** | Kollision schon bei ~2^(n/2) Versuchen |
| **Salting** | zufälliger Wert pro Passwort gegen Rainbow-Tables |
| **MAC / HMAC** | symmetrische Prüfsumme / sicherer Hash-basierter MAC |

## Typische Fallen

- **Signieren = Verschlüsseln mit dem privaten Schlüssel?** Konzeptionell umgekehrt: **signieren mit privat, prüfen mit öffentlich** — verschlüsselt wird mit öffentlich, entschlüsselt mit privat.
- **Ein Hash schützt Vertraulichkeit? Nein** — er ist schlüssellos und nicht umkehrbar und sichert **Integrität**, nicht Geheimhaltung.
- **Ein n-Bit-Hash bietet 2ⁿ Kollisionssicherheit? Nein** — wegen des Geburtstagsparadoxons nur **2^(n/2)**.
- **Ein MAC liefert Nichtabstreitbarkeit? Nein** — das kann nur eine Signatur. Ein MAC sichert nur Integrität und Authentizität.
- **Secret-Prefix/Suffix-MAC ist sicher? Nein** — beide haben bekannte Schwächen; nimm HMAC.
- **Gehashte Passwörter sind automatisch sicher? Nicht ohne Salt** — sonst knackt eine Rainbow-Table die gängigen.

## Klausur-Fokus

Das Übungsblatt setzt zwei praktische Schwerpunkte. Erstens **Hashing und das Geburtstagsparadoxon**: die **Kollisionswahrscheinlichkeit** mit der Näherung 1 − e^(−k(k−1)/2N) ausrechnen (etwa „wie wahrscheinlich ist eine Kollision bei 2,3·10⁷ Dateien und 48-Bit-Adressraum?"), allgemein begründen, warum schon ~2^(n/2) Versuche genügen, und eine **Hash-Tabelle** mit H(k) = k mod m per separate chaining füllen (samt der Beobachtung, dass die Einfügereihenfolge nur die Kettenreihenfolge, nicht die Bucket-Zugehörigkeit ändert). Zweitens **Passwort-Hashing**: erklären, warum man Passwörter nie im Klartext speichert, was ein **Rainbow-Table-Angriff** ist und wie **Salting** ihn verhindert. Auf der Wissensseite: den **Signatur-Ablauf** (signieren mit kpr, prüfen mit kpub) erklären und gegen Verschlüsselung abgrenzen, den **MITM auf den Schlüsselaustausch** schildern und wie **Zertifikate/CA/PKI** ihn verhindern, warum man **erst hasht und dann signiert**, die **drei Hash-Eigenschaften** mit je einem Angriffsszenario, und **MAC gegen Signatur** (symmetrisch/asymmetrisch, Tempo, Non-Repudiation) inklusive der Schwäche des Secret-Suffix-MAC und warum **HMAC** sie behebt.

## Mehr dazu

- **Computerphile — Hashing Algorithms and Security** (EN): die drei Anforderungen an Hashes, der Avalanche-Effekt und warum Kollisionen gefährlich sind. https://www.youtube.com/watch?v=b4b8ktEV4Bg
- **Practical Networking — Hashing, Algorithms, and Collisions** (EN): Digest, Kollisionen und die SHA-Familie sauber erklärt. https://www.youtube.com/watch?v=HHQ2QP_upGM
- **SHA-256-Live-Demo** (interaktiv): tippe Text und beobachte, wie sich der Hash bei jeder Änderung komplett ändert. https://andersbrownworth.com/blockchain/hash`,
  },
};

const lecture07: Explanation = {
  id: "cs-2025-l07",
  lesson: 7,
  title: {
    de: "Kryptowährungen: wie Bitcoin aus Hashes ein dezentrales Geldsystem baut", en: "Cryptocurrencies: how Bitcoin builds a decentralized monetary system from hashes", tr: "Kripto para birimleri: Bitcoin, karmalardan merkezi olmayan bir para sistemini nasıl oluşturur?", ar: "العملات المشفرة: كيف تقوم عملة البيتكوين ببناء نظام نقدي لامركزي من التجزئة", ru: "Криптовалюты: как Биткойн строит децентрализованную денежную систему из хешей", it: "Criptovalute: come Bitcoin costruisce un sistema monetario decentralizzato dagli hash", es: "Criptomonedas: cómo Bitcoin construye un sistema monetario descentralizado a partir de hashes", fr: "Crypto-monnaies : comment Bitcoin construit un système monétaire décentralisé à partir de hachages", zh: "加密货币：比特币如何从哈希构建去中心化的货币系统", pl: "Kryptowaluty: jak Bitcoin buduje zdecentralizowany system monetarny z skrótów", pt: "Criptomoedas: como o Bitcoin constrói um sistema monetário descentralizado a partir de hashes", uk: "Криптовалюти: як біткойн будує децентралізовану грошову систему з хешів", fa: "ارزهای دیجیتال: چگونه بیت کوین یک سیستم پولی غیرمتمرکز را از هش ها می سازد", ja: "暗号通貨: ビットコインがハッシュから分散型通貨システムを構築する方法", ko: "암호화폐: 비트코인이 해시로부터 분산형 통화 시스템을 구축하는 방법", vi: "Tiền điện tử: cách Bitcoin xây dựng hệ thống tiền tệ phi tập trung từ băm", hi: "क्रिप्टोकरेंसी: बिटकॉइन हैश से विकेंद्रीकृत मौद्रिक प्रणाली कैसे बनाता है", ur: "کریپٹو کرنسیز: بٹ کوائن کس طرح ہیش سے ایک غیر مرکزی مالیاتی نظام بناتا ہے", nl: "Cryptocurrencies: hoe Bitcoin een gedecentraliseerd monetair systeem bouwt op basis van hashes", el: "Κρυπτονομίσματα: πώς το Bitcoin χτίζει ένα αποκεντρωμένο νομισματικό σύστημα από hashes", cs: "Kryptoměny: jak bitcoin buduje decentralizovaný peněžní systém z hashů", hu: "Kriptovaluták: hogyan épít a Bitcoin decentralizált monetáris rendszert hashekből", ro: "Criptomonede: cum Bitcoin construiește un sistem monetar descentralizat din hashes", sq: "Kriptovalutat: si Bitcoin ndërton një sistem monetar të decentralizuar nga hashët", sr: "Криптовалуте: како Битцоин гради децентрализовани монетарни систем од хешова", hr: "Kriptovalute: kako Bitcoin gradi decentralizirani monetarni sustav od hasheva", bg: "Криптовалути: как Биткойн изгражда децентрализирана парична система от хешове", sv: "Kryptovalutor: hur Bitcoin bygger ett decentraliserat monetärt system från hash", fi: "Kryptovaluutat: kuinka Bitcoin rakentaa hajautetun rahajärjestelmän tiivisteistä", id: "Cryptocurrency: bagaimana Bitcoin membangun sistem moneter terdesentralisasi dari hash", th: "สกุลเงินดิจิทัล: Bitcoin สร้างระบบการเงินแบบกระจายอำนาจจากแฮชได้อย่างไร", sw: "Cryptocurrencies: jinsi Bitcoin huunda mfumo wa fedha uliogatuliwa kutoka kwa haraka",
  },
  content: {
    de: `Bitcoin ist die große Anwendung, in der alle bisherigen Krypto-Bausteine zusammenlaufen: Hash-Funktionen und digitale Signaturen werden hier zu einem Geldsystem **ohne Bank** verschaltet. Die eine Frage, um die sich alles dreht, lautet: Wie verhindert man ohne zentrale Vertrauensinstanz, dass jemand dasselbe Geld zweimal ausgibt — und wer darf überhaupt neues Geld erzeugen? Die Antworten heißen Blockchain, Distributed Consensus und Proof-of-Work, und sie bestehen vollständig aus Dingen, die du in den letzten Kapiteln schon kennengelernt hast. Wir bauen Bitcoin von unten auf, Baustein für Baustein, bis am Ende klar ist, warum man dieser fremden Maschine sein Geld anvertrauen kann.

## Das Grundproblem: digitales Geld ohne Bank

Vergegenwärtige dir zuerst, was Geld heute ausmacht. Klassisches Buchgeld — Kreditkarte, PayPal — ist **zentralisiert**: Du vertraust einer dritten Partei, die Buch führt, und nichts daran ist anonym. Bargeld dagegen ist **dezentral**, anonym und funktioniert offline, hat aber keinen digitalen Zwilling. Bitcoin will das Beste übertragen: ein **dezentrales Peer-to-Peer-Netz**, allerdings nur **pseudonym** (nicht perfekt anonym, denn alle Transaktionen sind öffentlich) und im Regelfall online. Daraus erwachsen drei Forschungsprobleme: echte **Dezentralität**, eine sinnvolle **Anonymität** und vor allem das **Double-Spending-Problem** — denn eine digitale Münze ist im Grunde nur eine Datei, und Dateien kann man beliebig kopieren. Wie verhindert man, dass jemand dieselbe Münze zweimal ausgibt, wenn keine Bank dazwischensteht? An diesem Problem hatten sich kluge Köpfe lange versucht (das Byzantinische-Generäle-Problem 1980, Chaums Ecash 1989, Haber und Stornettas Zeitstempel-Log 1991, Merkles Hash-Baum 1979), bevor Bitcoin die Teile zusammensetzte.

## Hash-Pointer und die Blockchain

Der erste Baustein ist ein winziger, aber mächtiger Trick. Ein gewöhnlicher **Pointer** ist ein Zeiger auf einen Datenbereich. Ein **Hash-Pointer** zeigt nicht nur dorthin, sondern enthält zusätzlich den **Hash** dieses Bereichs — man kann also jederzeit prüfen, ob die Daten seitdem verändert wurden. Verkettet man Datenblöcke so, dass jeder Block den Hash-Pointer auf seinen Vorgänger enthält, entsteht eine **Blockchain**: im Grunde eine verkettete Liste, bei der jeder „prev"-Zeiger ein Hash-Pointer ist. Das macht die Kette zu einem **manipulationssicheren Log**.

![Eine Blockchain: jeder Block verweist über einen Hash-Pointer auf den vorherigen](https://upload.wikimedia.org/wikipedia/commons/9/98/Blockchain.svg "Blockchain: jeder Block enthält den Hash des vorherigen Blocks. Ändert man einen alten Block, brechen alle nachfolgenden Hashes.")

Der Clou liegt darin, dass die Hash-Berechnung eines Blocks **alle** seine Daten umfasst — die Transaktionen *und* den prev-Hash des Vorgängers. Will die Angreiferin Eve eine alte Transaktion in Block 10 fälschen, ändert sich dadurch dessen Hash; damit stimmt der prev-Eintrag in Block 11 nicht mehr, also ändert sich auch dessen Hash, und so weiter bis zum Ende der Kette. Eve müsste also **alle nachfolgenden Blöcke neu berechnen**, um die Fälschung zu vertuschen. Solange irgendwo der oberste, neueste Hash sicher bekannt ist, fällt jede Manipulation sofort auf. So lässt sich eine Kette beliebiger Länge bilden, die bis zum allerersten Block, dem **Genesis Block**, zurückreicht.

## Merkle-Bäume

Eine reine Kette hat aber einen Nachteil: Will man beweisen, dass eine bestimmte Transaktion enthalten ist, müsste man im Zweifel alles durchgehen. Hier kommt Ralph Merkles Erfindung von 1979 ins Spiel, der **Hash-Baum** (Merkle-Baum): ein Binärbaum aus Hash-Pointern. Man hasht je zwei benachbarte Datenblätter zusammen, dann je zwei dieser Ergebnisse, und so weiter, bis ganz oben eine einzige Wurzel übrig bleibt — die **Merkle Root**, die alle darunterliegenden Daten in einem einzigen Wert zusammenfasst.

![Merkle-Baum: Datenblätter werden paarweise hochgehasht bis zur Merkle Root](https://upload.wikimedia.org/wikipedia/commons/9/95/Hash_Tree.svg "Merkle-Baum: jedes Datenblatt wird gehasht, je zwei Hashes werden zusammen weitergehasht — ganz oben die Merkle Root, die alle Daten zusammenfasst.")

Der große Vorteil gegenüber der reinen Kette: Man kann **effizient beweisen, dass ein Element enthalten ist** (ein Proof of Membership), ohne alle Daten zu prüfen. Es genügt der Pfad von der Wurzel zum betreffenden Blatt — bei n Blättern also nur etwa log(n) Hashes statt aller n.

> **Eselsbrücke (Merkle-Baum):** Blätter paarweise hochhashen bis zu *einer* Wurzel. Um zu beweisen, dass ein Datum drinsteckt, brauchst du nur **log(n)** Hashes entlang des Pfads — nicht alle Daten.

## Identitäten und Bitcoin-Adressen

Wer ist in einem System ohne Bank eigentlich „du"? In Bitcoin sind **öffentliche Schlüssel die Identitäten**. Das funktioniert, weil eine korrekt signierte Nachricht nur von demjenigen stammen kann, der den passenden privaten Schlüssel besitzt — die Signatur *ist* der Identitätsnachweis. Daraus folgt ein **dezentrales Identitätsmanagement**: Jeder kann sich beliebig viele Identitäten erzeugen, indem er einfach neue Schlüsselpaare generiert; niemand muss das genehmigen. Weil öffentliche Schlüssel allerdings lang und unhandlich sind, leitet man aus ihnen eine kompakte **Bitcoin-Adresse** ab (vergleichbar einer IBAN), und zwar über die Kette Public Key → SHA-256 → RIPEMD-160 → Präfix 00 → Base58Check → Adresse.

## Distributed Consensus und der Double-Spend

Jetzt zum Herzstück: Wie einigen sich tausende fremder Knoten ohne Chef auf *eine* gemeinsame Wahrheit? Jeder Knoten besitzt die Blockchain, über die bereits Konsens besteht, plus einen Pool noch ausstehender Transaktionen. Der vereinfachte Konsens-Algorithmus läuft so ab: Neue Transaktionen werden an alle Knoten gebroadcastet; jeder Knoten sammelt sie in einem Block; in jeder Runde teilt ein zunächst *zufällig* gewählter Knoten seinen Block mit (das ist die Vereinfachung, die wir gleich aufheben); die anderen akzeptieren ihn nur, wenn alle enthaltenen Transaktionen gültig sind (die Coins noch nicht ausgegeben, die Signaturen korrekt); und sie zeigen ihre Akzeptanz, indem sie den Hash dieses Blocks in ihren eigenen nächsten Block aufnehmen.

Wo ist der Angriff? Beim **Double-Spend** sendet Alice ihre 100 Coins gleichzeitig an Bob *und* an sich selbst (an eine zweite eigene Adresse Alice'). Beide Transaktionen sind gültig signiert, also entstehen **zwei konkurrierende Branches** der Kette. Welcher gewinnt? Die Regel heißt **Longest Chain Wins**: Knoten bauen auf dem Branch weiter, den sie zuerst gesehen haben, und langfristig wird einer der beiden länger — der kürzere wird obsolet, und mit ihm die darin enthaltene Transaktion. Praktisch heißt das: Wartet Bob auf gar keine Bestätigung (eine Zero-Confirmation-Transaktion), ist der Angriff leicht; je mehr Bestätigungen er abwartet, desto sicherer ist sein Geld. Die Faustregel lautet: **Nach 6 Bestätigungen** ist die Double-Spend-Chance praktisch null.

> **Eselsbrücke (Double-Spend):** Zwei widersprüchliche Zahlungen → zwei Ketten-Äste → **der längste Ast gewinnt**. Warte auf **6 Bestätigungen**, dann ist die doppelte Ausgabe so gut wie unmöglich. Den ganzen Aufbau baut [3Blue1Brown von Grund auf nach](https://www.youtube.com/watch?v=bBC-nXj3Ng4).

## Proof-of-Work und die Anreize

Die „zufällige Knotenwahl" aus dem vereinfachten Algorithmus ist nicht nur unrealistisch, sie ist auch angreifbar: Wer beliebig viele Identitäten erzeugen kann, erzeugt eben auch beliebig viele Knoten und reißt die Wahl an sich (eine Sybil-Attacke). Bitcoin ersetzt die Zufallswahl deshalb durch **Proof-of-Work** — einen Wettbewerb um eine knappe, nicht fälschbare Ressource: **Rechenleistung**. Die Idee stammt aus **Hashcash**, das ursprünglich Spam erschweren sollte. Um einen Block erzeugen zu dürfen, muss ein Miner eine Zahl finden, die **Nonce**, sodass der Hash des Blocks unter einer Schwelle liegt: **H(nonce ‖ prev ‖ transactions) < target**. Das Puzzle ist schwer zu lösen, aber für jeden leicht zu prüfen, und das **Target** stellt die Schwierigkeit ein (je kleiner, desto mehr führende Nullen muss der Hash haben).

![Aufbau eines Bitcoin-Blocks mit Nonce und Proof-of-Work](https://upload.wikimedia.org/wikipedia/commons/5/55/Bitcoin_Block_Data.svg "Ein Bitcoin-Block: Vorgänger-Hash, Merkle Root der Transaktionen und die Nonce, die der Miner so lange variiert, bis der Block-Hash unter dem Target liegt.")

Weil das Mining echte Energie kostet, müssen ehrliche Knoten belohnt werden — Bitcoin nimmt dabei an, dass mehr als die Hälfte der Rechenleistung in ehrlichen Händen ist. Die Belohnung hat zwei Quellen. Die erste ist der **Block Reward**: Jeder Block enthält eine spezielle **Coinbase-Transaktion**, die frische Coins an den Miner ausschüttet. Dieser Reward halbiert sich alle 210 000 Blöcke (er begann bei 50 BTC und sank über 25 im Jahr 2012, 12,5 (2016), 6,25 (2020) auf 3,125 (2024)); um etwa 2140 erreicht er null. Die zweite Quelle sind die **Transaktionsgebühren**: Wählt man den Output einer Transaktion kleiner als den Input, geht die Differenz an den Miner — dieser Mechanismus hält Miner auch dann noch motiviert, wenn es keinen Block Reward mehr gibt. Wie ein Knoten überhaupt erkennt, ob Coins schon ausgegeben wurden, regelt das **UTXO-Modell** (Unspent Transaction Output): Eine Transaktion besteht aus Inputs (je eine Adresse plus eine unverbrauchte frühere Transaktion, signiert) und Outputs (Adresse plus Betrag), und die Differenz ist die Gebühr.

> **Eselsbrücke (Proof-of-Work):** Probiere Nonces durch, bis der Block-Hash **klein genug** ist (unter dem Target = beginnt mit genug Nullen). **Suchen ist teuer, Prüfen ist billig.** Genau dieses Würfeln um eine gültige Nonce kannst du in der [ETH.BUILD-Demo](https://ethereum.org/videos/blockchain-eth-build/) selbst ausprobieren.

### Schritt für Schritt: einen Block minen

Im Übungsblatt taucht eine vereinfachte **Mining-Aufgabe** auf, und das Vorgehen ist immer dasselbe. Du bekommst eine Hash-Formel und die festen Felder eines Blocks (den prev-Hash, die Zeit, die Transaktions-Wurzel) und sollst die **Nonce finden, mit der die Gültigkeitsbedingung erfüllt ist** — etwa „Block-Hash ≥ 90" bei der Spielzeug-Währung CyberCoin oder allgemein „Hash < Target". Du setzt schlicht nonce = 0 in die Formel ein, rechnest den Hash aus und prüfst die Bedingung; ist sie nicht erfüllt, nimmst du nonce = 1, dann 2, und so weiter, bis es passt. Genau das tun echte Miner — nur milliardenfach pro Sekunde mit echten SHA-256-Hashes. Und der Witz dabei ist „schwer zu finden, leicht zu prüfen": Hat ein Miner die richtige Nonce gefunden, kann jeder andere den Hash *ein einziges Mal* nachrechnen und die Gültigkeit sofort bestätigen.

### Schritt für Schritt: die maximale Münzmenge herleiten

Die zweite Lieblingsaufgabe ist die **maximale Münzmenge aus der Halbierung**, und sie ist eine schöne geometrische Reihe. Bei Bitcoin startet der Reward bei 50 BTC und halbiert sich alle 210 000 Blöcke, also 50, dann 25, dann 12,5, und so fort. Die Gesamtmenge ist damit 210 000 · (50 + 25 + 12,5 + …) = 210 000 · 50 · (1 + ½ + ¼ + …). Die Reihe in der Klammer summiert sich zu **2**, also kommt 210 000 · 50 · 2 = **21 000 000** heraus — die berühmten 21 Millionen Bitcoin. Dieselbe Rechnung funktioniert für jede Spielzeug-Währung: Hat CyberCoin etwa einen Reward von 10, der sich alle 730 Blöcke halbiert, dann sind es maximal 730 · 10 · 2 = **14 600** CyberCoins.

### Schritt für Schritt: wann sich eine Rainbow-Table lohnt

Dasselbe Übungsblatt knüpft noch einmal an das Passwort-Hashing aus dem vorigen Kapitel an und lässt dich ausrechnen, *warum* lange Passwörter Rainbow-Tables besiegen. Gibt es 77 verwendbare Zeichen und erlaubt man Passwortlängen bis 8, dann ist die Zahl möglicher Passwörter 77⁴ + 77⁵ + … + 77⁸ — und dieser Wert wird vom letzten Term beherrscht, also grob 77⁸ ≈ 1,2 · 10¹⁵. Speichert man pro Eintrag 26 Byte, bräuchte die Rainbow-Table rund 26 · 1,2 · 10¹⁵ ≈ 3 · 10¹⁶ Byte, also etwa **30 Petabyte**. Und ihre Erzeugung bei 200 000 Hashes pro Sekunde dauerte 1,2 · 10¹⁵ / 2 · 10⁵ ≈ 6 · 10⁹ Sekunden, also fast **200 Jahre**. Genau diese Zahlen zeigen, warum man Passwörter lang wählt (und mit Salt versieht, siehe voriges Kapitel): Die vorberechnete Tabelle wird schlicht unbezahlbar.

## Auf den Punkt

Die Kurzfassung: Bitcoin ist dezentrales, pseudonymes Geld ohne Bank, dessen Kernprobleme das Double-Spending, der Konsens ohne Vertrauensinstanz und die Frage nach dem Geldschöpfen sind. Gelöst wird das aus vier Bausteinen der Vorwochen: **Hash-Pointer** verketten Blöcke zu einem manipulationssicheren Log (der **Blockchain**) — ändert man einen alten Block, brechen alle folgenden Hashes; ein **Merkle-Baum** fasst alle Transaktionen eines Blocks in einer Wurzel zusammen und erlaubt effiziente Mitgliedsbeweise; **öffentliche Schlüssel** dienen als Identitäten, aus denen die Bitcoin-Adresse abgeleitet wird; und der Konsens entsteht durch **Proof-of-Work**, bei dem Miner eine Nonce mit H(Block) < Target suchen. Es gilt „Longest Chain Wins", nach etwa 6 Bestätigungen ist Double-Spending praktisch unmöglich, und die Anreize liefern der **Block Reward** (halbiert sich alle 210 000 Blöcke, Obergrenze 21 Mio. BTC) plus die **Transaktionsgebühren**.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Double-Spending** | dieselbe Münze zweimal ausgeben |
| **Hash-Pointer** | Zeiger plus Hash des Zielbereichs (manipulationssicher) |
| **Blockchain** | über Hash-Pointer verkettete Blöcke; Start = Genesis Block |
| **Merkle-Baum / Root** | Hash-Baum; die Wurzel fasst alle Daten zusammen |
| **Bitcoin-Adresse** | aus dem Public Key: SHA-256 → RIPEMD-160 → Base58Check |
| **Proof-of-Work** | eine Nonce mit H(nonce‖prev‖tx) < target finden |
| **Nonce** | die gesuchte Zahl, die den Block gültig macht |
| **Longest Chain Wins** | der längste Branch setzt sich durch |
| **Block Reward / Coinbase** | frische Coins an den Miner, halbiert alle 210 000 Blöcke |
| **UTXO** | Unspent Transaction Output — verfügbares Guthaben |

## Typische Fallen

- **Bitcoin ist anonym? Nein** — nur **pseudonym**; Adressen statt Namen, aber alle Transaktionen sind öffentlich nachvollziehbar.
- **Eine Transaktion ist sofort sicher? Nein** — erst nach mehreren **Bestätigungen** (Faustregel 6); bei Zero-Confirmation droht der Double-Spend.
- **Der Block-Hash deckt nur die Transaktionen ab? Nein** — er umfasst auch den **prev-Hash**, deshalb pflanzt sich jede Manipulation nach vorn fort.
- **Proof-of-Work „berechnet etwas Nützliches"? Nein** — der Sinn ist allein, dass die Arbeit **knapp und teuer** ist; nur die Nonce-Suche zählt.
- **Der Block Reward bleibt konstant? Nein** — er **halbiert** sich alle 210 000 Blöcke, mit der Obergrenze von 21 Mio. BTC.

## Klausur-Fokus

Das Übungsblatt mischt Theorie mit hübschen Rechenaufgaben. Zum freien Erklären gehören der **Aufbau und Zweck einer Blockchain**, das **Byzantinische-Generäle-Problem** im Bitcoin-Kontext (sich ohne zentrale Instanz auf eine Wahrheit einigen), das **Proof-of-Work**-Konzept und die Rolle des **Merkle-Trees**. Die typische Rechenaufgabe ist eine vereinfachte **Mining-Simulation**: Mit einer gegebenen Hash-Formel sollst du für vorgegebene Blockfelder die **Nonce finden, mit der der Block-Hash die Gültigkeitsbedingung erfüllt** (etwa Hash ≥ Schwelle) und so eine Blocktabelle vervollständigen. Dazu solltest du die **maximale Münzmenge aus einer Halbierungsregel** über die geometrische Reihe berechnen können (Reward · Blöcke-pro-Halbierung · 2). Und passend zum Passwort-Hashing aus dem letzten Kapitel: die **Größe und Erzeugungszeit einer Rainbow-Table** abschätzen (Zahl der Passwörter über die Kombinatorik, mal Bytes pro Zeile, geteilt durch die Hash-Rate). Eher konzeptionell bleiben das **Manipulations-Szenario** der Blockchain, der **Double-Spend** mit „Longest Chain Wins" und der 6-Bestätigungen-Regel sowie **Block Reward**, **Transaktionsgebühren** und **UTXO** in Grundzügen.

## Mehr dazu

- **3Blue1Brown — But how does bitcoin actually work?** (~26 Min., EN): baut Bitcoin Schritt für Schritt aus Ledger, Signaturen, Hashes und Proof-of-Work auf — die beste Intuition zum Thema. https://www.youtube.com/watch?v=bBC-nXj3Ng4
- **ETH.BUILD — Blockchain-Mining-Demo** (interaktiv, EN): live sehen, wie Blöcke verkettet werden, wie Proof-of-Work sichert und was bei Manipulation passiert. https://ethereum.org/videos/blockchain-eth-build/
- **Khan Academy — Bitcoin: Cryptographic hash functions** (EN): die Hash-Grundlage hinter Bitcoin. https://www.youtube.com/watch?v=0WiTaBI82Mc`,
  },
};

const lecture08: Explanation = {
  id: "cs-2025-l08",
  lesson: 8,
  title: {
    de: "Sicherheitsprotokolle & Schlüsselvereinbarung: Diffie-Hellman, Needham-Schroeder, Kerberos", en: "Security Protocols & Key Agreement: Diffie-Hellman, Needham-Schroeder, Kerberos", tr: "Güvenlik Protokolleri ve Anahtar Anlaşması: Diffie-Hellman, Needham-Schroeder, Kerberos", ar: "بروتوكولات الأمان والاتفاق الرئيسي: ديفي هيلمان، نيدهام شرودر، كيربيروس", ru: "Протоколы безопасности и соглашение о ключах: Диффи-Хеллман, Нидэм-Шредер, Kerberos", it: "Protocolli di sicurezza e accordo chiave: Diffie-Hellman, Needham-Schroeder, Kerberos", es: "Protocolos de seguridad y acuerdo clave: Diffie-Hellman, Needham-Schroeder, Kerberos", fr: "Protocoles de sécurité et accord clé : Diffie-Hellman, Needham-Schroeder, Kerberos", zh: "安全协议和密钥协议：Diffie-Hellman、Needham-Schroeder、Kerberos", pl: "Protokoły bezpieczeństwa i kluczowa umowa: Diffie-Hellman, Needham-Schroeder, Kerberos", pt: "Protocolos de segurança e acordo chave: Diffie-Hellman, Needham-Schroeder, Kerberos", uk: "Протоколи безпеки та ключова угода: Diffie-Hellman, Needham-Schroeder, Kerberos", fa: "پروتکل های امنیتی و توافقنامه کلیدی: دیفی-هلمن، نیدهام-شردر، کربروس", ja: "セキュリティプロトコルと鍵合意: Diffie-Hellman、Needham-Schroeder、Kerberos", ko: "보안 프로토콜 및 주요 계약: Diffie-Hellman, Needham-Schroeder, Kerberos", vi: "Giao thức bảo mật & Thỏa thuận chính: Diffie-Hellman, Needham-Schroeder, Kerberos", hi: "सुरक्षा प्रोटोकॉल और मुख्य समझौता: डिफी-हेलमैन, नीधम-श्रोएडर, केर्बरोस", ur: "سیکورٹی پروٹوکول اور کلیدی معاہدہ: Diffie-Hellman, Needham-Schroeder, Kerberos", nl: "Beveiligingsprotocollen en sleutelovereenkomst: Diffie-Hellman, Needham-Schroeder, Kerberos", el: "Πρωτόκολλα ασφαλείας και συμφωνία κλειδιού: Diffie-Hellman, Needham-Schroeder, Kerberos", cs: "Bezpečnostní protokoly a klíčová dohoda: Diffie-Hellman, Needham-Schroeder, Kerberos", hu: "Biztonsági protokollok és kulcsszerződés: Diffie-Hellman, Needham-Schroeder, Kerberos", ro: "Protocoale de securitate și acord cheie: Diffie-Hellman, Needham-Schroeder, Kerberos", sq: "Protokollet e Sigurisë dhe Marrëveshja kryesore: Diffie-Hellman, Needham-Schroeder, Kerberos", sr: "Безбедносни протоколи и споразум о кључу: Диффие-Хеллман, Неедхам-Сцхроедер, Керберос", hr: "Sigurnosni protokoli i ugovor o ključu: Diffie-Hellman, Needham-Schroeder, Kerberos", bg: "Протоколи за сигурност и ключово споразумение: Diffie-Hellman, Needham-Schroeder, Kerberos", sv: "Säkerhetsprotokoll och nyckelavtal: Diffie-Hellman, Needham-Schroeder, Kerberos", fi: "Suojausprotokollat ​​ja avainsopimus: Diffie-Hellman, Needham-Schroeder, Kerberos", id: "Protokol Keamanan & Perjanjian Utama: Diffie-Hellman, Needham-Schroeder, Kerberos", th: "โปรโตคอลความปลอดภัยและข้อตกลงสำคัญ: Diffie-Hellman, Needham-Schroeder, Kerberos", sw: "Itifaki za Usalama na Makubaliano Muhimu: Diffie-Hellman, Needham-Schroeder, Kerberos",
  },
  content: {
    de: `Wir haben jetzt Chiffren — symmetrische wie asymmetrische — und digitale Signaturen. Doch eine alte Lücke ist immer noch offen, dieselbe, die schon die symmetrische Kryptografie quälte: *Wie einigen sich zwei Fremde über eine abgehörte Leitung auf einen gemeinsamen geheimen Schlüssel, ohne ihn vorher ausgetauscht zu haben?* Dieses Kapitel gibt zwei grundverschiedene Antworten. Die erste ist ein kleines Wunder der Mathematik — der **Diffie-Hellman-Schlüsselaustausch**, bei dem Alice und Bob einen gemeinsamen Schlüssel erzeugen, der *nie* über die Leitung geht. Die zweite ist bodenständiger und server-gestützt — Protokolle wie **Needham-Schroeder** und **Kerberos**, die einen vertrauenswürdigen Schlüsselserver einsetzen. Beide haben ihre Tücken, und genau die machen das Kapitel klausurrelevant.

## Diffie-Hellman: ein Geheimnis öffentlich aushandeln

1976 stellten Whitfield Diffie und Martin Hellman ein Verfahren vor, das auf den ersten Blick unmöglich wirkt: Zwei Parteien einigen sich auf einen gemeinsamen geheimen Schlüssel, indem sie ausschließlich *öffentliche* Nachrichten austauschen. Möglich macht das eine andere Einwegfunktion als bei RSA — nicht die Faktorisierung, sondern das **diskrete Logarithmusproblem**: Eine Potenz α^a mod p ist leicht zu berechnen, aber aus dem Ergebnis den Exponenten a zurückzugewinnen ist für große p praktisch aussichtslos. DHKE löst damit das Schlüsselverteilungsproblem und steckt heute in SSL/TLS und IPsec.

Die schönste Intuition dafür ist das **Farbenmischen**: Man nehme an, zwei Farben zu mischen sei leicht, eine gemischte Farbe aber wieder in ihre Bestandteile zu zerlegen sei praktisch unmöglich. Alice und Bob einigen sich öffentlich auf eine gemeinsame Grundfarbe. Dann mischt jeder heimlich seine eigene Geheimfarbe hinein und schickt das Ergebnis offen herüber. Mischt nun jeder die *empfangene* Mischung mit seiner *eigenen* Geheimfarbe, landen beide bei exakt derselben Endfarbe — die ein Lauscher nicht nachmischen kann, weil ihm beide Geheimfarben fehlen.

![Diffie-Hellman als Farbmisch-Analogie](https://upload.wikimedia.org/wikipedia/commons/4/46/Diffie-Hellman_Key_Exchange.svg "Diffie-Hellman als Farben: eine öffentliche Grundfarbe plus je eine geheime Farbe ergeben über Kreuz dieselbe Endfarbe — ohne die geheimen Farben zu verraten.")

In Zahlen läuft das so ab. Zuerst das öffentliche **Setup**: Man wählt eine große Primzahl p (idealerweise über 2048 Bit) und eine Basis α aus dem Bereich von 2 bis p−2 und veröffentlicht beide. Dann das **Protokoll**: Alice wählt insgeheim eine Zahl a, berechnet A = α^a mod p und schickt A an Bob; Bob wählt insgeheim b, berechnet B = α^b mod p und schickt B an Alice. Nun rechnet Alice B^a = (α^b)^a = α^(a·b) mod p, und Bob rechnet A^b = (α^a)^b = α^(a·b) mod p — beide erhalten denselben **Sitzungsschlüssel k_AB = α^(a·b) mod p**, obwohl nur A und B je übertragen wurden. Ein Lauscher Oskar kennt α, p, A und B, müsste aber aus A = α^a den geheimen Exponenten a ziehen — eben den diskreten Logarithmus —, und das gelingt für große p nicht.

![Beide Seiten berechnen dasselbe gemeinsame Geheimnis](https://upload.wikimedia.org/wikipedia/commons/4/4c/Public_key_shared_secret.svg "Aus den öffentlich ausgetauschten Werten berechnen beide Parteien dasselbe gemeinsame Geheimnis, das nie über die Leitung gesendet wurde.")

### Schritt für Schritt: Diffie-Hellman von Hand

Rechnen wir es mit kleinen Zahlen durch, genau wie auf dem Übungsblatt. Öffentlich seien p = 13 und g = 2 (das g ist hier die Basis α). Alice wählt geheim a = 4, Bob wählt geheim b = 5.

- Alice berechnet A = g^a mod p = 2⁴ mod 13 = 16 mod 13 = **3** und schickt 3.
- Bob berechnet B = g^b mod p = 2⁵ mod 13 = 32 mod 13 = **6** und schickt 6.
- Alice berechnet das Geheimnis s = B^a mod p = 6⁴ mod 13 = 1296 mod 13 = **9**.
- Bob berechnet s = A^b mod p = 3⁵ mod 13 = 243 mod 13 = **9**.

Beide haben **s = 9** — und über die Leitung gingen nur die 3 und die 6, nie die 9. (Bei größeren Exponenten rechnest du die Potenzen wieder mit Square-and-Multiply und reduzierst nach jedem Schritt modulo p.) Wichtig ist die eine Einschränkung, die du nie vergessen darfst: Ohne Authentisierung ist auch DHKE durch einen aktiven **Man-in-the-Middle** angreifbar — Oskar handelt einfach mit Alice *und* mit Bob je einen eigenen Schlüssel aus und sitzt unbemerkt in der Mitte. Deshalb braucht DHKE in der Praxis Zertifikate.

> **Eselsbrücke (Diffie-Hellman = Farben mischen):** öffentliche Grundfarbe (α, p) plus je eine *geheime* Farbe (a, b). Jeder schickt seine Mischung; mischt man die fremde Mischung mit der eigenen geheimen Farbe, kommt **dieselbe** Endfarbe heraus. Entmischen (= diskreter Log) geht nicht. [Computerphile zeigt genau diese Analogie](https://www.youtube.com/watch?v=NmM9HA2MQGI).

## Schlüsselserver (KDC): der symmetrische Weg

Es gibt auch einen ganz anderen Weg, Sitzungsschlüssel zu verteilen — rein **symmetrisch**, über einen vertrauenswürdigen Server, das **Key Distribution Center (KDC)**. Die Annahme dabei: Jeder Nutzer besitzt schon einen geheimen symmetrischen Schlüssel mit dem KDC, der vorab installiert wurde (etwa vom Systemadministrator bei der Laptop-Übergabe). Wollen nun zwei Nutzer kommunizieren, erzeugt das KDC einen frischen **Sitzungsschlüssel** (auch Session- oder Ephemeral-Key genannt) und verteilt ihn verschlüsselt an beide. Warum kurzlebige Sitzungsschlüssel überhaupt sinnvoll sind: Dem Angreifer stehen pro Schlüssel nur wenige Chiffrate zur Verfügung, er müsste viele verschiedene Schlüssel knacken, um längere Kommunikation mitzulesen (man denke an Satellitenfernsehen oder Sprachverschlüsselung), und das symmetrische Etablieren ist rechnerisch schnell.

## Zwei Angriffe, die jedes Schlüsselprotokoll abwehren muss

Solche server-gestützten Protokolle müssen gegen zwei klassische Angriffe gewappnet sein. Der erste ist der **Replay-Angriff**: Ist der empfangene Sitzungsschlüssel überhaupt *aktuell*? Wenn ein Protokoll das nicht prüft, kann ein Angreifer alte, mitgeschnittene Nachrichten erneut einspielen und sich dabei als KDC ausgeben. Das Gegenmittel heißt **Freshness** und wird durch Nonces (frische Zufallswerte), Timestamps oder Zähler garantiert. Der zweite ist der **Schlüsselbestätigungsangriff**: Hat die Gegenseite den Schlüssel wirklich *bestätigt*? Tut sie das nicht nachweislich, kann Oskar eine der Identitäten austauschen und so einen Schlüssel etablieren, den er selbst kennt. Das Gegenmittel ist ein **Challenge-Response-Verfahren** und das feste **Einbinden der Identitäten** in die ausgetauschten Nachrichten.

> **Eselsbrücke (Replay vs. Bestätigung):** **Replay** fragt „ist die Nachricht *frisch*?" → Gegenmittel **Freshness** (Nonce/Timestamp). **Bestätigung** fragt „redet wirklich die *richtige* Gegenseite?" → Gegenmittel **Challenge-Response**. Merke außerdem: **Needham-Schroeder = Nonces** (mit Lücke), **Kerberos = Timestamps** (dafür synchrone Uhren nötig).

## Needham-Schroeder und Kerberos

Das **Needham-Schroeder-Protokoll** von 1978 ist so ein KDC-Protokoll. Es wehrt Schlüsselbestätigungsangriffe ab, weil die Identitäten verschlüsselt übertragen werden und die letzten Nachrichten per Challenge-Response bestätigen, dass Alice den Sitzungsschlüssel tatsächlich besitzt. Doch es hat eine berühmte **Schwäche**: Bricht das Protokoll nach der zweiten Nachricht ab, kann ein Angreifer, der einen *alten* Sitzungsschlüssel (und Alices Schlüssel) erbeutet hat, einfach die dritte Nachricht senden — und Bob merkt nicht, dass der Schlüssel längst veraltet ist. Nonces allein decken diesen Fall nicht ab; hier bräuchte man Timestamps.

Genau das tut der Nachfolger. **Kerberos** baut auf Needham-Schroeder auf, ist aber mehr als bloßer Schlüsseltransport: Es **authentisiert Nutzer im gesamten Netzwerk**, wurde 1993 als RFC 1510 standardisiert und steckt heute in jeder Active-Directory-Umgebung von Windows und Linux. Der entscheidende Unterschied ist der Einsatz von **Timestamps** statt bloßer Nonces, womit der eben beschriebene Replay-Angriff ausscheidet — der Preis dafür sind **synchronisierte Uhren** zwischen allen Beteiligten. Beide Protokolle teilen aber eine grundsätzliche Annahme: eine **vertrauenswürdige dritte Partei**, das KDC. Und das ist zugleich ihr Schwachpunkt — ein **Single Point of Failure**, dessen Kompromittierung das ganze System aushebelt.

## Auf den Punkt

Die Kurzfassung: Dieses Kapitel schließt die Lücke „wie einigen sich zwei Fremde über eine abgehörte Leitung auf einen Schlüssel?". Die erste Antwort ist **Diffie-Hellman**: Alice und Bob erzeugen *gemeinsam* den Schlüssel k_AB = α^(a·b) mod p, ohne ihn je zu senden — sicher dank des diskreten Logarithmusproblems, aber ohne Authentisierung MITM-anfällig (deshalb Zertifikate). Die zweite Antwort sind **server-gestützte Protokolle** mit einem KDC, das symmetrische Sitzungsschlüssel verteilt (jeder teilt vorab einen Schlüssel mit dem KDC). Solche Protokolle müssen zwei Angriffe abwehren: **Replay** (Gegenmittel Freshness via Nonce/Timestamp) und **fehlende Schlüsselbestätigung** (Gegenmittel Challenge-Response). **Needham-Schroeder** (1978) hat noch eine Replay-Lücke; **Kerberos** schließt sie mit Timestamps (braucht dafür synchrone Uhren) und authentisiert Nutzer im Netz. Beide setzen ein KDC voraus — einen Single Point of Failure.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **DHKE** | Diffie-Hellman Key Exchange |
| **diskretes Logarithmusproblem** | Einwegfunktion hinter DHKE (und ECC) |
| **α, p (bzw. g, p)** | öffentliche Parameter: Basis/Generator und große Primzahl |
| **a, b** | die privaten Exponenten von Alice und Bob |
| **k_AB = α^(a·b) mod p** | der gemeinsame Sitzungsschlüssel |
| **KDC** | Key Distribution Center — der Schlüsselserver |
| **Session-/Ephemeral-Key** | kurzlebiger Sitzungsschlüssel |
| **Replay-Angriff** | alte Nachrichten erneut einspielen |
| **Freshness** | Aktualität via Nonce / Timestamp / Zähler |
| **Challenge-Response** | Nachweis, dass die Gegenseite den Schlüssel hat |
| **Needham-Schroeder / Kerberos** | KDC-Protokolle (Nonces / Timestamps) |

## Typische Fallen

- **Bei DHKE wird der Schlüssel übertragen? Nein** — übertragen werden nur A und B; der Schlüssel α^(a·b) wird bei beiden *berechnet*, nie gesendet.
- **DHKE ist gegen MITM sicher? Nein** — ohne Authentisierung/Zertifikate ist es angreifbar, wie alle asymmetrischen Verfahren.
- **DHKE und RSA nutzen dasselbe Problem? Nein** — DHKE beruht auf dem **diskreten Logarithmus**, RSA auf der **Faktorisierung**.
- **Nonces lösen jeden Replay? Nicht ganz** — die Needham-Schroeder-Lücke zeigt, dass hier **Timestamps** nötig sind.
- **Ein KDC bringt nur Vorteile? Nein** — es ist eine vertrauenswürdige dritte Partei und damit ein **Single Point of Failure**.

## Klausur-Fokus

Die mit Abstand wichtigste Übung dieses Kapitels ist die **Diffie-Hellman-Rechnung** — übe sie, bis sie blind sitzt: Aus p, g, a, b berechnest du A = g^a mod p, B = g^b mod p und das gemeinsame Geheimnis s = B^a mod p = A^b mod p. Das Übungsblatt lässt das an mehreren Parametersätzen durchrechnen (etwa p = 13, g = 2, a = 4, b = 5 → s = 9), und genau so kommt es in der Klausur. Erkläre dazu, **warum DHKE sicher ist** (diskreter Logarithmus) und **warum ein MITM** ohne Authentisierung trotzdem gelingt. Der zweite Schwerpunkt sind **Zertifikate und TLS**: das Aufgabenspektrum einer **CA**, die Ansätze zum **Widerruf** eines Zertifikats (die Sperrliste CRL und das Echtzeit-**OCSP**), der Unterschied zwischen der **CA-basierten Vertrauensstruktur und dem Web of Trust** (GPG) sowie die Idee von **Let's Encrypt** und **Certificate Transparency**. Auf der Protokollseite: **Replay** gegen **Schlüsselbestätigungsangriff** mit je dem Gegenmittel (Freshness/Nonce bzw. Challenge-Response), die **Needham-Schroeder-Schwäche** (Abbruch nach Nachricht 2) und **Kerberos** (Timestamps statt Nonces, synchrone Uhren nötig, KDC als Single Point of Failure).

## Mehr dazu

- **Computerphile — Secret Key Exchange (Diffie-Hellman)** (~9 Min., EN): die berühmte Farbmisch-Analogie — warum man ein Geheimnis öffentlich aushandeln kann. https://www.youtube.com/watch?v=NmM9HA2MQGI
- **Computerphile — Public Key Cryptography** (~6 Min., EN): Einordnung asymmetrischer Verfahren und Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4
- **Wikipedia — Diffie-Hellman-Schlüsselaustausch** (DE): Protokoll, Rechenbeispiel und das MITM-Problem im Detail. https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch`,
  },
};

const lecture09: Explanation = {
  id: "cs-2025-l09",
  lesson: 9,
  title: {
    de: "Denial-of-Service und Input Validation: Angriffe auf Verfügbarkeit und Webanwendungen", en: "Denial-of-Service and Input Validation: Attacks on Availability and Web Applications", tr: "Hizmet Reddi ve Giriş Doğrulaması: Kullanılabilirliğe ve Web Uygulamalarına Yönelik Saldırılar", ar: "رفض الخدمة والتحقق من صحة الإدخال: الهجمات على التوفر وتطبيقات الويب", ru: "Отказ в обслуживании и проверка входных данных: атаки на доступность и веб-приложения", it: "Denial-of-Service e convalida dell'input: attacchi alla disponibilità e alle applicazioni Web", es: "Denegación de servicio y validación de entradas: ataques a la disponibilidad y aplicaciones web", fr: "Déni de service et validation des entrées : attaques contre la disponibilité et les applications Web", zh: "拒绝服务和输入验证：对可用性和 Web 应用程序的攻击", pl: "Odmowa usługi i weryfikacja danych wejściowych: ataki na dostępność i aplikacje internetowe", pt: "Negação de serviço e validação de entrada: ataques à disponibilidade e aplicações web", uk: "Відмова в обслуговуванні та перевірка введених даних: атаки на доступність і веб-додатки", fa: "رد سرویس و اعتبارسنجی ورودی: حملات به در دسترس بودن و برنامه های کاربردی وب", ja: "サービス拒否と入力検証: 可用性と Web アプリケーションに対する攻撃", ko: "서비스 거부 및 입력 검증: 가용성 및 웹 애플리케이션에 대한 공격", vi: "Từ chối dịch vụ và xác thực đầu vào: Tấn công vào tính khả dụng và ứng dụng web", hi: "सेवा से इनकार और इनपुट सत्यापन: उपलब्धता और वेब अनुप्रयोगों पर हमले", ur: "سروس سے انکار اور ان پٹ کی توثیق: دستیابی اور ویب ایپلیکیشنز پر حملے", nl: "Denial-of-Service en invoervalidatie: aanvallen op beschikbaarheid en webapplicaties", el: "Άρνηση υπηρεσίας και επικύρωση εισόδου: Επιθέσεις στη διαθεσιμότητα και σε εφαρμογές Ιστού", cs: "Denial-of-Service a ověřování vstupu: Útoky na dostupnost a webové aplikace", hu: "Szolgáltatásmegtagadás és bevitel ellenőrzése: Az elérhetőség és a webalkalmazások elleni támadások", ro: "Refuzarea serviciului și validarea intrărilor: atacuri asupra disponibilității și aplicațiilor web", sq: "Mohimi i shërbimit dhe vërtetimi i hyrjes: Sulmet ndaj disponueshmërisë dhe aplikacioneve në ueb", sr: "Ускраћивање услуге и валидација уноса: напади на доступност и веб апликације", hr: "Uskraćivanje usluge i provjera valjanosti unosa: napadi na dostupnost i web aplikacije", bg: "Отказ от услуга и валидиране на въвеждане: атаки срещу наличността и уеб приложенията", sv: "Denial-of-Service och indatavalidering: Attacker mot tillgänglighet och webbapplikationer", fi: "Palvelunesto ja syötteen vahvistaminen: käytettävyyttä ja verkkosovelluksia koskevat hyökkäykset", id: "Penolakan Layanan dan Validasi Input: Serangan terhadap Ketersediaan dan Aplikasi Web", th: "การปฏิเสธการให้บริการและการตรวจสอบอินพุต: การโจมตีความพร้อมใช้งานและแอปพลิเคชันเว็บ", sw: "Kunyimwa-Huduma na Uthibitishaji wa Ingizo: Hushambulia Upatikanaji na Maombi ya Wavuti.",
  },
  content: {
    de: `Hier verlässt der Kurs die reine Mathematik und betritt die Welt der Netzwerk- und Web-Sicherheit. Zwei sehr unterschiedliche Angreifer treten auf. Der erste will dein System gar nicht ausspähen, sondern schlicht **lahmlegen** — er greift die Verfügbarkeit an (Denial-of-Service). Der zweite schmuggelt **bösartige Eingaben** in deine Webanwendung und bringt sie dazu, seinen Code auszuführen (Cross-Site-Scripting und SQL-Injection). Davor steht noch in einem Satz das Protokoll, das die ganze Krypto der letzten Wochen im Web zusammenführt: TLS. Am Ende verstehst du, warum ein einziger gekaperter Kühlschrank Teil eines Angriffs sein kann, der halbe Kontinente vom Netz nimmt — und warum ein einzelnes Anführungszeichen in einem Eingabefeld eine Datenbank ausplaudern lässt.

## TLS in einem Satz

**SSL/TLS** ist das Hybridprotokoll, das jeden „https"-Verkehr absichert: Es nutzt asymmetrische Kryptografie für den Schlüsseltausch und die Zertifikatsprüfung und schaltet danach auf schnelle symmetrische Verschlüsselung für die eigentlichen Daten um — genau die Kombination, die wir in den letzten Kapiteln aufgebaut haben. Seine Versionsgeschichte ist vor allem eine lange Liste von Abkündigungen: SSL 1.0 bis 3.0 und TLS 1.0/1.1 gelten heute als veraltet; relevant und sicher sind nur noch **TLS 1.2 (2008)** und **TLS 1.3 (2018)**.

## Denial-of-Service: die Verfügbarkeit angreifen

Ein **Denial-of-Service-Angriff (DoS)** zielt direkt auf das dritte CIA-Schutzziel, die **Verfügbarkeit**. Sein einziges Ziel ist es, eine Ressource so zu überlasten, dass legitime Anfragen nicht mehr bedient werden — angreifbar sind dabei die Netzwerkbandbreite, die Systemressourcen oder die Anwendungsressourcen. Es gibt eine ganze Familie von Techniken dafür, und du solltest sie auseinanderhalten können. Am einfachsten ist das **ICMP-Flooding**: Der Angreifer überschüttet den Server mit „ping"-Anfragen (ICMP echo requests), bis dieser an der Antwortlast erstickt. Damit er dabei unerkannt bleibt, nutzt er **Source-Address-Spoofing** — er fälscht die Absenderadresse seiner Pakete, was ihn nicht nur verschleiert, sondern es auch erlaubt, die Antworten gezielt auf fremde Rechner umzulenken. Eine raffiniertere Variante ist das **SYN-Spoofing**, das den TCP-Verbindungsaufbau (den Drei-Wege-Handshake) missbraucht: Der Angreifer öffnet massenhaft halbe Verbindungen, die der Server offen hält, bis dessen Verbindungstabelle voll ist.

Richtig gefährlich werden zwei Verstärkungstricks. Beim **Reflection-Angriff** schickt der Angreifer Anfragen mit der gefälschten Absenderadresse des Opfers an viele gutgläubige Server — deren Antworten treffen dann alle das Opfer, das mit fremdem Antwortverkehr geflutet wird. Beim **Amplification-Angriff** kommt eine zweite Hebelwirkung hinzu: Eine *kleine* Anfrage löst eine *viel größere* Antwort aus. Das Paradebeispiel ist die **DNS-Amplification**, bei der eine 60-Byte-Anfrage (die mit „ANY" möglichst viele Informationen verlangt) eine 512- bis 4000-Byte-Antwort erzeugt — der Angreifer multipliziert seine eigene Bandbreite um ein Vielfaches. Und schließlich der **Distributed DoS (DDoS)**: Statt von einem einzigen Rechner kommt der Angriff von tausenden gleichzeitig, einem **Botnet** aus gekaperten Maschinen, die ein Angreifer über einen Command-and-Control-Server fernsteuert.

![Wie ein Botnet funktioniert: vom Schadprogramm über den C&C-Server zum koordinierten Angriff](https://upload.wikimedia.org/wikipedia/commons/c/c6/Botnet.svg "Ein Botnet: infizierte Rechner melden sich bei einem Command-and-Control-Server, der ihnen dann koordinierte Angriffsbefehle erteilt.")

Genau so ein Botnet war **Mirai** (2016), das Lehrbuchbeispiel schlechthin: ein **IoT-Botnet**, das schlecht gesicherte Alltagsgeräte — Überwachungskameras, Videorekorder, Heimrouter — über deren **schwache Standardpasswörter** und offene Dienste (oft Telnet) kaperte, sich selbstständig auf weitere verwundbare Geräte ausbreitete und damit die bis dahin größten DDoS-Angriffe der Geschichte fuhr. Die folgende Architektur zeigt, wie sich solche Angriffe über Handler- und Agent-Zombies auffächern:

![Stachledraht: ein verteilter DoS-Angriff über Handler und Agenten](https://upload.wikimedia.org/wikipedia/commons/3/3f/Stachledraht_DDos_Attack.svg "Ein DDoS-Angriff: Der Angreifer steuert über Handler eine Armee von Agent-Zombies, die gemeinsam das Opfer überfluten.")

Die Abwehr ist genau deshalb schwer, weil man **legitime von bösartiger Last unterscheiden** muss — der Angriffsverkehr sieht oft aus wie ganz normale Anfragen. Die Werkzeuge dagegen sind mehr Bandbreite und Redundanz, Angriffserkennung und Filterung (etwa durch Firewalls) sowie der Versuch, den Angreifer zu identifizieren.

> **Eselsbrücke (DoS-Varianten):** **Reflection** = Antwort *umlenken* aufs Opfer (gefälschte Absenderadresse). **Amplification** = Antwort *aufblasen* (kleine Frage, riesige Antwort, z. B. DNS „ANY"). **DDoS** = *viele* Rechner (Botnet) statt einem. Und merke: DoS trifft immer das **A** der CIA-Triade.

## Input Validation: XSS und SQL-Injection

Die zweite Hälfte des Kapitels handelt von einem ganz anderen Fehler: Was passiert, wenn eine Webanwendung **Benutzereingaben ungeprüft** weiterverwendet? Die gemeinsame Ursache aller folgenden Angriffe ist immer dieselbe — Daten (die Eingabe) und Code (das umgebende HTML oder SQL) vermischen sich, und der Angreifer schmuggelt Code dort hinein, wo das Programm nur Daten erwartet. (Die Beispiele sind in PHP gehalten; du musst keinen PHP-Code schreiben können, solltest ihn aber lesen und die Lücke erkennen.)

Beim **Cross-Site-Scripting (XSS)** gibt die Seite eine Eingabe direkt im HTML wieder, etwa eine Begrüßung „Welcome " gefolgt vom Parameter name. Setzt der Angreifer als name nicht seinen Namen, sondern ein Stück JavaScript ein — etwa ein **alert(document.cookie)** in einem Skript-Tag —, dann landet dieses Skript im ausgelieferten HTML und wird **im Browser des Opfers ausgeführt**. Damit kann der Angreifer zum Beispiel die Session-Cookies des Opfers auslesen und dessen Sitzung übernehmen. Man unterscheidet drei Spielarten: das **Reflected XSS** (das Skript steckt im Link oder Request und wird sofort zurückgespiegelt), das gefährlichere **Stored XSS** (das Skript wird auf dem Server gespeichert, etwa in einem Forenbeitrag, und trifft jeden, der die Seite danach besucht) und das **DOM-Based XSS** (das ganz im clientseitigen JavaScript entsteht).

Bei der **SQL-Injection** landet die Eingabe ungeprüft in einer Datenbankabfrage. Stell dir die typische Login-Prüfung vor: **SELECT uid FROM users WHERE username = '$user' AND password = '$pass'**. Gibt der Angreifer als Benutzernamen **admin'--** ein, dann wird daraus **… WHERE username = 'admin'--' AND password = '…'** — die beiden Bindestriche leiten in SQL einen Kommentar ein, der den gesamten Rest der Zeile (und damit die Passwortprüfung) **auskommentiert**. Übrig bleibt eine Abfrage, die den Account admin ganz ohne Passwort zurückgibt: ein klassischer **Login-Bypass**. Dieselbe Wirkung hat die Eingabe **' OR '1'='1**, die eine immer wahre Bedingung anhängt. Und mit einer **UNION**-Injektion (etwa name = foo' UNION SELECT password FROM users) lässt sich die Bedeutung der Abfrage so umbiegen, dass sie fremde Daten wie Passwörter zurückliefert.

> **Eselsbrücke (XSS vs. SQLi):** Beide entstehen, weil **Daten als Code gelesen** werden. **XSS** schmuggelt **JavaScript** → es läuft im *Browser des Opfers* (Cookies klauen). **SQLi** schmuggelt **Datenbankbefehle** → sie laufen in der *Datenbank* (Daten lesen, ändern, Login umgehen). Das einzeln stehende Anführungszeichen in einer Eingabe ist das klassische SQLi-Warnsignal.

## Abwehr: Sanitization, Validierung, Whitelisting, CSP

Gegen beide Angriffe hilft dasselbe Prinzip, die **Input Validation**, in zwei Spielarten. Die erste ist die **Sanitization und Transformation** — man *formt die Eingabe um*, bevor man sie benutzt. Dazu gehört das **Typecasting** (eine Eingabe gewaltsam in einen Typ wie Integer zwingen, sodass eingeschmuggelter Text gar keine Wirkung mehr hat), das **Encoding** (Sonderzeichen unschädlich machen) und die **kontextsensitive Sanitization** (etwa eine Funktion, die die gefährlichen Zeichen < und > in ihre harmlosen HTML-Entitäten &lt; und &gt; umwandelt, oder ein regulärer Ausdruck, der nur erlaubte Zeichen durchlässt). Die zweite Spielart ist die **bedingungsbasierte Validierung** — man *prüft die Eingabe*, statt sie umzuformen: ob sie wirklich eine Zahl ist (Type-Validation), ob sie ein gültiges Format hat (Format-Validation) und vor allem, ob sie auf einer Liste erlaubter Werte steht.

Der wichtigste Merksatz dabei: **Whitelisting schlägt Blacklisting.** Eine schwarze Liste verbotener Eingaben ist immer fehleranfällig, weil man unweigerlich einen gefährlichen Fall übersieht; eine weiße Liste erlaubt nur explizit Bekanntes und ist daher prinzipiell sicherer. Ergänzend dazu gibt es die **Content Security Policy (CSP)**, einen W3C-Standard, der über eine Whitelist festlegt, aus welchen Quellen eine Seite Inhalte laden darf, und der Inline-Skripte sowie gefährliche Funktionen wie eval standardmäßig blockiert. Aber Vorsicht vor dem klassischen Irrtum: **CSP ersetzt die Input-Validierung nicht**, sie ist nur eine zusätzliche Schutzschicht — Defense in Depth, kein Allheilmittel.

## Auf den Punkt

Die Kurzfassung: Hier verlässt der Kurs die Mathematik. **TLS** führt die Krypto im Web hybrid zusammen (asymmetrischer Schlüsseltausch, dann symmetrische Daten). Zwei Angreifertypen stehen im Zentrum. Der eine will lahmlegen: **Denial-of-Service** greift die **Verfügbarkeit** (das A der CIA) an, indem er Ressourcen überlastet — per ICMP-Flooding, Source-Address-Spoofing, SYN-Spoofing, **Reflection** (Antworten aufs Opfer umlenken) und **Amplification** (kleine Anfrage, riesige Antwort), und verteilt als **DDoS** über ein Botnet wie **Mirai**. Der andere schmuggelt bösartige Eingaben in Webanwendungen: **XSS** (eingeschleustes JavaScript läuft im Browser des Opfers) und **SQL-Injection** (eingeschleuste Datenbankbefehle, bis hin zum Login-Bypass mit admin'-- oder ' OR '1'='1). Abgewehrt wird beides durch **Input Validation** — Sanitization und Encoding, Type- und Format-Prüfung, **Whitelisting** (besser als Blacklisting) — und ergänzend durch **CSP**, das die Eingabeprüfung aber nicht ersetzt.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **TLS** | Hybridprotokoll fürs Web (asym. Schlüsseltausch + sym. Daten) |
| **DoS / DDoS** | Verfügbarkeit angreifen / verteilt über ein Botnet |
| **ICMP-Flooding** | den Server mit Ping-Anfragen überlasten |
| **Source-Address-Spoofing** | die Quelladresse fälschen |
| **Reflection / Amplification** | Antworten aufs Opfer lenken / kleine Anfrage → große Antwort |
| **Botnet / Mirai** | ferngesteuerte gekaperte Rechner / IoT-Botnet 2016 |
| **XSS** | eingeschleustes JavaScript im Browser des Opfers |
| **SQL-Injection** | eingeschleuste Datenbankbefehle (Login-Bypass, Datenklau) |
| **Sanitization / Validierung** | Eingabe umformen / Eingabe prüfen |
| **Whitelisting** | nur explizit Erlaubtes zulassen (besser als Blacklisting) |
| **CSP** | Content Security Policy (ergänzt die Input-Validierung) |

## Typische Fallen

- **DoS verletzt die Vertraulichkeit? Nein** — DoS greift die **Verfügbarkeit** an (das A der CIA-Triade).
- **Reflection ist dasselbe wie Amplification? Nicht ganz** — Reflection lenkt Antworten aufs Opfer; **Amplification** verstärkt zusätzlich (kleine Anfrage → große Antwort).
- **DDoS ist nur ein besonders starker Rechner? Nein** — es sind **viele** Rechner (ein Botnet); genau das macht es so schwer abzuwehren.
- **Blacklisting reicht zur Abwehr? Nein** — es ist fehleranfällig; **Whitelisting** ist sicherer.
- **CSP ersetzt die Input-Validierung? Nein** — sie ist nur eine zusätzliche Schicht (Defense in Depth).

## Klausur-Fokus

Das Übungsblatt ist sehr web-lastig und konkret. Bei **XSS** solltest du die **drei Typen** unterscheiden können — **Reflected** (Skript steckt im Request und wird sofort zurückgespiegelt), **Stored** (Skript wird auf dem Server gespeichert und trifft jeden Besucher) und **DOM-Based** (rein im clientseitigen JavaScript) — und **CSP** mit Vor- und Nachteilen erklären. Bei der **SQL-Injection** musst du einen **Login-Bypass konkret formulieren** (etwa den Benutzernamen admin'-- oder ' OR '1'='1, der die Passwortprüfung auskommentiert oder aushebelt) und sagen, wie man ihn **verhindert** (parametrisierte Abfragen bzw. Prepared Statements und Sanitization). Beim **DoS**-Teil: das technische Ziel benennen, es der **CIA-Verfügbarkeit** zuordnen (mit Begründung), die **DDoS-Techniken** und das **Amplification**-Konzept mit Beispielen beschreiben und **DoS gegen DDoS** abgrenzen (warum verteilt schwerer abzuwehren ist). Bei den **Botnetzen**: bekannte nennen, Infektionswege beschreiben, erklären, was ein **Command-and-Control-Server** ist, und ein Botnetz (Angreifer → C&C → Bots → Opfer) mit den DDoS-Kommunikationsflüssen **skizzieren**. Und zur **Abwehr**: die Erkennungsprobleme auf Schicht 7 des OSI-Modells, das Kapazitäts-Dilemma, der Unterschied zwischen On-Site- und Off-Site-Maßnahmen und wie ein **CDN** mit DNS-basiertem Routing einen DDoS abfedert.

## Mehr dazu

- **Computerphile — Hacking Websites with SQL Injection** (EN): Tom Scott zeigt anschaulich, wie ungeprüfte Eingaben SQL-Befehle verändern. https://www.youtube.com/watch?v=_jKylhJtPmI
- **PwnFunction — Cross-Site Scripting (XSS) Explained** (~12 Min., EN): wie eingeschleustes JavaScript im Browser des Opfers landet. https://www.youtube.com/watch?v=EoaDgUgS6QA
- **Aikido — Injection Attacks 101 (SQLi, Code Injection, XSS)** (EN): kompakter Überblick inklusive Abwehr durch Input Validation. https://www.youtube.com/watch?v=wu6FAsiFhv0`,
  },
};

const lecture10: Explanation = {
  id: "cs-2025-l10",
  lesson: 10,
  title: {
    de: "Software-Exploits: von der Buffer-Overflow-Lücke zu Code-Reuse und den Abwehrmechanismen", en: "Software exploits: from the buffer overflow vulnerability to code reuse and defense mechanisms", tr: "Yazılım istismarları: arabellek taşması güvenlik açığından kodun yeniden kullanımına ve savunma mekanizmalarına kadar", ar: "استغلال البرمجيات: بدءًا من ثغرة تجاوز سعة المخزن المؤقت وحتى إعادة استخدام التعليمات البرمجية وآليات الدفاع", ru: "Программные эксплойты: от уязвимости переполнения буфера до повторного использования кода и механизмов защиты", it: "Exploit software: dalla vulnerabilità buffer overflow al riutilizzo del codice e meccanismi di difesa", es: "Exploits de software: desde la vulnerabilidad de desbordamiento del buffer hasta la reutilización de código y mecanismos de defensa", fr: "Exploits logiciels : de la vulnérabilité de débordement de tampon à la réutilisation du code et aux mécanismes de défense", zh: "软件漏洞：从缓冲区溢出漏洞到代码重用和防御机制", pl: "Exploity w oprogramowaniu: od podatności na przepełnienie bufora po ponowne wykorzystanie kodu i mechanizmy obronne", pt: "Explorações de software: da vulnerabilidade de buffer overflow à reutilização de código e mecanismos de defesa", uk: "Програмні експлойти: від уразливості переповнення буфера до повторного використання коду та механізмів захисту", fa: "بهره‌برداری‌های نرم‌افزار: از آسیب‌پذیری سرریز بافر تا استفاده مجدد از کد و مکانیسم‌های دفاعی", ja: "ソフトウェアの悪用: バッファ オーバーフローの脆弱性からコードの再利用と防御メカニズムまで", ko: "소프트웨어 악용: 버퍼 오버플로 취약성부터 코드 재사용 및 방어 메커니즘까지", vi: "Khai thác phần mềm: từ lỗ hổng tràn bộ đệm đến cơ chế bảo vệ và tái sử dụng mã", hi: "सॉफ्टवेयर शोषण करता है: बफर ओवरफ्लो भेद्यता से लेकर कोड पुन: उपयोग और रक्षा तंत्र तक", ur: "سافٹ ویئر کے کارنامے: بفر اوور فلو خطرے سے کوڈ کے دوبارہ استعمال اور دفاعی طریقہ کار تک", nl: "Software-exploits: van de kwetsbaarheid voor bufferoverflow tot hergebruik van code en verdedigingsmechanismen", el: "Εκμεταλλεύσεις λογισμικού: από την ευπάθεια υπερχείλισης buffer έως την επαναχρησιμοποίηση κώδικα και τους αμυντικούς μηχανισμούς", cs: "Softwarové exploity: od zranitelnosti přetečení vyrovnávací paměti až po opětovné použití kódu a obranné mechanismy", hu: "Szoftverek kihasználása: a puffertúlcsordulási sebezhetőségtől a kód újrafelhasználásáig és a védelmi mechanizmusokig", ro: "Exploatări software: de la vulnerabilitatea de depășire a bufferului până la reutilizarea codului și mecanismele de apărare", sq: "Shfrytëzimet e softuerit: nga dobësia e tejmbushjes së tamponit deri te ripërdorimi i kodit dhe mekanizmat mbrojtës", sr: "Софтверске експлоатације: од рањивости прекорачења бафера до поновне употребе кода и одбрамбених механизама", hr: "Softverski iskorištava: od ranjivosti prekoračenja međuspremnika do ponovne upotrebe koda i obrambenih mehanizama", bg: "Софтуерни експлойти: от уязвимостта на препълване на буфера до повторно използване на код и защитни механизми", sv: "Programvaruutnyttjande: från buffertspillssårbarhet till kodåteranvändning och försvarsmekanismer", fi: "Ohjelmiston hyväksikäyttö: puskurin ylivuotohaavoittuvuudesta koodin uudelleenkäyttöön ja puolustusmekanismeihin", id: "Eksploitasi perangkat lunak: mulai dari kerentanan buffer overflow hingga penggunaan kembali kode dan mekanisme pertahanan", th: "การหาประโยชน์จากซอฟต์แวร์: จากช่องโหว่บัฟเฟอร์ล้นไปจนถึงการใช้โค้ดซ้ำและกลไกการป้องกัน", sw: "Ushujaa wa programu: kutoka kwa athari ya ziada ya bafa hadi utumiaji tena wa msimbo na mifumo ya ulinzi",
  },
  content: {
    de: `Diese Vorlesung zeigt, wie aus einem harmlosen Programmierfehler in C eine vollständige Übernahme des Rechners wird — und wie das ewige Wettrüsten zwischen Angriff und Verteidigung dabei abläuft. Der rote Faden: Ein Speicherfehler erlaubt das Überschreiben der Rücksprungadresse; je nachdem, welche Abwehr aktiv ist, schleust der Angreifer eigenen Code ein (Code Injection) oder baut den Angriff aus vorhandenem Code zusammen (Code-Reuse/ROP). Dagegen stehen DEP, ASLR und CFI.

## Warum C-Programme so gefährlich sind

C und C++ erzeugen schnellen nativen Code — aber sie prüfen **keine Array-Grenzen**. Schreibt man in char buffer[8] an Position buffer[8] (oder schlimmer: an einen aus Laufzeitdaten berechneten Index), ist das **undefiniertes Verhalten**: bestenfalls ein Absturz (Segmentation Fault), schlimmstenfalls **Arbitrary Code Execution**. Klassische Stolperfallen sind unsichere String-Funktionen wie strcpy oder gets — Letztere liest beliebig viel Eingabe in einen festen Puffer, **ohne Längenprüfung**. Genau das ist das Einfallstor. Solche Speicherfehler sind seit dem Morris-Worm (1988) das „Public Enemy No. 1" — und treiben ein jahrzehntelanges Wettrüsten an (Code Injection → return-into-libc 1997 → ROP 2007).

## x86-Grundlagen: Stack, Register, Stack Frame

Um den Angriff zu verstehen, braucht man etwas x86-Wissen:

- **Prozess-Layout:** Code (.text), Daten (.data/.bss), **Heap** (wächst nach oben) und **Stack** (wächst nach **unten**, zu niedrigen Adressen).
- **Register:** Allzweckregister (EAX, EBX, …), der **Stack Pointer ESP** (zeigt aufs oberste Stack-Element), der **Base Pointer EBP** (referenziert Argumente/lokale Variablen) und der **Instruction Pointer EIP** — er zeigt auf die *nächste* Instruktion und ist nur über Sprungbefehle (CALL, JMP, RET) änderbar. (x86_64: RAX…RIP, plus R8–R15.)
- **Stack Frame:** Jeder Funktionsaufruf legt einen Rahmen an, von oben nach unten: **Funktionsargumente**, **Rücksprungadresse**, **gesicherter Base Pointer**, **lokale Variablen** (inkl. unserer Puffer!).
- **Calling Convention:** call legt automatisch die **Rücksprungadresse** auf den Stack; ret holt sie zurück und lädt sie in **EIP**. Genau diese gespeicherte Rücksprungadresse ist das Ziel.

![Der Call-Stack mit mehreren Stack-Frames](https://upload.wikimedia.org/wikipedia/commons/8/8a/ProgramCallStack2_en.png "Der Call-Stack: jeder Funktionsaufruf legt einen neuen Frame an — mit Argumenten, Rücksprungadresse, gesichertem Base Pointer und lokalen Variablen.")

![Aufbau eines einzelnen Stack-Frames](https://upload.wikimedia.org/wikipedia/commons/1/1f/Call-stack-layout.svg "Ein einzelner Stack-Frame im Detail: Argumente, Rücksprungadresse, gesicherter Base Pointer und lokale Variablen. Der Puffer liegt bei den lokalen Variablen und läuft beim Overflow auf die Rücksprungadresse zu.")

> **Eselsbrücke (Stack-Frame, von oben nach unten):** **Argumente → Rücksprungadresse → alter EBP → lokale Variablen** (inkl. Puffer). Der Stack wächst **nach unten**, der Puffer läuft aber **nach oben** über — genau auf die **Rücksprungadresse** zu. Das ist das ganze Geheimnis des Angriffs.

## Code Injection: den Rücksprung kapern

### Schritt für Schritt

Beispiel: ein Echo-Programm liest mit gets(buffer) in einen lokalen Puffer und gibt ihn aus.

1. Der Angreifer gibt **mehr** Daten ein, als der Puffer fasst.
2. Die Überlänge läuft im Stack nach **oben** und überschreibt den gesicherten Base Pointer und schließlich die **Rücksprungadresse**.
3. Der Angreifer legt seinen **Shellcode** in den Puffer (oder dahinter) und setzt die Rücksprungadresse auf dessen Anfang.
4. Beim ret springt die CPU **nicht** zurück in main, sondern in den Shellcode — z. B. öffnet der eine Remote-Shell.

Das fügt dem Kontrollflussgraphen einen **komplett neuen Knoten** (eigenen Code) hinzu — der Angreifer kann beliebiges tun. [Computerphile führt genau diesen Angriff live vor](https://www.youtube.com/watch?v=1S0aBV-Waeo).

## DEP, return-into-libc und ROP

**Gegenmaßnahme DEP (Data Execution Prevention):** Speicher ist entweder **schreibbar oder ausführbar, nie beides** (W^X). Der eingeschleuste Shellcode liegt im Datenbereich (Stack) — und der ist nicht ausführbar. Code Injection scheitert.

**Antwort der Angreifer — Code-Reuse:** Statt neuen Code einzuschleusen, verwende **vorhandenen, bereits ausführbaren** Code:

- **return-into-libc:** Die Rücksprungadresse zeigt auf eine sicherheitskritische Funktion der C-Bibliothek libc (z. B. system("/bin/sh")). DEP greift nicht, weil libc legitim ausführbar ist. **Grenzen:** man ist auf vorhandene Funktionen beschränkt und kann sie nur **nacheinander** aufrufen (keine bedingten Sprünge).
- **Return-Oriented Programming (ROP)** (Shacham, 2007): die Verallgemeinerung. Man kettet viele winzige Codeschnipsel — **Gadgets** — aneinander, die jeweils mit ret enden. Der präparierte Stack ist eine Liste von Adressen: jedes ret springt zum nächsten Gadget. Mit genügend Gadgets wird ROP **Turing-vollständig** (beliebige Berechnung). Auf x86 ist der „Gadget-Raum" besonders groß, weil ohne Speicher-Alignment auch **unbeabsichtigte** Instruktionen mitten in Bytefolgen entstehen. ROP fügt dem CFG einen **neuen Pfad** durch vorhandene Knoten hinzu (kein neuer Code). [Wie man aus Gadgets eine ROP-Kette baut](https://www.youtube.com/watch?v=M6lXOVp1brA).

> **Eselsbrücke (das Wettrüsten):** **Code Injection** (eigener Code) → Abwehr **DEP** (Daten nicht ausführbar) → Antwort **Code-Reuse / ROP** (vorhandenen Code wiederverwenden, DEP-resistent) → Abwehr **ASLR** (Adressen verstecken) + **CFI** (Sprungziele erzwingen) → Antwort **Data-Oriented** (gar keinen Sprung ändern, nur Daten — umgeht CFI). Merke: **DEP stoppt nur Injection, nicht Reuse.**

## Verteidigung: ASLR vs. CFI

Zwei Verteidigungsphilosophien:

- **Code-Randomisierung / ASLR (Address Space Layout Randomization):** verwürfelt die **Basisadressen** von Code- und Datensegmenten bei jedem Start. Dann kennt der Angreifer die Adressen seiner Gadgets/Funktionen nicht. Schwächen: grobes ASLR ist per **Brute-Force** oder **Memory-Disclosure** (eine geleakte Adresse verrät den Offset) angreifbar; feingranulares ASLR hilft mehr, wird aber von **JIT-ROP** ausgehebelt. Vorteil: geringe Performance-Kosten.
- **Control-Flow Integrity (CFI)** (Abadi, 2005): erzwingt, dass Sprünge nur Zielen folgen, die im **Kontrollflussgraphen** erlaubt sind (Label-Prüfung). Problem bei Rücksprüngen: statische Labels werden grobkörnig → ein **Shadow Stack** (Schattenkopie der Rücksprungadressen) schützt Rücksprünge feingranular, kostet aber Performance. Vorteil: formale Sicherheit; Nachteil: schwer in komplexe Software zu integrieren.

Und der nächste Zug der Angreifer: **Data-Oriented Exploits / Non-Control-Data-Angriffe.** Sie verändern **keine** Kontrolldaten (keine Rücksprungadresse, kein Funktionszeiger) — sondern nur eine harmlose **Datenvariable**, z. B. ein Feld user.id, das man per Overflow auf 0 setzt, sodass eine Adminprüfung durchgeht. Weil der Kontrollfluss dem CFG treu bleibt, **umgeht das CFI vollständig**.

### Schritt für Schritt: einen Passwort-Check per Overflow aushebeln

Genau dieser Data-Only-Angriff ist die zentrale Übungsaufgabe, also einmal durchgespielt. Eine Funktion pw_check legt zwei lokale Variablen an: einen Puffer char pw_buffer[16] und einen Integer int auth = 0. Sie kopiert die *gesamte* Eingabe mit strcpy(pw_buffer, password) — **ohne Längenprüfung** — und setzt auth nur dann auf 1, wenn das Passwort stimmt; am Ende wird auth zurückgegeben.

1. Auf dem Stack liegen pw_buffer und auth **direkt nebeneinander** (die Reihenfolge hängt vom Compiler ab — genau deshalb fragt die Übung, was bei anderer Anordnung passiert).
2. Gibst du eine Eingabe von **mehr als 16 Zeichen** ein, läuft strcpy über das Pufferende hinaus und **überschreibt auth** mit deinen Bytes.
3. Solange diese Bytes **nicht null** sind, ist auth ≠ 0 — die Funktion gibt „wahr" zurück, und das Programm meldet „Gut gemacht!", **obwohl dein Passwort falsch war**.

Das ist ein reiner **Data-Only-Angriff**: Du hast keine Rücksprungadresse, keinen Code-Pointer und keinen Kontrollfluss angefasst, nur eine Datenvariable überschrieben — weshalb weder DEP noch CFI hier greifen. Eine Abwehr ist der **Stack-Canary** (ein Zufallswert zwischen Puffer und kritischen Daten, dessen Veränderung den Overflow auffliegen lässt) — aber auch der lässt sich umgehen, wenn man ihn auslesen oder gezielt umschreiben kann.

## Auf den Punkt

Die Kurzfassung: Aus einem harmlosen C-Fehler wird hier eine komplette Rechnerübernahme — und ein jahrzehntelanges Wettrüsten. Ursache ist fehlendes Bounds-Checking: Ein Buffer Overflow überschreibt benachbarten Stack-Speicher, allen voran die Rücksprungadresse. Damit fängt der Angriff an: Code Injection legt eigenen Shellcode ab und biegt die Rücksprungadresse darauf um (neuer Knoten im Kontrollfluss). Dagegen kam DEP (Daten nicht ausführbar) — worauf die Angreifer mit Code-Reuse antworteten: return-into-libc und vor allem ROP, das aus vorhandenen Gadgets beliebige Berechnungen zusammensetzt (DEP-resistent). Die Verteidigung kennt zwei Philosophien: ASLR versteckt die Adressen, CFI erzwingt erlaubte Sprungziele (Shadow Stack für Rücksprünge). Und der letzte Zug der Angreifer sind Data-Oriented Exploits, die gar keine Kontrolldaten anfassen — nur eine harmlose Variable — und damit sogar CFI umgehen.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Buffer Overflow** | über Puffergrenze hinaus schreiben (kein Bounds-Check) |
| **Rücksprungadresse** | auf dem Stack gesicherte Rückkehradresse; Angriffsziel |
| **Shellcode** | eingeschleuster Schadcode (z. B. Shell öffnen) |
| **EIP / ESP / EBP** | Instruction- / Stack- / Base-Pointer |
| **Code Injection** | neuer CFG-Knoten (eigener Code) |
| **DEP (W^X)** | Daten nicht ausführbar / Code nicht schreibbar |
| **return-into-libc** | Rücksprung in vorhandene libc-Funktionen |
| **ROP / Gadget** | Code-Reuse aus ret-endenden Schnipseln, Turing-vollständig |
| **ASLR** | zufällige Basisadressen von Segmenten |
| **CFI / Shadow Stack** | Kontrollfluss erzwingen / Rücksprünge absichern |
| **Data-Oriented Exploit** | nur Daten ändern → umgeht CFI |

## Typische Fallen

- **Der Stack wächst nach oben?** Nein — er wächst zu **niedrigen** Adressen; der Überlauf läuft Richtung Rücksprungadresse.
- **DEP stoppt alle Exploits?** Nein — nur **Code Injection**. **Code-Reuse** (ret2libc, ROP) umgeht DEP, weil es vorhandenen Code nutzt.
- **ROP braucht eingeschleusten Code?** Nein — gerade nicht; ROP nutzt **nur vorhandene** Gadgets (deshalb DEP-resistent).
- **ASLR = sicher?** Nicht zwingend — Memory-Disclosure/JIT-ROP hebeln es aus; deshalb gibt es zusätzlich CFI.
- **CFI stoppt alles?** Nein — **Data-Oriented Exploits** lassen den Kontrollfluss intakt und umgehen CFI.

## Klausur-Fokus

Das Übungsblatt ist sehr praktisch, also übe das Handwerk. Du solltest ein **Stackframe-Layout zeichnen** können (Argumente, Rücksprungadresse, gesicherter EBP, lokale Variablen — inkl. der Reihenfolge der lokalen Variablen, denn die ist beim nächsten Punkt entscheidend) und die Rolle von **ESP/EBP/EIP** sowie call/ret erklären. Der zentrale Aufgabentyp ist eine **konkrete Schwachstellen-Analyse**: Gegeben ist eine fehlerhafte Passwortprüfung, bei der **strcpy** einen zu langen String in einen Puffer kopiert, der direkt neben einer Variablen wie **auth** liegt. Du musst den Fehler benennen, das Stackframe skizzieren und eine **Eingabe finden, die nicht das echte Passwort ist, aber trotzdem authentifiziert** — der Overflow überschreibt die Nachbarvariable und setzt **auth** auf einen Wert ≠ 0 (das ist ein **Data-Only-Angriff**; er ändert keine Kontrolldaten). Erkläre auch, was passiert, wenn der **Compiler die Variablenreihenfolge ändert**, und wie ein **Stack-Canary** den Angriff erschwert (und wie man ihn umgeht). Dazu konzeptionell: einen **Code-Injection-Angriff** Schritt für Schritt (Overflow → Rücksprungadresse → Shellcode), **DEP** und warum **return-into-libc/ROP** es umgehen (Code Injection = neuer Knoten, Code-Reuse = neuer Pfad), **ROP/Gadgets** + Turing-Vollständigkeit, und **ASLR vs. CFI** (inkl. Shadow Stack) samt der Frage, warum Data-Oriented Exploits CFI umgehen.

## Mehr dazu

- **Computerphile — Running a Buffer Overflow Attack** (EN, Mike Pound): zeigt live, wie ein Overflow die Rücksprungadresse überschreibt und Root-Rechte erlangt. https://www.youtube.com/watch?v=1S0aBV-Waeo
- **Motasem Hamdan — Buffer Overflow & ROP Chains (CTF-Walkthrough)** (EN): wie man aus Gadgets eine ROP-Kette baut. https://www.youtube.com/watch?v=M6lXOVp1brA`,
  },
};

const lecture11: Explanation = {
  id: "cs-2025-l11",
  lesson: 11,
  title: {
    de: "Betriebssystemsicherheit am Beispiel Multics: Reference Monitor, Schutzringe und Multilevel Security", en: "Operating system security using Multics as an example: Reference Monitor, protective rings and multilevel security", tr: "Örnek olarak Multics kullanan işletim sistemi güvenliği: Referans Monitörü, koruyucu halkalar ve çok düzeyli güvenlik", ar: "أمان نظام التشغيل باستخدام Multics كمثال: المراقبة المرجعية والحلقات الواقية والأمان متعدد المستويات", ru: "Безопасность операционной системы на примере Multics: Reference Monitor, защитные кольца и многоуровневая безопасность", it: "Sicurezza del sistema operativo utilizzando Multics come esempio: Monitor di riferimento, anelli di protezione e sicurezza multilivello", es: "Seguridad del sistema operativo usando Multics como ejemplo: Monitor de referencia, anillos protectores y seguridad multinivel", fr: "Sécurité du système d'exploitation en utilisant Multics comme exemple : moniteur de référence, anneaux de protection et sécurité multiniveau", zh: "以 Multics 为例的操作系统安全性：参考监视器、保护环和多级安全性", pl: "Bezpieczeństwo systemu operacyjnego na przykładzie Multics: Monitor referencyjny, pierścienie ochronne i bezpieczeństwo wielopoziomowe", pt: "Segurança do sistema operacional usando Multics como exemplo: Reference Monitor, anéis de proteção e segurança multinível", uk: "Безпека операційної системи на прикладі Multics: Reference Monitor, захисні кільця та багаторівневий захист", fa: "امنیت سیستم عامل با استفاده از Multics به عنوان مثال: مانیتور مرجع، حلقه های محافظ و امنیت چند سطحی", ja: "Multics を例として使用したオペレーティング システムのセキュリティ: リファレンス モニター、保護リング、およびマルチレベル セキュリティ", ko: "Multics를 예로 들어 운영 체제 보안: 참조 모니터, 보호 링 및 다단계 보안", vi: "Bảo mật hệ điều hành sử dụng Multics làm ví dụ: Reference Monitor, vòng bảo vệ và bảo mật đa cấp", hi: "उदाहरण के तौर पर मल्टिक्स का उपयोग करते हुए ऑपरेटिंग सिस्टम सुरक्षा: संदर्भ मॉनिटर, सुरक्षात्मक रिंग और बहुस्तरीय सुरक्षा", ur: "مثال کے طور پر ملٹکس کا استعمال کرتے ہوئے آپریٹنگ سسٹم کی سیکیورٹی: حوالہ مانیٹر، حفاظتی حلقے اور کثیر سطحی سیکیورٹی", nl: "Beveiliging van besturingssystemen met Multics als voorbeeld: Reference Monitor, beschermende ringen en beveiliging op meerdere niveaus", el: "Ασφάλεια λειτουργικού συστήματος χρησιμοποιώντας το Multics ως παράδειγμα: Οθόνη αναφοράς, προστατευτικοί δακτύλιοι και ασφάλεια πολλαπλών επιπέδων", cs: "Zabezpečení operačního systému pomocí Multics jako příklad: Referenční monitor, ochranné kroužky a víceúrovňové zabezpečení", hu: "Az operációs rendszer biztonsága példaként a Multics használatával: Referencia monitor, védőgyűrűk és többszintű biztonság", ro: "Securitatea sistemului de operare folosind Multics ca exemplu: Monitor de referință, inele de protecție și securitate pe mai multe niveluri", sq: "Siguria e sistemit operativ duke përdorur Multics si shembull: Monitori i referencës, unazat mbrojtëse dhe siguria me shumë nivele", sr: "Безбедност оперативног система користећи Мултицс као пример: Референтни монитор, заштитни прстенови и безбедност на више нивоа", hr: "Sigurnost operativnog sustava koristeći Multics kao primjer: Referentni monitor, zaštitni prstenovi i sigurnost na više razina", bg: "Сигурност на операционната система, използваща Multics като пример: Референтен монитор, защитни пръстени и многостепенна сигурност", sv: "Operativsystemsäkerhet med Multics som exempel: Referensmonitor, skyddsringar och flernivåsäkerhet", fi: "Käyttöjärjestelmän suojaus käyttämällä Multicsia esimerkkinä: Reference Monitor, suojarenkaat ja monitasoinen suojaus", id: "Keamanan sistem operasi menggunakan Multics sebagai contoh: Monitor Referensi, cincin pelindung dan keamanan bertingkat", th: "การรักษาความปลอดภัยของระบบปฏิบัติการโดยใช้ Multics เป็นตัวอย่าง: Reference Monitor, วงแหวนป้องกัน และการรักษาความปลอดภัยหลายระดับ", sw: "Usalama wa mfumo wa uendeshaji kwa kutumia Multics kama mfano: Kifuatilia Marejeleo, pete za kinga na usalama wa viwango vingi.",
  },
  content: {
    de: `Multics (Ende der 1960er) war das erste moderne Betriebssystem und der Geburtsort fast aller Sicherheitskonzepte, die wir bis heute nutzen: der Reference Monitor, die Schutzringe und die mehrstufige Sicherheit. Wir benutzen dieses historische System als saubere Fallstudie, an der man versteht, *wie* ein Betriebssystem entscheidet, ob ein Prozess auf etwas zugreifen darf. Auf den ersten Blick ist es ein Begriffs- und Regel-Dschungel — der rote Faden aber ist eine einzige Frage: *Wer darf was, und wie setzt das System das zwingend durch?*

## Multics & der Reference Monitor

Multics führte Virtual Memory, hierarchische Dateisysteme — und die zentralen Sicherheitsbausteine ein. Der wichtigste ist der **Reference Monitor**: die Kombination aus Hard- und Software, die die Sicherheitsrichtlinie **durchsetzt**. Er muss drei Prinzipien erfüllen:

1. **Complete Mediation:** **Jeder** Zugriff muss über den Reference Monitor laufen; ihn zu umgehen muss unmöglich sein.
2. **Tamperproof (Isolation):** Der Monitor (und sein Schutzsystem) muss vor Veränderung geschützt sein.
3. **Verifiable:** Er muss **klein genug** sein, um analysiert und getestet — idealerweise bewiesen — zu werden.

Multics realisiert die ersten beiden gut, scheitert aber an Punkt 3: Seine **TCB (Trusted Computing Base)** ist zu groß für einen formalen Beweis. Genau das motivierte spätere **Security Kernels**, die die TCB minimieren.

## Prozesse, Segmente und das SDW

Die Grundbausteine sind **Prozesse** (haben Code, eigenen virtuellen Adressraum) und **Segmente** (Unterteilungen des Adressraums: Code, Daten, Geräte …). Jeder Prozess hat ein **Descriptor-Segment** mit **Segment Descriptor Words (SDWs)**; jedes SDW beschreibt ein Segment. Das Laden eines SDW erledigt der **Supervisor** (die vertrauenswürdigsten Komponenten, in Ring 0/1). Ein SDW enthält:

- die **Adresse** und **Länge** des Segments,
- die **Rechte** R/W/E (für die ACL),
- die **Ring-Brackets** (r1, r2, r3) für das Ring-Modell,
- das **Gate**-Feld: eine Liste gültiger Eintrittspunkte in höher privilegierte Ringe.

## Schutzringe

**Schutzringe** sind eine hierarchische Schichtung: **Ring 0** = höchste Privilegien (Kernel), nach außen immer weniger. Multics bietet 64 Ringe (8 in Hardware, 56 in Software); moderne CPUs (Intel) haben 4, genutzt werden meist nur **Ring 0 (Kernel)** und **Ring 3 (User)**. Höher privilegierte Ringe dürfen auf den Speicher niedrigerer Ringe zugreifen. Ein **Code-Segment** ist ausführbar; ein **Gate-Segment** ist ein spezielles Code-Segment, das über das Gate-Feld definierte **Eintrittspunkte** in einen privilegierteren Ring bietet — dort werden die Argumente aus dem niedriger privilegierten Aufrufer **validiert** (Schutz vor bösartiger Eingabe). Typischer Anwendungsfall: ein **Systemaufruf**.

![Schutzringe der x86-Architektur: Ring 0 (Kernel) innen, Ring 3 (Anwendungen) außen](https://upload.wikimedia.org/wikipedia/commons/2/25/CPU_ring_scheme.svg "Schutzringe: Ring 0 (Kernel) ganz innen = am privilegiertesten, nach außen sinkt die Macht bis Ring 3 (Anwendungen). Moderne Betriebssysteme nutzen nur Ring 0 und Ring 3.")

> **Eselsbrücke (Schutzringe):** **kleiner = mächtiger.** Ring **0 = Kern (innen, alles erlaubt)**, nach außen sinkt die Macht; Ring 3 = normale Programme. In einen *mächtigeren* (kleineren) Ring kommst du nur durch ein **Gate** (= der Systemaufruf), das deine Argumente prüft.

## Die drei Zugriffsmodelle: ACL, Rings & Brackets, Multilevel Security

Bei jedem Zugriff müssen **alle drei** Modelle zustimmen:

- **Access Control List (ACL)** — *DAC* (Discretionary Access Control, nach Ermessen des Eigentümers): eine Liste von Nutzern und Rechten pro Segment/Verzeichnis. Nutzer-ID = **Person.Project.Tag** (z. B. Jim.ProjectX.\*; \* ist ein Wildcard). Rechte für Segmente: r/w/e/null; für Verzeichnisse: status/modify/append.
- **Rings & Brackets** — ebenfalls *DAC*: regeln über die aktuelle Ringnummer r und die Brackets des Segments, ob gelesen/geschrieben/ausgeführt werden darf.
- **Multilevel Security** — *MAC* (Mandatory Access Control, systemweit unveränderlich): die Geheimhaltungsstufen (s. u.).

### Rings & Brackets durchrechnen

Zwei Bracket-Paare steuern den Zugriff (aktuelle Ringnummer = r; kleiner = privilegierter):

- **Access Bracket (r1, r2)** mit r1 ≤ r2 — regelt **Lesen/Schreiben**:
  - r ≤ r1: **lesen und schreiben**
  - r1 < r ≤ r2: **nur lesen**
  - r2 < r: **kein Zugriff**
- **Call Bracket (r2, r3)** — regelt **Ausführen**: r3 ist der höchste Ring, der Code ausführen darf. Ist **r2 < r3**, ist es ein **Gate-Segment**; bei **r2 = r3** ein normales Code-Segment.

Die vier Fälle der Ausführungsprüfung (Prozess in Ring r will ein Code-Segment mit (r1,r2),(r2,r3) ausführen):

| Fall | Ergebnis |
|---|---|
| **r3 < r** | Ausführung **verboten** (außerhalb des erlaubten Bereichs) |
| **r2 < r ≤ r3** | erlaubt **nur über ein Gate**; Ringwechsel auf das privilegiertere **r' = r2** (z. B. Systemaufruf) |
| **r1 ≤ r ≤ r2** | erlaubt, **kein** Ringwechsel |
| **r < r1** | erlaubt; Ringwechsel auf das weniger privilegierte **r' = r1** |

Beispiel (r = 4): Access Bracket (5, 6) → r < r1, also lesen+schreiben; (3, 4) → r1 < r ≤ r2, also nur lesen; (3, 3) → r2 < r, also kein Zugriff.

> **Eselsbrücke (Brackets):** **Access Bracket = Daten (Lesen/Schreiben)**, **Call Bracket = Code (Ausführen)**. Beim Lesen/Schreiben gilt: je weiter *außen* (größeres r) du bist, desto weniger darfst du — erst RW, dann nur R, dann nichts. **Gate-Segment erkennst du am Call Bracket r2 < r3.** Diese „vier Fälle" sind die klassische Rechenaufgabe.

### Schritt für Schritt: eine vollständige Zugriffsentscheidung

Genau so sind die elf Fälle im Übungsblatt aufgebaut, also einmal komplett durchgespielt. Frage: Darf **Prozess P4 (aktuelle Ringnummer r = 2)** das **Code-Segment D** mit Access Bracket **(1, 3)** und Call Bracket **(3, 5)** ausführen — und gehört P4 zu einem Nutzer, der laut **ACL** Ausführungsrecht (e) hat?

1. **Zuerst die ACL.** Steht in der Zugriffsliste des Segments ein Eintrag mit **e**, der zur Nutzer-ID von P4 (Person.Project.Tag, ggf. mit Wildcard) passt? Wenn nein → sofort verboten, egal was die Brackets sagen. Nehmen wir an, die ACL erlaubt es.
2. **Gate-Segment?** Call Bracket (3, 5): r2 = 3 < r3 = 5 → ja, es ist ein Gate-Segment (ein Ringwechsel ist also grundsätzlich möglich).
3. **Welcher der vier Fälle?** Aktuell r = 2. Prüfe der Reihe nach: r3 < r? 5 < 2 → nein. r2 < r ≤ r3? 3 < 2 → nein. r1 ≤ r ≤ r2? **1 ≤ 2 ≤ 3 → ja.** → Ausführung **erlaubt, ohne Ringwechsel** (P4 läuft weiter in Ring 2).

Zwei Varianten zur Kontrolle: Wäre P4 in **Ring 0** (r < r1 = 1), dürfte es ebenfalls ausführen, aber mit **Ringwechsel auf r' = r1 = 1** (Herabstufung). Wäre P4 in **Ring 4** (r2 = 3 < 4 ≤ r3 = 5), ginge es **nur über das Gate**, mit **Ringwechsel auf r' = r2 = 3** (Heraufstufung — der typische Systemaufruf). Übergibt der Aufrufer dabei einen **Pointer auf Speicher in einem anderen Ring**, muss das Gate diesen zusätzlich validieren.

## Multilevel Security & Bell-LaPadula

Multics war Vorreiter der **Multilevel Security (MLS)**: Jedem Segment und jedem Prozess wird eine **Geheimhaltungsstufe** zugeordnet (top-secret, secret, confidential, unclassified). Die durchgesetzte Politik ist das **Bell-LaPadula-Modell**, das **Informationsabfluss** verhindert. Die zwei Kernregeln:

- **Read (no read up):** Ein Prozess darf nur von Segmenten **gleicher oder niedrigerer** Stufe lesen.
- **Write (no write down):** Ein Prozess darf nur in Segmente **gleicher oder höherer** Stufe schreiben.

> **Eselsbrücke (Bell-LaPadula):** **„no read up, no write down"** — wer Geheimnisse kennt, darf sie nicht nach unten leaken. Bild: ein General darf nach **unten Befehle lesen** (read down) und nach **oben melden** (write up), aber **nicht** geheime Infos an Untergebene schreiben. Ziel: kein **Informationsabfluss**. Details auf der [Wikipedia-Seite zu Bell-LaPadula](https://en.wikipedia.org/wiki/Bell-LaPadula_model).

Das verhindert, dass geheime Information in eine niedrigere Stufe „durchsickert". (Multics' Erbe ist riesig: Thompson und Ritchie bauten nach Bells Ausstieg **UNIX**; Befehle wie ls, pwd, mail stammen aus Multics.)

## Auf den Punkt

Die Kurzfassung: Multics zeigt am historischen Beispiel, *wie* ein Betriebssystem Zugriff zwingend durchsetzt. Herzstück ist der Reference Monitor, der jeden Zugriff prüft und drei Prinzipien erfüllen muss: Complete Mediation (nicht umgehbar), Tamperproof (manipulationssicher) und Verifiable (klein genug zum Beweisen — woran Multics' große TCB scheitert). Ein Prozess besteht aus Segmenten, die über Segment Descriptor Words (Adresse, Länge, Rechte, Ring-Brackets, Gate) beschrieben werden. Schutzringe sind hierarchisch (Ring 0 = Kernel, am privilegiertesten); in einen mächtigeren Ring kommt man nur über ein Gate-Segment, das die Argumente prüft. Bei jedem Zugriff müssen drei Modelle gleichzeitig zustimmen: ACL und Rings & Brackets (beides DAC) sowie Multilevel Security (MAC). Letztere setzt Bell-LaPadula um — „no read up, no write down" — und verhindert so den Abfluss geheimer Information.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Reference Monitor** | prüft jeden Zugriff; Complete Mediation, Tamperproof, Verifiable |
| **TCB** | Trusted Computing Base (muss klein sein für Beweisbarkeit) |
| **Segment / SDW** | Adressraum-Teil / Segment Descriptor Word (Adresse, Länge, Rechte, Brackets, Gate) |
| **Supervisor** | vertrauenswürdigste Komponenten (Ring 0/1) |
| **Schutzring** | Privilegienschicht; Ring 0 = höchste |
| **Gate-Segment** | Eintrittspunkt in höheren Ring (r2 < r3), validiert Argumente |
| **ACL** | Nutzer+Rechte je Segment; Nutzer-ID Person.Project.Tag (DAC) |
| **Access Bracket (r1,r2)** | r≤r1 RW, r1<r≤r2 R, r2<r kein Zugriff |
| **Call Bracket (r2,r3)** | Ausführung; r2<r3 ⇒ Gate-Segment |
| **DAC / MAC** | nach Ermessen / systemweit zwingend |
| **Bell-LaPadula** | MLS-Modell: no read up, no write down |

## Typische Fallen

- **Ring 0 = am wenigsten privilegiert?** Nein — **Ring 0 ist der privilegierteste** (Kernel); nach außen sinkt die Privilegierung.
- **Gate-Segment erkennt man wie?** Am Call Bracket: **r2 < r3** ⇒ Gate-Segment; r2 = r3 ⇒ normales Segment.
- **Bell-LaPadula: man darf nach unten schreiben?** Nein — **no write down** (nur gleich/höher schreiben), **no read up** (nur gleich/niedriger lesen).
- **ACL allein entscheidet?** Nein — **alle drei** Modelle (ACL, Rings & Brackets, MLS) müssen zustimmen.
- **Multics ist formal verifiziert?** Nein — die **TCB ist zu groß**; deshalb erfüllt es Verifiable nur unzureichend.

## Klausur-Fokus

Die mit Abstand wichtigste Aufgabe ist die **Zugriffsentscheidung per Hand** — das Übungsblatt rechnet gleich elf Fälle durch, und so kommt es in der Klausur. Gegeben sind Prozesse mit einer aktuellen Ringnummer r, Nutzer-IDs (Person.Project.Tag) und Segmente mit **ACL** *und* **Ring-Brackets**. Für „darf Prozess P auf Segment S lesend/schreibend/ausführend zugreifen?" prüfst du **beide** Modelle: erst, ob die ACL den Nutzer für die Operation erlaubt (mit Wildcards wie \*.ProjectA.a), dann die Brackets. Beim **Access Bracket (r1, r2)** gilt: r ≤ r1 → lesen+schreiben, r1 < r ≤ r2 → nur lesen, r2 < r → kein Zugriff. Beim **Call Bracket (r2, r3)** für Ausführung die vier Fälle (r3 < r verboten; r2 < r ≤ r3 nur über Gate, Wechsel auf r' = r2; r1 ≤ r ≤ r2 erlaubt ohne Wechsel; r < r1 erlaubt, Wechsel auf r' = r1). Wenn ein Zugriff erlaubt ist, **gib auch an, ob/auf welchen Ring der Prozess wechselt**. Ein Spezialfall: Wird beim Gate-Aufruf ein **Pointer auf Speicher in einem anderen Ring** übergeben, muss das Gate diesen mitprüfen (Argumentvalidierung). Dazu die Theorie: warum Ringe *zusätzlich* zu ACLs nötig sind, was **Gate-Segmente** leisten und warum für sie r2 < r3 gelten muss; die **drei Reference-Monitor-Prinzipien**; **DAC vs. MAC**; und **Bell-LaPadula** („no read up, no write down"). Verwandt im selben Blatt: **Linux-Dateirechte** (rwx für user/group/other, chmod 444/777/641, das **SUID/SGID**-Flag, was Execute/Write auf ein *Verzeichnis* bedeutet).

## Mehr dazu

- **Wikipedia — Bell-LaPadula-Modell** (EN): die Lese-/Schreibregeln (no read up, no write down) und der MAC-Hintergrund. https://en.wikipedia.org/wiki/Bell-LaPadula_model
- **Saltzer & Schroeder — A Hardware Architecture for Implementing Protection Rings** (EN): die Originalquelle zu den Schutzringen. https://www.multicians.org/protection.html
- **multicians.org** (EN): Geschichte und Konzepte von Multics aus erster Hand. https://www.multicians.org/`,
  },
};

const lecture12: Explanation = {
  id: "cs-2025-l12",
  lesson: 12,
  title: {
    de: "Reverse Engineering und Malware-Analyse: ein Programm ohne Quellcode verstehen", en: "Reverse engineering and malware analysis: understanding a program without source code", tr: "Tersine mühendislik ve kötü amaçlı yazılım analizi: kaynak kodu olmayan bir programı anlama", ar: "الهندسة العكسية وتحليل البرامج الضارة: فهم برنامج بدون كود المصدر", ru: "Реверс-инжиниринг и анализ вредоносного ПО: понимание программы без исходного кода", it: "Reverse engineering e analisi malware: comprendere un programma senza codice sorgente", es: "Ingeniería inversa y análisis de malware: entender un programa sin código fuente", fr: "Ingénierie inverse et analyse des malwares : comprendre un programme sans code source", zh: "逆向工程和恶意软件分析：无需源代码即可理解程序", pl: "Inżynieria wsteczna i analiza złośliwego oprogramowania: zrozumienie programu bez kodu źródłowego", pt: "Engenharia reversa e análise de malware: entendendo um programa sem código-fonte", uk: "Зворотне проектування та аналіз шкідливих програм: розуміння програми без вихідного коду", fa: "مهندسی معکوس و تجزیه و تحلیل بدافزار: درک یک برنامه بدون کد منبع", ja: "リバース エンジニアリングとマルウェア分析: ソース コードなしでプログラムを理解する", ko: "리버스 엔지니어링 및 악성 코드 분석: 소스 코드 없이 프로그램 이해", vi: "Kỹ thuật đảo ngược và phân tích phần mềm độc hại: hiểu một chương trình không cần mã nguồn", hi: "रिवर्स इंजीनियरिंग और मैलवेयर विश्लेषण: स्रोत कोड के बिना किसी प्रोग्राम को समझना", ur: "ریورس انجینئرنگ اور میلویئر تجزیہ: سورس کوڈ کے بغیر پروگرام کو سمجھنا", nl: "Reverse engineering en malware-analyse: een programma begrijpen zonder broncode", el: "Αντίστροφη μηχανική και ανάλυση κακόβουλου λογισμικού: κατανόηση ενός προγράμματος χωρίς πηγαίο κώδικα", cs: "Reverzní inženýrství a analýza malwaru: porozumění programu bez zdrojového kódu", hu: "Visszafejtés és rosszindulatú programok elemzése: a program megértése forráskód nélkül", ro: "Inginerie inversă și analiză malware: înțelegerea unui program fără cod sursă", sq: "Analiza e inxhinierisë së kundërt dhe malware: të kuptuarit e një programi pa kod burimor", sr: "Обрнути инжењеринг и анализа малвера: разумевање програма без изворног кода", hr: "Obrnuti inženjering i analiza zlonamjernog softvera: razumijevanje programa bez izvornog koda", bg: "Обратно инженерство и анализ на зловреден софтуер: разбиране на програма без изходен код", sv: "Omvänd konstruktion och analys av skadlig kod: förstå ett program utan källkod", fi: "Käänteinen suunnittelu ja haittaohjelmaanalyysi: ohjelman ymmärtäminen ilman lähdekoodia", id: "Rekayasa balik dan analisis malware: memahami program tanpa kode sumber", th: "วิศวกรรมย้อนกลับและการวิเคราะห์มัลแวร์: ทำความเข้าใจโปรแกรมที่ไม่มีซอร์สโค้ด", sw: "Uchanganuzi wa kubadilisha uhandisi na programu hasidi: kuelewa programu bila msimbo wa chanzo",
  },
  content: {
    de: `Wie versteht man ein Programm, von dem man nur das fertige Binary hat — etwa eine verdächtige .exe? Das ist Reverse Engineering, und sein wichtigstes Einsatzfeld ist die Malware-Analyse. Die Vorlesung erklärt erst, *warum* das schwer ist (beim Kompilieren geht fast alle Bedeutung verloren), dann *was* Malware tut (Infektion, Persistenz, Typen, Ransomware), und schließlich das Katz-und-Maus-Spiel: wie Malware-Autoren die Analyse erschweren — und wie Analysten kontern.

## Reverse Engineering: vom Binary zurück zum Verständnis

Beim Bauen einer Anwendung durchläuft C/C++-Code eine Kette: **Präprozessor → Compiler → Assembler → Linker**. Heraus kommt Maschinencode, in dem **alle menschenlesbaren Informationen verloren** sind — Variablentypen und -namen, Funktionsnamen, Kommentare existieren nur noch (wenn überhaupt) als Debug-Info. Genau das macht Reverse Engineering schwer: Man muss aus rohem Assembler die Absicht rekonstruieren. Anwendungen: Funktionalität prüfen, Bugs/Schwachstellen finden, Programme **ohne Quellcode patchen** und vor allem **Schadsoftware erkennen**.

![Vom Quellcode über den Compiler zum ausführbaren Programm](https://upload.wikimedia.org/wikipedia/commons/6/6b/Compiler.svg "Die Kompilierung übersetzt lesbaren Quellcode in Maschinencode — und wirft dabei Namen, Typen und Kommentare weg. Reverse Engineering versucht, diesen Weg rückwärts zu gehen.")

> **Eselsbrücke (statisch vs. dynamisch):** **statisch = anschauen** (nicht ausführen → Strings, Disassembly, CFG). **dynamisch = laufen lassen** (Debugger, Sandbox/VM, Verhalten beobachten). Faustregel: erst Strings/statisch für den schnellen Überblick, dann dynamisch fürs echte Verhalten. [Low Level zeigt genau diese Stufen](https://www.youtube.com/watch?v=8vk5z9VAaBQ).

## Was ist Malware?

**Malware** ist laut NIST ein Programm, das (meist verdeckt) eingeschleust wird, um Vertraulichkeit, Integrität oder Verfügbarkeit der Daten/Systeme des Opfers zu kompromittieren. Meist für Windows. Eine kleine Zeitleiste: Morris-Worm (1988), ILOVEYOU (2000), Zeus (2009), Cryptolocker (2013), Mirai (2016). Die Analyse hat klare **Ziele**: den **Infektionsweg** (Downloads, E-Mail-Anhänge, Exploits in Browser/PDF/Word/OS), die **Persistenz**, die **Funktion/Typ**, die **Entfernung** und das Umgehen von Anti-Analyse.

**Persistenz** (Code auch nach Neustart ausführen) erreicht Windows-Malware vor allem über: den **Autostart-Ordner**, **Registry Run Keys** (z. B. HKLM\Software\Microsoft\Windows\CurrentVersion\Run) und **Services** (automatisch startende Hintergrundprozesse). Bei der **Entfernung** beginnt man genau hier — beim Persistenzmechanismus — und arbeitet sich zu allen Komponenten vor.

Malware-**Typen**: Trojaner, Wurm, Virus, Cryptominer, Backdoor, Bot, Adware, **Ransomware**.

## Ransomware im Detail

**Ransomware** verschlüsselt die Dateien des Opfers (Festplatte, Netzlaufwerke, Backups) und fordert **Lösegeld** (meist in Kryptowährung) für die Entschlüsselung. Besonderheit: Sie muss **nicht heimlich** sein und braucht **keine Persistenz** — der Schaden ist nach dem einmaligen Lauf angerichtet. Typische Implementierungsspuren (gut für die Analyse!): Datei-Suche (FindFirstFile/FindNextFile), Filter auf bestimmte Endungen, Verschlüsselung (AES/CryptEncrypt), **Löschen der Backups** (vssadmin delete shadows), Schreiben einer **Lösegeldforderung**. Häufige **Fehler der Autoren**, die das Knacken ermöglichen: selbstgebaute/schwache Krypto, **nicht zufällige** oder statische Schlüssel, Schlüssel aus bekannten Infos (Nutzername, Zeitstempel, MAC-Adresse), zu kurze Schlüssel. [Computerphile seziert WannaCry](https://www.youtube.com/watch?v=88jkB1V6N9w).

> **Eselsbrücke (Ransomware):** als einzige Malware **laut statt leise** — keine Heimlichkeit, keine Persistenz nötig, denn nach *einem* Lauf sind die Dateien verschlüsselt. Geknackt wird sie fast immer über **schlechte Schlüssel** (statisch, vorhersagbar, zu kurz), nicht über das Verschlüsselungsverfahren.

## Statische Analyse erschweren

**Statische Analyse** betrachtet das Programm, ohne es laufen zu lassen — am ergiebigsten sind **Strings** (Fehlermeldungen, Pfade, Domains verraten viel) und das **Disassembly** (mit Kontrollflussgraph). Malware-Autoren kontern mit **Obfuskation**:

- **Garbage Code:** nutzlose Instruktionen (NOP-Äquivalente, sich aufhebende Operationen) als „Nadel im Heuhaufen".
- **String-Obfuskation:** Strings werden unleserlich gespeichert und erst **zur Laufzeit** entschlüsselt — Tools wie strings.exe laufen ins Leere. (Die Obfuskation muss nicht „sicher" sein, nur unleserlich.)
- **Code-Obfuskation:** Teile des Codes liegen verschleiert vor; ein **Stub** entschlüsselt sie zur Laufzeit im Speicher und springt hinein.
- **PE-Obfuskation:** das **komplette** Binary wird verschleiert (Code, Daten, Strings, Imports, Header) — statisch ist nichts mehr sinnvoll analysierbar; ein Stub stellt das Original zur Laufzeit her.

### Schritt für Schritt: einen obfuskierten C&C-Domainnamen entschlüsseln

Genau diese Aufgabe stellt das Übungsblatt: Eine Malware will eine Domain auflösen, um ihren **Command-and-Control-Server** zu erreichen; als Analyst willst du den Namen herausfinden, um ihn zu sperren. Im Binary findest du aber nicht „evil-server.com", sondern den obfuskierten String **fwjm.tfswfs/dpn**. Das sieht nach Verschiebung aus — und tatsächlich ist jedes Zeichen um **+1** im Zeichensatz verschoben. Den Deobfuskierungs-Algorithmus implementierst du also, indem du jedes Zeichen um **1 zurückschiebst**: f→e, w→v, j→i, m→l, .→-, t→s, f→e, s→r, w→v, f→e, s→r, /→., d→c, p→o, n→m. Heraus kommt **evil-server.com**. Merke das Vorgehen: obfuskierten String aus dem Binary ziehen → die (oft simple) Transformation erkennen → sie umkehren. Die Obfuskation muss eben nicht *sicher* sein, nur unleserlich genug, dass das Tool **strings** allein nichts verrät.

## Dynamische Analyse erschweren

**Dynamische Analyse** führt (Teile) des Codes aus und beobachtet das Verhalten (aufgerufene Funktionen, Datei-/Registry-Zugriffe, Internetverbindungen) — mit **Debugger**, Monitoren und **Sandboxes/VMs**. Ein **Debugger** erlaubt kontrollierte Ausführung, das Auslesen von Speicher/Registern und das Manipulieren von Daten. Malware kontert, indem sie die Analyseumgebung **erkennt**:

- **Debugger erkennen:** über die Windows-API IsDebuggerPresent oder direkt das PEB-Flag (mov eax, fs:[0x30] …). Bypass: das Flag auf 0 setzen.
- **Breakpoints erkennen:** Debugger ersetzen Instruktionsbytes durch **0xCC** (INT 3) — das Programm sucht in seinem eigenen Speicher nach 0xCC oder prüft eine **Prüfsumme** über den Code; zusätzlich gibt es Hardware-Breakpoints (Debug-Register DR0–DR3).
- **Sandbox/VM erkennen:** über **Artefakte** (Spuren, die echte Hardware nicht hat) oder **Timing** (Code läuft in der VM messbar anders).

Wichtige Lektion: Diese Checks sind oft **schlampig** implementiert — jeder Check ruft bei Erkennung einfach exit() auf. Dann muss man die Anti-Analyse gar nicht verstehen, sondern **patcht** einfach alle Checks weg.

> **Eselsbrücke (Anti-Analyse):** **statisch** kontert man mit **Obfuskation** (Garbage, String-, Code-, PE-Obfuskation), **dynamisch** mit **Erkennung** (IsDebuggerPresent, 0xCC-Bytes = INT 3, VM/Timing). Aber: ein Check, der nur **exit()** aufruft, ist **wegpatchbar** — verstehen muss man ihn nicht.

## Auf den Punkt

Die Kurzfassung: Reverse Engineering ist die Umkehrung der Kompilierung — und schwer, weil das Binary keine Namen, Typen oder Kommentare mehr enthält. Man arbeitet mit zwei Analysearten: statisch (anschauen, ohne auszuführen — Strings, Disassembly, CFG) und dynamisch (laufen lassen und beobachten — Debugger, Sandbox/VM). Wichtigstes Einsatzfeld ist die Malware-Analyse mit den Zielen Infektionsweg, Persistenz, Funktion/Typ und Entfernung. Persistenz (Überleben des Neustarts) erreicht Windows-Malware über Autostart, Registry Run Keys oder Services; Ransomware ist der laute Sonderfall (keine Heimlichkeit/Persistenz nötig, geknackt über schlechte Schlüssel). Malware-Autoren erschweren die Analyse mit Obfuskation (Garbage Code, String-/Code-/PE-Obfuskation) gegen statische und mit Debugger-/VM-Erkennung gegen dynamische Analyse — beides oft so schlampig, dass man die Checks einfach wegpatcht.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Reverse Engineering** | Umkehrung der Kompilierung; Absicht aus Binary rekonstruieren |
| **statische Analyse** | ohne Ausführung: Strings, Disassembly, CFG |
| **dynamische Analyse** | mit Ausführung: Debugger, Sandbox/VM |
| **Malware** | Schadsoftware (kompromittiert C/I/A) |
| **Persistenz** | Überleben des Neustarts (Autostart, Run Keys, Services) |
| **Ransomware** | verschlüsselt Dateien, fordert Lösegeld |
| **Obfuskation** | Code/Strings/PE unleserlich machen (Stub zur Laufzeit) |
| **0xCC / INT 3** | Software-Breakpoint-Byte |
| **IsDebuggerPresent** | API zur Debugger-Erkennung |
| **Sandbox/VM-Detection** | Artefakt- oder Timing-basiert |

## Typische Fallen

- **Das Binary enthält noch Quellcode?** Nein — Namen/Kommentare sind weg; höchstens Debug-Info bleibt.
- **Ransomware braucht Persistenz/Heimlichkeit?** Nein — der Schaden ist nach einem Lauf erledigt; sie darf laut sein.
- **String-Obfuskation muss kryptografisch sicher sein?** Nein — sie muss nur **unleserlich** sein (Deobfuskation zur Laufzeit).
- **PE-Obfuskation erschwert nur Strings?** Nein — sie verschleiert **das ganze** Binary (Code, Daten, Imports, Header).
- **Anti-Analyse macht Malware unknackbar?** Nein — schlecht gemachte Checks lassen sich einfach **patchen** (exit() entfernen).

## Klausur-Fokus

Das Übungsblatt ist praktisch und dreht sich um zwei Dinge, die du erklären können musst. Erstens **statische Analyse mit dem Tool **strings****: Aus den extrahierten Zeichenketten einer unbekannten Datei sollst du erkennen, **um welches Programm es sich handelt und was es tut** (Fehlermeldungen, Pfade, Domains, importierte Funktionen verraten viel) — und erklären, **warum so viel „Müll" unter den Strings ist** (Maschinencode-Bytes, die zufällig wie druckbare Zeichen aussehen). Zweitens die **String-Obfuskation am Malware-Beispiel**: Eine Malware löst eine **DNS-Domain** auf, um Kontakt zu einem **Command-and-Control-Server** aufzunehmen; der Domainname ist obfuskiert gespeichert. Du sollst den obfuskierten Wert extrahieren und den **Deobfuskierungs-Algorithmus nachvollziehen/reimplementieren**, um den Klartext-Domainnamen zu gewinnen (den man dann sperren würde). Dazu, eher konzeptionell: die **Kompilierungskette** und warum dabei Information verloren geht, **statisch vs. dynamisch** mit Werkzeugen, die Malware-Analyseziele und die drei **Persistenz**-Mechanismen, **Ransomware** (Ablauf + schwache Schlüssel) und die **Anti-Analyse**-Tricks (Obfuskationsarten; Detection via IsDebuggerPresent, 0xCC-Bytes, VM/Timing) — samt der Einsicht, dass schlampige Checks einfach wegpatchbar sind.

## Mehr dazu

- **Computerphile — Wana Decrypt0r (WannaCry Ransomware)** (EN, Mike Pound): seziert eine echte Ransomware und erklärt, wie sie Dateien verschlüsselt. https://www.youtube.com/watch?v=88jkB1V6N9w
- **Low Level — Every Level of Reverse Engineering Explained** (EN): von Strings über Disassembly bis zur Verhaltensanalyse — genau die Stufen der Vorlesung. https://www.youtube.com/watch?v=8vk5z9VAaBQ
- **Jane Street — Reverse Engineering Ransomware (M. Sikorski)** (EN): der Autor von „Practical Malware Analysis" zeigt den Analyseprozess an echten Samples. https://www.janestreet.com/tech-talks/dude-where-are-my-files/`,
  },
};

const lecture13: Explanation = {
  id: "cs-2025-l13",
  lesson: 13,
  title: {
    de: "Zusammenfassung & Klausurvorbereitung: das ganze Semester auf einen Blick", en: "Summary & exam preparation: the whole semester at a glance", tr: "Özet ve sınav hazırlığı: Bir bakışta tüm dönem", ar: "ملخص والتحضير للامتحان: الفصل الدراسي بأكمله في لمحة", ru: "Подведение итогов и подготовка к экзамену: весь семестр вкратце", it: "Riepilogo e preparazione all'esame: l'intero semestre a colpo d'occhio", es: "Resumen y preparación de exámenes: todo el semestre de un vistazo", fr: "Résumé & préparation aux examens : tout le semestre en un coup d'oeil", zh: "总结和考试准备：整个学期一览", pl: "Podsumowanie i przygotowanie do egzaminu: cały semestr w skrócie", pt: "Resumo e preparação para exames: resumo de todo o semestre", uk: "Резюме та підготовка до іспиту: весь семестр з першого погляду", fa: "خلاصه و آمادگی آزمون: کل ترم در یک نگاه", ja: "まとめと試験準備: 学期全体の概要", ko: "요약 및 시험 준비: 학기 전체를 ​​한눈에", vi: "Tóm tắt & luyện thi: sơ lược toàn bộ học kỳ", hi: "सारांश और परीक्षा की तैयारी: पूरा सेमेस्टर एक नज़र में", ur: "خلاصہ اور امتحان کی تیاری: پورا سمسٹر ایک نظر میں", nl: "Samenvatting & examenvoorbereiding: het hele semester in één oogopslag", el: "Περίληψη & προετοιμασία εξετάσεων: όλο το εξάμηνο με μια ματιά", cs: "Shrnutí a příprava na zkoušku: celý semestr přehledně", hu: "Összegzés és vizsgára való felkészítés: az egész félév áttekintése", ro: "Rezumat și pregătire pentru examen: întregul semestru dintr-o privire", sq: "Përmbledhje dhe përgatitja e provimit: i gjithë semestri me një shikim", sr: "Резиме и припрема испита: цео семестар на први поглед", hr: "Sažetak i priprema za ispit: cijeli semestar na prvi pogled", bg: "Обобщение и подготовка за изпити: целият семестър с един поглед", sv: "Sammanfattning & tentamensförberedelser: hela terminen i korthet", fi: "Yhteenveto ja tenttiin valmistautuminen: koko lukukausi yhdellä silmäyksellä", id: "Ringkasan & persiapan ujian: sekilas seluruh semester", th: "สรุปและเตรียมสอบ: สรุปทั้งภาคการศึกษา", sw: "Muhtasari na maandalizi ya mitihani: muhula mzima kwa muhtasari",
  },
  content: {
    de: `Die letzte Sitzung ist eine Wiederholung — und genau das richtige Werkzeug für die Klausurvorbereitung. Statt neuen Stoff bündelt dieses Kapitel den **roten Faden des ganzen Kurses**: die drei Säulen, wie die einzelnen Vorlesungen aufeinander aufbauen, und eine kompakte Checkliste, was du wirklich können musst. Nutze es als Landkarte und springe von hier in die einzelnen Kapitel-Erklärungen zurück.

Der ganze Kurs ruht auf drei Säulen, eingerahmt von den Grundkonzepten aus Vorlesung 1. Die **Kryptografie** (V2–V8) sichert die Daten, die **Netzwerk- und Web-Sicherheit** (V9) die Kommunikation, und die **Software- und Systemsicherheit** (V10–V12) die Programme und Systeme. Innerhalb der Krypto verläuft ein klarer Faden — von symmetrisch (DES, AES) über asymmetrisch (RSA und das Schlüsselaustauschproblem) zur Integrität (Hashes, Signaturen, MAC) bis zu den Anwendungen (Bitcoin, Protokolle, TLS). Und durch alles ziehen sich dieselben Prinzipien aus dem ersten Kapitel: die CIA-Triade, das schwächste Glied, Defense in Depth, Kerckhoffs und das Adversarial Setting. Gehen wir die drei Säulen der Reihe nach durch.

![Die CIA-Triade als roter Faden des gesamten Kurses](https://upload.wikimedia.org/wikipedia/commons/c/c5/CIAJMK1209-en.svg "Über allen drei Säulen schweben dieselben Schutzziele: Vertraulichkeit, Integrität, Verfügbarkeit. Fast jeder Angriff im Kurs lässt sich einem davon zuordnen.")

## Säule 1: Kryptografie (V2–V8)

Der Bogen ist sauber: Es beginnt mit **klassischen Chiffren** und der Lektion, dass ein großer Schlüsselraum nicht reicht (Frequenzanalyse, V2). Dann **symmetrische Blockchiffren**: **DES** mit der Feistel-Struktur (V3) und **AES** mit seinen vier Schichten (V4) — beide nach dem Prinzip Konfusion + Diffusion über viele Runden. Weil symmetrische Verfahren das **Schlüsselaustauschproblem** haben, kommt die **asymmetrische** Kryptografie: **RSA** auf Basis der Faktorisierung (V5). Für Integrität und Authentizität folgen **Hash-Funktionen, digitale Signaturen und MAC/HMAC** (V6). Den Abschluss bilden zwei große Anwendungen: **Bitcoin** (Hashes + Signaturen + Proof-of-Work, V7) und **Schlüsselvereinbarung/Protokolle** — Diffie-Hellman, Needham-Schroeder, Kerberos (V8).

## Säule 2: Netzwerk- & Web-Sicherheit (V9)

Hier verlässt der Kurs die Mathematik. **TLS** führt die Krypto im Web zusammen (hybrid). Zwei Angreifertypen: **Denial-of-Service** attackiert die **Verfügbarkeit** (ICMP-Flooding, Spoofing, Reflection/Amplification, DDoS via Botnet wie Mirai), und **Input Validation** adressiert bösartige Eingaben (**XSS**, **SQL-Injection**) — abgewehrt durch Sanitization, Validation, **Whitelisting** und CSP.

## Säule 3: Software- & Systemsicherheit (V10–V12)

Zuerst die **Software-Exploits** (V10): Ein Buffer Overflow überschreibt die Rücksprungadresse; daraus wird Code Injection, und im Wettrüsten mit DEP entstehen **Code-Reuse/ROP** sowie die Abwehr **ASLR** und **CFI**. Dann **Betriebssystemsicherheit** am Beispiel **Multics** (V11): **Reference Monitor**, **Schutzringe**, ACL und **Bell-LaPadula** zeigen, wie ein OS Zugriff zwingend durchsetzt. Schließlich **Reverse Engineering & Malware** (V12): wie man Binaries ohne Quellcode analysiert (statisch/dynamisch) und wie Malware (Persistenz, Ransomware) sich der Analyse entzieht.

> **Eselsbrücke (der ganze Kurs in einem Satz):** **Mathe → Leitung → Maschine.** Säule 1 sichert die *Daten* (Krypto), Säule 2 die *Kommunikation* (Netz/Web), Säule 3 die *Programme & Systeme* (Exploits, OS, Malware) — und über allem schweben die Prinzipien aus V1 (CIA, schwächstes Glied, Adversarial Setting). Zum Wiederholen einzelner Themen ist der [Computerphile-Kanal](https://www.youtube.com/computerphile) Gold wert.

## Begriffe & Notation

| Säule | Must-know-Begriffe |
|---|---|
| **Grundlagen** | CIA-Triade, schwächstes Glied, Defense in Depth, Threat Model, Kerckhoffs |
| **Symmetrisch** | Konfusion/Diffusion, Feistel (DES), Schichten (AES), ECB/CBC, XOR, OTP |
| **Asymmetrisch** | Einwegfunktion, RSA (n,e,d,φ(n)), Faktorisierung, Diffie-Hellman (diskreter Log) |
| **Integrität** | Hash (Urbild-/Kollisionsresistenz), Geburtstagsparadoxon 2^(n/2), Signatur, MAC/HMAC, Zertifikat/PKI |
| **Anwendungen** | Bitcoin (Hash Pointer, Merkle, PoW, UTXO), TLS, KDC, Replay, Kerberos |
| **Netzwerk/Web** | DoS/DDoS, Reflection/Amplification, XSS, SQL-Injection, Whitelisting, CSP |
| **Software/System** | Buffer Overflow, DEP, ROP, ASLR, CFI; Reference Monitor, Ringe/Brackets, Bell-LaPadula; Malware, Persistenz, Ransomware |

## Typische Fallen

- **Themen isoliert lernen.** Die Stärke der Klausur liegt in den **Querverbindungen** (z. B. „warum braucht Bitcoin Hashes *und* Signaturen?", „warum löst asymmetrisch das Problem von symmetrisch?").
- **Konzepte vs. Details verwechseln.** Der Prof betont: **Konzepte verstehen**, nicht nur Implementierungsdetails auswendig lernen (z. B. PHP-Code lesen, nicht schreiben).
- **CIA-Zuordnung vergessen.** Viele Angriffe lassen sich einem Schutzziel zuordnen (DoS → Verfügbarkeit, Sniffing → Vertraulichkeit, Manipulation → Integrität).
- **Rechenaufgaben unterschätzen.** RSA, Diffie-Hellman, DES-Runde und Rings & Brackets sind typische **Rechenaufgaben** — üben, nicht nur lesen.

## Klausur-Fokus

- **Rechnen können:** RSA (Schlüsselerzeugung + Ver-/Entschlüsselung + EEA + Square-and-Multiply), Diffie-Hellman (k_AB = α^(a·b) mod p), eine DES-Feistel-Runde, **Rings & Brackets** (die vier Fälle).
- **Erklären können:** Konfusion/Diffusion, Hash-Sicherheitseigenschaften + Geburtstagsparadoxon, Signatur vs. MAC, MITM + Zertifikate, Double-Spend + Longest Chain, DoS-Varianten, XSS vs. SQLi, Code Injection vs. Code-Reuse, DEP/ASLR/CFI, Reference-Monitor-Prinzipien, Bell-LaPadula.
- **Einordnen können:** jeden Mechanismus der passenden **CIA**-Eigenschaft und der richtigen **Säule** zuordnen.
- Geh die einzelnen Kapitel-Erklärungen (V1–V12) durch und prüfe dich am jeweiligen **Klausur-Fokus** — diese Zusammenfassung ist die Landkarte dazu.

## Mehr dazu

- **Computerphile (YouTube-Kanal)** (EN): kurze, hochwertige Videos zu fast allen Kursthemen — ideal zum Wiederholen. https://www.youtube.com/computerphile
- **Patrick Winston (MIT) — „How To Speak"** (EN): wie man Inhalte klar präsentiert — nützlich für mündliche Prüfungen und Vorträge. https://www.youtube.com/watch?v=Unzc731iCUY
- **David JP Phillips — „How to avoid death by PowerPoint"** (EN): wie man Inhalte überzeugend präsentiert. https://www.youtube.com/watch?v=Iwpi1Lm6dFo`,
  },
};

export function buildCybersicherheit2025Explanations(): Explanation[] {
  return [
    lecture01,
    lecture02,
    lecture03,
    lecture04,
    lecture05,
    lecture06,
    lecture07,
    lecture08,
    lecture09,
    lecture10,
    lecture11,
    lecture12,
    lecture13,
  ];
}
