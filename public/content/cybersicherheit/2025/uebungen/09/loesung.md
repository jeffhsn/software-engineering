# Übungsblatt 2: Praktische Übung Symmetrische Kryptographie

> Converted from PDF | Pages: 22

---

© `SYSSEC`, Prof. Dr. Lucas Davi

Übungsblatt 9:

### DoS, DNS, CSS, SQL-Injection
Christian Niesler

### Fakultät für Informatik
Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universität Duisburg-Essen
Übung Cybersicherheit

-- 1 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
- Beschreiben Sie die drei Typen von XSS Angrien: Reected XSS,
Stored `XSS` und `DOM`-Based `XSS`.

### Stored XSS:
- XSS-Attacken die permanent auf dem Server gespeichert werden zum Beispiel in einer
Datenbank (Nachrichtenforum, Besucherlog, Kommentarfeld)

- Das Opfer erhält den böswilligen Code direkt vom Server, sobald Informationen vom Server
angefragt werden

### Vorlesung Cybersicherheit SoSe 2025
-- 2 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Re=ected `XSS`

- Bei re=ected XSS wird der böswillige Code vom Server aufs Opfer re=ektiert
- Dies kann z.B. durch eine Fehlermeldung erfolgen
- In den Fällen wo die Webseite auf Basis von Client kontrollierten Input eine Antwort erzeugt
- Re=ected Angri?e dem Opfer z.B. durch einen manipulierten Link ausgeliefert
`DOM` `XSS` oder Client-Side `XSS`

- Bei DOM XSS wird die lokale Dom Struktur auf dem Client modiAziert bzw der client-seitige
Code verändert

- Der böswillige Code wird nicht mit der Serverantwort ausgeliefert, aber der client-seitige
Code verhält sich aufgrund lokaler Änderungen der Umgebung anders

### Vorlesung Cybersicherheit SoSe 2025
-- 3 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
- Um XSS zu vermeiden emp&ehlt es sich jegliche Benutzereingaben zu &ltern (‘Sanitization’ ). Eine
weitere Maßnahme zur Vermeidung von `XSS` ist `CSP` (Content Security Policy). Beschreiben Sie

die Funktion sowie die Vor- und Nachteile von `CSP`.

- Es gibt einen HTTP CSP Header, welcher mit ausgeliefert werden kann.
- Dieser speziAziert, welche Dateien (bzw. welchen Ursprungs) geladen werden dürfen.
Vorteile:

- erschwert XSS-Angri?e
Nachteile:

- erschwert lokales debugging
Vorlesung Cybersicherheit SoSe 2025

-- 4 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
- Beschreiben Sie wie SQL-Injection funktioniert und wie Sie eine Anfrage formulieren würden, um
die Loginmaske einer Webseite zu umgehen und auf den Account administrator zuzugreifen, von

der Sie wissen, dass die Passwörter mit `SQL`-Query in Listing 1 überprüft werden. Sie können dabei

die Parameter $username und $password über das Formular frei eingeben.

Aufgrund fehlender „Sanitization“ können `SQL` Befehle über Parameter wie username oder

passwort injiziert werden

### SQL-Query als Batched statement:
Select uid From users Where username = “test” and password = “test”; Select * From users

### Where username = “administrator!“
$passwort ist dann: “test“;

### Select * From users Where username = “administrator“
Vorlesung Cybersicherheit SoSe 2025

-- 5 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
- Beschreiben Sie sowohl abstrakt als auch konkret, wie Sie den Query aus der vorhergehenden
Teilaufgabe (Listing 1) verändern müssen, um `SQL`-Injection zu verhindern. Sie können sich bei

der konkreten Beschreibung eine gängige Programmiersprache für das Web (z.B. `PHP`) aussuchen.

Sonderzeichen wie das genutzte ‘;‘ maskieren!

Bsp: $escaped_password = mysql_real_escape_String ($password);

### Vorlesung Cybersicherheit SoSe 2025
-- 6 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Denial of Service
- Was ist das (technische) Ziel eines DoS-Angris?
Ausgesuchte IT-Systeme koordiniert mit einer großen Last

spezieller Anfragen durch Erschöpfung der verfügbaren

Ressourcen lahmzulegen.

Normale Anfragen können nicht mehr bedient werden.

### Beispiele für Ressourcen:
- CPU (Rechenleistung)
- RAM (Speicher)
- Bandbreite Vorlesung Cybersicherheit SoSe 2025
-- 7 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Denial of Service
- Benennen Sie die CIA-Ziele.
Welche dieser Ziele werden bei einem DoS-Angri-verletzt?

### Die CIA-Ziele:
ConAdentiality (Vertraulichkeit)

### Integrity (Integrität)
Availability (Verfügbarkeit)

DoS-Angri?e betre?en nur die Verfügbarkeit.

### Vorlesung Cybersicherheit SoSe 2025
-- 8 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Denial of Service
- Benennen und beschreiben Sie unterschiedliche
Angristechniken für die Durchführung von DoS-Angrien.

### Single Client
Ein einzelner Client erzeugt viele Anfragen.

### AmpliAcation
Andere Protokolle werden benutzt, um die Menge und Größe von Anfragen zu

erhöhen.

### Botnetze
Malware auf Clients schickt koordiniert Anfragen.

### Vorlesung Cybersicherheit SoSe 2025
-- 9 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Denial of Service
- Worin unterscheiden sich DoS und DDoS-Angrie? Warum sind
letztere schwieriger abzuwehren?

### DoS: Denial of Service
Kann auch von einem einzelnen Client ausgehen.

