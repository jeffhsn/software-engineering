import type { Explanation } from "./explanation-types";
import type { QuizSet } from "./quiz-types";

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
    de: "Einführung in die IT-Sicherheit: Schutzziele, Denkweise und der Start in die Kryptografie",
  },
  content: {
    de: `Die erste Vorlesung sieht auf den Folien aus wie ein Sammelsurium: Orga-Kram, ein paar Schlagworte, dann unvermittelt Kryptografie. In Wahrheit ist sie das **Fundament für das ganze Semester** — drei Schutzziele, eine Hand voll eiserner Prinzipien und eine „Angreifer-Brille". Verinnerlichst du diese eine Stunde wirklich, liest sich jede spätere Vorlesung (Verschlüsselung, Hashes, Exploits, Malware) wie eine Variation desselben Themas. Wir bauen jeden Begriff vom Alltagsbild aus auf — Vorwissen brauchst du keins. Lies das hier einmal in Ruhe, und die Folien wirken danach fast trivial.

## Worum es in diesem Kurs wirklich geht

Bevor wir in Details springen, ein Bild fürs große Ganze. Cybersicherheit ist kein Werkzeugkasten voller Tricks, sondern eine Haltung. Du baust etwas — eine App, ein Netzwerk, ein Betriebssystem — und gleichzeitig sitzt dir jemand gegenüber, der genau dieses Etwas missbrauchen, belauschen oder zerstören will. Das ganze Semester dreht sich um diesen Zweikampf. Zuerst klären wir, *was* „sicher" überhaupt heißt; das sind drei Schutzziele. Dann lernst du die zwei Gesetze kennen, die danach in jedem einzelnen Kapitel wieder auftauchen. Anschließend setzt du die „Angreifer-Brille" auf, mit der echte Sicherheitsleute die Welt sehen. Und zum Schluss steigen wir in das erste große Werkzeug ein, die Kryptografie. Hast du diese Geschichte einmal verstanden, sind die kommenden Wochen nur noch Variationen davon — versprochen.

## Was „sicher" überhaupt bedeutet

„Mach das mal sicher" ist ein sinnloser Auftrag, solange niemand sagt, *was* sicher heißt. Die gesamte IT-Sicherheit beantwortet diese Frage mit drei Zielen, die man die **CIA-Triade** nennt — und nein, das hat nichts mit dem Geheimdienst zu tun, es ist nur ein Akronym aus Confidentiality, Integrity und Availability.

Das erste Ziel, **Vertraulichkeit (Confidentiality)**, ist das, woran die meisten zuerst denken: Niemand außer den Befugten soll die Daten *lesen* können. Wenn du deinem Freund eine Nachricht schickst, soll genau er sie lesen — nicht der Mobilfunkanbieter, nicht der Café-WLAN-Betreiber, nicht der Hacker am Nebentisch. Verletzt ist dieses Ziel in dem Moment, in dem ein Datenleck deine Passwörter ins Netz spült. Das klassische Gegenmittel kennst du schon dem Namen nach: Verschlüsselung.

Das zweite Ziel ist subtiler und wird oft vergessen. **Integrität (Integrity)** bedeutet, dass niemand die Daten *unbemerkt verändern* kann. Stell dir vor, du überweist 100 € — und unterwegs macht jemand heimlich 10 000 € daraus oder tauscht die Empfänger-Kontonummer aus. Hier hat niemand etwas Geheimes „gelesen", trotzdem ist ein Riesenschaden entstanden. Genauso wichtig: Wenn dein Rechner ein Update lädt, willst du sicher sein, dass es *wirklich* vom Hersteller stammt und nicht unterwegs mit Schadcode gespickt wurde. Für Integrität sorgen später Hash-Funktionen und digitale Signaturen.

Das dritte Ziel klingt banal, ist aber oft das, worauf es wirklich ankommt. **Verfügbarkeit (Availability)** heißt, dass das System *da ist, wenn man es braucht*. Die sicherste Datenbank der Welt nützt nichts, wenn ein Angreifer den Server mit Anfragen überflutet und kein echter Nutzer mehr durchkommt. Denk an ein Krankenhaus-System, das im Notfall einfach laufen muss. Verfügbarkeit rettet man übrigens nicht mit Mathematik, sondern mit ganz handfesten Dingen — Redundanz, Backups, Abwehr von Überlastungsangriffen.

![CIA-Triade: Confidentiality, Integrity, Availability](https://upload.wikimedia.org/wikipedia/commons/c/c5/CIAJMK1209-en.svg "Die CIA-Triade — die drei Schutzziele, auf denen die gesamte IT-Sicherheit aufbaut.")

> **Eselsbrücke:** drei Verben in fester Reihenfolge — **lesen** (C), **ändern** (I), **nutzen** (A). Wer darf lesen? Wer könnte unbemerkt ändern? Was blockiert das Nutzen? Wenn in der Klausur steht „welches Schutzziel ist verletzt?", ordnest du über genau diese drei Verben zu.

Jetzt kommt der Gedanke, den die Folien nie aussprechen, der aber alles zusammenhält: **Diese drei Ziele ziehen gegeneinander.** Treibst du die Vertraulichkeit auf die Spitze — alles verschlüsselt, dreifach weggeschlossen, jeder Zugriff zehnmal geprüft —, dann leidet zwangsläufig die Verfügbarkeit, weil selbst die Berechtigten kaum noch herankommen. Sicherheit ist deshalb nie „mehr Schloss = besser", sondern immer ein Abwägen zwischen diesen drei Polen. Diese Spannung begegnet dir bis zur letzten Vorlesung, und sie ist zugleich der rote Faden durch den Stoff: Die Kryptografie der nächsten Wochen (V2–V5) kümmert sich um die Vertraulichkeit, Hashes und Signaturen (V6) um die Integrität, und für die Verfügbarkeit (V9) brauchen wir am Ende ganz andere Werkzeuge — denn keine Formel der Welt fährt einen abgestürzten Server wieder hoch. Wer die drei Ziele schnell aufgefrischt sehen will: [Professor Messer erklärt sie in fünf Minuten](https://www.youtube.com/watch?v=SBcDGb9l6yo).

## Die zwei Gesetze, die in jedem Kapitel wiederkehren

Es gibt zwei Faustregeln, die so oft auftauchen, dass du sie wie Naturgesetze behandeln solltest. Die erste lautet: ein System ist nur so stark wie sein schwächstes Glied. Denk an eine Kette. Du kannst zehn ihrer Glieder aus gehärtetem Stahl schmieden — wenn das elfte aus Pappe ist, reißt die Kette genau dort, und die ganze Mühe an den anderen zehn war umsonst. Sicherheit funktioniert exakt so. Die teuerste, mathematisch perfekte Verschlüsselung ist wertlos, sobald das Passwort „1234" heißt oder auf einem gelben Zettel am Monitor klebt. Und genau deshalb suchen Angreifer auch nie die starke Stelle, sondern immer die schwächste. Erschreckend oft ist diese schwächste Stelle nicht die Technik, sondern der Mensch: Eine gut gemachte Phishing-Mail muss keine einzige Formel knacken — sie fragt den Schlüssel einfach freundlich ab. Halte Sicherheit deshalb nie für einen Durchschnitt, sondern für ein Minimum: Nicht „wie gut ist mein bestes Bauteil?" entscheidet, sondern „wie schwach ist mein schlechtestes?".

Die zweite Regel ist die direkte Antwort auf die erste und heißt **Defense in Depth** — Verteidigung in mehreren Schichten. Wenn jeder einzelne Schutz irgendwann versagen kann, dann darfst du dich eben nicht auf einen einzigen verlassen. Das Bild dazu ist eine mittelalterliche Burg: zuerst der Wassergraben, dahinter die Mauer, dahinter die Wachen, und ganz innen das verschlossene Verlies für den Schatz. Wer den Graben durchschwimmt, steht immer noch vor der Mauer; wer über die Mauer klettert, läuft den Wachen direkt in die Arme. Kein einzelner Durchbruch gewinnt sofort das ganze Spiel. In der IT heißt das ganz konkret: Firewall *und* Authentifizierung *und* Verschlüsselung *und* Überwachung — Schichten, die einander auffangen, sodass niemals alles an einer einzigen Annahme hängt („unsere Mauer hält schon irgendwie"). Diese beiden Regeln wirst du in jedem kommenden Kapitel wiedererkennen, von der Schlüssellänge bei RSA bis zur Ringschutz-Architektur eines Betriebssystems.

## Warum Sicherheit anders ist als jedes andere Fach

Jetzt kommt der Gedanke, der Sicherheit von normaler Softwareentwicklung trennt — und der vielen erst spät dämmert. In fast jedem anderen Ingenieursfach kämpfst du gegen die Natur: gegen Schwerkraft, gegen Materialermüdung, gegen den Zufall. Die Natur ist gnadenlos, aber sie ist nicht boshaft. Eine Brücke, die heute hält, stürzt morgen nicht plötzlich ein, weil sich die Schwerkraft über Nacht eine fiese neue Variante ausgedacht hat. In der Sicherheit dagegen kämpfst du gegen einen denkenden Gegner. Er hält sich an keine Regeln, er benutzt dein System auf eine Weise, für die es nie gedacht war, und er tut mit Vorliebe genau das, womit du nicht gerechnet hast. Schlimmer noch: Deine Architektur muss gegen *alle* Angriffe bestehen — auch gegen Techniken, die erst in zehn Jahren erfunden werden.

Daraus folgt ein Ungleichgewicht, das du nie vergessen solltest. Der Verteidiger muss jede Tür, jedes Fenster und jeden Lüftungsschacht schließen. Der Angreifer muss nur eine einzige offene Stelle finden. Verteidigen heißt, überall gewinnen zu müssen; angreifen heißt, einmal irgendwo zu gewinnen. Diese Asymmetrie ist der tiefere Grund, warum Verteidigung so viel schwerer ist als Angriff — und warum „wir haben doch eine Firewall" nie eine Antwort ist.

Die Haltung, mit der man dem begegnet, heißt **Security Mindset**, und sie ist die wichtigste Gewohnheit, die du dir in diesem Kurs antrainieren sollst. Sie besteht darin, bei allem reflexartig zu fragen: „Und was passiert, wenn ich das angreife, indem ich …?" Normale Entwickler fragen, wie etwas *funktioniert*. Sicherheitsleute fragen, wie man es zum *Versagen* bringt. Bruce Schneier hat das in einem berühmten Essay so beschrieben: Gute Sicherheitsleute können keinen Laden betreten, ohne automatisch zu sehen, wie man hier klauen könnte — sie können gar nicht anders. Trainiere dir genau diesen Reflex an: Bei jedem Mechanismus, den wir in den nächsten Wochen lernen, sofort der Gegen-Gedanke „und wie breche ich das wieder?". Wer Lust auf das Original hat, liest [Schneiers „The Security Mindset"](https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html).

## Die unbequeme Wahrheit: perfekte Sicherheit gibt es nicht

Wenn man das Security Mindset ehrlich zu Ende denkt, landet man bei einer Erkenntnis, die anfangs frustriert: Es gibt keine perfekte Sicherheit. Kein System ist gegen jeden denkbaren Angriff gefeit, und — fast noch wichtiger — du musst immer irgendjemandem vertrauen. Du vertraust dem Hersteller deiner Hardware, du vertraust dem Betriebssystem, du vertraust den Administratoren deines Unternehmens. Genau aus diesem unvermeidbaren Vertrauen erwächst eine eigene Gefahr, die man **Insider-Angriffe** nennt: Wer Vertrauen genießt, kann es eben auch missbrauchen.

Wenn „alles absichern" also unmöglich ist, brauchst du eine ehrlichere Frage: *Wogegen* genau will ich mich schützen? Die Antwort darauf nennt man **Threat Model** (Bedrohungsmodell), und es ist eines der wichtigsten Werkzeuge des ganzen Fachs — obwohl es gar keine Technik ist, sondern eine Denkübung. Ein Threat Model beantwortet zwei Fragen: Welche Daten und Prozesse sind mir überhaupt wertvoll genug, sie zu schützen? Und welche Angreifer nehme ich ernst? Ein Tagebuch gegen die neugierige kleine Schwester abzusichern ist eine völlig andere Aufgabe, als dasselbe Tagebuch gegen einen Geheimdienst zu verteidigen — anderer Gegner, anderer Aufwand, andere Mittel. Und ohne ein festgelegtes Threat Model weißt du nie, ob du genug tust oder einfach das Falsche absicherst.

## Jetzt wird es konkret: der Einstieg in die Kryptografie

Mit dieser Brille steigt die Vorlesung in das erste große Werkzeug ein — und gleich zu Beginn werden drei Wörter ständig verwechselt, also trennen wir sie sauber. Der Oberbegriff ist die **Kryptologie**. Sie hat zwei Hälften, die sich wie Schwert und Schild gegenüberstehen: Die **Kryptografie** ist die Kunst des Bauens und Absicherns („wie verschlüssle ich eine Nachricht?"), die **Kryptanalyse** die Kunst des Brechens („wie knacke ich diese Verschlüsselung wieder?"). Das ist das Adversarial Setting von eben in Reinform — Bauen gegen Brechen im ewigen Wettlauf. Und es hat eine Konsequenz, die du dir merken solltest: Ein Verfahren gilt nicht deshalb als sicher, weil sein Erfinder es dafür hält, sondern erst, wenn die besten Kryptanalytiker der Welt jahrelang erfolglos daran gescheitert sind.

Die Kryptografie selbst zerfällt in drei Familien, und es lohnt sich, sie früh auseinanderzuhalten. Da sind zuerst die symmetrischen Verfahren — die klassische Form, die es seit der Antike gibt: Beide Seiten teilen sich *einen* geheimen Schlüssel, mit dem ver- und entschlüsselt wird (das werden in den nächsten Wochen die Chiffren DES und AES). Dann gibt es die asymmetrischen oder Public-Key-Verfahren, bei denen jede Person ein *Schlüsselpaar* aus einem öffentlichen und einem privaten Schlüssel besitzt (vor allem RSA). Und schließlich die Protokolle, die diese Algorithmen zu echten Anwendungen zusammensetzen — das bekannteste ist TLS, das jedes „https" in deinem Browser absichert.

Die Jahreszahl, die hier hängenbleiben sollte, ist **1976**. Bis dahin gab es ausschließlich symmetrische Verfahren, und die hatten ein quälendes Henne-Ei-Problem: Beide Seiten müssen denselben geheimen Schlüssel kennen — aber wie tauscht man diesen Schlüssel überhaupt sicher aus, wenn der Lauscher die Leitung längst abhört? 1976 wurde die Public-Key-Kryptografie veröffentlicht und löste genau dieses Problem; ein Jahr später, 1977, kam RSA. Warum ein *öffentlicher* Schlüssel funktionieren kann, ohne dass damit jeder entschlüsseln darf, zeigt [Computerphile sehr anschaulich](https://www.youtube.com/watch?v=GSIDS_lvRv4) — und wir nehmen es in den Vorlesungen 4 und 5 in aller Ruhe auseinander.

## Die Bühne, auf der alles spielt: Alice, Bob und der Lauscher Oskar

Fast jede Krypto-Erklärung im Kurs spielt mit derselben kleinen Besetzung, also lern sie gleich kennen. **Alice** möchte **Bob** eine Nachricht schicken. Dazwischen liegt das **Internet** — ein unsicherer Kanal, auf dem **Oskar** mitlauscht (in englischen Texten heißt er „Eve", von *eavesdropper*, also Lauscher). Bei der symmetrischen Verschlüsselung haben Alice und Bob vorab einen gemeinsamen geheimen Schlüssel vereinbart. Alice nimmt nun ihren Klartext, verwandelt ihn mit dem Schlüssel in unleserlichen Salat und schickt diesen los. Oskar fängt den Salat zwar ab, kann aber ohne den Schlüssel nichts damit anfangen. Bob dagegen besitzt denselben Schlüssel und verwandelt den Salat wieder zurück in den Klartext.

![Symmetrische Verschlüsselung mit einem geteilten Schlüssel](https://upload.wikimedia.org/wikipedia/commons/8/80/Simple_symmetric_encryption-en.svg "Symmetrische Verschlüsselung: derselbe Schlüssel ver- und entschlüsselt. Das ist die Alice-Bob-Oskar-Bühne in einem Bild.")

Damit du die kommenden Folien überhaupt lesen kannst, brauchst du noch ein kleines Vokabular, das ab jetzt wirklich überall auftaucht. Den lesbaren Text nennt man **x** (Klartext, plaintext), den verschlüsselten Salat **y** (Chiffrat, ciphertext) und den Schlüssel **k** (key). Die Verschlüsselung schreibt man als Funktion **e** (encrypt), die Entschlüsselung als **d** (decrypt). Alices Arbeit ist also e(x) = y, Bobs Arbeit ist d(y) = x — die eine Funktion macht exakt das rückgängig, was die andere getan hat. Die Menge *aller* überhaupt möglichen Schlüssel heißt **Schlüsselraum**, und seine Größe wird später entscheidend: Sie bestimmt, wie lange ein Angreifer bräuchte, der einfach stur alle Schlüssel durchprobiert — daher kommt das berühmte „256-Bit"-Versprechen, das du sicher schon gehört hast. Ein sehr anfängerfreundliches Bild davon gibt das [Code.org-Video](https://www.youtube.com/watch?v=ZghMPWGXexs); den großen historischen Bogen von Caesar bis AES spannt [Crash Course Computer Science](https://www.youtube.com/watch?v=jhXCTbFnK8o).

Und damit schließt sich der Kreis zum Anfang dieser Stunde. Einer der letzten Sätze der Vorlesung lautet: Kryptografie ist nur dann nützlich, wenn der Rest des Systems sicher ist. Das ist nichts anderes als das schwächste Glied in neuer Verkleidung. Die ausgefeilteste Verschlüsselung der Welt schützt dich kein bisschen, wenn der Schlüssel unter der Fußmatte liegt — und genau deshalb war es so wichtig, erst die Prinzipien zu verstehen und dann die Mathematik.

## Auf den Punkt

Jetzt, wo die ganze Geschichte erzählt ist, die Kurzfassung zum Wiederholen: IT-Sicherheit heißt, drei konkurrierende Ziele auszubalancieren — Vertraulichkeit, Integrität, Verfügbarkeit (CIA). Zwei Gesetze ziehen sich durch alles: ein System ist nur so stark wie sein schwächstes Glied, und man verteidigt in mehreren Schichten (Defense in Depth). Sicherheit ist besonders, weil der Gegner *denkt* — er braucht nur eine Lücke, du musst alle schließen; deshalb das Security Mindset („wie breche ich das?"). Perfekte Sicherheit gibt es nicht, also definiert man ein Threat Model (was schütze ich, gegen wen?). Und der Einstieg in die Kryptografie: Kryptologie = Kryptografie (bauen) + Kryptanalyse (brechen); symmetrisch (ein geteilter Schlüssel), asymmetrisch (Schlüsselpaar, seit 1976), Protokolle; auf der Bühne Alice, Bob und der Lauscher Oskar mit der Notation x, y, k, e, d.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **x** | Klartext (plaintext) — die lesbare Nachricht |
| **y** | Chiffrat / Geheimtext (ciphertext) |
| **k** | Schlüssel (key) |
| **e( )** | Verschlüsselung (encryption): aus x wird y |
| **d( )** | Entschlüsselung (decryption): aus y wird x |
| **Schlüsselraum** | Menge *aller* möglichen Schlüssel |
| **CIA-Triade** | Confidentiality, Integrity, Availability |
| **Threat Model** | Festlegung, was wogegen geschützt wird |
| **Kryptologie** | Oberbegriff: Kryptografie + Kryptanalyse |

## Typische Fallen

- **CIA ≠ der Geheimdienst.** Es steht für die drei Schutzziele. Klausur-Reflex: lesen→C, unbemerkt ändern→I, Ausfall→A.
- **„Stärkste Komponente = sicher" ist falsch.** Es zählt das **schwächste** Glied, nicht das stärkste.
- **Verschlüsselung ≠ Verfügbarkeit.** Krypto liefert C und I, aber nie A — gegen Ausfälle helfen nur Redundanz/Backups.
- **Asymmetrisch ist nicht „besser" als symmetrisch.** Es löst ein *anderes* Problem (Schlüsselaustausch) und ist deutlich langsamer (V4–V5).
- **„Geheimer Algorithmus = sicher" ist falsch.** Security by Obscurity ersetzt keine echte Sicherheit (formal: Kerckhoffs, V2).
- **Perfekte Sicherheit gibt es nicht** — wer sie verspricht, hat das Threat Model nicht verstanden.

## Klausur-Fokus

Aus den Folien dieser Vorlesung kommen vor allem **Verständnisfragen** — die solltest du frei beantworten können: die **CIA-Triade** definieren und an einem Beispiel das verletzte Ziel zuordnen; **schwächstes Glied** und **Defense in Depth** mit einem eigenen Bild erklären; begründen, warum der **denkende Gegner** (die Asymmetrie Angreifer/Verteidiger) Sicherheit so schwer macht; sagen können, was ein **Threat Model** ist und warum es **keine perfekte Sicherheit** gibt; und **Kryptologie / Kryptografie / Kryptanalyse** sauber trennen, die drei Familien (symmetrisch / asymmetrisch / Protokoll) einordnen, die Jahreszahl **1976** kennen und die Notation **x, y, k, e, d** flüssig lesen.

Das **erste Übungsblatt** zeigt aber schon, wohin der Professor praktisch will, und genau das wird gern *gerechnet*: die **klassische Kryptografie per Hand**. Du solltest die **Cäsar-Chiffre** mit der Formel e(x) = (x + k) mod 26 ver- und entschlüsseln, eine **Häufigkeitsanalyse** mit der deutschen Buchstabenverteilung (E ≈ 17 %, dann N, I, S, R …) durchführen, eine **spaltenweise Transposition** mit einem Schlüsselwort ver-/entschlüsseln und die **Vigenère-Chiffre** (ein Schlüsselwort, das die Verschiebung pro Buchstabe vorgibt) anwenden können. Die Mechanik dieser Verfahren bauen wir in Vorlesung 2 vollständig aus — aber merke dir jetzt schon: Hier wird *gerechnet*, nicht nur erzählt.

## Mehr dazu

- **Professor Messer — The CIA Triad** (~5 Min., EN): die drei Schutzziele knapp mit Beispielen. https://www.youtube.com/watch?v=SBcDGb9l6yo
- **Bruce Schneier — „The Security Mindset"** (Essay, EN): Originalquelle des „Denke wie ein Angreifer"-Prinzips. https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): lebendiger Überblick über Verschlüsselung von Caesar bis AES. https://www.youtube.com/watch?v=jhXCTbFnK8o
- **Code.org — Encryption & Public Keys** (~7 Min., EN): anfängerfreundlich zu Klartext, Schlüssel, symmetrischer Verschlüsselung. https://www.youtube.com/watch?v=ZghMPWGXexs`,
  },
};

