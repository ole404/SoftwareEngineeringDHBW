# Backend
"Das Backend ist eine REST-Schnittstelle zur Datenbank. Hier werden alle Daten gespeichert, die vom Client an den Server gesendet werden. Die Daten werden in einem MongoDB-Datenbank gespeichert. Die Datenbank wird mit dem Docker-Container gestartet. Die Datenbank wird mit dem Docker-Container gestartet, der auf dem Server läuft."
Der obere Text wurde von GitHub Copilot geschrieben. Er klingt zwar komisch aber daran ist alles richtig. Leider passiert danach nichts weiter als dass immer wieder erwähnt wird, dass der Docker Contianer auf dem Server läuft. Der restliche Text ist also eigene Arbeit.

Für das Backend wird das Express-Framework verwendet. In Anlehnung an das MVC Pattern dient der Router als View lediglich zur Definition von Schnittstellen und Überprüfung von Eingaben. Die gesamte Geschäftslogik ist in den Services definiert und die Schemas sind das Model.
Elementar sind auch die Wortspiele bei der Benennung, weil Software, die nicht ihren Metaphern treu bleibt nicht ernstgenommen werden würde (Siehe Flask, SQLAlchemy oder BeatifulSoup etc.).
## Main
Main dient lediglich zum Start des Servers und zur Definition einiger einstellungen. Unter Anderem wird dort die body größe angepasst um Bilder über Base64 zu übertragen. 
Die Entscheidung statt einer eigenen Post Request ein BLOB zu übertragen diese Möglichkeit zu nutzen dient der Einfachheit des des Servers. Die Alternativen wie z.B. Mulder sind zu umfrangreich für die simple Anwendung. Zudem müssen die Bilder in allen Software Teil nie in ein anderes Format konvertiert werden.
## TreeRod
TreeRod definiert die Routen und ruft die entsprechenden Services auf. Wichtiger Teil von TreeRod ist die Validierung der Eingaben. Da die API offen ist sollen so fehlerhafte oder schädliche Anfragen verhindert werden. Im Falle einer solchen Fehlerhaften werden die entsprechenden HTTP Error Codes zurückgesendet. Da einige Fehler nicht in die Spezifikationen von HTTP passen wurden für einige Fehler eigene Fehlercodes zu bessere Differenzierung genutzt:
- 469: Der Baum ist kein echter Baum

Verantwortlich für diesen Software Teil sind Ole und Philipp.
## TreeStorage
TreeStorage ist die Anbindung an den Datenbank Server


Verantwortlich für diesen Software-Teil sind Ole und Philipp.

## EloService
blablabla

Verantwortlich für diesen Software-Teil ist Philipp.

## TreeCognition
Ziel des Services ist die Erkennung von Bäumen auf Bildern mit Googles Image Classification Service. Für dieses Service wird auch die `gcloud.json` benötigt. Jeder hochgeladene Baum wird an Google Cloud gesendet und es wird überprüft was sich auf dem Bild befindet und wenn das Stichwort "Tree" sich in der Liste befindet wird der Baum als echter Baum gewertet. Dadurch lassen sich zwar auch Bäume die keine Weihnachtsbäume sind hochhladen, aber die Option Weihnachtsbaum ist wäre zu spezifisch und würde zu mehr Fehlern und dementsprechend zu einer schlechteren UX führen. Außerdem ist davon auszugehen, dass Bäume die keine Weihnachtsbäume sind direkt heruntergevotet werden.
Verantwortlich für diesen Software-Teil ist Ole

