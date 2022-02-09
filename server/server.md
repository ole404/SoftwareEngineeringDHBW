# Backend
"Das Backend ist eine REST-Schnittstelle zur Datenbank. Hier werden alle Daten gespeichert, die vom Client an den Server gesendet werden. Die Daten werden in einem MongoDB-Datenbank gespeichert. Die Datenbank wird mit dem Docker-Container gestartet. Die Datenbank wird mit dem Docker-Container gestartet, der auf dem Server läuft."
Der obere Text wurde von GitHub Copilot geschrieben. Er klingt zwar komisch aber daran ist alles richtig. Leider passiert danach nichts weiter als dass immer wieder erwähnt wird, dass der Docker Contianer auf dem Server läuft. Der restliche Text ist also eigene Arbeit.

Für das Backend wird das Express-Framework verwendet. In Anlehnung an das MVC Pattern dient der Router als View lediglich zur Definition von Schnittstellen und Überprüfung von Eingaben. Die gesamte Geschäftslogik ist in den Services definiert und die Schemas sind das Model.
Elementar sind auch die Wortspiele bei der Benennung, weil Software, die nicht ihren Metaphern treu bleibt nicht ernstgenommen werden würde (Siehe Flask, SQLAlchemy oder BeatifulSoup etc.).