const lecture02: Explanation = {
  id: "cs-2025-l02",
  lesson: 2,
  title: {
    de: "Einführung in die Kryptografie: Substitutionschiffren, modulare Arithmetik und Stromchiffren",
  },
  content: {
    de: `Diese Vorlesung beantwortet zwei Fragen, die untrennbar zusammengehören: Wie verschlüsselt man klassisch — und wie zerbricht man so eine Verschlüsselung wieder? Aus diesem Hin und Her wächst die erste echte Lektion der Kryptografie, und sie ist überraschend: Ein riesiger Schlüsselraum allein macht gar nichts sicher. Auf dem Weg dorthin lernst du außerdem das mathematische Werkzeug kennen, das die gesamte spätere Krypto trägt (modulare Arithmetik), und den schlanksten Verschlüsselungstyp überhaupt — die Stromchiffre, die am Ende nur aus einer einzigen Operation besteht. Lass uns die Geschichte von vorne erzählen.

## Kerckhoffs' Prinzip: Sicherheit steckt im Schlüssel, nicht im Verfahren

Eine naheliegende, aber falsche Idee: „Wenn niemand weiß, *wie* ich verschlüssele, ist es sicher." **Kerckhoffs' Prinzip** sagt das Gegenteil: Ein Verfahren muss sicher bleiben, selbst wenn der Angreifer Ver- und Entschlüsselungsalgorithmus vollständig kennt. Geheim ist *nur der Schlüssel*. Warum? Algorithmen sprechen sich herum, werden reverse-engineered, stecken in Hardware. Verlässt sich Sicherheit auf Geheimhaltung des Verfahrens („Security by Obscurity"), ist sie verloren, sobald das Verfahren bekannt wird. Das ist der Grund, warum DES und AES *öffentlich* sind und trotzdem sicher.

## Die Substitutionschiffre und wie man sie knackt

Die **Substitutionschiffre** (schon in der Antike genutzt) ersetzt jeden Buchstaben durch einen anderen — gemäß einer festen Tabelle (C→U, Y→N, …). Der Schlüssel ist die ganze Tabelle.

**Wie groß ist der Schlüsselraum?** Der erste Buchstabe hat 26 mögliche Bilder, der zweite 25, usw. — also 26! = 26 × 25 × … × 1 ≈ 2^88. Das sind unvorstellbar viele Schlüssel. Trotzdem ist die Chiffre unsicher. Zwei Angriffe zeigen warum:

1. **Brute-Force:** alle Schlüssel durchprobieren. Funktioniert, wenn der Schlüsselraum klein ist (siehe Cäsar unten), bei 2^88 aber zu groß.
2. **Frequenzanalyse:** der eigentliche Killer. Jede Sprache hat charakteristische Buchstabenhäufigkeiten (im Deutschen ist „E" am häufigsten). Eine Substitution lässt diese Häufigkeiten *unangetastet* — sie verschiebt sie nur. Der häufigste Geheimtextbuchstabe ist also wahrscheinlich „E", der zweithäufigste „N", und so weiter. Man rekonstruiert den Klartext, ohne je den Schlüssel zu raten. [Crypto Corner zeigt das Schritt für Schritt](https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html).

> **Eselsbrücke (Frequenzanalyse):** Eine Substitution *tarnt* die Buchstaben, aber nicht ihre **Häufigkeit**. Der Fingerabdruck der Sprache bleibt — und verrät alles. Im Deutschen: **E** ist König, dann **N, I, S, R**.

Daraus die **zwei zentralen Lektionen** der Vorlesung:

> Ein großer Schlüsselraum bedeutet **nicht** automatisch Sicherheit. Eine gute Chiffre muss die **statistischen Eigenschaften** des Klartextes verbergen.

Die Kryptanalyse insgesamt teilt sich übrigens in klassische, mathematische und Brute-Force-Analyse sowie Implementierungsangriffe und Social Engineering.

## Modulare Arithmetik: Rechnen „im Kreis"

Fast alle Verfahren rechnen auf einer *endlichen* Zahlenmenge — wie eine Uhr, die nach 12 wieder bei 1 anfängt. Formal: a ≡ r (mod m) heißt „m teilt a − r". m ist der **Modul**, r der **Rest**.

Wichtig: Der Rest ist **nicht eindeutig**. 12 ≡ 3 (mod 9), aber auch 12 ≡ 21 ≡ −6 (mod 9). Alle Zahlen mit demselben Rest bilden eine **Restklasse** (… −6, 3, 12, 21 …). Konvention: man nimmt den kleinsten positiven Rest.

Der praktische Trick, der später (RSA!) Gold wert ist: **Modulo darf man auf Zwischenergebnisse anwenden**, um klein zu rechnen. Beispiel 3^8 mod 7: statt 3^8 = 6561 auszurechnen, nimmt man 3^8 = 81 × 81 ≡ 4 × 4 = 16 ≡ 2 (mod 7). Gleiches Ergebnis, winzige Zahlen.

### Schritt für Schritt: Cäsar-Chiffre

Die **Cäsar-Chiffre** ist der Spezialfall der Substitution: jeder Buchstabe wird um eine feste Zahl verschoben (Römer nutzten 3: A→D, B→E, …). Verschlüsseln, modular gedacht:

1. Buchstaben in Zahlen umwandeln (A=0, B=1, …, Z=25).
2. Schlüssel k addieren: y = (x + k) mod 26.
3. Zurück in Buchstaben.

![Cäsar-Chiffre mit Verschiebung um 3](https://commons.wikimedia.org/wiki/Special:FilePath/Caesar_cipher_left_shift_of_3.svg "Cäsar-Chiffre: das ganze Alphabet wird um einen festen Betrag verschoben — hier um 3. Der Schlüssel ist genau diese eine Zahl.")

Wie sicher? Sehr unsicher: Der Schlüsselraum ist nur **26** — Brute-Force in Sekunden, und Frequenzanalyse geht ohnehin.

> **Eselsbrücke (Cäsar):** Substitution mit nur *einer Zahl* als Schlüssel — **y = (x + k) mod 26**. Bei Cäsar selbst war k = 3. Genau diese Formel mit kleinem k taucht in der Klausur als Mini-Rechenaufgabe auf.

## Zwei klassische Chiffren, die das Übungsblatt wirklich abfragt: Transposition & Vigenère

Hier ein Hinweis, der dir Punkte rettet: Das erste Übungsblatt geht über die Folien hinaus und lässt dich zwei weitere klassische Verfahren *per Hand* rechnen. Es lohnt sich also, sie kurz zu verstehen.

Die **spaltenweise Transposition** ist grundverschieden von der Substitution: Sie *ersetzt* keine Buchstaben, sie *vertauscht ihre Reihenfolge*. Du schreibst den Klartext zeilenweise in so viele Spalten, wie das Schlüsselwort Buchstaben hat, und liest die Spalten dann in der alphabetischen Reihenfolge der Schlüsselbuchstaben wieder aus. Beispiel mit Schlüssel **HAL** und Klartext „Beispiele": Du füllst drei Spalten (B-E-I / S-P-I / E-L-E). Sortierst du H, A, L alphabetisch zu A, H, L, dann kommt die A-Spalte (die zweite) zuerst, dann die H-Spalte (die erste), dann die L-Spalte (die dritte) — heraus kommt „EBIPSILEE". Zum Entschlüsseln gehst du den Weg rückwärts: Spaltenlängen bestimmen, Buchstaben spaltenweise zurücksortieren. (Die antike Skytale, ein Lederstreifen um einen Stab gewickelt, ist übrigens dieselbe Idee.)

Die **Vigenère-Chiffre** ist die clevere Erweiterung von Cäsar gegen die Frequenzanalyse: Statt *einer* festen Verschiebung benutzt sie ein ganzes **Schlüsselwort**, dessen Buchstaben der Reihe nach die Verschiebung vorgeben — der erste Klartextbuchstabe wird mit dem ersten Schlüsselbuchstaben verschoben, der zweite mit dem zweiten, und ist das Schlüsselwort zu Ende, fängt es wieder von vorne an. Mit Schlüssel „SICHER" wird der 1. Buchstabe also um S (=18) verschoben, der 2. um I (=8), und so weiter. Der Trick dahinter: Weil derselbe Klartextbuchstabe je nach Position verschieden verschlüsselt wird, *verschmiert* Vigenère die Buchstabenhäufigkeiten — die simple Frequenzanalyse aus dem letzten Abschnitt läuft ins Leere. Das macht Vigenère zu einer **polyalphabetischen** Chiffre (mehrere Alphabete) im Gegensatz zu Cäsars *einem* Alphabet.

## Stromchiffren: Verschlüsseln mit XOR

Jetzt die Trennung, die du dir merken musst: **Stromchiffren** verschlüsseln Bit für Bit, **Blockchiffren** (DES/AES, ab Vorlesung 3) ganze Blöcke.

Eine Stromchiffre erzeugt einen **Schlüsselstrom** s und verknüpft jedes Klartextbit damit per Addition modulo 2:

- Verschlüsselung: y_i = x_i + s_i (mod 2)
- Entschlüsselung: x_i = y_i + s_i (mod 2)

Addition modulo 2 ist **XOR** (exklusives Oder). XOR eignet sich perfekt, weil es **ausbalanciert** ist: bei zufälligem s ist y mit je 50 % 0 oder 1.

| x | s | y = x ⊕ s |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Schön daran: dasselbe XOR mit s macht die Verschlüsselung wieder rückgängig (y ⊕ s = x). Beispiel aus der Praxis: A5/1 in der GSM-Mobilfunkverschlüsselung.

Genau diese Einfachheit hat aber eine gefährliche Kehrseite, die das Übungsblatt liebt: die **Formbarkeit (Malleability)**. Weil das Chiffrat einfach „Klartext XOR Schlüsselstrom" ist, kann ein Angreifer das Chiffrat *gezielt* verändern, *ohne den Klartext zu kennen*. Kippt er im Chiffrat das Bit an Position i (XOR mit 1), dann kippt nach dem Entschlüsseln genau das Klartextbit an Position i mit — der Schlüsselstrom fällt bei der Rechnung heraus. Stell dir vor, ein Kontostand wird als Stromchiffre übertragen: Der Angreifer weiß nicht, welche Zahl drinsteht, aber er kann durch das Kippen der richtigen Bits aus einer kleinen Zahl eine riesige machen. Oder, wenn er den Klartext an einer Stelle *kennt* (known-plaintext), etwa den Buchstaben „m": Dann ist s = y ⊕ „m", und er kann das Chiffrat so umbauen, dass dort plötzlich ein „p" steht. Diese Schwäche ist der Grund, warum man Verschlüsselung in der Praxis immer mit einem **Integritätsschutz** (MAC, Vorlesung 6) kombiniert — Verschlüsselung allein garantiert eben *nicht*, dass die Nachricht unverändert ankommt.

> **Eselsbrücke (Bit-Flip):** Bei einer Stromchiffre gilt: **Bit im Chiffrat kippen = dasselbe Bit im Klartext kippen.** Der Angreifer braucht den Klartext nicht zu kennen, um ihn gezielt zu manipulieren. Vertraulichkeit ≠ Integrität.

## Zufall ist alles: RNGs und das One-Time-Pad

Die ganze Sicherheit einer Stromchiffre hängt am **Schlüsselstrom**. Drei Typen von Zufallsgeneratoren:

- **TRNG** (True RNG): echter physikalischer Zufall (z. B. Rauschen).
- **PRNG** (Pseudo-RNG): aus einem Startwert (Seed) berechnet — reproduzierbar, *vorhersagbar*.
- **CSPRNG** (Cryptographically Secure PRNG): wie PRNG, aber **nicht vorhersagbar** — das, was Krypto braucht.

Das theoretische Ideal ist das **One-Time-Pad (OTP)**: Schlüsselstrom per TRNG erzeugt, nur den Teilnehmern bekannt, **nur einmal** verwendet. Das OTP ist *beweisbar sicher* (informationstheoretisch — keine Rechenleistung der Welt bricht es) — und wird trotzdem kaum genutzt. Der Grund ist das größte Problem: Der Schlüssel muss **genauso lang** sein wie die Nachricht und darf sich nie wiederholen. In der Praxis nutzt man darum einen CSPRNG mit einem kurzen geheimen Schlüssel k als Seed; effiziente Hardware-Stromchiffren bauen auf linear rückgekoppelten Schieberegistern (LFSR) wie A5/1. Die [Wikipedia-Seite zum One-Time-Pad](https://en.wikipedia.org/wiki/One-time_pad) fasst Beweis und Bedingungen kompakt zusammen.

> **Eselsbrücke (OTP — die 3 Bedingungen):** **Z-E-L** — der Schlüssel ist **Z**ufällig (echter Zufall), **E**inmalig (nie wiederverwendet) und **L**ang (mindestens so lang wie die Nachricht). Fehlt eine davon, fällt der Beweis.

## Auf den Punkt

Die Kurzfassung der Geschichte: Sicherheit darf nur am Schlüssel hängen, nie an der Geheimhaltung des Verfahrens (Kerckhoffs). Die klassische Substitution hat zwar einen gewaltigen Schlüsselraum (26! ≈ 2^88), fällt aber trivial durch Frequenzanalyse — denn sie tarnt die Buchstaben, nicht ihre Häufigkeit. Daraus die Kernlektion: großer Schlüsselraum ≠ sicher; eine gute Chiffre muss die Statistik des Klartextes verbergen (das tut Vigenère mit mehreren Alphabeten, Transposition durch Umstellen statt Ersetzen). Das Rechen-Fundament ist die modulare Arithmetik (Rechnen „im Kreis", Reduktion auf Zwischenergebnisse). Und die schlankste Chiffre ist die Stromchiffre: Klartext XOR Schlüsselstrom — perfekt sicher als One-Time-Pad (zufällig, einmalig, lang), aber formbar, weshalb sie allein keine Integrität garantiert.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Kerckhoffs' Prinzip** | nur der Schlüssel ist geheim, nicht der Algorithmus |
| **Substitutionschiffre** | jeder Buchstabe wird ersetzt; Schlüssel = Tabelle |
| **Cäsar-Chiffre** | Substitution mit fester Verschiebung; y = (x+k) mod 26 |
| **Brute-Force** | alle Schlüssel durchprobieren |
| **Frequenzanalyse** | Buchstabenhäufigkeiten ausnutzen |
| **a ≡ r (mod m)** | m teilt a − r; r ist der Rest |
| **Restklasse** | alle Zahlen mit gleichem Rest |
| **Stromchiffre** | Bit-für-Bit-Verschlüsselung per XOR |
| **XOR (⊕)** | Addition modulo 2 |
| **TRNG / PRNG / CSPRNG** | echter / pseudo- / krypto-sicherer Zufall |
| **One-Time-Pad** | beweisbar sichere Stromchiffre, Schlüssel so lang wie Nachricht |

## Typische Fallen

- **Großer Schlüsselraum = sicher? Nein.** 26! ist gewaltig, die Substitution fällt trotzdem durch Frequenzanalyse. Das ist *die* Kernaussage der Vorlesung.
- **„Geheimer Algorithmus = mehr Sicherheit"** verstößt gegen Kerckhoffs. Geheim ist nur k.
- **Rest ist eindeutig? Nein.** Es gibt unendlich viele gültige Reste (eine Restklasse); per Konvention der kleinste positive.
- **PRNG ≠ CSPRNG.** Ein normaler PRNG ist vorhersagbar und damit unsicher für Krypto.
- **OTP ist sicher, aber unpraktisch** — wegen Schlüssellänge und Einmaligkeit, nicht weil es „schwach" wäre.

## Klausur-Fokus

Das Übungsblatt zu diesem Thema ist fast reine **Rechnerei per Hand** — und genau so kommt es in der Klausur. Du solltest die **Cäsar-Chiffre** mit y = (x + k) mod 26 sicher ver- und entschlüsseln und ebenso die **Vigenère-Chiffre** mit einem Schlüsselwort (Verschiebung pro Buchstabe, zyklisch) sowie die **spaltenweise Transposition** mit einem Schlüsselwort (Spalten alphabetisch umsortieren) — beide vorwärts *und* rückwärts. Du musst eine **Häufigkeitsanalyse** mit der deutschen Verteilung (E ≈ 17 %, dann N, I, S, R) durchführen und erklären, warum sie Substitution bricht, Vigenère aber nicht. Beim **One-Time-Pad / Vernam** wirst du den **Schlüsselraum zählen** (für Länge n gibt es 26^n Schlüssel) und daraus eine **Brute-Force-Dauer** ausrechnen (Schlüsselzahl × Operationen ÷ Rechenleistung). Und ganz wichtig, weil es immer wieder drankommt: die **Formbarkeit der Stromchiffre** erklären und einen konkreten **Bit-Flip-Angriff** durchführen (Bit im Chiffrat kippen → gleiches Klartextbit kippt; bei bekanntem Klartext s = y ⊕ x berechnen und gezielt umschreiben). Dazu die Konzepte sicher im Griff: **Kerckhoffs**, **modulo** rechnen (inkl. Reduktion auf Zwischenergebnisse wie 3^8 mod 7), die **XOR-Tabelle** und die drei **OTP-Bedingungen** (Z-E-L).

## Mehr dazu

- **Crypto Corner — Frequency Analysis: Breaking the Code** (Artikel, EN): zeigt genau die Kernaussage — warum Substitution an der Buchstaben-Statistik scheitert. https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html
- **Wikipedia — One-Time Pad** (EN): die vier Bedingungen, der Beweis der perfekten Sicherheit und warum es in der Praxis unpraktisch ist. https://en.wikipedia.org/wiki/One-time_pad
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): ordnet Substitution, Schlüssel und Stromchiffren historisch ein. https://www.youtube.com/watch?v=jhXCTbFnK8o`,
  },
};