### DDoS: Distributed Denial of Service
Viele unterschiedliche Anfragequellen. Verteilt und Heterogen.

Schwer von richtigen Anfragen zu unterscheiden.

### Wenig Möglichkeiten Quelle auf Netzebene zu
identi&zieren/blockieren.

### Vorlesung Cybersicherheit SoSe 2025
-- 10 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Denial of Service
- Was ist das Konzept hinter ‚Ampli&cation‘-Angrien?
Bei AmpliAcation und Re=ection-Angri?en werden andere Protokolle

benutzt um die Menge und Größe von Anfragen zu erhöhen, z.B.

- NTP
- DNS
- SNMP
Benutzt IP-SpooAng (Fälschen der Absenderadresse, um Antwort auf

### Victim zu leiten)
Typischerweise Protokolle die kleine `UDP`-Anfragen mit großen Paketen

beantworten

### Vorlesung Cybersicherheit SoSe 2025
-- 11 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3: Botnetze
- Nennen Sie drei bekannte Botnetze.
Zeus

### Mirai
Ziel: IoT-Geräte

### ConAcker
Bredolab

### Vorlesung Cybersicherheit SoSe 2025
-- 12 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3: Botnetze
- Beschreiben Sie zwei Möglichkeiten, wie ein neues System Teil
eines Botnetzes werden kann.

### Malware, z.B. via Mail
Exploits, also das Ausnutzen von Sicherheitslücken

### Manuelle Installation, z.B. auf Servern
Vorlesung Cybersicherheit SoSe 2025

-- 13 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3: Botnetze
- Was ist ein Command&Control Server?
Ein Command&Control Server steuert die Kommunikation

zwischen dem Angreifer und dem Botnetz. Aufgaben sind das

Verteilen neuer Anweisungen und das Übertragen von Daten.

Als Protokoll wird häuAg `IRC`, `HTTP` oder `DNS` verwendet.

Alternativ können Botnetze auch als P2P Netzwerk organisiert

werden.

### Vorlesung Cybersicherheit SoSe 2025
-- 14 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3: Botnetze
- Skizzieren Sie ein Botnetz aus einem Angreifer, einem C&C
Server, drei Bots und einem Opfer.

### Vorlesung Cybersicherheit SoSe 2025
Angreifer

### C&C
Bots

### Victim
-- 15 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Wie kann man Denial-of-Service Angrie abwehren?
Erhöhen der Ressourcen

### On-site Abwehrstrategien
- White/Blacklisting
- Login-Beschränkung, CAPTCHAs, Browser-Detection
- Sperren von Adressbereichen
O?-Site Maßnahmen

- Cloud-Umzug
- Caching, z.B. über CDN
- BGP-Routing anpassen
Vorlesung Cybersicherheit SoSe 2025

-- 16 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Nennen und beschreiben Sie mögliche Probleme bei der
Erkennung von DDoS-Angrien auf Schicht 7 des `OSI`-Modells.

### Schicht 7: Application Layer
Viele normale Requests

### Packet Inspection teuer und komplex
Verschlüsselung, z.B. `TLS`

- Verschlüsselte Pakete schwer zu identiAzieren
- Inspektion hebelt Sicherheitsmodell aus
Vorlesung Cybersicherheit SoSe 2025

### CC-BY Deadlyhappen
-- 17 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Was ist das grundsätzliche Problem bei der Erhöhung der
Kapazität von IT-Infrastruktur zur Abwehr von DoS-Angrien?

### Angri?e haben viele Ressourcen
Übersteigen i.d.R. die Möglichkeiten der Aufrüstung

### Schlechter Kosten-Nutzen E?ekt, da nur im Angri?sfall
gebraucht

### Vorlesung Cybersicherheit SoSe 2025
-- 18 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Beschreiben Sie den Unterschied zwischen On-Site und O-Site
Robustheitsmaßnahmen.

### On-Site:
- Begrenzt durch eigene Ressourcen
- Bandbreite
- Serverkapazität
- Erhöhung begrenzt sinnvoll
O?-Site:

- Externe Dienstleister
- OVoading an CDN
- Filtern des TraWcs vor dem eigenen Netz
Vorlesung Cybersicherheit SoSe 2025

-- 19 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Was ist ein Content Delivery Network (CDN)? Wie kann man es zur Abwehr
von DDoS-Angrien einsetzen?

Netzwerk von Servern zur Bereitstellung von großen Datenmengen

### Weit verteilt, gute Anbindung
Populär für Streaming-Dienste, Downloads, Bilder, populäre

### Bibliotheken
Abschirmung des eigenen Netzes durch Cloud-Dienst

- Caching
- Mitigation und Detection
- Scaling
Vorlesung Cybersicherheit SoSe 2025

-- 20 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4: Abwehr von DoS
- Wie funktioniert DNS-basiertes Routing innerhalb eines CDNs?
Wie kann man stabil und einfach Last auf Server

verteilen?

### DNS: Namensau=ösung nach IP-Adresse
- Kurze Gültigkeitsdauer
- Unterschiedliche IP-Adresse je nach Anfrage
-> gute Lastverteilung

### Vorlesung Cybersicherheit SoSe 2025
CC-BY-SA kanoha

-- 21 of 22 --

© `SYSSEC`, Prof. Dr. Lucas Davi

### Vielen Dank für Ihre Aufmerksamkeit
Übung Cybersicherheit SoSe 2024

### Christian Niesler
Tristan Löding

### Fakultät für Informatik
Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universität Duisburg-Essen
-- 22 of 22 --