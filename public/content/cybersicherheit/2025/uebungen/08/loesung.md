# loesung

> Converted from PDF | Pages: 18

---

### Diffie Hellmann Schlüsselaustausch
Aufgabe 1

a p 13 g 2 a 4 6 5

### A g mod p
A 2 mod 13 16 mod 13 3

### B gb mod p
B 25 mod 13 32 mad 13 6

### A 3 B 6
s B mod p 11 Ab modp

s 6 mod 13 9

### S 35 mad 13 9
shared secrets ist 9

-- 1 of 18 --

b p 23 g 9 a 15 6 17

### A g mod p 9
5

mod 23 6

### B gb modp 9 7
mod 23 3

### S B mod p 11 Abmodp
So 3 mad 23 12

### Sz 6 mod 23 12
secret s ist 12

c

p 19

g 13 a 10 6 2

### A g mod p 1310 mod 19 6
B gb mod p 132 mod 19 17

### S1 B mod p 17 mod 19 17
Sz Ab mod p 62 mod 19 17

secrets ist 17

-- 2 of 18 --

### Aufgabe 2 4509 Certificates
a CA bedeutet Certification

### Authorithy und wird manchmal
auch Tmst Center genannt

eine CA hat ein Verzeichnis

von öffentlichen Schlüsseln inkl

### Identitäts
beschreibung Die CA

beglaubigt die Verbindung zwischen

der Identität und dem öffentlichen

### Schlüssel
Die CA übernimmt die

### Identität prüfung und stellt
Zertifikate aus anhand derer

die Identität des Kommunikations

partners beglaubigt werden soll

### Die CA führt eine Liste
mit ungültigen Zertifikaten

dadurch können ausgestellte Zertifikate

widerrufen werden Im Fall z.B

-- 3 of 18 --

das ein privater Schlüssel an

die Öffentlichkeit gelangt

### Die CA ist eine Trusted Third
Party bzw die Vertrauensbasis

für die Identifikation aller

### Kommunikationsteilnehmer
b 1 Zertifikatssperrlisten `CRL`

### Certificate Revocation hist
Eine RL ist eine einfache Liste

aller Zertifikate die eine CA

vor dem geplanten Ablauf des

### Zertifikats widerrufen hat
Die Gültigkeit eines Zertifikats

muss bei jeder Verbindung

durch den Vergleich mit der Liste

überprüft werden

-- 4 of 18 --
2 online dienste mit Protokollen

für die effiziente Überprüfung

der Gültigkeit z.B

### OSP siehe Teilaufgabe c
c `OSP` Online Certificate Stakes

### Protocol
## OCSP
1 Der Client erhält das

zu überprüfende Zertifikat
2 Der Client schickt einen

### OSP Request Anfrage
über `HTTP` mit der

### Seriennummer des Zertifikats
3 `OCSP` Server antwortet mit

dem Status des Zertifikats

### Gut widerrufen unbekannt
good revoked unknown

-- 5 of 18 --

### Hi IET Idatyba
I Y.u.`IEI`

### I I
I signed Gsp

gResponsee

### Aufgabe 3
509 `PKI` Public Key Infrastructure

zentrales Vertrauensmodell

### Spezielle Zertifizierungsstellen
verifizieren Herkunft bzw die

### Verfasser von Public Keys
## HTTPS TLS
-- 6 of 18 --

### Web of Trust Wat
dezentrales Vertrauensmodell

### Teilnehmer des Wort verifizieren
Herkunft und Verfasser von public

### Keys
`PGP`

schematische Web of Trust

### Darstellung aus Wikipedia
Nutzer verifizieren eigenständig Schlüssel
2 B durch private Treffen

### Es kann indirekt drauf vertraut werden dass
wenn ein Freund den Schlüssel selbst

-- 7 of 18 --

überprüft verifiziert hat dieser

einigermaßen vertrauenswürdig ist

### Vor und Nachteile
Organisationen mit zentraler Verwaltung

zentrale Struktur entspricht

der `PKI`

alle zertifikate können

zentral gesteuert verwaltet

werden

beim Wort ist der Aufwand

groß neue Zertifikate

zu erstellen Mitarbeiter

müssten sich gegenseitig

zertifizieren

### Beim GoT ist es schwierig
Zertifikate zu entziehen z.B

### Verlassen des Unternehmens
-- 8 of 18 --