const lecture03: Explanation = {
  id: "cs-2025-l03",
  lesson: 3,
  title: {
    de: "Symmetrische Kryptografie: der Data Encryption Standard (DES)",
  },
  content: {
    de: `DES ist die erste „echte" Blockchiffre des Kurses und der Prototyp, an dem man versteht, wie moderne Verschlüsselung überhaupt gebaut ist: Man nimmt zwei erstaunlich einfache Zutaten — Konfusion und Diffusion — und mischt sie viele Runden lang, bis aus dem Klartext heilloser Salat geworden ist. Auf den Folien wirkt das wie ein undurchdringlicher Diagramm-Dschungel; in Wahrheit ist es eine Kette aus vier Ideen, die wir der Reihe nach durchgehen: ein genialer Struktur-Trick (Feistel), ein Innenleben (die f-Funktion), ein Schlüsselfahrplan, und am Ende der Grund, warum DES heute zu schwach geworden ist.

## Etwas Geschichte (warum 56 Bit?)

1972 schreibt das NBS (heute NIST) einen Standard aus; 1974 liefert IBM den besten Vorschlag — basierend auf einer **Feistel-Chiffre**. Gerücht und Streitpunkt: Die NSA soll Einfluss genommen und die Schlüssellänge auf **56 Bit** reduziert haben (was Brute-Force erleichtert). Ein Verdacht auf eine Hintertür in den S-Boxen hat sich dagegen *nicht* bestätigt — die S-Boxen waren sogar besonders robust gewählt. 1977 wird DES veröffentlicht.

## Konfusion & Diffusion: die zwei Zutaten jeder guten Blockchiffre

Claude Shannon hat die beiden Bausteine benannt, aus denen jede sichere Chiffre besteht:

- **Konfusion** — den Zusammenhang zwischen Schlüssel und Chiffrat *verschleiern*. Beispiel: Substitutionstabellen (S-Boxen). Ändert man ein Schlüsselbit, soll sich das Chiffrat unvorhersehbar ändern.
- **Diffusion** — den Einfluss *eines* Klartextsymbols auf *viele* Chiffratsymbole *streuen*. Beispiel: Bitpermutationen. Ändert man ein Klartextbit, sollen sich viele Chiffratbits ändern.

Moderne Blockchiffren schalten Konfusion und Diffusion in **wiederholten Runden** hintereinander. Genau das macht DES 16-mal.

## Die Feistel-Struktur: der geniale Trick

Der 64-Bit-Block wird (nach einer Eingangspermutation IP) in zwei Hälften L_0 und R_0 geteilt. Jede Runde macht nur zwei Dinge:

- **L_i = R_{i−1}** (die rechte Hälfte wandert unverändert nach links)
- **R_i = L_{i−1} ⊕ f(R_{i−1}, k_i)** (die neue rechte Hälfte ist die alte linke, XOR-verknüpft mit dem Ergebnis der f-Funktion)

![Eine Runde der Feistel-Struktur](https://commons.wikimedia.org/wiki/Special:FilePath/Feistel_cipher_diagram_en.svg "Eine Feistel-Runde: die rechte Hälfte geht durch f, wird mit der linken ge-XOR-t, dann werden die Hälften getauscht. Entschlüsseln = dieselbe Struktur rückwärts.")

Pro Runde wird also **nur eine Hälfte** verschlüsselt — das ist *die* Eigenschaft der Feistel-Struktur. Konfusion und Diffusion stecken komplett in der f-Funktion. Nach 16 Runden folgt die Ausgangspermutation IP⁻¹ (die exakte Umkehrung von IP), und man erhält y = DES_k(x).

Warum ist das genial? Weil die Feistel-Struktur **umkehrbar ist, ohne dass f umkehrbar sein muss** — f darf eine beliebige (auch nicht invertierbare) Funktion sein. Dadurch ist die Entschlüsselung im Wesentlichen dieselbe Operation wie die Verschlüsselung. [Computerphile erklärt genau diese Eleganz](https://www.youtube.com/watch?v=FGhj3CGxl8I).

> **Eselsbrücke (Feistel):** „**rechts geht rein, links wird ge-XOR-t, dann getauscht**". Merke die zwei Zeilen L_i = R_{i−1} und R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) — damit kannst du eine Runde *vorwärts und rückwärts* rechnen, und genau das wird in der Klausur verlangt.

## Eine DES-Runde von innen: die f-Funktion

Die f-Funktion bekommt die 32-Bit-Hälfte R_{i−1} und den 48-Bit-Rundenschlüssel k_i. Vier Schritte:

1. **Expansion E:** 32 Bit werden auf 48 Bit aufgeweitet (4-Bit-Blöcke → 6 Bit). Erhöht die Diffusion und passt die Länge an k_i an.
2. **XOR mit dem Rundenschlüssel** k_i.
3. **S-Boxen:** die 48 Bit werden in acht 6-Bit-Blöcke geteilt; jede S-Box (S1…S8) bildet **6 Bit auf 4 Bit** ab (äußere 2 Bit = Zeile, innere 4 Bit = Spalte). Ergebnis: wieder 32 Bit.
4. **Permutation P:** verwürfelt die 32 Bit, sodass die Ausgangsbits einer S-Box in der nächsten Runde *mehrere* S-Boxen beeinflussen.

> **Eselsbrücke (f-Funktion):** **E – X – S – P** = **E**xpansion → **X**OR mit k_i → **S**-Boxen → **P**ermutation. Nur die **S** ist nichtlinear (= Konfusion); E und P liefern die Diffusion.

Die **S-Boxen sind der kryptografische Kern** von DES: Sie sind das einzige **nichtlineare** Element (S(a) ⊕ S(b) ≠ S(a ⊕ b)) und liefern die Konfusion. Zusammen mit E und P sorgen sie für den **Avalanche-Effekt**: Spätestens nach **Runde 5** hängt jedes Bit von *jedem* Klartext- und *jedem* Schlüsselbit ab.

### Schritt für Schritt: eine S-Box nachschlagen

Das wird gern abgefragt, also einmal vorgemacht. Eine S-Box bekommt **6 Bit** und liefert **4 Bit**. Der Trick steckt in der Adressierung: Die **äußeren beiden Bits** (das erste und das letzte) bilden die **Zeile** (0–3), die **inneren vier Bits** die **Spalte** (0–15). Nimm die Eingabe **101101** für S-Box 1:

1. Äußere Bits = das erste (1) und das letzte (1) → 11 binär = **Zeile 3**.
2. Innere Bits = die mittleren vier 0110 → **Spalte 6**.
3. In der offiziellen Tabelle steht S1 in Zeile 3 an Spalte 6 der Wert **1** — als 4-Bit-Ausgabe also **0001**.

Genau so prüfst du auch die **Nichtlinearität** (eine beliebte Aufgabe): Rechne S(x1), S(x2) und S(x1 ⊕ x2) getrennt aus und zeige, dass S(x1) ⊕ S(x2) ≠ S(x1 ⊕ x2) — wäre die S-Box linear, wären beide Seiten gleich; dass sie es nicht sind, ist der Beweis der Nichtlinearität.

## Der Schlüsselfahrplan: woher die 16 Rundenschlüssel kommen

Aus dem 64-Bit-Schlüssel werden die 16 Rundenschlüssel k_i (je 48 Bit) erzeugt:

1. **PC-1** (Permuted Choice 1) wirft jedes 8. Bit weg (das waren Paritätsbits) → 56 Bit, permutiert; aufgeteilt in zwei 28-Bit-Hälften C_0, D_0.
2. In jeder Runde werden C und D **rotiert** (Left Rotate): um 1 Bit in den Runden 1, 2, 9, 16, sonst um 2 Bit.
3. **PC-2** (Permuted Choice 2) wählt aus den rotierten Hälften 48 Bit als Rundenschlüssel k_i aus.

Ein Detail, das die Entschlüsselung möglich macht: Die Gesamtzahl der Rotationen ist 4×1 + 12×2 = 28 ⇒ **C_0 = C_16 und D_0 = D_16**. Der Schlüsselfahrplan „schließt sich" also zum Kreis.

> **Eselsbrücke (Rotationen):** nur **1 Bit** in den Runden **1, 2, 9, 16** — sonst immer **2 Bit**. Die vier „Einer" plus zwölf „Zweier" ergeben 28 = volle Runde ⇒ am Ende ist man wieder am Anfang (C_0 = C_16). Ein tafelartiger Durchgang der ganzen Struktur ist [Neso Academy](https://www.youtube.com/watch?v=8l9xAvuGJFo).

## Entschlüsselung & das Ende von DES

Dank Feistel ist die **Entschlüsselung dieselbe Operation** — nur der Schlüsselfahrplan läuft rückwärts (rechts statt links rotieren), sodass die Rundenschlüssel in umgekehrter Reihenfolge k_16, k_15, …, k_1 verwendet werden.

Abschließende Bewertung:

- **Mathematisch ist DES robust** — keine praktikablen Schwächen, die S-Boxen sind gut gewählt.
- **Aber der Schlüssel ist zu kurz:** 56 Bit lassen sich heute per Brute-Force in Stunden durchsuchen.
- **Lösung Triple-DES (3DES):** drei DES-Operationen hintereinander (Encrypt-Decrypt-Encrypt), **112 Bit effektive** Schlüssellänge. Deshalb steckt DES/3DES bis heute z. B. in EC-Karten.
- **Nachteile:** in Software ineffizient (3DES dreimal langsamer), kleine 64-Bit-Blockgröße, und nicht quantensicher.

## Auf den Punkt

Die Kurzfassung: DES ist eine Blockchiffre mit 64-Bit-Blöcken, 56-Bit-Schlüssel und 16 Runden. Jede Runde mischt die zwei Shannon-Zutaten — Konfusion (Verschleiern des Schlüssel-Chiffrat-Zusammenhangs, via S-Boxen) und Diffusion (Streuen eines Klartextbits auf viele Chiffratbits, via Expansion und Permutation). Der Trick, der alles zusammenhält, ist die Feistel-Struktur: L_i = R_{i−1}, R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) — dadurch ist Entschlüsseln dieselbe Operation, nur der Schlüsselfahrplan läuft rückwärts. Im Inneren der f-Funktion stecken Expansion, XOR mit dem Rundenschlüssel, die nichtlinearen S-Boxen und eine Permutation. Mathematisch ist DES robust, aber der 56-Bit-Schlüssel ist heute per Brute-Force in Stunden zu knacken — deshalb Triple-DES mit 112 Bit effektiver Länge.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Blockchiffre** | verschlüsselt feste Blöcke (DES: 64 Bit) |
| **Konfusion** | Zusammenhang Schlüssel↔Chiffrat verschleiern (S-Boxen) |
| **Diffusion** | ein Klartextbit auf viele Chiffratbits streuen (Permutation) |
| **Feistel-Struktur** | L_i = R_{i−1}, R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) |
| **f-Funktion** | E → XOR k_i → S-Boxen → P |
| **S-Box** | 6→4 Bit, nichtlinear, kryptografischer Kern |
| **Avalanche-Effekt** | nach Runde 5 hängt jedes Bit von allem ab |
| **IP / IP⁻¹** | Eingangs-/Ausgangspermutation (zueinander invers) |
| **PC-1 / PC-2** | Schlüsselfahrplan: 64→56 Bit / Auswahl 48-Bit-Rundenschlüssel |
| **Triple-DES** | EDE, 112 Bit effektiv |

## Typische Fallen

- **DES-Schlüssel: 64 oder 56 Bit?** Eingegeben 64, *effektiv* 56 — 8 Paritätsbits fallen in PC-1 weg.
- **S-Boxen = Diffusion? Nein.** S-Boxen liefern **Konfusion** (nichtlinear). Diffusion kommt von Expansion und Permutation.
- **Feistel braucht eine umkehrbare f-Funktion? Nein** — gerade nicht. Der Witz ist, dass f beliebig sein darf.
- **DES ist „geknackt"?** Nicht mathematisch — es ist nur der *Schlüssel zu kurz* (Brute-Force).
- **3DES = dreifacher Schlüssel = 168 Bit Sicherheit?** Effektiv nur **112 Bit** (Meet-in-the-Middle), und EDE, nicht EEE.

## Klausur-Fokus

Das DES-Übungsblatt zeigt sehr klar, was abgefragt wird — und das ist eine Mischung aus Wissen und Zeichnen/Rechnen. Du solltest **ein Feistelnetzwerk skizzieren** können (mindestens zwei Runden, mit IP, der Aufteilung in L und R, der f-Funktion und dem Tausch) und die **Feistel-Gleichungen** L_i = R_{i−1} und R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) auswendig anwenden, vorwärts wie rückwärts. Du musst **Konfusion und Diffusion** definieren *und* sagen, welche Bausteine von DES sie umsetzen (Konfusion = S-Boxen; Diffusion = Expansion + Permutation), sowie die Geschichte der **Schlüssellänge** parat haben (ursprünglich 128 Bit, von der NSA auf 56 Bit effektiv reduziert). Ein beliebter Rechenpunkt ist die **Nichtlinearität der S-Boxen**: An konkreten 6-Bit-Eingaben zeigen, dass S(x1) ⊕ S(x2) ≠ S(x1 ⊕ x2) ist (S-Box nachschlagen, beide Seiten ausrechnen, Ungleichheit zeigen). Dazu solltest du die **vier Schritte der f-Funktion** und den **Avalanche-Effekt** erklären, den **Schlüsselfahrplan** (PC-1 → Rotation → PC-2, C_0 = C_16) skizzieren und begründen, warum DES unsicher ist und wie 3DES (EDE, 112 Bit) das mildert. Als Bonus tauchen die **schwachen Schlüssel** auf (Subkeys, die alle gleich sind → Ver- und Entschlüsselung identisch; es gibt 4 davon).

## Mehr dazu

- **Computerphile — Feistel Cipher** (EN): die Feistel-Idee anschaulich erklärt — warum Ver- und Entschlüsselung gleich sind. https://www.youtube.com/watch?v=FGhj3CGxl8I
- **Neso Academy — Feistel Cipher Structure** (EN): ruhiger, tafelartiger Durchgang der Struktur und Designparameter. https://www.youtube.com/watch?v=8l9xAvuGJFo
- **DES-Zusatzmaterial (Wikipedia): IP, E, S-Boxen, P als Tabellen** — gut zum Nachschlagen beim Üben. https://en.wikipedia.org/wiki/DES_supplementary_material`,
  },
};

