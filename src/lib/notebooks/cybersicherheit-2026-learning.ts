import type { Explanation } from "./explanation-types";

/**
 * Source-grounded explanations for Cybersicherheit SoSe 2026 (Davi, UDE).
 *
 * One explanation per lecture, written from the corresponding lectures/NN.md
 * (pdf-to-md of the SoSe 2026 slides) and the matched Übung. German canonical;
 * translation is the final pass. Same standardized skeleton as every notebook
 * (see AGENTS.md → Quality bar → Explanation): framing lead, narrative body
 * with worked Schritt-für-Schritt examples, then Auf den Punkt, Begriffe &
 * Notation, Typische Fallen, Klausur-Fokus, Mehr dazu.
 *
 * NB: the 2026 chapter boundaries differ from 2025 — the classical hand-ciphers
 * live in L2 (not L1), L4 is AES + Betriebsmodi, L5 is RSA, L6 is signatures /
 * hashes / MAC.
 */

const lecture01: Explanation = {
  id: "cs-2026-l01",
  lesson: 1,
  title: {
    de: "Einführung in die IT-Sicherheit: Schutzziele, Denkweise und der Start in die Kryptografie",
  },
  content: {
    de: `Stell dir vor, du baust etwas — eine App, ein Online-Banking, ein ganzes Betriebssystem — und in genau dem Moment, in dem du fertig bist, setzt sich jemand auf die andere Seite, dessen einziges Ziel es ist, dein Werk zu belauschen, zu fälschen oder lahmzulegen. Dieser unsichtbare Gegner ist der heimliche Hauptdarsteller des ganzen Semesters. Bevor wir auch nur eine Zeile verschlüsseln, müssen wir drei Fragen beantworten, die alles andere tragen: Was heißt „sicher" überhaupt? Nach welchen eisernen Regeln verliert man dieses Spiel? Und wie muss man denken, um es zu gewinnen? Erst danach schlagen wir das erste große Werkzeug auf, die Kryptografie, und richten die Bühne ein, auf der ab der nächsten Vorlesung jede Verschlüsselung spielt: Alice, Bob und ein Lauscher dazwischen. Wenn du diese eine Stunde wirklich verinnerlichst, liest sich der gesamte Rest des Kurses — Verschlüsselung, Hashes, Exploits, Malware — wie immer dieselbe Geschichte in neuer Verkleidung.

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

## Auf den Punkt

Jetzt, wo die ganze Geschichte erzählt ist, die Kurzfassung zum Wiederholen. IT-Sicherheit ist ein Zweikampf gegen einen **denkenden Gegner**, mit einer eingebauten Asymmetrie: Der Verteidiger muss überall gewinnen, der Angreifer nur einmal. „Sicher" misst man an drei Schutzzielen — **Vertraulichkeit, Integrität, Verfügbarkeit (CIA)** —, die gegeneinander ziehen und abgewogen werden müssen. Zwei eiserne Regeln ziehen sich durch alles: Ein System ist nur so stark wie sein **schwächstes Glied** (oft der Mensch), und deshalb verteidigt man in mehreren Schichten (**Defense in Depth**). Weil es **keine perfekte Sicherheit** gibt und man immer jemandem vertrauen muss (Insider-Gefahr), definiert man ein **Threat Model**: Was schütze ich, vor wem? Dann beginnt Teil 1, die Kryptografie: **Kryptologie = Kryptografie (bauen) + Kryptanalyse (brechen)**; drei Familien — **symmetrisch** (ein geteilter Schlüssel), **asymmetrisch** (Schlüsselpaar, seit **1976**) und **Protokolle** (z. B. TLS). Auf der Bühne stehen **Alice, Bob und der Lauscher Oskar**, mit der Notation **x, y, k, e, d** und dem **Schlüsselraum**. Damit ist das Fundament gelegt — in der nächsten Vorlesung verschlüsseln wir die erste Nachricht von Hand.

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
| **symmetrisch / asymmetrisch** | ein geteilter Schlüssel / Schlüsselpaar (öffentlich + privat) |
| **1976** | Geburtsjahr der Public-Key-Kryptografie |

## Typische Fallen

- **CIA ist nicht der Geheimdienst.** Es steht für die drei Schutzziele. Klausur-Reflex: lesen → C, unbemerkt ändern → I, Ausfall → A.
- **Verschlüsselung liefert keine Verfügbarkeit.** Krypto schützt Vertraulichkeit und Integrität, aber gegen einen überfluteten oder abgestürzten Server hilft nur Redundanz, niemals eine Formel.
- **„Stärkste Komponente = sicher" ist falsch.** Es zählt das **schwächste** Glied. Sicherheit ist ein Minimum, kein Durchschnitt.
- **Asymmetrisch ist nicht „besser" als symmetrisch.** Es löst ein *anderes* Problem (den Schlüsselaustausch) und ist deutlich langsamer. Beide werden gebraucht.
- **„Geheimes Verfahren = sicher" ist falsch.** Sicherheit muss im Schlüssel stecken, nicht in der Geheimhaltung des Algorithmus (formal: Kerckhoffs, nächste Vorlesung).
- **Kryptografie und Kryptanalyse werden verwechselt.** Kryptografie *baut* und sichert ab, Kryptanalyse *bricht*. Beide zusammen sind die Kryptologie.
- **„Mehr Krypto = mehr Sicherheit" ist falsch.** Die beste Verschlüsselung nützt nichts, wenn der Rest des Systems (Schlüsselablage, Passwort, Mensch) unsicher ist — wieder das schwächste Glied.

## Klausur-Fokus

Diese erste Vorlesung ist reine Orga plus Grundlagen und trägt kein eigenes Übungsblatt — geprüft wird sie ausschließlich über **Verständnisfragen**, die du frei formulieren können solltest. Die **CIA-Triade** definieren und an einem Beispiel das verletzte Ziel zuordnen (lesen → C, unbemerkt ändern → I, Ausfall → A); **schwächstes Glied** und **Defense in Depth** mit einem eigenen Bild erklären; begründen, warum der **denkende Gegner** und die Asymmetrie Angreifer/Verteidiger Sicherheit so schwer machen; sagen, was ein **Threat Model** ist (was schütze ich, vor wem?) und warum es **keine perfekte Sicherheit** gibt (man muss immer jemandem vertrauen → Insider-Gefahr).

Auf der Krypto-Seite musst du **Kryptologie / Kryptografie / Kryptanalyse** sauber trennen, die drei Familien (symmetrisch / asymmetrisch / Protokoll) mit je einem Beispiel einordnen (DES/AES, RSA, TLS), die Jahreszahl **1976** kennen, das **Kerckhoffs**-Prinzip vorwegnehmen (geheim ist nur der Schlüssel) und die Notation **x, y, k, e, d** sowie den Begriff **Schlüsselraum** flüssig lesen. All das ist das Sprungbrett — die erste echte Rechnung (Caesar von Hand) kommt in der nächsten Vorlesung und dem ersten Übungsblatt.

## Mehr dazu

- **Professor Messer — The CIA Triad** (~5 Min., EN): die drei Schutzziele knapp mit Beispielen. https://www.youtube.com/watch?v=SBcDGb9l6yo
- **Bruce Schneier — „The Security Mindset"** (Essay, EN): Originalquelle des „Denke wie ein Angreifer"-Prinzips. https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html
- **Computerphile — Public Key Cryptography** (~6 Min., EN): warum ein öffentlicher Schlüssel funktionieren kann. https://www.youtube.com/watch?v=GSIDS_lvRv4
- **OWASP — Threat Modeling** (Artikel, EN): wie man systematisch festlegt, was man wogegen schützt. https://owasp.org/www-community/Threat_Modeling
- **Crash Course Computer Science #31 — Cybersecurity** (~12 Min., EN): die Schutzziele und die Angreifer-Denkweise im großen Bogen. https://www.youtube.com/watch?v=bPVaOlJ6ln0`,
  },
};