### Privatanwender
`PKI` der Anwender muss der

### CA vertrauen
Wet der Anwender kann seine

### Freunde selbst privat überprüfen
ohne formalen Prozess

### Aktivist
Staat kann die Pkt evtl

beeinflussen

### Beim Wat gibt es keine
zentrale Kontrollstelle

### Aktivisten sind von staatlichen
Repressalien weitgehend sicher

-- 9 of 18 --

### Aufgabe h
9

Wurzelzertifikate (Root-Zertifikate) aus [https://letsencrypt.org/de/certificates/](https://letsencrypt.org/de/certificates/)

Unsere Wurzelzertifikate (Root-Zertifikate) werden sicher, vom Internet getrennt,

aufbewahrt. Wir stellen Anwenderzertifikate aus, welche durch die in dem folgenden

Abschnitt beschriebenen Zwischenzertifikate (Intermediate-Zertifikate) signiert wurden.

Während wir unsere neue Root X2 verschiedenen Root-Programmen vorlegen, haben wir

sie für zusätzliche Kompatibilität mit Root X2 quersigniert (“cross-signed”).

### Zwischenzertifikate (Intermediate-Zertifikate)
Unter normalen Umständen kommen Zertifikate, die von Let’s Encrypt ausgestellt worden,

von R3, einem `RSA`-Zwischenzertifikat. Wir haben auch ein neues `ECDSA`-

Zwischenzertifikat (“E1”) ausgestellt, mit welchem wir in Kürze ebenfalls signieren werden.

Diese Seite wird aktualisiert, sobald die Umsetzung abgeschlossen wurde.

Unsere anderen Zwischenzertifikate (“R4” und “E2”) sind für die Notfallwiederherstellung

(Disaster-Recovery) vorgesehen und werden nur genutzt, wenn wir die Möglichkeit

verlieren mit unseren primären Zwischenzertifikaten zu signieren. Wir nutzen die X1-, X2-,

X3-, und X4-Zwischenzertifikate nicht mehr.

-- 10 of 18 --

Dies ist heute die häufigste Art der Challenge. Let’s Encrypt gibt Ihrem `ACME`-Client einen Token

und Ihr `ACME`-Client legt eine Datei auf Ihrem Webserver unter [http://<`YOUR_DOMAIN`>/.well-](http://<`YOUR_DOMAIN`>/.well-)

known/acme-challenge/<`TOKEN`> ab. Diese Datei enthält den Token sowie einen Fingerabdruck

Ihres Kontoschlüssels. Sobald Ihr `ACME`-Client Let’s Encrypt mitteilt, dass die Datei fertig ist,

versucht Let’s Encrypt sie abzurufen (möglicherweise mehrmals von mehreren Standorten aus).

Wenn unsere Validierungsprüfunge mit den Antworten von Ihrem Webserver übereinstimmen, wird

die Validierung als erfolgreich angesehen und Sie können mit der Ausstellung Ihres Zertifikats

fortfahren. Wenn die Validierungsprüfungen fehlschlagen, müssen Sie es mit einem neuen Zertifikat

erneut versuchen.

Unsere Implementierung der `HTTP`-01-Challenge folgt Weiterleitungen, bis zu 10 Weiterleitungen

tief. Es werden nur Weiterleitungen zu “http:” oder “https:” akzeptiert und nur zu den Ports 80 oder

## 443. Es werden keine Umleitungen zu IP-Adressen akzeptiert. Bei der Umleitung zu einer HTTPS-
`URL` werden keine Zertifikate überprüft (da diese Abfrage gültige Zertifikate erstellen soll, kann es

vorkommen, dass selbstsignierte oder abgelaufene Zertifikate vorhanden sind).

b Lets encrypt nutzt das `ACME`

### Protokoll und API
Es gibt mehrere Möglichkeiten sich

als Eigentümer des Webangebots

zu verifizieren
1 `HTTP` challenge

[https://letsencrypt.org/de/docs/](https://letsencrypt.org/de/docs/)

challenge-types/

-- 11 of 18 --

Die `HTTP`-01 Challenge kann nur auf Port 80 durchgeführt werden. Erlauben von anderen Ports,

würde die Challenge weniger sicher machen und ist nach dem `ACME` Standard nicht erlaubt.

### Vorteile:
Ohne Fachkenntnisse in der Domainverwaltung einfach zu automatisieren.

Erlaubt Hosting Providern das Ausstellen von Zertifikaten für `CNAME` Domains.

### Funkioniert mit jedem Standard-Webserver
Nachteile:

Funktioniert nicht, wenn Ihr `ISP` Port 80 blockiert (selten, aber es gibt solche ISPs)

Let’s Encrypt erlaubt diese Challenge nicht zum Ausstellen von Wildcard Zertifikaten

Wenn Sie mehrere Webserver haben, müssen Sie sicherstellen, dass die Dateien überall verfügbar

sind.

Diese Challenge fragt Sie zur Überprüfung der Kontrolle des `DNS` für Ihren Domainnamen durch

Einfügen eines speziellen `TXT` Eintrags unter der Domain. Es ist schwieriger zu konfigurieren als

`HTTP`-01, aber funktioniert in Szenarien, wo `HTTP`-01 nicht funktioniert. Es erlaubt auch die

Ausstellung von Wildcard-Zertifikaten. Nachdem Let’s Encrypt Ihrem `ACME` Client einen Token

gegeben hat, erstellt Ihr Client einen `TXT` Eintrag abgeleitet von diesem Token und Ihrem

Kontoschlüssel und fügt diesen Eintrag als _acme-challenge.<`YOUR_DOMAIN`>. Dann fragt Let’s

Encrypt das `DNS`-System für diesen Eintrag. Wenn er gefunden wurde, können Sie mit der
2 `DNS` challenge

-- 12 of 18 --

Ausstellung des Zertifikats fortfahren.

Da die Automatisierung von Ausstellung und Erneuerung sehr wichtig ist, ist die Verwendung von

`DNS`-01-Challenge nur sinnvoll, wenn Ihr `DNS`-Anbieter über eine `API` verfügt, mit der Sie

Aktualisierungen automatisieren können. Unsere Community hat eine Liste solcher `DNS`-Anbieter

hier gestartet. Ihr `DNS`-Anbieter ist möglicherweise derselbe wie Ihr Registrar (das Unternehmen,

bei dem Sie Ihren Domain-Namen gekauft haben) oder er ist möglicherweise anders. Wenn Sie

Ihren `DNS`-Anbieter ändern möchten, müssen Sie nur einige kleine Änderungen an Ihrem Registrar

vornehmen. Sie müssen nicht warten, bis Ihre Domain fast abgelaufen ist.

Beachten Sie, dass das Abspeichern der vollen `DNS` `API` Zugriffsberechtigungen auf Ihren

Webserver signifikant die Möglichkeit vergrössert, dass Ihr Webserver gehackt wird. Beste Praxis ist

die Benutzung spezieller `DNS` `API` Zugriffsschlüssel oder die Durchführung der `DNS` Validierung von

einem separaten Server und automatischen Kopieren des Zertitikats auf Ihren Webserver.

Sie können `CNAME` Einträge oder NS Einträge zur Delegierung der Antwort zur Challenge zu

anderen `DNS` Zonen erstellen, seitdem Let’s Encrypt bei der Suche nach `TXT` Einträgen für die

DNS01-Validierung dem `DNS` Standard folgt. Das kann benutzt werden bei Delegierung der _acme-

challenge Subdomain zu einem speziellen Validierungs-Server oder Zone. Es kann auch benutzt

werden, wenn Ihr `DNS` Anbieter langsam bei Aktualisierungen ist und sie zu einem schnelleren

delegieren möchten.

Die meisten `DNS`-Anbieter haben eine “Propagierungszeit”, die bestimmt, wie lange es von der

Aktualisierung eines `DNS`-Eintrags bis zur Verfügbarkeit auf allen Servern dauert. Es kann schwierig

-- 13 of 18 --

sein, dies zu messen, da häufig auch anycast verwendet wird, was bedeutet, dass mehrere Server

die gleiche IP-Adresse haben können. Je nachdem, wo auf der Welt Sie sich befinden, können Sie

mit einem anderen Server sprechen (und eine andere Antwort erhalten) als Let’s Encrypt. Die besten

`DNS`-APIs bieten Ihnen die Möglichkeit, automatisch zu überprüfen, ob das Update vollständig

verbreitet wurde. Wenn dies bei Ihrem `DNS`-Anbieter nicht der Fall ist, müssen Sie Ihren Client nur

so konfigurieren, dass er lange genug wartet (häufig bis zu einer Stunde), um sicherzustellen, dass

das Update weitergegeben wird, bevor die Validierung ausgelöst wird.

Sie können mehrere `TXT` Einträge für denselben Namen vorhalten, wenn Sie zum Beispiel zur

selben Zeit eine Challenge für ein Wildcard-Zertifikat und ein Nicht-Wildcard-Zertifikat validieren.

Wie auch immer sollten Sie sicherstellen, dass alte `TXT` Einträge immer gelöscht werden, bevor die

Anfrageantwort zu gross wird und Let’s Encrypt sie abweisen wird.

### Vorteile:
Sie können diese Challenge zur Ausstellung von Wildcard-Zertifikaten verwenden.

Es funtioniert gut, wenn Sie mehrere Webserver verwenden.

### Nachteile:
Das Vorhalten der `API` Zugriffsinformationen auf dem Webserver ist ein Risiko

Ihr `DNS` Anbieter bietet vielleicht keine `API` an.

Ihre `DNS` `API` stellt vielleicht keine Information über die Propagierungszeit zur Verfügung

-- 14 of 18 --

Diese Challenge wurde entwickelt, nachdem `TLS`-`SNI`-01 veraltet war und ist als separatater

Standard definiert. Wie `TLS`-`SNI`-01 arbeitet es mit `TLS` auf Port 443. Es benutzt ein angepasstes

`ALPN` Protokoll, um sicherzustellen, dass nur Server auf eine Validierungsanfrage antworten, die

diesen Challenge Typ erwarten. Es erlaubt auch Validierungsanfragen für diesen Challenge Typ mit

Benutzung des `SNI` Felds, das mit dem Domainnamen übereinstimmt, was es wiederum sicherer

macht.

Für die meisten Nutzer ist diese Challenge nicht sinnvoll. Es ist die beste Lösung für Entwickler von

`TLS`-terminierenden Reverse-Proxys, die eine host-basierende Validierung wie `HTTP`-01

durchführen möchten, aber dies aus Separierungsgründen durchgängig als `TLS` Layer

implementieren. Derzeit benutzt bei grossen Hostinganbieter, aber Webserver wie Apache oder

Nginx könnten das irgendwann mal (Caddy kann es jetzt schon).

### Pros:
Funktioniert wenn Port 80 für Sie nicht erreichbar ist.

### Es kann als purer TLS Layer arbeiten
Cons:

Wird nicht unterstützt von Apache, Nginx oder Certbot und wird es auch nicht in naher Zukunft.

Wie `HTTP`-01, wenn Sie mehrere Webserver haben, brauchen zur Antwort alle denselben Content.
3 `TLS` `ALPN`

-- 15 of 18 --

### Vorteile von Let's Encrypt
erst Zertifikaten
1 Die Zertifikate sind

### Kostenlos
2 statt einem formalen

### Verifizierungsprozes wird der
Nachweis der Identität auf technischem

### Wege realisiert Challenges aus
Teilaufgabe b
3 Die Zertifikate lassen sich leicht

einbinden und erneuern

### Besonderheit Let's Encrypt Zertifikate
haben eine geringe Lebensdauer von

nur 90 Tagen Dem Stehlen der

### Zertifikate wird vorgebeugt zudem
ermutigt dies zum Automatisieren der

### Zertifikatserneuerung
-- 16 of 18 --

### Nachteile von Let's Encrypt erstellten
Zertifikaten
1 Es werden nur domain

validierte Zertifikate angeboten

### Andere sind auch nicht in
Planung
2 erweitert validierte Zertifikate

müssen bei Zertifizierungsstellen

kostenpflichtig erstellt

werden
3 Kein Support

d Certificate Transparency

### Neu ausgestellte Zertifikate werden
in CT Logs protokolliert

### An diese Protokolle werden immer
-- 17 of 18 --

neue Datensätze angefügt die

jeweils kryptographisch gesichert

sind Technisch bauen diese

### Protokolle auf der Merkle Tee
Struktur auf

### Vorteil Zertifizierungsstellen unterliegen
dadurch einer viel stärkeren öffentlichen

### Kontrolle 9 Aufsicht Potenziell
böswillige Zertifikate können

schneller entdeckt werden

### Nachteil diese Logs werden mit
der Zeit

-- 18 of 18 --