const lecture04: Explanation = {
  id: "cs-2025-l04",
  lesson: 4,
  title: {
    de: "AES, Betriebsmodi und der Einstieg in die asymmetrische Kryptografie",
  },
  content: {
    de: `Zwei große Themen treffen hier aufeinander. Erst der Nachfolger von DES — **AES**, das heute den Großteil der Welt verschlüsselt und anders gebaut ist (Schichten statt Feistel). Dann ein Bruch: Symmetrische Verfahren haben ein Problem, das keine noch so gute Chiffre löst — *wie tauschen Alice und Bob überhaupt den Schlüssel aus?* Die Antwort ist die **asymmetrische Kryptografie**, die hier vorbereitet wird. Dazwischen die praktische Frage, wie man Nachrichten verschlüsselt, die länger als ein Block sind (Betriebsmodi).

## AES: vier Schichten statt Feistel

Nach einem öffentlichen Wettbewerb (1997 ausgeschrieben, 5 Finalisten, 2000 gewinnt **Rijndael**) wurde AES der Standard. Unterschiede zu DES auf einen Blick:

| | DES | AES |
|---|---|---|
| Blockgröße | 64 Bit | **128 Bit** |
| Schlüssel | 56 Bit | 128 / 192 / 256 Bit |
| Runden | 16 | **10 / 12 / 14** |
| Struktur | Feistel (halbe Hälfte/Runde) | **Schichten** (ganze 128 Bit/Runde) |
| arbeitet auf | Bits | **Bytes** |

AES verschlüsselt in jeder Runde den **kompletten** Block über aufeinanderfolgende Schichten. Die Anzahl der Runden hängt von der Schlüssellänge ab (128→10, 192→12, 256→14).

## Die vier Schichten einer AES-Runde

Man stellt den 16-Byte-Block als 4×4-Matrix („State") vor. Eine Runde wendet vier Schichten an:

1. **SubBytes (Byte-Substitution):** jedes Byte durch die **S-Box** ersetzen. Anders als bei DES gibt es nur *eine* S-Box (8 Bit rein, 8 Bit raus), und sie ist keine Zufallstabelle, sondern eine mathematische Operation über dem endlichen Körper GF(2^8) (Inverse + affine Abbildung). Das ist das **einzige nichtlineare** Element → liefert **Konfusion**.
2. **ShiftRows:** die Zeilen der Matrix zyklisch verschieben (Zeile 2 um 1, Zeile 3 um 2, Zeile 4 um 3) → **Diffusion**.
3. **MixColumns:** jede Spalte mit einer festen 4×4-Matrix multiplizieren → **Diffusion**. Zusammen sorgen ShiftRows + MixColumns dafür, dass nach **2 Runden** jedes Byte von *allen 16* Klartext-Bytes abhängt.
4. **AddRoundKey (Key-Addition):** die State-Matrix mit dem Rundenschlüssel XOR-verknüpfen.

Zwei Feinheiten: AES nutzt **Key Whitening** — ein zusätzliches AddRoundKey ganz am Anfang (vor Runde 1) und am Ende. Und die **letzte Runde lässt MixColumns weg**. Der **Schlüsselfahrplan** ist wortbasiert (1 Wort = 32 Bit): eine nichtlineare g-Funktion (Rotation + S-Box + Rundenkonstante) erzeugt rekursiv die Rundenschlüssel. AES ist effizient in Soft- und Hardware (Intel **AES-NI**), und die NSA erlaubt AES-128 für SECRET, AES-192/256 für TOP SECRET. [Spanning Tree animiert die ganze Runde sehr klar](https://www.youtube.com/watch?v=C4ATDMIz5wc); [Computerphile gibt die Idee dahinter](https://www.youtube.com/watch?v=O4xNJsjtN6E).

> **Eselsbrücke (AES-Runde):** **S – S – M – A** = **S**ubBytes → **S**hiftRows → **M**ixColumns → **A**ddRoundKey. Nur das erste **S** (SubBytes) ist nichtlinear (= Konfusion); ShiftRows + MixColumns sind Diffusion. Und: **letzte Runde ohne MixColumns**.

## Betriebsmodi: mehr als einen Block verschlüsseln

DES/AES verschlüsseln nur einen 8- bzw. 16-Byte-Block. Für längere Nachrichten braucht man einen **Betriebsmodus**:

- **ECB (Electronic Codebook):** jeden Block separat verschlüsseln und aneinanderhängen. **Problem: deterministisch** — gleicher Klartextblock → gleicher Chiffratblock. Muster bleiben sichtbar (das berühmte „verschlüsselte Pinguin-Bild"), und ein Angreifer kann Blöcke austauschen. **Nicht benutzen.**
- **CBC (Cipher Block Chaining):** jeder Block wird vor der Verschlüsselung mit dem *vorherigen Chiffrat* XOR-verknüpft: y_i = e_k(x_i ⊕ y_{i−1}); der erste Block nutzt einen **Initialisierungsvektor** IV: y_1 = e_k(x_1 ⊕ IV). Dadurch wird die Verschlüsselung **probabilistisch** — gleicher Klartext liefert (mit anderem IV) anderes Chiffrat.
- **OFB (Output Feedback):** die Blockchiffre erzeugt einen Schlüsselstrom (s_1 = e_k(IV), s_i = e_k(s_{i−1})), der per XOR auf den Klartext gelegt wird — so wird aus einer Blockchiffre eine **Stromchiffre**.

![Tux-Pinguin im ECB-Modus verschlüsselt — die Umrisse bleiben sichtbar](https://commons.wikimedia.org/wiki/Special:FilePath/Tux_ECB.png "Der berühmte ECB-Pinguin: derselbe Klartextblock wird immer gleich verschlüsselt, deshalb bleiben die Muster sichtbar. Genau deshalb ist ECB unsicher.")

> **Eselsbrücke (ECB-Pinguin):** ECB = jeder Block für sich → **gleicher Block, gleiches Chiffrat** → Muster bleiben sichtbar. Wenn du den Pinguin noch erkennst, ist es ECB. **CBC/OFB** würfeln das per IV durch.

### Schritt für Schritt: ECB und CBC rechnen

Genau so kommt es im Übungsblatt. Nimm eine winzige Blockchiffre mit 5-Bit-Blöcken, die die Bits nur umsortiert: e(b₁b₂b₃b₄b₅) = (b₂b₅b₄b₁b₃). Klartext x = **01101 11011 …**, und für CBC/OFB ist IV = **11001**.

**ECB** verschlüsselt jeden Block einzeln. Erster Block 01101: hier ist b₁=0, b₂=1, b₃=1, b₄=0, b₅=1, also e(01101) = (b₂,b₅,b₄,b₁,b₃) = (1,1,0,0,1) = **11001**. Fertig — bei ECB hängt nichts vom Nachbarblock ab.

**CBC** verkettet: Vor dem Verschlüsseln wird der Block mit dem vorherigen Chiffrat (beim ersten mit dem IV) ge-XOR-t. Also erst x₁ ⊕ IV = 01101 ⊕ 11001 = **10100**, dann durch die Chiffre: e(10100) hat b₁=1, b₂=0, b₃=1, b₄=0, b₅=0, ergibt (0,0,0,1,1) = **00011**. Das ist y₁. Für den zweiten Block rechnest du x₂ ⊕ y₁, dann e(…) — die Verkettung sorgt dafür, dass identische Klartextblöcke *unterschiedliche* Chiffrate bekommen.

## Warum symmetrisch nicht reicht: das Schlüsselaustauschproblem

So stark AES ist — symmetrische Verfahren haben drei eingebaute Schwächen:

1. **Schlüsselaustauschproblem:** Der Kanal, über den die Nachricht läuft (das Internet), darf nicht für den Schlüssel benutzt werden — sonst hört Oskar ihn mit. Wie tauscht man also den geheimen Schlüssel sicher aus?
2. **Anzahl der Schlüssel:** Für jedes Paar von Partnern braucht es einen eigenen Schlüssel — bei n Teilnehmern wächst das quadratisch.
3. **Keine Nichtabstreitbarkeit (Non-Repudiation):** Weil beide denselben Schlüssel haben, kann man nicht beweisen, *wer* eine Nachricht erzeugt hat.

## Asymmetrische Kryptografie: Einwegfunktionen und der öffentliche Briefkasten

Die Lösung (1976 von Diffie, Hellman, Merkle veröffentlicht; RSA 1977; Großbritanniens GCHQ kannte das Prinzip schon 1972 geheim): ein **Schlüsselpaar** (k_pub, k_pr). Die zentrale, anfangs verblüffende Eigenschaft: **Der Schlüssel zum Verschlüsseln ist nicht geheim.** Bild dazu: ein **öffentlicher Briefkasten** — jeder kann etwas einwerfen (mit dem öffentlichen Schlüssel verschlüsseln), aber nur der Besitzer mit dem privaten Schlüssel kann ihn leeren (entschlüsseln).

![Asymmetrische Verschlüsselung: öffentlicher Schlüssel verschlüsselt, privater entschlüsselt](https://commons.wikimedia.org/wiki/Special:FilePath/Public_key_encryption.svg "Asymmetrisch: Bob verschlüsselt mit Alices öffentlichem Schlüssel, nur Alice entschlüsselt mit ihrem privaten. Der öffentliche Briefkasten in einem Bild.")

> **Eselsbrücke (öffentlich vs. privat):** **Verschlüsseln mit öffentlich, entschlüsseln mit privat** — wie ein Briefkasten: einwerfen kann jeder, leeren nur der Besitzer. Warum das mathematisch geht (Einwegfunktion), zeigt [Computerphile](https://www.youtube.com/watch?v=GSIDS_lvRv4).

Damit das geht, braucht jedes asymmetrische Verfahren eine **Einwegfunktion**: y = f(x) leicht zu berechnen, x = f⁻¹(y) praktisch unmöglich. Die beiden in der Praxis:

- **Faktorisierung großer Zahlen** → RSA (Vorlesung 5).
- **Diskreter Logarithmus** → Diffie-Hellman und Elliptische Kurven.

Es gibt nur **drei große Familien**: RSA, Diffie-Hellman, Elliptische Kurven. Ein Haken: asymmetrische Verfahren sind **viel langsamer** als symmetrische. Deshalb nutzt man in der Praxis **Hybridprotokolle** (SSL/TLS): asymmetrisch *nur* zum Austausch eines symmetrischen Sitzungsschlüssels, danach symmetrisch weiter. Und weil die Mathematik mit riesigen Zahlen rechnet, brauchen asymmetrische Schlüssel viel mehr Bits für dieselbe Sicherheit:

| symmetrisch | Elliptische Kurven | RSA / Diffie-Hellman |
|---|---|---|
| 64 Bit | 128 Bit | 700 Bit |
| 128 Bit | 256 Bit | 3072 Bit |

## Auf den Punkt

Die Kurzfassung: AES löste DES ab und ist anders gebaut — 128-Bit-Blöcke, Schlüssel 128/192/256 Bit, 10/12/14 Runden, und statt Feistel arbeitet es mit vier Schichten, die jede Runde den ganzen Block bearbeiten: SubBytes (die einzige nichtlineare, sorgt für Konfusion), ShiftRows und MixColumns (Diffusion) und AddRoundKey (Schlüssel einbringen). Weil eine Chiffre nur einen Block fasst, braucht man für längere Nachrichten einen Betriebsmodus: ECB (deterministisch, deshalb unsicher — der Pinguin bleibt sichtbar), CBC (verkettet jeden Block per XOR mit dem vorherigen Chiffrat plus IV) oder OFB (macht aus der Blockchiffre eine Stromchiffre). Symmetrische Verfahren stoßen aber an drei Grenzen — Schlüsselaustausch, quadratisch viele Schlüssel, keine Nichtabstreitbarkeit — und genau die löst die asymmetrische Kryptografie mit einem öffentlich/privaten Schlüsselpaar und einer Einwegfunktion (Faktorisierung bei RSA, diskreter Logarithmus bei Diffie-Hellman/ECC). In der Praxis kombiniert man beides hybrid (TLS).

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **AES / Rijndael** | Schicht-Blockchiffre, 128-Bit-Block, 10/12/14 Runden |
| **State** | 4×4-Byte-Matrix, auf der AES arbeitet |
| **SubBytes** | S-Box-Ersetzung; einziges nichtlineares Element (Konfusion) |
| **ShiftRows / MixColumns** | Zeilen verschieben / Spalten mischen (Diffusion) |
| **AddRoundKey** | XOR mit Rundenschlüssel |
| **Key Whitening** | XOR mit Schlüssel am Anfang und Ende |
| **ECB / CBC / OFB** | Betriebsmodi (deterministisch / verkettet / strom-artig) |
| **IV** | Initialisierungsvektor (macht Modus probabilistisch) |
| **Einwegfunktion** | leicht vorwärts, praktisch unmöglich rückwärts |
| **Hybridprotokoll** | asymmetrischer Schlüsseltausch + symmetrische Daten (TLS) |
| **Non-Repudiation** | Nichtabstreitbarkeit (nur asymmetrisch möglich) |

## Typische Fallen

- **AES ist eine Feistel-Chiffre? Nein** — AES nutzt Schichten und verschlüsselt jede Runde den ganzen Block; DES ist Feistel.
- **ECB ist okay für kurze Daten? Nein** — die Determiniertheit ist *immer* ein Problem; ECB nie für echte Daten verwenden.
- **AES hat 8 S-Boxen wie DES? Nein** — AES hat genau **eine** S-Box (mathematisch, GF(2^8)).
- **Asymmetrisch ersetzt symmetrisch?** Nein — es ist langsamer; in der Praxis *hybrid* (TLS).
- **Gleiche Bitlänge = gleiche Sicherheit?** Nein — 128-Bit-symmetrisch ≈ 3072-Bit-RSA. Schlüssellängen *nicht* zwischen den Welten vergleichen.

## Klausur-Fokus

Das Übungsblatt zeigt: Hier wird vor allem **mit den Betriebsmodi gerechnet**. Du bekommst eine kleine Blockchiffre (z. B. eine 5-Bit-Permutation) und sollst eine mehrteilige Nachricht in **ECB, CBC und OFB** verschlüsseln — also musst du die Formeln sicher anwenden: ECB Block für Block, CBC mit y_i = e_k(x_i ⊕ y_{i−1}) und dem IV für den ersten Block, OFB mit dem aus dem IV erzeugten Schlüsselstrom. Erkläre dazu, warum **ECB unsicher** ist (Muster bleiben sichtbar) und wozu der **IV** dient. Zweiter großer Rechenblock ist die **Anzahl der Schlüssel** in einem Unternehmen: rein symmetrisch braucht man für n Personen n·(n−1)/2 Schlüssel, asymmetrisch nur n Schlüsselpaare — das illustriert das Schlüsselaustauschproblem in Zahlen. Dazu kommt eine **Performance-Rechnung** (AES ist 100–1000× schneller als RSA → daher hybrid) und der **Vergleich symmetrisch vs. asymmetrisch** mit Vor- und Nachteilen. Auf der Wissensseite: die **vier AES-Schichten** in Reihenfolge (nur SubBytes nichtlinear, letzte Runde ohne MixColumns), **DES vs. AES** gegenüberstellen und die **Einwegfunktion** definieren (Faktorisierung, diskreter Logarithmus; Familien RSA/DH/ECC).

## Mehr dazu

- **Computerphile — AES Explained** (EN, Mike Pound): die AES-Idee und ihre Schichten anschaulich. https://www.youtube.com/watch?v=O4xNJsjtN6E
- **Spanning Tree — AES: How to Design Secure Encryption** (EN): von Konfusion/Diffusion zur kompletten Runde, sehr klar animiert. https://www.youtube.com/watch?v=C4ATDMIz5wc
- **Computerphile — Public Key Cryptography** (EN): warum ein „öffentlicher" Schlüssel funktioniert — die Intuition hinter Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4`,
  },
};