const lecture02: Explanation = {
  id: "cs-2026-l02",
  lesson: 2,
  title: {
    de: "Einführung in die Kryptografie: Substitutionschiffren, modulare Arithmetik und Stromchiffren",
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

Genau an dieser zweiten Lektion entscheidet sich, warum manche klassischen Chiffren besser sind als andere. Die **Verschiebe- oder Cäsar-Chiffre** ist der Spezialfall der Substitution mit nur *einer* festen Verschiebung als Schlüssel; sie verschiebt die Häufigkeits-Silhouette bloß um k Stellen und ist deshalb noch leichter zu brechen (ihr Schlüsselraum ist sogar nur 26, da reicht schon Brute-Force in Sekunden). Die **Vigenère-Chiffre** verschlüsselt denselben Klartextbuchstaben je nach Position mit *unterschiedlichen* Verschiebungen und *verschmiert* damit die Häufigkeiten — die simple Frequenzanalyse läuft hier ins Leere. Und die **spaltenweise Transposition** ändert die Buchstaben gar nicht, sondern nur ihre Reihenfolge; ihre Häufigkeitsverteilung ist sogar identisch mit der des Klartextes, aber genau das verrät dem Angreifer nichts über den Inhalt. Alle drei rechnen wir gleich weiter unten Schritt für Schritt von Hand durch — hier ging es erst um die übergeordnete Einsicht, *warum* Substitution scheitert und Verschmieren hilft.

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

Das erste Übungsblatt zu diesem Stoff ist fast reine **Rechnerei von Hand** — und genau so kommt es in der Klausur. Die vier Handchiffren aus diesem Kapitel musst du sicher beherrschen, vorwärts *und* rückwärts: die **Cäsar-Chiffre** mit y = (x + k) mod 26, die **Vigenère-Chiffre** mit einem Schlüsselwort (Verschiebung pro Position, zyklisch) und die **spaltenweise Transposition** (Spalten alphabetisch nach dem Schlüssel umsortieren). Dazu die **Häufigkeitsanalyse** mit der deutschen Verteilung (E ≈ 17 %, dann N, I, S, R) und die Begründung, warum sie Substitution und Cäsar bricht, Vigenère und Transposition aber nicht. Auf der Rechen-Seite solltest du sicher **modulo** rechnen — inklusive der cleveren Reduktion auf Zwischenergebnisse wie bei 3^8 mod 7 — und **zwischen binär und dezimal umrechnen** sowie **binär addieren**. Beim **One-Time-Pad / Vernam** wird gern der **Schlüsselraum gezählt** (für Länge n gibt es 26^n bzw. bei Bits 2^n Schlüssel) und daraus eine **Brute-Force-Dauer** abgeschätzt (Anzahl Schlüssel × Aufwand ÷ Rechenleistung). Und fast sicher drankommt die **Formbarkeit der Stromchiffre**: einen konkreten **Bit-Flip-Angriff** durchführen und bei bekanntem Klartext den Schlüsselstrom als s = y ⊕ x bestimmen. Halte außerdem die Konzepte parat: **Kerckhoffs**, die **XOR-Wahrheitstabelle**, der Unterschied **TRNG / PRNG / CSPRNG** und die drei OTP-Bedingungen **Z-E-L**.

## Mehr dazu

- **Crypto Corner — Frequency Analysis: Breaking the Code** (Artikel, EN): zeigt genau die Kernaussage, warum Substitution an der Buchstaben-Statistik zerbricht. https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html
- **Khan Academy — Cryptography** (interaktiv, EN): modulare Arithmetik, Substitution und Zufall zum Ausprobieren. https://www.khanacademy.org/computing/computer-science/cryptography
- **Wikipedia — One-Time Pad** (EN): die Bedingungen, der Beweis der perfekten Sicherheit und warum es praktisch kaum genutzt wird. https://en.wikipedia.org/wiki/One-time_pad
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): ordnet Substitution, Schlüssel und Stromchiffren historisch ein. https://www.youtube.com/watch?v=jhXCTbFnK8o`,
  },
};