const lecture05: Explanation = {
  id: "cs-2025-l05",
  lesson: 5,
  title: {
    de: "Das RSA-Kryptosystem: Schlüsselerzeugung, Verschlüsselung und Square-and-Multiply",
  },
  content: {
    de: `RSA ist das erste konkrete asymmetrische Verfahren und das wahrscheinlich klausurrelevanteste Rechenthema des Kurses. Die Folien werfen viele Formeln auf einmal — der rote Faden ist einfach: Aus zwei Primzahlen baut man ein Schlüsselpaar, verschlüsselt mit einer Potenz modulo n und entschlüsselt mit der „Gegen-Potenz". Die Sicherheit lebt davon, dass man n nicht in seine Primfaktoren zerlegen kann. Dazu zwei Werkzeuge: der erweiterte Euklidische Algorithmus (für den privaten Schlüssel) und Square-and-Multiply (um große Potenzen überhaupt rechnen zu können).

## Die Grundidee: öffentlich verschlüsseln, privat entschlüsseln

RSA dreht die symmetrische Logik um. Jeder kennt deinen öffentlichen Schlüssel (n, e) und kann dir damit verschlüsselte Nachrichten schicken:

- **Verschlüsselung:** y = e_{k_pub}(x) ≡ x^e mod n
- **Entschlüsselung:** x = d_{k_pr}(y) ≡ y^d mod n

Beide Operationen sind „Zahl hoch Exponent, modulo n". Der Clou: e und d sind so gewählt, dass das Hoch-d das Hoch-e genau rückgängig macht — aber nur, wer d kennt, kann entschlüsseln. Und d aus dem öffentlichen (n, e) zu berechnen, würde bedeuten, n zu faktorisieren.

## RSA-Schlüsselerzeugung in 5 Schritten

### Schritt für Schritt

1. **Wähle zwei große Primzahlen p und q.** (Der aufwändigste Schritt.)
2. **Berechne n = p · q.** Dieses n ist Teil des öffentlichen Schlüssels (der „Modul").
3. **Berechne φ(n) = (p − 1)(q − 1)** (Eulers Phi-Funktion, siehe unten).
4. **Wähle den öffentlichen Exponenten e ∈ {1, …, φ(n) − 1} mit ggT(e, φ(n)) = 1** (e und φ(n) teilerfremd).
5. **Berechne den privaten Schlüssel d mit d · e ≡ 1 mod φ(n)** — d ist also das **modulare Inverse** von e.

Öffentlich wird (n, e), geheim bleiben d (und p, q, φ(n)).

**Komplett durchgerechnet (kleine Zahlen, genau wie in der Klausur):**

1. p = 3, q = 11
2. n = 3 · 11 = **33**
3. φ(n) = (3−1)(11−1) = 2 · 10 = **20**
4. e = 3 wählen — ggT(3, 20) = 1 ✓
5. d mit 3 · d ≡ 1 (mod 20) → d = **7** (denn 3 · 7 = 21 ≡ 1 mod 20)

Öffentlicher Schlüssel (33, 3), privater 7. **Verschlüsseln** von x = 4: y = 4³ mod 33 = 64 mod 33 = **31**. **Entschlüsseln**: 31⁷ mod 33 = 4 (Trick: 31 ≡ −2 mod 33, also (−2)⁷ = −128 ≡ 4). Es kommt wieder der Klartext heraus.

> **Eselsbrücke (5 Schritte):** **p, q → n → φ → e → d.** Erst zwei Primzahlen, ihr Produkt n, daraus φ = (p−1)(q−1), dann ein e mit ggT(e, φ) = 1, und zum Schluss d als Inverse von e mod φ. Genau diese Kette an kleinen Zahlen rechnest du in der Klausur. [Practical Networking](https://www.youtube.com/watch?v=Pq8gNbvfaoM) und [Eddie Woo](https://www.youtube.com/watch?v=4zahvcJ9glg) rechnen je ein Beispiel komplett vor.

Zu den Schritten: **Schritt 1** ist der teuerste — man sucht mit einem RNG zufällige (z. B. 1024-Bit-)Zahlen und testet sie mit einem **Primzahltest** (z. B. Fermat), bis eine Primzahl gefunden ist. **Schritt 2** verdoppelt grob die Bitlänge (1024 × 1024 Bit → ~2048 Bit), und genau diese Größe macht die Faktorisierung von n unmöglich.

## Warum es funktioniert: Eulers Phi & der EEA

**Eulers Phi-Funktion φ(n)** zählt, wie viele Zahlen kleiner n teilerfremd zu n sind. Zwei Regeln, die alles tragen:

- Ist n prim, dann φ(n) = n − 1 (z. B. φ(7) = 6).
- Sind p, q prim, dann φ(p·q) = φ(p)·φ(q) = (p − 1)(q − 1).

Der Witz: φ(n) lässt sich *nur* leicht berechnen, wenn man p und q kennt. Ein Angreifer hat nur n — und ohne φ(n) kein d.

Schritt 4 und 5 erledigt man zusammen mit dem **erweiterten Euklidischen Algorithmus (EEA)**. Er berechnet zu zwei Zahlen nicht nur den ggT, sondern auch Koeffizienten s, t mit:

> ggT(φ(n), e) = s · φ(n) + t · e

Ist dieser ggT = 1, ist e gültig — und der private Schlüssel **d entspricht t** (dem Inversen von e modulo φ(n)). Der EEA läuft iterativ: in jedem Schritt r_i = r_{i−2} mod r_{i−1}, q_{i−1} = (r_{i−2} − r_i)/r_{i−1}, und s, t werden rekursiv mitgeführt, bis der Rest 0 ist.

## Square-and-Multiply: große Potenzen schnell rechnen

Problem: x^e mod n mit 1024-Bit-Exponenten naiv auszurechnen bräuchte astronomisch viele Multiplikationen (≈ 10^300). **Square-and-Multiply** schafft es mit nur ~1,5 · (Bitlänge) Operationen, indem es die **Binärdarstellung des Exponenten** abarbeitet — vom höchstwertigen Bit (MSB) zum niedrigstwertigen (LSB):

- Beim MSB: Basis einfach übernehmen.
- Bei jedem weiteren Bit: **immer quadrieren**; ist das Bit **1**, zusätzlich **mit der Basis multiplizieren**.
- Nach jedem Schritt **modulo n reduzieren** (klein rechnen, wie in Vorlesung 2 gelernt).

So wird aus einer unmöglich großen Rechnung eine, die ein Computer in Millisekunden erledigt.

> **Eselsbrücke (Square-and-Multiply):** Lies den Exponenten **binär von links**. **Bit 0 → nur Quadrieren (Q)**. **Bit 1 → Quadrieren *und* Multiplizieren (QM)**. Schreib einfach für jedes Bit Q oder QM untereinander — fertig ist der Rechenweg.

## Textbook-RSA ist gefährlich: Determinismus & der ×2-Angriff

„Textbook-RSA" (genau die obige Formel ohne Zusätze) hat zwei Schwächen:

- **Deterministisch:** gleicher Klartext → immer gleiches Chiffrat. Ein Angreifer erkennt Wiederholungen.
- **Manipulierbar (malleable):** Oskar sieht das Chiffrat y, berechnet 2^e mod n und multipliziert: y · 2^e mod n. Beim Entschlüsseln kommt **2 · x** heraus — Oskar hat den Klartext gezielt verändert, ohne ihn zu kennen.

Die Lösung ist **Padding**: Vor dem Verschlüsseln werden **zufällige Daten** in den Klartext eingebaut. Das macht RSA probabilistisch und zerstört die Manipulierbarkeit. Weitere Angriffsflächen: schnellere Faktorisierungsalgorithmen (gibt es, aber für große n weiterhin chancenlos — historisch: die RSA-129-Challenge) und **Seitenkanalangriffe** (der Stromverbrauch bei Square-and-Multiply kann d verraten). Und: AES ist **100–1000-mal schneller** als RSA — daher RSA nur für den Schlüsseltausch, nicht für Massendaten.

## Auf den Punkt

Die Kurzfassung: RSA ist das erste konkrete asymmetrische Verfahren. Der öffentliche Schlüssel ist (n, e), der private d; verschlüsselt wird mit y = x^e mod n, entschlüsselt mit x = y^d mod n. Den Schlüssel erzeugst du in fünf Schritten: zwei große Primzahlen p, q wählen → n = p·q → φ(n) = (p−1)(q−1) → ein e mit ggT(e, φ(n)) = 1 → d als Inverse von e modulo φ(n). Die Sicherheit ruht allein darauf, dass man n nicht in p und q zerlegen kann (Faktorisierungsproblem); kennt man φ(n) nicht, gibt es kein d. Zwei Werkzeuge machen RSA praktikabel: der erweiterte Euklidische Algorithmus liefert d, und Square-and-Multiply macht die riesigen Potenzen überhaupt berechenbar. Und Vorsicht: „Textbook-RSA" ohne Padding ist deterministisch und manipulierbar — die Praxis braucht Padding.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **(n, e)** | öffentlicher Schlüssel (Modul + Exponent) |
| **d** | privater Schlüssel; d ≡ e⁻¹ mod φ(n) |
| **n = p·q** | Produkt zweier großer Primzahlen |
| **φ(n)** | Eulers Phi; φ(p·q) = (p−1)(q−1) |
| **ggT(e, φ(n)) = 1** | e und φ(n) teilerfremd (Bedingung für e) |
| **EEA** | erweiterter Euklid: liefert ggT und das Inverse d |
| **Square-and-Multiply** | schnelle modulare Exponentiation über die Bits von e |
| **Textbook-RSA** | RSA ohne Padding — deterministisch & manipulierbar |
| **Padding** | zufällige Daten im Klartext → probabilistisch & sicher |

## Typische Fallen

- **φ(n) = n − 1? Nur wenn n prim ist.** Bei RSA ist n = p·q, also φ(n) = (p−1)(q−1).
- **e frei wählbar? Fast** — aber es muss ggT(e, φ(n)) = 1 gelten, sonst existiert kein d.
- **d aus n und e leicht berechenbar?** Nur wenn man φ(n) kennt — und das setzt die Faktorisierung von n voraus (genau das ist hart).
- **Modulo erst am Ende anwenden?** Nein — bei Square-and-Multiply nach *jedem* Schritt reduzieren, sonst werden die Zahlen riesig.
- **Textbook-RSA ist sicher genug?** Nein — ohne Padding deterministisch und durch den ×2-Trick manipulierbar.

## Klausur-Fokus

RSA ist *das* Rechenthema des Kurses, und das Übungsblatt macht genau das vor: ein komplettes **RSA-Beispiel mit kleinen Zahlen** durchrechnen. Übe das, bis es sitzt — die fünf Schritte der Schlüsselerzeugung (p, q → n → φ(n) → e mit ggT(e, φ(n)) = 1 → d mit e·d ≡ 1 mod φ(n)), dann eine Nachricht (oft Buchstaben über die A=0…Z=25-Tabelle) mit y = x^e mod n **verschlüsseln und mit x = y^d mod n wieder entschlüsseln**, zur Probe. Du musst sicher sagen können, welches Zahlenpaar der **öffentliche** und welches der **private** Schlüssel ist (öffentlich (n, e), privat (n, d)), **φ(n)** korrekt bilden, ein gültiges **e** prüfen (teilerfremd zu φ(n), e < φ(n)) und **d per EEA** bestimmen. Für große Exponenten gehört **Square-and-Multiply** dazu (Binärexponent von links, Bit 0 → quadrieren, Bit 1 → quadrieren und multiplizieren, nach jedem Schritt mod reduzieren). Auf der Verständnisseite: erklären, warum die **Faktorisierung** die Sicherheit trägt und warum **Textbook-RSA** (deterministisch, ×2-Manipulation) **Padding** braucht.

## Mehr dazu

- **Practical Networking — RSA Algorithm, mit Beispiel** (EN): komplette Schlüsselerzeugung und Ver-/Entschlüsselung an Zahlen vorgerechnet. https://www.youtube.com/watch?v=Pq8gNbvfaoM
- **Eddie Woo — The RSA Encryption Algorithm (1 of 2: Computing an Example)** (EN): sehr ruhige, kleinschrittige Beispielrechnung. https://www.youtube.com/watch?v=4zahvcJ9glg
- **Art of the Problem — RSA Encryption** (EN): die Intuition (Einwegfunktion/Trapdoor, Euler) hinter RSA. https://www.youtube.com/watch?v=wXB-V_Keiu8
- **Square-and-Multiply — Rechenbeispiel** (aus den Folien verlinkt): https://www.youtube.com/watch?v=cbGB__V8MNk`,
  },
};

const lecture06: Explanation = {
  id: "cs-2025-l06",
  lesson: 6,
  title: {
    de: "Digitale Signaturen, Hash-Funktionen und Message Authentication Codes (MAC)",
  },
  content: {
    de: `Bis jetzt ging es ums Geheimhalten (Vertraulichkeit). Diese Vorlesung dreht sich um die andere Hälfte: *Wer hat das wirklich geschickt, und wurde es unterwegs verändert?* — also Authentizität und Integrität. Das Werkzeug dafür sind digitale Signaturen (asymmetrisch), praktisch gemacht durch Hash-Funktionen, plus deren symmetrischer, schneller Cousin: der MAC.

## Digitale Signaturen: mit dem privaten Schlüssel unterschreiben

Erinnerung aus Vorlesung 4: Symmetrische Verfahren können **keine Nichtabstreitbarkeit** (Non-Repudiation) garantieren — weil beide denselben Schlüssel haben, kann man nicht beweisen, *wer* etwas erzeugt hat. Digitale Signaturen lösen das mit asymmetrischer Kryptografie und drehen die RSA-Logik um:

- **Signieren:** Alice erzeugt s = sig_{kpr}(x) mit ihrem **privaten** Schlüssel und schickt (x, s).
- **Verifizieren:** Bob prüft Verify_{kpub}(s, x) = true/false mit Alices **öffentlichem** Schlüssel.

Nur Alice besitzt kpr, also kann nur sie signieren; jeder kann mit dem öffentlichen Schlüssel prüfen. Das liefert gleichzeitig **Integrität** (geändertes x fällt durch) und **Authentizität/Nichtabstreitbarkeit** (es war nachweislich Alice). Funktioniert mit RSA, Diffie-Hellman und Elliptischen Kurven; hier am Beispiel RSA.

![Digitale Signatur: signieren mit privatem, verifizieren mit öffentlichem Schlüssel](https://commons.wikimedia.org/wiki/Special:FilePath/Digital_Signature_diagram.svg "Signieren mit dem privaten Schlüssel, verifizieren mit dem öffentlichen — das Spiegelbild der Verschlüsselung.")

> **Eselsbrücke (Signatur vs. Verschlüsselung — Spiegelbild!):** **Verschlüsseln: öffentlich → privat.** **Signieren: privat → öffentlich.** Mit dem *privaten* Schlüssel unterschreibst du (kann nur einer), mit dem *öffentlichen* prüft jeder.

Aber: Bisher war Oskar ein *passiver* Lauscher. Jetzt kommt der **aktive** Angreifer — der **Man-in-the-Middle (MITM)**. Er fängt Nachrichten ab und **tauscht öffentliche Schlüssel aus**: Schickt Bob seinen öffentlichen Schlüssel, ersetzt Oskar ihn durch seinen eigenen. Alice signiert/verschlüsselt dann für Oskar, ohne es zu merken.

## Zertifikate & PKI: wem gehört dieser Schlüssel?

Das Grundproblem: Asymmetrische Kryptografie braucht keinen *geheimen*, aber einen **authentisierten** Kanal, um öffentliche Schlüssel zu verteilen — sonst greift der MITM. Lösung: **Zertifikate**. Ein Zertifikat bindet einen öffentlichen Schlüssel an eine Identität, signiert von einer vertrauenswürdigen **Certificate Authority (CA)**:

> Cert_A = [ (kpub_A, ID_A), sig_{kpr_CA}(kpub_A, ID_A) ]

Die öffentlichen Schlüssel der CAs sind bereits im Browser vorinstalliert — daher kann dein Browser jedes Webseiten-Zertifikat prüfen. Das ganze Drumherum (CA + Identitätsprüfung, Rückruf, sichere Verteilung des CA-Schlüssels) heißt **Public-Key-Infrastruktur (PKI)**; das Standardformat ist **X.509** (Seriennummer, Aussteller, Gültigkeit, Inhaber, öffentlicher Schlüssel, Signatur).

## Hash-Funktionen: der digitale Fingerabdruck

Eine **Hash-Funktion h** hat **keinen Schlüssel** und macht aus einem beliebig langen Input einen **Fingerabdruck fester Länge** (typisch 128–512 Bit). Eigenschaften: hohe Effizienz auch bei langen Nachrichten, und der **Avalanche-Effekt** — kleinste Änderung am Input → komplett anderer Hash.

Warum braucht man sie bei Signaturen? Eine Signatur ist auf die Nachrichtenlänge begrenzt (bei RSA-2048 auf ~2048 Bit). Große Nachrichten kann man nicht direkt signieren, und blockweises Signieren wäre viel zu teuer. Lösung: **erst hashen, dann den Hash signieren** — s = sig_{kpr}(h(x)). Bob berechnet h(x) selbst neu und prüft die Signatur dagegen.

## Die drei Sicherheitseigenschaften

Damit das sicher ist, muss h drei Dinge erfüllen:

| Eigenschaft | Ziel | Warum wichtig |
|---|---|---|
| **Urbildresistenz** | aus h(x) lässt sich x **nicht** zurückrechnen | sonst könnte Oskar aus dem signierten Hash den Klartext gewinnen |
| **Schwache Kollisionsresistenz** | zu gegebenem x1 findet man **kein** x2 ≠ x1 mit gleichem Hash (2nd-preimage) | sonst tauscht ein aktiver Angreifer x1 gegen x2 — die alte Signatur bleibt gültig |
| **Starke Kollisionsresistenz** | man findet **gar kein** Paar x1 ≠ x2 mit gleichem Hash | strengste Anforderung; betrifft das **Geburtstagsparadoxon** |

Kollisionen **müssen** existieren (fester Output, unendlich viele Inputs — Schubfachprinzip). Die Frage ist nur, wie schwer man eine findet. Das **Geburtstagsparadoxon** liefert die ernüchternde Antwort: Schon bei 23 Personen ist die Wahrscheinlichkeit zweier gleicher Geburtstage über 50 %. Übertragen auf Hashes: Für einen n-Bit-Ausgang braucht man **nicht** 2^n, sondern nur etwa **2^(n/2)** Nachrichten für eine Kollision. Deshalb wählt man die Ausgabelänge großzügig (128–512 Bit). Wichtigste Familien: die **MD4-Familie** (MD5, SHA-1, SHA-2 — 32-Bit-Operationen, boolesche AND/OR/XOR) und Hashes auf Basis von Blockchiffren; **SHA-3** gehört nicht zur MD4-Familie (anderer interner Aufbau). SHA-1 z. B.: 512-Bit-Blöcke, Kompressionsfunktion, Padding, 160-Bit-Ausgabe. Die [drei Hash-Anforderungen und der Avalanche-Effekt bei Computerphile](https://www.youtube.com/watch?v=b4b8ktEV4Bg); den Avalanche live siehst du in der [SHA-256-Demo](https://andersbrownworth.com/blockchain/hash).

> **Eselsbrücke (Geburtstagsparadoxon):** Kollision finden kostet **nur die halbe Bitzahl** im Exponenten — **2^(n/2)**, nicht 2^n. Merke: ein 256-Bit-Hash gibt nur ~128 Bit Kollisionssicherheit. Deshalb sind Hashes „doppelt so lang" wie die gewünschte Sicherheit.

> **Eselsbrücke (3 Hash-Eigenschaften):** **Urbild** = von h(x) *nicht* auf x zurück. **Schwache Kollision** = zu *gegebenem* x kein zweites finden. **Starke Kollision** = *irgendein* Paar mit gleichem Hash finden (am leichtesten → Geburtstag).

### Schritt für Schritt: Kollisionswahrscheinlichkeit abschätzen

Das Übungsblatt lässt das ausrechnen, und das Ergebnis überrascht jedes Mal. Für N mögliche Hashwerte und k zufällig eingefügte Werte nähert man die Kollisionswahrscheinlichkeit mit **P ≈ 1 − e^(−k(k−1)/2N)**. Beispiel: ein **48-Bit-Adressraum**, also N = 2⁴⁸ ≈ 2,8 · 10¹⁴, und **k = 2,3 · 10⁷** Dateien.

1. Zähler: k(k−1)/2 ≈ k²/2 = (2,3 · 10⁷)² / 2 ≈ 2,6 · 10¹⁴.
2. Exponent: −2,6 · 10¹⁴ / 2,8 · 10¹⁴ ≈ −0,94.
3. P ≈ 1 − e^(−0,94) ≈ 1 − 0,39 ≈ **0,61**, also rund **60 %**.

Über 60 % Kollisionswahrscheinlichkeit bei „nur" 23 Millionen Einträgen in einem 281-Billionen-großen Raum — genau das ist die Wucht des Geburtstagsparadoxons, und genau deshalb wählt man Hashes lieber 256 Bit lang als 128.

## MAC & HMAC: Integrität mit geteiltem Schlüssel

Ein **MAC (Message Authentication Code)** ist eine kryptografische Prüfsumme. Wie Signaturen sichert er Integrität und Authentizität — aber:

- MACs basieren auf **symmetrischer** Kryptografie (ein geteilter Schlüssel k_AB), sind dadurch **deutlich schneller**,
- **aber** sie bieten **keine Nichtabstreitbarkeit** (beide kennen denselben Schlüssel).

Naiv könnte man einen MAC aus einer Hash-Funktion bauen: **Secret-Prefix** m = h(k‖x) oder **Secret-Suffix** m = h(x‖k). Beide haben Schwächen. Beim Secret-Suffix etwa: Findet Oskar eine Kollision h(x) = h(x_O), kann er x gegen x_O tauschen — die Prüfsumme h(x‖k) = h(x_O‖k) bleibt gültig. Deshalb nutzt man **HMAC** (1996, Bellare/Canetti/Krawczyk): sicher, ohne diese Schwächen, robust selbst gegen neue Hash-Angriffe, im Einsatz bei **TLS und IPSec**. Konstruktion (mit gepolstertem Schlüssel k+ und festen Masken ipad = 0x36…, opad = 0x5C…):

> HMAC_k(x) = h( (k+ ⊕ opad) ‖ h( (k+ ⊕ ipad) ‖ x ) )

## Auf den Punkt

Die Kurzfassung: Bei dieser Vorlesung geht es um Integrität und Authentizität statt um Geheimhaltung. Eine digitale Signatur ist das Spiegelbild der Verschlüsselung — man signiert mit dem privaten und verifiziert mit dem öffentlichen Schlüssel; das liefert Integrität, Authentizität und Nichtabstreitbarkeit. Damit niemand per Man-in-the-Middle falsche öffentliche Schlüssel unterschiebt, bindet ein Zertifikat (von einer CA signiert) den Schlüssel an eine Identität (PKI, X.509). Hash-Funktionen sind schlüssellose Fingerabdrücke fester Länge mit Avalanche-Effekt; man signiert immer den Hash, nicht die ganze Nachricht. Ihre drei Sicherheitsziele sind Urbild-, schwache und starke Kollisionsresistenz — und wegen des Geburtstagsparadoxons reichen für eine Kollision ~2^(n/2) statt 2^n Versuche. Der MAC ist das symmetrische, schnellere Gegenstück zur Signatur, bietet aber keine Nichtabstreitbarkeit; der sichere Standard ist HMAC.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **sig_{kpr}(x)** | Signatur über x mit privatem Schlüssel |
| **Verify_{kpub}(s, x)** | Signaturprüfung mit öffentlichem Schlüssel → true/false |
| **Non-Repudiation** | Nichtabstreitbarkeit (nur asymmetrisch) |
| **MITM** | Man-in-the-Middle: aktiver Angreifer tauscht Schlüssel |
| **Zertifikat / CA** | signierte Bindung Schlüssel↔Identität / Aussteller |
| **PKI / X.509** | Infrastruktur / Zertifikatsformat |
| **Hash h(x)** | schlüsselloser Fingerabdruck fester Länge |
| **Avalanche-Effekt** | kleine Inputänderung → ganz anderer Hash |
| **Urbild- / Kollisionsresistenz** | die drei Sicherheitsziele von h |
| **Geburtstagsparadoxon** | Kollision schon bei ~2^(n/2) Versuchen |
| **MAC / HMAC** | symmetrische Prüfsumme / sicherer Hash-MAC |

## Typische Fallen

- **Signieren = Verschlüsseln mit privatem Schlüssel?** Konzeptionell umgekehrt zur Verschlüsselung: **signieren mit privat, prüfen mit öffentlich**. Verschlüsselt wird mit öffentlich, entschlüsselt mit privat.
- **Hash schützt Vertraulichkeit?** Nein — ein Hash ist schlüssellos und nicht umkehrbar; er sichert **Integrität**, nicht Geheimhaltung.
- **n-Bit-Hash = 2^n Kollisionssicherheit?** Nein — wegen des Geburtstagsparadoxons nur **2^(n/2)**.
- **MAC liefert Nichtabstreitbarkeit?** Nein — das kann nur eine **Signatur** (asymmetrisch). MAC = nur Integrität/Authentizität.
- **Secret-Prefix/Suffix-MAC ist sicher?** Nein — beide haben bekannte Schwächen; nimm **HMAC**.

## Klausur-Fokus

Das Übungsblatt zeigt zwei praktische Schwerpunkte. Erstens **Hashing rund ums Geburtstagsparadoxon**: Du solltest die **Kollisionswahrscheinlichkeit** ausrechnen können — die Näherung 1 − e^(−k(k−1)/2N) für k eingefügte Werte bei N möglichen Hashwerten (z. B. „wie wahrscheinlich ist eine Kollision bei 2,3·10⁷ Dateien und 48-Bit-Adressraum?") — und allgemein begründen, warum eine Kollision schon bei ~2^(n/2) Versuchen droht. Zweitens **Passwort-Hashing**: erklären, warum man Passwörter niemals im Klartext, sondern als Hash speichert, was ein **Rainbow-Table-Angriff** ist und wie **Salting** ihn verhindert (jeder Hash bekommt einen zufälligen Salt, sodass vorerzeugte Tabellen nutzlos werden). Auf der Wissensseite: den **Signatur-Ablauf** (signieren mit kpr, prüfen mit kpub) erklären und gegen Verschlüsselung abgrenzen, den **MITM auf den Schlüsselaustausch** schildern und wie **Zertifikate/CA** ihn verhindern, warum man **erst hasht, dann signiert**, die **drei Hash-Eigenschaften** mit je einem Angriffsszenario, und **MAC vs. Signatur** (symmetrisch/asymmetrisch, Geschwindigkeit, Non-Repudiation) inklusive der Schwäche des Secret-Suffix-MAC und warum **HMAC** sie behebt.

## Mehr dazu

- **Computerphile — Hashing Algorithms and Security** (EN): drei Anforderungen an Hashes, Avalanche-Effekt, warum Kollisionen gefährlich sind. https://www.youtube.com/watch?v=b4b8ktEV4Bg
- **Practical Networking — Hashing, Algorithms, and Collisions** (EN): Digest, Kollisionen und die SHA-Familie sauber erklärt. https://www.youtube.com/watch?v=HHQ2QP_upGM
- **SHA-256-Live-Demo** (aus den Folien): tippe Text und beobachte, wie sich der Hash bei jeder Änderung komplett ändert. https://andersbrownworth.com/blockchain/hash`,
  },
};

const lecture07: Explanation = {
  id: "cs-2025-l07",
  lesson: 7,
  title: {
    de: "Kryptowährungen: wie Bitcoin aus Hashes ein dezentrales Geldsystem baut",
  },
  content: {
    de: `Bitcoin ist die große Anwendung der bisherigen Krypto-Bausteine: Hash-Funktionen und digitale Signaturen werden hier zu einem Geldsystem **ohne Bank** zusammengesetzt. Die zentrale Frage der Vorlesung: Wie verhindert man ohne zentrale Vertrauensinstanz, dass jemand dasselbe Geld zweimal ausgibt (Double-Spending) — und wer darf überhaupt neues Geld erzeugen? Die Antworten heißen Blockchain, Distributed Consensus und Proof-of-Work.

## Das Grundproblem: digitales Geld ohne Bank

Klassisches Buchgeld (Kreditkarte, PayPal) ist **zentralisiert**: Man vertraut einer dritten Partei, und nichts ist anonym. Bargeld ist **dezentral**, anonym und offline. Bitcoin will das Beste übertragen: ein **dezentrales Peer-to-Peer-Netz**, allerdings nur **pseudonym** (nicht perfekt anonym) und im Regelfall online. Die drei Forschungsprobleme: **Anonymität**, ein wirklich **dezentrales** System, und das **Double-Spending-Problem** — denn eine digitale Münze ist nur eine Datei, die man kopieren könnte. Vorarbeiten dazu gab es lange (Byzantinische Generäle 1980, Chaums Ecash 1989, Haber/Stornettas Zeitstempel-Log 1991, Merkles Hash-Baum 1979).

## Hash Pointer & Blockchain

Ein **Pointer** zeigt auf einen Datenbereich. Ein **Hash Pointer** zeigt nicht nur dorthin, sondern enthält zusätzlich den **Hash** dieses Bereichs — man kann also prüfen, ob die Daten verändert wurden. Eine **Blockchain** ist wie eine verkettete Liste, bei der jeder „prev"-Zeiger ein Hash Pointer auf den Vorgängerblock ist (ein **manipulationssicheres Log**).

Der Clou steckt darin, dass die Hash-Berechnung **alle** Daten eines Blocks umfasst — die Transaktionen *und* den prev-Hash. Will Eve eine alte Transaktion in Block 10 fälschen, ändert sich dessen Hash, also auch der prev-Eintrag in Block 11, dessen Hash, und so weiter: Sie müsste **alle folgenden Blöcke neu berechnen**. Solange der oberste (neueste) Hash sicher bekannt ist, fällt jede Änderung auf. So entsteht eine beliebig lange Kette zurück bis zum **Genesis Block**.

## Merkle-Bäume

Ralph Merkle (1979) ersann den **Hash-Baum**: ein Binärbaum aus Hash-Pointern, dessen Wurzel die **Merkle Root** ist. Vorteil gegenüber der reinen Kette: Man kann **effizient beweisen, dass ein Element enthalten ist** (Proof of Membership), ohne alle Daten zu prüfen — man braucht nur den Pfad von der Wurzel zum Blatt.

![Merkle-Baum: Datenblätter werden paarweise gehasht bis zur Merkle Root](https://commons.wikimedia.org/wiki/Special:FilePath/Hash_Tree.svg "Merkle-Baum: jedes Blatt wird gehasht, je zwei Hashes werden zusammen weitergehasht — ganz oben die Merkle Root, die alle Daten zusammenfasst.")

> **Eselsbrücke (Merkle-Baum):** Blätter paarweise hochhashen bis zu **einer** Wurzel. Um zu beweisen, dass *ein* Datum drin ist, brauchst du nur **log(n)** Hashes entlang des Pfads — nicht alle Daten. Das ist der „Proof of Membership".

## Identitäten & Bitcoin-Adressen

In Bitcoin sind **öffentliche Schlüssel die Identitäten**: Eine korrekt signierte Nachricht kann nur vom Besitzer des passenden privaten Schlüssels stammen. Daraus folgt **dezentrales Identity Management** — jeder kann sich beliebig viele Identitäten erzeugen (einfach neue Schlüsselpaare). Weil öffentliche Schlüssel lang sind, leitet man daraus eine kompakte **Bitcoin-Adresse** ab (wie eine IBAN):

> Public Key → SHA-256 → RIPEMD-160 → Präfix 00 → Base58Check → Adresse

## Distributed Consensus & der Double-Spend

Jeder Knoten hat die Blockchain (worüber bereits Konsens besteht) plus einen Pool **ausstehender Transaktionen**. Vereinfachter Konsens-Algorithmus:

1. Neue Transaktionen werden an alle Knoten **gebroadcastet**.
2. Jeder Knoten sammelt sie in einem Block.
3. In jeder Runde teilt ein **zufälliger** Knoten seinen Block mit (das ist die Vereinfachung).
4. Die anderen akzeptieren nur, wenn **alle Transaktionen gültig** sind (Coins noch nicht ausgegeben, Signaturen gültig).
5. Akzeptanz zeigt man, indem man den **Hash dieses Blocks** in den nächsten eigenen Block aufnimmt.

Der **Double-Spend-Angriff**: Alice sendet 100 Coins an Bob *und* gleichzeitig dieselben 100 an sich selbst (Alice'). Beide Transaktionen sind gültig signiert — es entstehen **zwei Branches**. Welcher gewinnt? **Longest Chain Wins**: Knoten bauen auf dem Branch weiter, den sie zuerst gesehen haben; langfristig wird einer länger, der kürzere wird obsolet. Praktische Folge: Wartet Bob auf **keine** Bestätigung (Zero-Confirmation), ist der Angriff leicht; je mehr Bestätigungen, desto sicherer. **Faustregel: nach 6 Bestätigungen** ist die Double-Spend-Chance praktisch null.

> **Eselsbrücke (Double-Spend):** Zwei widersprüchliche Zahlungen → zwei Ketten-Äste → **der längste Ast gewinnt**. Warte auf **6 Bestätigungen**, dann ist die doppelte Ausgabe so gut wie unmöglich. Den ganzen Aufbau baut [3Blue1Brown von Grund auf nach](https://www.youtube.com/watch?v=bBC-nXj3Ng4).

## Proof-of-Work & Incentives

Die „zufällige Knotenwahl" aus Schritt 3 ist unrealistisch — und angreifbar (man erzeugt einfach viele Identitäten). Bitcoin ersetzt sie durch **Proof-of-Work**: einen Wettbewerb um knappe **Rechenleistung** (Idee aus **Hashcash**, ursprünglich gegen Spam). Um einen Block zu erzeugen, muss ein Miner eine Zahl, die **Nonce**, finden, sodass:

> H(nonce ‖ prev ‖ transactions) < target

Das Puzzle ist **schwer zu lösen, aber leicht zu prüfen**; das **Target** stellt die Schwierigkeit ein. Weil das Arbeit kostet, müssen ehrliche Knoten belohnt werden (Bitcoin nimmt an, dass **>50 %** der Rechenleistung ehrlich ist):

> **Eselsbrücke (Proof-of-Work):** Probiere Nonces durch, bis der Block-Hash **klein genug** ist (unter dem Target = beginnt mit genug Nullen). **Suchen ist teuer, Prüfen ist billig.** Genau dieses Würfeln um eine gültige Nonce kannst du in der [ETH.BUILD-Demo](https://ethereum.org/videos/blockchain-eth-build/) selbst ausprobieren.

- **Block Reward:** Jeder Block enthält eine **Coinbase-Transaktion** an den Miner. Der Reward **halbiert sich alle 210 000 Blöcke** (50 → 25 (2012) → 12,5 (2016) → 6,25 (2020) → 3,125 (2024)). Ab ~2140 ist er null; es gibt maximal **21 Mio. Bitcoin**.
- **Transaktionsgebühren:** Output < Input; die Differenz geht an den Miner. Das hält Miner auch nach 2140 motiviert.

Wie sieht ein Knoten, ob Coins schon ausgegeben sind? Über das **UTXO**-Modell (Unspent Transaction Output): Eine Transaktion hat Inputs (Adresse + unverbrauchte frühere Transaktion, je signiert) und Outputs (Adresse + Betrag); die Differenz ist die Gebühr.

### Schritt für Schritt: minen und die 21 Millionen herleiten

Im Übungsblatt taucht eine vereinfachte **Mining-Aufgabe** auf, und das Vorgehen ist immer dasselbe: Du bekommst eine Hash-Formel und feste Blockfelder (prev-Hash, Zeit, tx-Root) und sollst die **Nonce finden, mit der die Gültigkeitsbedingung erfüllt ist** (z. B. „Hash ≥ 90" oder „Hash < Target"). Du setzt einfach nonce = 0 ein, rechnest den Hash aus, prüfst die Bedingung; ist sie nicht erfüllt, nimmst du nonce = 1, dann 2, und so weiter, bis es passt. Das ist exakt das, was Miner tun — nur mit echten Hashes milliardenfach pro Sekunde. „Schwer zu finden, leicht zu prüfen": Hat ein Miner die Nonce, kann jeder den Hash *einmal* nachrechnen und die Gültigkeit bestätigen.

Die zweite Lieblingsaufgabe ist die **maximale Münzmenge aus der Halbierung**. Der Reward startet bei 50 BTC und halbiert sich alle 210 000 Blöcke: 50, dann 25, dann 12,5, … Die Gesamtzahl ist also 210 000 · (50 + 25 + 12,5 + …) = 210 000 · 50 · (1 + ½ + ¼ + …). Die geometrische Reihe in der Klammer summiert sich zu **2**, also: 210 000 · 50 · 2 = **21 000 000**. So kommen die berühmten 21 Millionen Bitcoin zustande.

## Auf den Punkt

Die Kurzfassung: Bitcoin ist dezentrales, pseudonymes Geld ohne Bank. Seine Kernprobleme sind Double-Spending, Konsens ohne Vertrauensinstanz und die Frage, wer neues Geld prägen darf. Gelöst wird das mit vier Bausteinen aus den vorherigen Wochen: Hash-Pointer verketten Blöcke zu einem manipulationssicheren Log (Blockchain) — ändert man einen alten Block, brechen alle folgenden Hashes; ein Merkle-Baum fasst alle Transaktionen eines Blocks in einer Wurzel zusammen (effizienter Proof of Membership); öffentliche Schlüssel dienen als Identitäten, woraus die Bitcoin-Adresse abgeleitet wird; und der Konsens entsteht durch Proof-of-Work, bei dem Miner eine Nonce suchen, sodass H(Block) < Target. Es gilt „Longest Chain Wins", nach ~6 Bestätigungen ist Double-Spending praktisch unmöglich, und die Anreize liefern der Block Reward (halbiert sich alle 210 000 Blöcke, max. 21 Mio. BTC) plus Transaktionsgebühren.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Double-Spending** | dieselbe Münze zweimal ausgeben |
| **Hash Pointer** | Zeiger + Hash des Zielbereichs (manipulationssicher) |
| **Blockchain** | über Hash-Pointer verkettete Blöcke; Start = Genesis Block |
| **Merkle-Baum / Root** | Hash-Baum; Wurzel fasst alle Daten zusammen |
| **Bitcoin-Adresse** | aus Public Key: SHA-256 → RIPEMD-160 → Base58Check |
| **Proof-of-Work** | H(nonce‖prev‖tx) < target finden (Nonce suchen) |
| **Longest Chain Wins** | der längste Branch setzt sich durch |
| **Block Reward** | Coinbase-Belohnung, halbiert alle 210 000 Blöcke |
| **UTXO** | Unspent Transaction Output (verfügbares Guthaben) |

## Typische Fallen

- **Bitcoin ist anonym?** Nein — nur **pseudonym** (Adressen statt Namen; Transaktionen sind öffentlich nachvollziehbar).
- **Eine Transaktion ist sofort sicher?** Nein — erst nach mehreren **Bestätigungen** (Faustregel 6); bei Zero-Confirmation droht Double-Spend.
- **Der Hash deckt nur die Transaktionen ab?** Nein — er umfasst auch den **prev-Hash**, deshalb verkettet sich Manipulation nach vorn.
- **Proof-of-Work „macht etwas Nützliches"?** Nein — der Sinn ist allein, dass Arbeit **knapp und teuer** ist; nur die Nonce-Suche zählt.
- **Block Reward bleibt konstant?** Nein — er **halbiert** sich; Obergrenze 21 Mio. BTC.

## Klausur-Fokus

Das Übungsblatt mischt Theorie mit einer hübschen Rechenaufgabe. Theorie zum frei Erklären: den **Aufbau und Zweck einer Blockchain**, das **Byzantinische-Generäle-Problem** im Bitcoin-Kontext (wie man sich ohne zentrale Instanz auf eine Wahrheit einigt), das **Proof-of-Work**-Konzept und die Rolle des **Merkle-Trees**. Die typische Rechenaufgabe ist eine vereinfachte **Mining-Simulation**: Mit einer gegebenen Hash-Formel sollst du für vorgegebene Blockfelder die **Nonce finden, mit der der Block-Hash die Gültigkeitsbedingung erfüllt** (z. B. Hash ≥ Schwelle), und so eine Blocktabelle vervollständigen — genau das illustriert „schwer zu lösen, leicht zu prüfen". Außerdem solltest du die **maximale Münzmenge aus einer Halbierungsregel** berechnen können (Reward halbiert sich alle k Blöcke → geometrische Reihe). Dazu, eher konzeptionell: das **Manipulations-Szenario** der Blockchain (warum alle folgenden Hashes neu müssten), **Double-Spend** mit „Longest Chain Wins" und der 6-Bestätigungen-Regel, sowie **Block Reward**, **Transaktionsgebühren** und **UTXO** in Grundzügen. (Verwandt aus demselben Blatt: **Rainbow-Tables** berechnen — Passwortkombinationen, Tabellengröße, CPU-Zeit.)

## Mehr dazu

- **3Blue1Brown — But how does bitcoin actually work?** (EN): baut Bitcoin Schritt für Schritt aus Ledger, Signaturen, Hashes und Proof-of-Work auf — die beste Intuition zum Thema. https://www.youtube.com/watch?v=bBC-nXj3Ng4
- **ETH.BUILD — Blockchain-Mining-Demo** (EN, ethereum.org): interaktiv sehen, wie Blöcke verkettet werden, wie Proof-of-Work sichert und was bei Manipulation passiert. https://ethereum.org/videos/blockchain-eth-build/
- **Khan Academy — Bitcoin: Cryptographic hash functions** (EN): die Hash-Grundlage hinter Bitcoin. https://www.youtube.com/watch?v=0WiTaBI82Mc`,
  },
};