const lecture03: Explanation = {
  id: "cs-2026-l03",
  lesson: 3,
  title: {
    de: "Symmetrische Kryptografie: der Data Encryption Standard (DES)",
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
  id: "cs-2026-l04",
  lesson: 4,
  title: {
    de: "Symmetrische Kryptografie: AES und die Betriebsmodi",
  },
  content: {
    de: `Dieses Kapitel schließt die symmetrische Kryptografie ab, und es hat zwei Akte. Ganz kurz holen wir zuerst nach, wie man im **Feistel-Netzwerk entschlüsselt** — dieselbe Maschine rückwärts, der Beweis dafür, dass DES nur eine Schaltung für beide Richtungen braucht. Dann lernst du den Nachfolger von DES kennen: **AES**, die Chiffre, die heute fast das gesamte Internet verschlüsselt und ganz anders gebaut ist als DES (Schichten statt Feistel). Und im zweiten Akt klären wir eine Frage, die jede Blockchiffre offen lässt: Was tut man eigentlich mit Nachrichten, die länger sind als ein einzelner Block? Das beantworten die **Betriebsmodi** ECB, CBC und OFB — und einer davon (ECB) ist eine wunderschöne Lektion darüber, wie man eine starke Chiffre durch falsche Anwendung wieder kaputt macht. Damit ist der symmetrische Werkzeugkasten komplett — die Wand, an die er stößt (wie tauschen Alice und Bob überhaupt einen Schlüssel aus?), reißt das nächste Kapitel mit der asymmetrischen Kryptografie ein.

## Vorab: Entschlüsseln im Feistel-Netzwerk

Bevor wir AES bauen, noch einmal kurz die Schönheit der Feistel-Struktur aus dem letzten Kapitel — denn die Vorlesung steigt genau damit ein. Erinnere dich an die zwei Zeilen einer Runde: die neue linke Hälfte ist die alte rechte (**Lᵢ = Rᵢ₋₁**), die neue rechte ist die alte linke XOR der f-Funktion (**Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ)**). Zum Entschlüsseln läuft man dieselbe Maschine rückwärts und wendet die Rundenschlüssel in umgekehrter Reihenfolge an. Aus dem Chiffrat (Lₙ, Rₙ) gewinnt man die vorige rechte Hälfte sofort, weil **Rᵢ₋₁ = Lᵢ** ist; damit lässt sich f(Rᵢ₋₁, kᵢ) erneut berechnen und die vorige linke Hälfte als **Lᵢ₋₁ = Rᵢ ⊕ f(Rᵢ₋₁, kᵢ)** zurückholen. Genau deshalb darf f beliebig (auch nicht-umkehrbar) sein, und Ver- und Entschlüsselung sind dieselbe Operation. Merke dir diese Eleganz, denn bei AES ist das gleich *nicht* mehr so geschenkt — dort muss jede Schicht einzeln invertiert werden.

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

## Auf den Punkt

Die Kurzfassung: Die **Feistel-Entschlüsselung** ist dieselbe Maschine rückwärts (Rᵢ₋₁ = Lᵢ, Lᵢ₋₁ = Rᵢ ⊕ f(Rᵢ₋₁, kᵢ)). **AES** löste DES ab und ist anders gebaut — 128-Bit-Blöcke, Schlüssel mit 128/192/256 Bit, 10/12/14 Runden, und statt Feistel arbeitet es mit vier Schichten, die jede Runde den ganzen Block bearbeiten: **SubBytes** (die einzige nichtlineare Schicht, Konfusion), **ShiftRows** und **MixColumns** (Diffusion) und **AddRoundKey** (Schlüssel per XOR einbringen), mit Key Whitening und ohne MixColumns in der letzten Runde. Für Nachrichten, die länger als ein Block sind, braucht man einen **Betriebsmodus**: **ECB** (deterministisch, deshalb unsicher — der Pinguin bleibt sichtbar), **CBC** (verkettet jeden Block per XOR mit dem vorherigen Chiffrat plus IV) oder **OFB** (macht aus der Blockchiffre eine Stromchiffre). Damit ist die symmetrische Kryptografie komplett — was bleibt, ist ihre große offene Wunde: der Schlüsselaustausch. Genau die heilt das nächste Kapitel.

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
| **Padding** | Auffüllen des letzten Blocks auf die Blockgröße |
| **Feistel-Entschlüsselung** | dieselbe Struktur rückwärts, Rundenschlüssel umgekehrt |

## Typische Fallen

- **AES ist eine Feistel-Chiffre? Nein** — AES nutzt Schichten und verschlüsselt jede Runde den ganzen Block; nur DES ist Feistel.
- **AES hat acht S-Boxen wie DES? Nein** — AES hat genau **eine** S-Box, mathematisch über GF(2⁸) definiert.
- **ECB ist okay für kurze oder „unwichtige" Daten? Nein** — die Determiniertheit ist immer ein Problem; ECB nie für echte Daten.
- **Die letzte AES-Runde ist wie alle anderen? Nein** — ihr fehlt MixColumns.
- **Ein IV muss geheim sein? Nein** — der IV darf öffentlich sein; er muss nur *unvorhersehbar/einmalig* sein, damit gleiche Klartexte verschiedene Chiffrate ergeben.
- **CBC und OFB schützen auch die Integrität? Nein** — sie machen die Verschlüsselung nur probabilistisch (Vertraulichkeit); gegen gezielte Manipulation braucht es zusätzlich einen MAC.

## Klausur-Fokus

Das zugehörige Übungsblatt (Wiederholung + AES-Brute-Force + Betriebsmodi) zeigt klar, wo gerechnet wird. Der erste große Block sind die **Betriebsmodi**: Du bekommst eine kleine Blockchiffre (etwa eine 5-Bit-Permutation) und sollst eine mehrteilige Nachricht in **ECB, CBC und OFB** verschlüsseln — die Formeln musst du sicher anwenden (ECB Block für Block, CBC mit yᵢ = eₖ(xᵢ ⊕ yᵢ₋₁) und dem IV für den ersten Block, OFB mit dem aus dem IV erzeugten Schlüsselstrom) und erklären können, warum ECB unsicher ist (deterministisch → der Pinguin) und wozu der IV dient. Der zweite Block ist die **Brute-Force-Abschätzung für AES**: Wie lange braucht ein Angreifer, der den 128-Bit- (oder 256-Bit-) Schlüsselraum durchprobiert? Du rechnest die Anzahl der Schlüssel (2¹²⁸) gegen eine gegebene Versuchsrate und siehst, warum schon 128 Bit jenseits jeder physikalisch denkbaren Rechenzeit liegen — und warum DES mit 2⁵⁶ eben *nicht* (das ist der direkte Vergleich, der gern gezogen wird). Auf der Wissensseite: die **vier AES-Schichten** in Reihenfolge **S-S-M-A** (nur SubBytes nichtlinear, letzte Runde ohne MixColumns, Key Whitening am Anfang und Ende), **DES gegen AES** sauber abgrenzen (Feistel vs. Schichten, eine vs. acht S-Boxen, Block- und Schlüssellängen) und die **Feistel-Entschlüsselung** über zwei Runden skizzieren können.

## Mehr dazu

- **Computerphile — AES Explained** (EN, Mike Pound): die AES-Idee und ihre Schichten anschaulich. https://www.youtube.com/watch?v=O4xNJsjtN6E
- **Spanning Tree — AES: How to Design Secure Encryption** (~13 Min., EN): von Konfusion/Diffusion zur kompletten Runde, sehr klar animiert. https://www.youtube.com/watch?v=C4ATDMIz5wc
- **Computerphile — Electronic Code Book (ECB)** (~14 Min., EN): warum ECB den Pinguin durchscheinen lässt und was CBC besser macht. https://www.youtube.com/watch?v=NLGYUM5ulqw`,
  },
};

const lecture05: Explanation = {
  id: "cs-2026-l05",
  lesson: 5,
  title: {
    de: "Asymmetrische Kryptografie: das RSA-Kryptosystem",
  },
  content: {
    de: `Die ganze symmetrische Kryptografie hat eine offene Wunde, die wir bisher umschifft haben: Alice und Bob brauchen *denselben* geheimen Schlüssel — aber wie tauschen sie ihn aus, wenn der einzige Kanal das längst abgehörte Internet ist? Dieses Kapitel löst dieses Henne-Ei-Problem mit einer der größten Ideen der Informatik, der **asymmetrischen Kryptografie**, und ihrem ersten konkreten Verfahren: **RSA**. Der rote Faden ist erstaunlich schlicht: Jede Person bekommt ein Schlüsselpaar, man verschlüsselt eine Nachricht, indem man sie hoch einen Exponenten nimmt und modulo n reduziert, und entschlüsselt mit der passenden „Gegen-Potenz". Die ganze Sicherheit ruht auf einer einzigen Tatsache: Man kann zwei große Primzahlen mühelos multiplizieren, aber das Produkt praktisch nicht wieder in seine Faktoren zerlegen. Damit das in der Praxis rechenbar wird, brauchst du zwei Werkzeuge, die wir hier von Hand durchspielen — den **erweiterten Euklidischen Algorithmus** (er liefert den privaten Schlüssel) und **Square-and-Multiply** (es macht die riesigen Potenzen berechenbar). RSA ist damit das mit Abstand klausurrelevanteste Rechenthema des ganzen Kurses.

## Die Wand der symmetrischen Kryptografie

So stark AES auch ist — es teilt mit jeder symmetrischen Chiffre drei eingebaute Schwächen, und genau die motivieren den nächsten großen Sprung. Die erste und schwerwiegendste ist das **Schlüsselaustauschproblem**: Alice und Bob brauchen denselben geheimen Schlüssel, aber der einzige Kanal zwischen ihnen ist das Internet — und genau dort lauscht Oskar. Schickt Alice den Schlüssel über diesen Kanal, hat Oskar ihn sofort. Die zweite Schwäche ist die **Anzahl der Schlüssel**: Jedes Paar von Teilnehmern braucht seinen eigenen geheimen Schlüssel, und das wächst quadratisch — bei 120 Mitarbeitern sind das schon 120·119/2 = 7140 Schlüssel, die alle erzeugt, verteilt und geheim gehalten werden müssen. Die dritte Schwäche ist die fehlende **Nichtabstreitbarkeit (Non-Repudiation)**: Weil beide Seiten denselben Schlüssel besitzen, kann man im Streitfall nicht beweisen, *wer* von beiden eine Nachricht erzeugt hat — beide hätten es gekonnt.

## Asymmetrische Kryptografie: der öffentliche Briefkasten

Die Lösung ist so elegant, dass sie bei der Veröffentlichung 1976 (durch Whitfield Diffie, Martin Hellman und Ralph Merkle; das RSA-Verfahren folgte 1977, und Großbritanniens Geheimdienst kannte das Prinzip schon 1972) wie ein Zaubertrick wirkte. Statt eines einzigen geheimen Schlüssels bekommt jede Person ein **Schlüsselpaar** aus einem öffentlichen Schlüssel k_pub und einem privaten Schlüssel k_pr. Und jetzt der verblüffende Teil: **Der Schlüssel zum Verschlüsseln ist nicht geheim.** Das beste Bild dafür ist ein öffentlicher Briefkasten. Jeder darf einen Brief einwerfen — das entspricht dem Verschlüsseln mit dem öffentlichen Schlüssel, den die ganze Welt kennen darf. Aber leeren, also entschlüsseln, kann den Kasten nur, wer den privaten Schlüssel besitzt. Will Bob also Alice etwas Geheimes schicken, verschlüsselt er es mit *Alices* öffentlichem Schlüssel; nur Alice kann es mit ihrem privaten wieder lesen — und das Schlüsselaustauschproblem löst sich in Luft auf, denn der öffentliche Schlüssel darf ruhig über den abgehörten Kanal wandern.

![Asymmetrische Verschlüsselung: mit dem öffentlichen Schlüssel verschlüsseln, mit dem privaten entschlüsseln](https://upload.wikimedia.org/wikipedia/commons/f/f0/Orange_blue_public_key_cryptography_en.svg "Asymmetrisch: verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers, entschlüsselt nur mit dessen privatem Schlüssel. Der öffentliche Briefkasten in einem Bild.")

Damit das überhaupt funktionieren kann, braucht jedes asymmetrische Verfahren eine **Einwegfunktion** — eine Funktion, deren Vorwärtsrichtung y = f(x) leicht zu berechnen ist, deren Umkehrung x = f⁻¹(y) aber praktisch unmöglich bleibt. Zwei solche Funktionen tragen die ganze Public-Key-Welt: die **Faktorisierung großer Zahlen** (man multipliziert zwei riesige Primzahlen mühelos, aber das Produkt wieder in seine Faktoren zu zerlegen ist aussichtslos) — darauf baut RSA — und der **diskrete Logarithmus**, auf dem Diffie-Hellman und die elliptischen Kurven beruhen. Mehr als diese drei großen Familien (RSA, Diffie-Hellman, elliptische Kurven) gibt es im Grunde nicht.

> **Eselsbrücke (öffentlich vs. privat):** **verschlüsseln mit öffentlich, entschlüsseln mit privat** — wie ein Briefkasten: einwerfen darf jeder, leeren nur der Besitzer.

## Warum man am Ende beides braucht: Hybridprotokolle

Es gibt einen Haken, der erklärt, warum die asymmetrische Kryptografie die symmetrische *nicht* ersetzt hat: Sie ist **dramatisch langsamer**. Rechne es am Beispiel eines 1-GB-Videos durch. Mit einer typischen RSA-Geschwindigkeit von 100 kbit/s bräuchtest du rund 80 000 Sekunden, also über 22 Stunden. Dasselbe Video mit AES bei 17 Mbit/s ist in etwa 8 Minuten fertig. Asymmetrische Verfahren sind also um Größenordnungen teurer, und sie brauchen für dieselbe Sicherheit auch viel längere Schlüssel — 128 Bit symmetrisch entsprechen grob 3072 Bit bei RSA. Deshalb vergleicht man Schlüssellängen niemals zwischen den beiden Welten.

| symmetrisch | elliptische Kurven | RSA / Diffie-Hellman |
|---|---|---|
| 64 Bit | 128 Bit | 700 Bit |
| 128 Bit | 256 Bit | 3072 Bit |

Die Praxis nimmt deshalb das Beste aus beiden Welten und kombiniert sie in einem **Hybridprotokoll**, wie es SSL/TLS hinter jedem „https" tut: Man benutzt die langsame asymmetrische Kryptografie nur ein einziges Mal am Anfang, um einen frischen symmetrischen Sitzungsschlüssel sicher auszutauschen — und verschlüsselt danach die eigentlichen, großen Datenmengen schnell und symmetrisch mit AES. So löst der asymmetrische Teil das Schlüsselaustauschproblem, und der symmetrische Teil liefert das Tempo.

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

## Textbook-RSA ist gefährlich: Determinismus und der ×2-Angriff

Die reine Formel, die wir bisher benutzt haben, heißt „Textbook-RSA", und so wie sie dasteht, ist sie unsicher. Erstens ist sie **deterministisch**: Derselbe Klartext ergibt mit demselben Schlüssel immer dasselbe Chiffrat, sodass ein Angreifer Wiederholungen erkennt. Zweitens ist sie **manipulierbar (malleable)**, und das auf eine besonders hübsche Weise: Oskar sieht das Chiffrat y, berechnet selbst 2ᵉ mod n und multipliziert beides, schickt also y·2ᵉ mod n weiter. Beim Entschlüsseln kommt dann nicht x, sondern **2·x** heraus — Oskar hat den Klartext gezielt verdoppelt, ohne ihn je zu kennen. Die Lösung beider Probleme ist **Padding**: Vor dem Verschlüsseln baut man zufällige Daten in den Klartext ein, was RSA probabilistisch macht und die Manipulierbarkeit zerstört. Weitere Angriffsflächen, die du kennen solltest, sind schnellere Faktorisierungsalgorithmen (es gibt Fortschritte, aber für große n bleibt es chancenlos — historisch berühmt ist die RSA-129-Challenge) und **Seitenkanalangriffe**, bei denen etwa der Stromverbrauch während Square-and-Multiply den privaten Schlüssel verrät. Und nicht zu vergessen: RSA ist 100- bis 1000-mal langsamer als AES — ein weiterer Grund, es nur für den Schlüsseltausch und für Signaturen zu verwenden, nie für Massendaten.

## Auf den Punkt

Die Kurzfassung: RSA ist das erste konkrete asymmetrische Verfahren. Der öffentliche Schlüssel ist **(n, e)**, der private **d**; verschlüsselt wird mit **y = xᵉ mod n**, entschlüsselt mit **x = yᵈ mod n**. Den Schlüssel erzeugst du in fünf Schritten: zwei Primzahlen p, q → n = p·q → φ(n) = (p−1)(q−1) → ein e mit ggT(e, φ(n)) = 1 → d als Inverse von e modulo φ(n), bestimmt mit dem **erweiterten Euklidischen Algorithmus**. Die Sicherheit ruht allein auf der Schwierigkeit, n zu **faktorisieren** — ohne p und q kein φ(n), ohne φ(n) kein d. Damit die riesigen Potenzen rechenbar werden, nutzt man **Square-and-Multiply** (Binärexponent von links, Bit 1 = quadrieren und multiplizieren, Bit 0 = nur quadrieren). Asymmetrisch ist 100- bis 1000-mal **langsamer** als symmetrisch und braucht viel längere Schlüssel (128 Bit symmetrisch ≈ 3072 Bit RSA) — deshalb kombiniert die Praxis beides **hybrid** (TLS: RSA tauscht den Schlüssel, AES verschlüsselt die Daten). Und „Textbook-RSA" ohne **Padding** ist deterministisch und durch den ×2-Trick manipulierbar. (Dreht man die beiden Schlüssel in der Rolle um, bekommt man die digitale Signatur — das ist das Thema des nächsten Kapitels.)

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
| **Einwegfunktion** | leicht vorwärts (multiplizieren), praktisch unmöglich rückwärts (faktorisieren) |
| **Hybridprotokoll** | asymmetrischer Schlüsseltausch + symmetrische Daten (TLS) |
| **Textbook-RSA** | RSA ohne Padding — deterministisch und manipulierbar |

## Typische Fallen

- **φ(n) = n − 1? Nur wenn n prim ist.** Bei RSA ist n = p·q, also φ(n) = (p−1)(q−1).
- **e frei wählbar? Fast** — aber es muss ggT(e, φ(n)) = 1 gelten, sonst existiert kein passendes d.
- **d aus n und e leicht berechenbar? Nur mit φ(n)** — und das setzt die Faktorisierung von n voraus, die genau das harte Problem ist.
- **Bei Square-and-Multiply erst am Ende modulo rechnen? Nein** — nach *jedem* Schritt reduzieren, sonst explodieren die Zwischenergebnisse.
- **Verschlüsseln mit dem privaten Schlüssel? Nein** — verschlüsselt wird mit dem *öffentlichen* Schlüssel des Empfängers, entschlüsselt mit dessen privatem. (Das Umdrehen liefert die Signatur — nächstes Kapitel.)
- **Textbook-RSA ist sicher genug? Nein** — ohne Padding deterministisch und durch den ×2-Trick manipulierbar.

## Klausur-Fokus

RSA ist *das* Rechenthema, und das Übungsblatt macht es vor. Zuerst ein **komplettes RSA-Beispiel mit kleinen Zahlen**: die fünf Schritte der Schlüsselerzeugung (p, q → n → φ(n) → e mit ggT(e, φ(n)) = 1 → d mit e·d ≡ 1 mod φ(n)), dann eine Nachricht (oft Buchstaben über die A=0…Z=25-Tabelle) mit y = xᵉ mod n **verschlüsseln und mit x = yᵈ mod n wieder entschlüsseln**. Du musst ein gegebenes Schlüsselpaar **vervollständigen oder als ungültig erkennen** können (etwa prüfen, ob e teilerfremd zu φ(n) ist), sicher sagen, welches Paar der **öffentliche** und welches der **private** Schlüssel ist, und **d per EEA** bestimmen (die Tabelle mit rᵢ, qᵢ₋₁, sᵢ, tᵢ bis zum Rest 0). Für große Exponenten gehört **Square-and-Multiply** dazu (Binärexponent von links, Bit 1 = quadrieren und multiplizieren, Bit 0 = nur quadrieren, nach jedem Schritt mod n). Das Übungsblatt (RSA + AES↔RSA-Vergleich) verlangt außerdem den **direkten Vergleich der beiden Welten**: die **Anzahl der Schlüssel** in einem Unternehmen (rein symmetrisch n·(n−1)/2 Schlüssel, asymmetrisch nur n Schlüsselpaare — bei 120 Mitarbeitern also 7140 gegenüber 120) und eine **Performance-Abschätzung** (eine 1-GB-Datei bei gegebener AES- gegenüber RSA-Geschwindigkeit), woraus folgt, warum man hybrid arbeitet. Auf der Verständnisseite: erklären, warum die **Faktorisierung** die Sicherheit trägt, was **Eulers φ** mit alldem zu tun hat, warum **Textbook-RSA** (deterministisch, ×2-Manipulation) **Padding** braucht, und die **Einwegfunktion** mit ihren zwei Beispielen (Faktorisierung, diskreter Logarithmus) sowie die drei Familien RSA/DH/ECC einordnen. Faktenwissen: RSA wurde 1977 von Rivest, Shamir und Adleman vorgeschlagen, beruht auf dem Faktorisierungsproblem, und für 128-Bit-symmetrische Sicherheit braucht es rund 3072 Bit RSA-Schlüssellänge.

## Mehr dazu

- **Practical Networking — RSA Algorithm, mit Beispiel** (EN): komplette Schlüsselerzeugung und Ver-/Entschlüsselung an Zahlen vorgerechnet. https://www.youtube.com/watch?v=Pq8gNbvfaoM
- **Eddie Woo — The RSA Encryption Algorithm (1 of 2: Computing an Example)** (EN): sehr ruhige, kleinschrittige Beispielrechnung. https://www.youtube.com/watch?v=4zahvcJ9glg
- **Art of the Problem — RSA Encryption** (EN): die Intuition (Trapdoor-Einwegfunktion, Euler) hinter RSA. https://www.youtube.com/watch?v=wXB-V_Keiu8
- **Square-and-Multiply — Rechenbeispiel** (EN): der Algorithmus an einer konkreten Potenz Schritt für Schritt. https://www.youtube.com/watch?v=cbGB__V8MNk`,
  },
};

const lecture06: Explanation = {
  id: "cs-2026-l06",
  lesson: 6,
  title: {
    de: "Digitale Signaturen, Hash-Funktionen und Message Authentication Codes (MAC)",
  },
  content: {
    de: `Bisher drehte sich alles ums Geheimhalten — um Vertraulichkeit. In diesem Kapitel geht es um die andere große Hälfte der Sicherheit, die man im Alltag genauso braucht und doch oft vergisst: *Wer hat das wirklich geschickt, und ist es unterwegs unverändert geblieben?* Das sind die Schutzziele **Authentizität** und **Integrität**. Drei Werkzeuge bauen wir dafür auf, und sie hängen eng zusammen: die **digitale Signatur** (die asymmetrische, fälschungssichere Unterschrift), die **Hash-Funktion** (der digitale Fingerabdruck, der Signaturen erst praktisch macht — und nebenbei Passwörter schützt) und der **MAC** (der schnelle, symmetrische Cousin der Signatur). Am Ende verstehst du auch, warum jede seriöse Webseite ein Schloss-Symbol trägt und warum dein Passwort niemals im Klartext in einer Datenbank stehen sollte.

## Digitale Signaturen: mit dem privaten Schlüssel unterschreiben

Erinnere dich an eine Schwäche der symmetrischen Kryptografie: Sie kann keine **Nichtabstreitbarkeit** (Non-Repudiation) garantieren. Weil beide Seiten denselben geheimen Schlüssel besitzen, lässt sich im Streitfall nie beweisen, *welche* von ihnen eine Nachricht erzeugt hat — beide hätten es gekonnt. Die digitale Signatur löst genau das, und sie tut es, indem sie die RSA-Logik einfach spiegelt. Beim Verschlüsseln benutzt man den *öffentlichen* Schlüssel des Empfängers; beim Signieren benutzt Alice ihren *eigenen privaten* Schlüssel. Sie erzeugt also s = sig(x) mit ihrem privaten Schlüssel und schickt das Paar (x, s) los. Jeder, der ihren öffentlichen Schlüssel kennt, kann anschließend verifizieren, ob die Signatur passt — das Ergebnis ist schlicht wahr oder falsch. Weil nur Alice ihren privaten Schlüssel besitzt, kann auch nur sie eine gültige Signatur erzeugen; und weil jeder mit dem öffentlichen Schlüssel prüfen kann, ist die Unterschrift öffentlich überprüfbar. Das liefert gleich drei Dinge auf einmal: **Integrität** (eine nachträglich geänderte Nachricht fällt bei der Prüfung durch), **Authentizität** (die Nachricht stammt nachweislich von Alice) und damit die ersehnte **Nichtabstreitbarkeit**. Das funktioniert mit jedem asymmetrischen Verfahren — RSA, Diffie-Hellman, elliptische Kurven —, und die konkrete RSA-Variante hast du im vorigen Kapitel schon von Hand gerechnet.

![Digitale Signatur: mit dem privaten Schlüssel signieren, mit dem öffentlichen verifizieren](https://upload.wikimedia.org/wikipedia/commons/9/99/Digital_Signature_diagram_de.svg "Die digitale Signatur ist das Spiegelbild der Verschlüsselung: signiert wird mit dem privaten Schlüssel, geprüft mit dem öffentlichen.")

> **Eselsbrücke (Spiegelbild):** **Verschlüsseln: öffentlich → privat.** **Signieren: privat → öffentlich.** Mit dem *privaten* Schlüssel unterschreibst du (das kann nur einer), mit dem *öffentlichen* prüft jeder.

## Schritt für Schritt: eine RSA-Signatur von Hand

Nehmen wir das RSA-Schlüsselpaar aus dem letzten Kapitel (n = 33, e = 3, d = 7) und signieren die Nachricht m = 4. Alice rechnet die Signatur s = mᵈ mod n = 4⁷ mod 33. Mit Square-and-Multiply oder direkt: 4⁷ = 16384, und 16384 mod 33 = 16 (denn 496·33 = 16368). Also ist s = **16**. Bob verifiziert mit Alices öffentlichem e: sᵉ mod n = 16³ mod 33. Schrittweise: 16² = 256 ≡ 25 mod 33, dann 25·16 = 400 ≡ 4 mod 33. Heraus kommt **4** = m — die Signatur ist gültig, die Nachricht stammt von Alice.

In der Praxis signiert man aber keine ganzen Dokumente direkt, denn die wären viel größer als n. Stattdessen nutzt man **Hash-Signaturen**: Man jagt das Dokument zuerst durch eine kryptografische Hash-Funktion H, die einen kurzen Fingerabdruck x = H(m) erzeugt, und signiert *nur diesen Fingerabdruck*: s = H(m)ᵈ mod n. Der Empfänger berechnet den Hash der erhaltenen Nachricht selbst neu, entschlüsselt die Signatur mit dem öffentlichen Schlüssel und vergleicht beide Werte — stimmen sie überein, ist das Dokument unverändert *und* von Alice. (Als Spielzeug-Hash dient gern die Quersumme der Buchstabenwerte: Der Hash von „ABC" wäre 65+66+67 = 198; man signiert dann diese 198 statt der ganzen Nachricht.) Wie echte Hash-Funktionen aussehen und welche Eigenschaften sie haben müssen, klären wir gleich im übernächsten Abschnitt.

> **Eselsbrücke (Verschlüsseln vs. Signieren):** **Verschlüsseln** = mit dem **öffentlichen** Schlüssel des Empfängers (nur er liest). **Signieren** = mit dem **eigenen privaten** Schlüssel (alle prüfen, nur du konntest es). Die zwei Schlüssel tauschen einfach die Rollen.

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

Genau diese Wahrscheinlichkeit lässt sich überschlagen, und das Ergebnis verblüfft jedes Mal. Für N mögliche Hashwerte und k zufällig eingefügte Werte nähert man die Kollisionswahrscheinlichkeit mit **P ≈ 1 − e^(−k(k−1)/2N)**. Nehmen wir einen **48-Bit-Adressraum**, also N = 2⁴⁸ ≈ 2,8·10¹⁴, und **k = 2,3·10⁷** Dateien:

- Der Zähler im Exponenten ist k(k−1)/2 ≈ k²/2 = (2,3·10⁷)² / 2 ≈ 2,6·10¹⁴.
- Der Exponent ist also −2,6·10¹⁴ / 2,8·10¹⁴ ≈ −0,94.
- Damit P ≈ 1 − e^(−0,94) ≈ 1 − 0,39 ≈ **0,61**, also rund **60 %**.

Über 60 % Kollisionswahrscheinlichkeit bei „nur" 23 Millionen Einträgen in einem 281-Billionen-großen Raum — das ist die Wucht des Geburtstagsparadoxons, und genau deshalb wählt man Hashes lieber 256 als 128 Bit lang.

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

Diese letzte Krypto-Vorlesung trägt kein eigenes Übungsblatt — sie wird in der Klausur als Verständnis- *und* Rechenstoff geprüft, oft eng verzahnt mit dem RSA-Kapitel. Rechnen können musst du die **RSA-Signatur von Hand**: signieren mit s = mᵈ mod n (privater Schlüssel) und verifizieren mit sᵉ mod n = m (öffentlicher Schlüssel), inklusive der **Hash-Signatur** (erst H(m) bilden, etwa als Quersumme, dann signieren). Dazu das **Geburtstagsparadoxon**: die **Kollisionswahrscheinlichkeit** mit der Näherung 1 − e^(−k(k−1)/2N) überschlagen und begründen, warum schon ~2^(n/2) Versuche für eine Kollision genügen (ein n-Bit-Hash liefert nur n/2 Bit Kollisionssicherheit). Auf der Wissensseite: den **Signatur-Ablauf** (signieren mit kpr, prüfen mit kpub) erklären und sauber gegen die Verschlüsselung abgrenzen; den **MITM auf den öffentlichen Schlüsselaustausch** schildern und wie **Zertifikate / CA / PKI / X.509** ihn verhindern; warum **RSA-Signaturen Padding** brauchen (sonst der Existential-Forgery- bzw. DoS-Trick mit beliebigen „Signaturen"); warum man **erst hasht und dann signiert**; die **drei Hash-Eigenschaften** (Urbild-, schwache und starke Kollisionsresistenz) mit je einem Angriffsszenario; die **Hash-Familien** (MD4-Familie mit MD5/SHA-1/SHA-2 gegenüber dem anders gebauten SHA-3); **Passwort-Hashing** mit **Salting** gegen Rainbow-Tables; und **MAC gegen Signatur** (symmetrisch/asymmetrisch, Tempo, Non-Repudiation) inklusive der Schwäche von Secret-Prefix- und Secret-Suffix-MAC und warum **HMAC** sie behebt.

## Mehr dazu

- **Computerphile — Hashing Algorithms and Security** (EN): die drei Anforderungen an Hashes, der Avalanche-Effekt und warum Kollisionen gefährlich sind. https://www.youtube.com/watch?v=b4b8ktEV4Bg
- **Practical Networking — Hashing, Algorithms, and Collisions** (EN): Digest, Kollisionen und die SHA-Familie sauber erklärt. https://www.youtube.com/watch?v=HHQ2QP_upGM
- **SHA-256-Live-Demo** (interaktiv): tippe Text und beobachte, wie sich der Hash bei jeder Änderung komplett ändert. https://andersbrownworth.com/blockchain/hash`,
  },
};

export function buildCybersicherheit2026Explanations(): Explanation[] {
  return [lecture01, lecture02, lecture03, lecture04, lecture05, lecture06];
}