const lecture08: Explanation = {
  id: "cs-2025-l08",
  lesson: 8,
  title: {
    de: "Sicherheitsprotokolle & Schlüsselvereinbarung: Diffie-Hellman, Needham-Schroeder, Kerberos",
  },
  content: {
    de: `Wir haben Chiffren (symmetrisch + asymmetrisch) und Signaturen — aber eine Lücke bleibt: *Wie einigen sich zwei Fremde über eine abgehörte Leitung auf einen gemeinsamen geheimen Schlüssel?* Genau das ist das Schlüsselaustauschproblem aus Vorlesung 4. Diese Vorlesung gibt zwei Antworten: Diffie-Hellman (rein asymmetrisch, ohne dass je ein Schlüssel über die Leitung geht) und Server-basierte Protokolle mit einem KDC (Needham-Schroeder, Kerberos).

## Diffie-Hellman: ein Geheimnis öffentlich aushandeln

1976 von Diffie und Hellman veröffentlicht, nutzt DHKE das **diskrete Logarithmusproblem** als Einwegfunktion (RSA nutzt dagegen die Faktorisierung). Es löst das Schlüsselverteilungsproblem praktisch und steckt heute in SSL/TLS und IPsec.

**Setup (öffentlich):** Wähle eine große Primzahl p (idealerweise > 2048 Bit) und eine Zahl α ∈ {2, …, p−2}; veröffentliche α und p.

**Protokoll:**

1. Alice wählt geheim a, berechnet A = α^a mod p, sendet A.
2. Bob wählt geheim b, berechnet B = α^b mod p, sendet B.
3. Alice rechnet B^a = (α^b)^a = α^(a·b) mod p.
4. Bob rechnet A^b = (α^a)^b = α^(a·b) mod p.

Beide haben denselben **Sitzungsschlüssel k_AB = α^(a·b) mod p** — obwohl nur A und B über die Leitung gingen. Oskar kennt α, p, A, B, müsste aber aus A = α^a den geheimen Exponenten a ziehen (den diskreten Logarithmus) — und das ist für große p praktisch unmöglich. **Aber:** Ohne Zertifikate ist auch DHKE durch einen aktiven **MITM** angreifbar (Oskar handelt je einen Schlüssel mit Alice und mit Bob aus).

![Diffie-Hellman als Farbmisch-Analogie](https://commons.wikimedia.org/wiki/Special:FilePath/Diffie-Hellman_Key_Exchange.svg "Diffie-Hellman als Farben: öffentliche Grundfarbe + je eine geheime Farbe; gemischt ergeben beide dieselbe Endfarbe, ohne die geheimen Farben zu verraten. (Diagramm der Uni Duisburg-Essen.)")

**Durchgerechnet (kleine Zahlen):** p = 23, α = 5. Alice wählt a = 4 → A = 5⁴ mod 23 = **4**. Bob wählt b = 3 → B = 5³ mod 23 = **10**. Alice: B⁴ = 10⁴ mod 23 = **18**. Bob: A³ = 4³ mod 23 = **18**. Gemeinsamer Schlüssel **18** — nie übertragen.

> **Eselsbrücke (Diffie-Hellman = Farben mischen):** öffentliche Grundfarbe (α, p) + je eine **geheime** Farbe (a, b). Jeder schickt seine Mischung; mischt man die fremde Mischung mit der eigenen geheimen Farbe, kommt **dieselbe** Endfarbe heraus. Entmischen (= diskreter Log) geht nicht. [Computerphile zeigt genau diese Analogie](https://www.youtube.com/watch?v=NmM9HA2MQGI).

## Schlüsselserver (KDC): symmetrischer Schlüsseltausch

Man kann Sitzungsschlüssel auch rein **symmetrisch** verteilen — über einen vertrauenswürdigen Server, das **KDC (Key Distribution Center)**. Annahme: Jeder Nutzer besitzt bereits einen geheimen symmetrischen Schlüssel mit dem KDC (vorab installiert, z. B. bei der Laptop-Übergabe). Das KDC erzeugt dann **Sitzungsschlüssel (Session-/Ephemeral-Keys)** und verteilt sie verschlüsselt. Warum kurzlebige Sitzungsschlüssel? Dem Angreifer stehen weniger Chiffrate pro Schlüssel zur Verfügung, er müsste viele Schlüssel knacken, und symmetrisch ist es schnell.

## Zwei Angriffe: Replay & fehlende Bestätigung

- **Replay-Angriff:** Ist der empfangene Sitzungsschlüssel überhaupt **aktuell**? Wenn nicht, spielt der Angreifer alte (mitgeschnittene) Nachrichten erneut ein und gibt sich als KDC aus. Gegenmittel: **Freshness** — Nonces (Zufallswerte), Timestamps, Counter.
- **Schlüsselbestätigungsangriff:** Hat die Gegenseite den Schlüssel wirklich **bestätigt**? Wenn nicht, kann Oskar eine Identität austauschen und so einen Schlüssel etablieren, den er selbst kennt. Gegenmittel: **Challenge-Response** und das **Einbinden der Identitäten** in die Nachrichten.

> **Eselsbrücke (Replay vs. Bestätigung):** **Replay** = „ist die Nachricht *frisch*?" → Gegenmittel **Freshness** (Nonce/Timestamp). **Bestätigung** = „redet wirklich die *richtige* Gegenseite?" → Gegenmittel **Challenge-Response**. Und merke: **Needham-Schroeder = Nonces** (mit Lücke), **Kerberos = Timestamps** (dafür synchrone Uhren nötig).

## Needham-Schroeder & Kerberos

Das **Needham-Schroeder-Protokoll (1978)** ist ein KDC-Protokoll und wehrt Schlüsselbestätigungsangriffe ab (Identitäten sind in Nachricht 2 verschlüsselt; Nachrichten 4 und 5 bestätigen per Challenge-Response, dass Alice den Schlüssel hat). Seine **Schwäche**: Bricht das Protokoll nach Nachricht 2 ab, kann ein Angreifer, der einen *alten* Sitzungsschlüssel (und Alices Schlüssel) kennt, Nachricht 3 senden — Bob merkt nicht, dass der Schlüssel veraltet ist. Nonces allein reichen hier nicht; besser wären **Timestamps**.

**Kerberos** baut auf Needham-Schroeder auf, ist aber mehr als ein Schlüsseltransport: Es **authentisiert Nutzer im Netzwerk**, wurde 1993 (RFC 1510) standardisiert und steckt in **Active Directory** (Windows/Linux). Der entscheidende Unterschied: Kerberos nutzt **Timestamps** statt nur Nonces → der obige Angriff scheidet aus. Preis dafür: Es braucht **synchronisierte Uhren**. Beide Protokolle setzen eine **vertrauenswürdige dritte Partei (das KDC)** voraus — ein **Single Point of Failure**.

## Auf den Punkt

Die Kurzfassung: Diese Vorlesung schließt die Lücke „wie einigen sich zwei Fremde über eine abgehörte Leitung auf einen Schlüssel?". Antwort eins ist **Diffie-Hellman**: Alice und Bob erzeugen *gemeinsam* den Schlüssel k_AB = α^(a·b) mod p, ohne ihn je zu senden — sicher dank des diskreten Logarithmusproblems, aber ohne Authentisierung MITM-anfällig (deshalb Zertifikate). Antwort zwei sind **server-basierte Protokolle** mit einem KDC, das Sitzungsschlüssel verteilt (jeder teilt vorab einen Schlüssel mit dem KDC). Solche Protokolle müssen zwei Angriffe abwehren: **Replay** (Gegenmittel: Freshness via Nonce/Timestamp) und **fehlende Schlüsselbestätigung** (Gegenmittel: Challenge-Response). **Needham-Schroeder** (1978) hat noch eine Replay-Lücke; **Kerberos** schließt sie mit Timestamps (braucht dafür synchrone Uhren) und authentisiert Nutzer im Netz (Active Directory). Beide setzen ein KDC voraus — ein Single Point of Failure.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **DHKE** | Diffie-Hellman Key Exchange |
| **diskretes Log-Problem** | Einwegfunktion hinter DHKE (und ECC) |
| **α, p** | öffentliche Parameter (Generator, große Primzahl) |
| **a, b** | private Exponenten von Alice/Bob |
| **k_AB = α^(a·b) mod p** | gemeinsamer Sitzungsschlüssel |
| **KDC** | Key Distribution Center (Schlüsselserver) |
| **Session-/Ephemeral-Key** | kurzlebiger Sitzungsschlüssel |
| **Replay-Angriff** | alte Nachrichten erneut einspielen |
| **Freshness** | Aktualität via Nonce / Timestamp / Counter |
| **Challenge-Response** | Nachweis, dass die Gegenseite den Schlüssel hat |
| **Needham-Schroeder / Kerberos** | KDC-Protokolle (Nonces / Timestamps) |

## Typische Fallen

- **Bei DHKE wird der Schlüssel übertragen?** Nein — übertragen werden nur A und B; der Schlüssel α^(a·b) wird **bei beiden berechnet**, nie gesendet.
- **DHKE ist gegen MITM sicher?** Nein — ohne Authentisierung/Zertifikate ist es angreifbar (wie alle asymmetrischen Verfahren).
- **DHKE und RSA nutzen dasselbe Problem?** Nein — DHKE: **diskreter Logarithmus**; RSA: **Faktorisierung**.
- **Nonces lösen alle Replays?** Nicht ganz — die Needham-Schroeder-Lücke zeigt, dass hier **Timestamps** nötig sind.
- **KDC = mehr Sicherheit, keine Nachteile?** Es ist eine **vertrauenswürdige dritte Partei** und damit ein **Single Point of Failure**.

## Klausur-Fokus

Die mit Abstand wichtigste Übung dieser Vorlesung ist die **Diffie-Hellman-Rechnung** — übe sie, bis sie blind sitzt: Aus p, g (= α), a, b berechnest du A = g^a mod p, B = g^b mod p und das gemeinsame Geheimnis s = B^a mod p = A^b mod p. Das Übungsblatt lässt das gleich an mehreren Parametersätzen durchrechnen, und genau so kommt es in der Klausur. Erkläre dazu, **warum DHKE sicher ist** (diskreter Logarithmus) und **warum ein MITM** ohne Authentisierung trotzdem klappt. Der zweite Schwerpunkt sind **Zertifikate**: das Aufgabenspektrum einer **CA**, die Ansätze zum **Widerruf** eines Zertifikats (CRL und das Echtzeit-**OCSP**) und der Unterschied zwischen der **CA-basierten Vertrauensstruktur und dem Web of Trust** (GPG). Auf der Protokollseite: **Replay** vs. **Schlüsselbestätigungsangriff** mit je dem Gegenmittel (Freshness/Nonce vs. Challenge-Response), die **Needham-Schroeder-Schwäche** (Abbruch nach Nachricht 2) und **Kerberos** (Timestamps statt Nonces, synchrone Uhren nötig, KDC als Single Point of Failure).

## Mehr dazu

- **Computerphile — Secret Key Exchange (Diffie-Hellman)** (EN): die berühmte Farbmisch-Analogie — warum man ein Geheimnis öffentlich aushandeln kann. https://www.youtube.com/watch?v=NmM9HA2MQGI
- **Computerphile — Public Key Cryptography** (EN): Einordnung asymmetrischer Verfahren und Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4
- **Wikipedia — Diffie-Hellman-Schlüsselaustausch** (DE, aus den Folien): Protokoll, Rechenbeispiel und MITM-Problem. https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch`,
  },
};

const lecture09: Explanation = {
  id: "cs-2025-l09",
  lesson: 9,
  title: {
    de: "Denial-of-Service und Input Validation: Angriffe auf Verfügbarkeit und Webanwendungen",
  },
  content: {
    de: `Hier verlässt der Kurs die reine Kryptografie und betritt die Netzwerk- und Web-Sicherheit. Zwei sehr unterschiedliche Angreifertypen: der eine will dein System **lahmlegen** (Denial-of-Service — Angriff auf die Verfügbarkeit), der andere schmuggelt **bösartige Eingaben** in deine Webanwendung (XSS, SQL-Injection). Davor steht noch kurz TLS als das Protokoll, das die Krypto der letzten Wochen im Web zusammenführt.

## TLS in einem Satz

**SSL/TLS** verschlüsselt den Webverkehr und kombiniert dafür asymmetrische Kryptografie (für den Schlüsseltausch und Zertifikate) mit symmetrischer (für die eigentlichen Daten) — ein **Hybridprotokoll**. Die Versionsgeschichte ist vor allem eine Liste von Abkündigungen: SSL 1.0–3.0 und TLS 1.0/1.1 gelten als **veraltet**; relevant sind **TLS 1.2 (2008)** und **TLS 1.3 (2018)**.

## Denial-of-Service: die Verfügbarkeit angreifen

**DoS-Angriffe** zielen direkt auf das CIA-Schutzziel **Verfügbarkeit**: Sie **überlasten Ressourcen**, bis legitime Anfragen nicht mehr bedient werden. Angreifbar sind Netzwerk-Bandbreite, System- und Anwendungsressourcen. Die Bausteine:

- **ICMP-Flooding:** den Server mit vielen „ping"-Anfragen (ICMP echo requests) zumüllen, bis er an der Antwortlast erstickt.
- **Source-Address-Spoofing:** die **Quelladresse fälschen**. Damit verschleiert der Angreifer sich — und lenkt Antworten auf fremde Rechner.
- **SYN-Spoofing:** den TCP-Handshake missbrauchen (halb offene Verbindungen) und so die Verbindungstabelle des Servers füllen.
- **Reflection:** Anfragen mit gefälschter Quelladresse (= Opfer) an viele Server schicken; deren Antworten treffen alle das **Opfer**.
- **Amplification:** eine Verstärkungs-Variante — eine **kleine** Anfrage erzeugt eine **viel größere** Antwort. Beispiel **DNS-Amplification**: eine 60-Byte-Anfrage (mit „ANY") löst eine 512- bis 4000-Byte-Antwort aus.
- **DDoS (Distributed DoS):** statt von einem Rechner aus von **vielen** — einem **Botnet** aus gekaperten Maschinen (Handler- und Agent-Zombies).

**Mirai** (2016) ist das Lehrbuchbeispiel: ein **IoT-Botnet**, das schlecht gesicherte Geräte (Kameras, DVRs, Router) über **schwache Standardpasswörter** und offene Dienste (Telnet) kapert, sich selbst weiterverbreitet und damit die bis dahin größten DDoS-Angriffe fuhr. **Gegenmaßnahmen** sind schwer, weil man legitime von bösartiger Last unterscheiden muss: mehr Bandbreite/Redundanz, Erkennung + Filtern (Firewalls), Angreifer identifizieren.

> **Eselsbrücke (DoS-Varianten):** **Reflection** = Antwort *umlenken* aufs Opfer (gefälschte Absenderadresse). **Amplification** = Antwort *aufblasen* (kleine Frage, riesige Antwort, z. B. DNS „ANY"). **DDoS** = *viele* Rechner (Botnet) statt einem. Und: DoS trifft immer das **A** der CIA-Triade (Verfügbarkeit).

## Input Validation: XSS & SQL-Injection

Die zweite Hälfte: Was passiert, wenn eine Webanwendung **Benutzereingaben ungeprüft** verwendet? (Die Folien nutzen PHP nur als Beispiel — in der Klausur musst du keinen PHP-Code schreiben, ggf. aber lesen.)

- **Cross-Site-Scripting (XSS):** Die Seite gibt Eingaben direkt im HTML aus, z. B. Welcome + name. Setzt der Angreifer als „name" ein Skript wie alert(document.cookie), wird es **im Browser des Opfers ausgeführt** — er kann z. B. Session-Cookies stehlen.
- **SQL-Injection:** Die Eingabe landet ungeprüft in einer SQL-Abfrage, z. B. SELECT birthday FROM users WHERE name = '$name'. Schickt der Angreifer name = foo' UNION SELECT password FROM users, ändert er die **Bedeutung** der Abfrage und liest fremde Daten (oder löscht/ändert sie). Der Klassiker ist der **Login-Bypass**: Lautet die Prüfung SELECT uid FROM users WHERE username = '$user' AND password = '$pass', dann gibt der Angreifer als Benutzernamen admin'-- ein. Die zwei Bindestriche leiten einen SQL-Kommentar ein, der die Passwortprüfung *auskommentiert* — übrig bleibt „… WHERE username = 'admin'", und der Login gelingt ohne Passwort. (Alternativ ' OR '1'='1.)

Gemeinsame Ursache: Daten (Eingabe) und Code (HTML/SQL) vermischen sich, und der Angreifer schmuggelt Code in die Daten. [Computerphile demonstriert SQL-Injection live](https://www.youtube.com/watch?v=_jKylhJtPmI); [PwnFunction erklärt XSS in ~12 Minuten](https://www.youtube.com/watch?v=EoaDgUgS6QA).

> **Eselsbrücke (XSS vs. SQLi):** Beide entstehen, weil **Daten als Code gelesen** werden. **XSS** schmuggelt **JavaScript** → läuft im *Browser des Opfers* (Cookies klauen). **SQLi** schmuggelt **DB-Befehle** → läuft in der *Datenbank* (Daten lesen/ändern). Merksatz: das einzeln stehende **'** (Anführungszeichen) in der Eingabe ist das klassische SQLi-Warnsignal.

## Abwehr: Sanitization, Validation, Whitelisting, CSP

Gegen beides hilft **Input Validation** in zwei Spielarten:

- **Sanitization & Transformation** — die Eingabe *umformen*: **Typecasting** (z. B. zu int erzwingen), **Encoding** (Sonderzeichen unschädlich machen, z. B. base64/urlencode), **kontextsensitive Sanitization** (z. B. htmlentities wandelt < und > in &lt; / &gt;, oder RegEx, die nur erlaubte Zeichen durchlässt).
- **Condition-Based Validation** — die Eingabe *prüfen*: **Type-Validation** (ist es eine Zahl?), **Format-Validation** (gültiges Datum?) und vor allem **Whitelisting**.

Merksatz: **Whitelisting schlägt Blacklisting.** Eine Blacklist „verbotener" Eingaben ist fehleranfällig — man vergisst leicht einen gefährlichen Fall. Eine Whitelist erlaubt nur explizit Bekanntes und ist daher sicherer. Ergänzend gibt es die **Content Security Policy (CSP)** (W3C-Standard): eine Whitelist erlaubter Inhaltsquellen; Inline-Skripte und eval sind standardmäßig blockiert. Aber: **CSP ersetzt keine Input-Validierung**, sie ergänzt sie nur.

## Auf den Punkt

Die Kurzfassung: Hier verlässt der Kurs die Mathematik. TLS führt die Krypto im Web hybrid zusammen (asymmetrischer Schlüsseltausch, dann symmetrische Daten). Zwei Angreifertypen stehen im Zentrum. Der eine will lahmlegen: Denial-of-Service greift die Verfügbarkeit (das A der CIA) an, indem er Ressourcen überlastet — per ICMP-Flooding, Source-Address-Spoofing, SYN-Spoofing, Reflection und Amplification (kleine Anfrage, riesige Antwort), und verteilt als DDoS über ein Botnet (z. B. Mirai). Der andere schmuggelt bösartige Eingaben in Webanwendungen: XSS (eingeschleustes JavaScript läuft im Opfer-Browser) und SQL-Injection (eingeschleuste DB-Befehle, bis hin zum Login-Bypass). Abgewehrt wird das durch Input Validation — Sanitization/Encoding, Type-/Format-Prüfung, Whitelisting (besser als Blacklisting) — und ergänzend CSP, das die Input-Prüfung aber nicht ersetzt.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **TLS** | Hybridprotokoll fürs Web (asym. Tausch + sym. Daten) |
| **DoS / DDoS** | Verfügbarkeit angreifen / verteilt über ein Botnet |
| **ICMP-Flooding** | mit Ping-Anfragen überlasten |
| **Source-Address-Spoofing** | Quelladresse fälschen |
| **Reflection / Amplification** | Antworten aufs Opfer lenken / kleine Anfrage → große Antwort |
| **Botnet / Mirai** | gekaperte Rechner / IoT-Botnet 2016 |
| **XSS** | eingeschleustes JavaScript im Browser des Opfers |
| **SQL-Injection** | eingeschleuste DB-Befehle |
| **Sanitization / Validation** | Eingabe umformen / prüfen |
| **Whitelisting** | nur explizit Erlaubtes zulassen (> Blacklisting) |
| **CSP** | Content Security Policy (ergänzt Input-Validierung) |

## Typische Fallen

- **DoS verletzt Vertraulichkeit?** Nein — DoS greift die **Verfügbarkeit** an (das A der CIA-Triade).
- **Reflection = Amplification?** Nicht ganz: Reflection lenkt Antworten aufs Opfer; **Amplification** ist die Verstärkung (kleine Anfrage → große Antwort).
- **DDoS = ein besonders starker Rechner?** Nein — **viele** Rechner (Botnet); das ist gerade der Punkt.
- **Blacklisting reicht zur Abwehr?** Nein — fehleranfällig; **Whitelisting** bevorzugen.
- **CSP ersetzt Input-Validierung?** Nein — sie ist nur eine zusätzliche Schicht (Defense in Depth).

## Klausur-Fokus

Das Übungsblatt ist sehr web-lastig und konkret. Bei **XSS** solltest du die **drei Typen** unterscheiden können — **Reflected** (Skript steckt im Link/Request und wird sofort zurückgespiegelt), **Stored** (Skript wird auf dem Server gespeichert, z. B. in einem Forenpost, und trifft jeden Besucher) und **DOM-Based** (rein im clientseitigen JavaScript) — und **CSP** mit Vor- und Nachteilen erklären. Bei **SQL-Injection** musst du einen **Login-Bypass konkret formulieren** (z. B. Benutzername admin'-- oder ' OR '1'='1, der die Passwortprüfung auskommentiert/aushebelt) und sagen, wie man ihn **verhindert** (parametrisierte Queries / Prepared Statements, Sanitization). Beim **DoS**-Teil: das technische Ziel nennen, es der **CIA-Verfügbarkeit** zuordnen (mit Begründung), **DDoS-Techniken** und **Amplification** mit Beispielen beschreiben, und **DoS vs. DDoS** abgrenzen (warum verteilt schwerer abzuwehren ist). Bei **Botnetzen**: bekannte nennen, Infektionswege, was ein **Command&Control-Server** ist, und ein Botnetz (Angreifer → C&C → Bots → Opfer) mit den DDoS-Kommunikationsflüssen **skizzieren**. Und zur **Abwehr**: Schicht-7-Erkennungsprobleme, das Kapazitäts-Dilemma, On-Site vs. Off-Site und wie ein **CDN** (mit DNS-basiertem Routing) DDoS abfedert. (PHP-Code musst du nur lesen/analysieren, nicht schreiben.)

## Mehr dazu

- **Computerphile — Hacking Websites with SQL Injection** (EN): Tom Scott zeigt anschaulich, wie ungeprüfte Eingaben SQL-Befehle verändern. https://www.youtube.com/watch?v=_jKylhJtPmI
- **PwnFunction — Cross-Site Scripting (XSS) Explained** (EN, ~12 Min.): wie eingeschleustes JavaScript im Opfer-Browser landet. https://www.youtube.com/watch?v=EoaDgUgS6QA
- **Aikido — Injection Attacks 101 (SQLi, Code Injection, XSS)** (EN): kompakter Überblick inkl. Abwehr durch Input Validation. https://www.youtube.com/watch?v=wu6FAsiFhv0`,
  },
};

const lecture10: Explanation = {
  id: "cs-2025-l10",
  lesson: 10,
  title: {
    de: "Software-Exploits: von der Buffer-Overflow-Lücke zu Code-Reuse und den Abwehrmechanismen",
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

![Aufbau eines Stack-Frames mit Funktionsargumenten, Rücksprungadresse und lokalen Variablen](https://commons.wikimedia.org/wiki/Special:FilePath/Call_stack_layout.svg "Ein Stack-Frame: Argumente, Rücksprungadresse, gesicherter Base Pointer, lokale Variablen. Der Puffer liegt bei den lokalen Variablen — läuft er über, wird die Rücksprungadresse überschrieben.")

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
    de: "Betriebssystemsicherheit am Beispiel Multics: Reference Monitor, Schutzringe und Multilevel Security",
  },
  content: {
    de: `Multics (Ende der 1960er) war das erste moderne Betriebssystem und der Geburtsort fast aller Sicherheitskonzepte, die wir bis heute nutzen: der Reference Monitor, die Schutzringe und die mehrstufige Sicherheit. Die Vorlesung benutzt dieses historische System als saubere Fallstudie, an der man versteht, *wie* ein Betriebssystem entscheidet, ob ein Prozess auf etwas zugreifen darf. Die Folien sind ein Begriffs- und Regel-Dschungel — der rote Faden ist die eine Frage: *Wer darf was, und wie setzt das System das zwingend durch?*

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

![Schutzringe der x86-Architektur: Ring 0 (Kernel) innen, Ring 3 (Anwendungen) außen](https://commons.wikimedia.org/wiki/Special:FilePath/Priv_rings.svg "Schutzringe: Ring 0 (Kernel) ganz innen = am privilegiertesten, Ring 3 (Anwendungen) außen = am wenigsten. Moderne OS nutzen nur 0 und 3.")

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
- **Saltzer & Schroeder — A Hardware Architecture for Implementing Protection Rings** (aus den Folien): die Originalquelle zu Schutzringen. https://www.multicians.org/protection.html
- **multicians.org** (aus den Folien): Geschichte und Konzepte von Multics aus erster Hand. https://www.multicians.org/`,
  },
};

const lecture12: Explanation = {
  id: "cs-2025-l12",
  lesson: 12,
  title: {
    de: "Reverse Engineering und Malware-Analyse: ein Programm ohne Quellcode verstehen",
  },
  content: {
    de: `Wie versteht man ein Programm, von dem man nur das fertige Binary hat — etwa eine verdächtige .exe? Das ist Reverse Engineering, und sein wichtigstes Einsatzfeld ist die Malware-Analyse. Die Vorlesung erklärt erst, *warum* das schwer ist (beim Kompilieren geht fast alle Bedeutung verloren), dann *was* Malware tut (Infektion, Persistenz, Typen, Ransomware), und schließlich das Katz-und-Maus-Spiel: wie Malware-Autoren die Analyse erschweren — und wie Analysten kontern.

## Reverse Engineering: vom Binary zurück zum Verständnis

Beim Bauen einer Anwendung durchläuft C/C++-Code eine Kette: **Präprozessor → Compiler → Assembler → Linker**. Heraus kommt Maschinencode, in dem **alle menschenlesbaren Informationen verloren** sind — Variablentypen und -namen, Funktionsnamen, Kommentare existieren nur noch (wenn überhaupt) als Debug-Info. Genau das macht Reverse Engineering schwer: Man muss aus rohem Assembler die Absicht rekonstruieren. Anwendungen: Funktionalität prüfen, Bugs/Schwachstellen finden, Programme **ohne Quellcode patchen** und vor allem **Schadsoftware erkennen**.

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
    de: "Zusammenfassung & Klausurvorbereitung: das ganze Semester auf einen Blick",
  },
  content: {
    de: `Die letzte Sitzung ist eine Wiederholung — und genau das richtige Werkzeug für die Klausurvorbereitung. Statt neuen Stoff bündelt dieses Kapitel den **roten Faden des ganzen Kurses**: die drei Säulen, wie die einzelnen Vorlesungen aufeinander aufbauen, und eine kompakte Checkliste, was du wirklich können musst. Nutze es als Landkarte und springe von hier in die einzelnen Kapitel-Erklärungen zurück.

Der ganze Kurs ruht auf drei Säulen, eingerahmt von den Grundkonzepten aus Vorlesung 1. Die **Kryptografie** (V2–V8) sichert die Daten, die **Netzwerk- und Web-Sicherheit** (V9) die Kommunikation, und die **Software- und Systemsicherheit** (V10–V12) die Programme und Systeme. Innerhalb der Krypto verläuft ein klarer Faden — von symmetrisch (DES, AES) über asymmetrisch (RSA und das Schlüsselaustauschproblem) zur Integrität (Hashes, Signaturen, MAC) bis zu den Anwendungen (Bitcoin, Protokolle, TLS). Und durch alles ziehen sich dieselben Prinzipien aus V1: die CIA-Triade, das schwächste Glied, Defense in Depth, Kerckhoffs und das Adversarial Setting. Gehen wir die drei Säulen der Reihe nach durch.

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

- **Computerphile (YouTube-Kanal)** (aus den Folien): kurze, hochwertige Videos zu fast allen Kursthemen — ideal zum Wiederholen. https://www.youtube.com/computerphile
- **Patrick Winston (MIT) — „How To Speak"** (aus den Folien): wie man Inhalte klar präsentiert — nützlich für mündliche Prüfungen und Vorträge. https://www.youtube.com/watch?v=Unzc731iCUY
- **David JP Phillips — „How to avoid death by PowerPoint"** (aus den Folien): bessere Folien und Präsentationen. https://www.youtube.com/watch?v=Iwpi1Lm6dFo`,
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

export function buildCybersicherheit2025QuizSets(): QuizSet[] {
  return [];
}
