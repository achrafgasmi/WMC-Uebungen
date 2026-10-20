# Uebung4
Ich habe Update-Abfragen eingebaut und Ergebnisse ausgelesen und ausgegeben.
Ich habe auch die Spalte herkunftsland sowie die Tabellen playlist und playlist_track hinzugefügt(da kann ich dann eine Playlist erstellen und die tracks in playlist_track zuordnen(m:n beziehung) ).
Meine Änderungen stehen in demo.ts, schema.ts und db.ts und sind mit Uebung4 kommentiert.



## Recherche: Schema-Migration

Eine Schema-Migration ist eine Änderung am Aufbau einer bestehenden Datenbank. Dabei kann man zum Beispiel eine neue Tabelle oder eine neue Spalte hinzufügen.

Solche Änderungen werden in Migrationsdateien gespeichert. Dadurch kann man nachvollziehen, wann und wie die Datenbank verändert wurde. Die Änderungen können auch auf anderen Datenbanken in derselben Reihenfolge ausgeführt werden.

Vorhandene Daten sollen dabei möglichst erhalten bleiben. Beim Löschen einer Spalte können allerdings Daten verloren gehen. Deshalb sollte man Änderungen vorher prüfen.

Ein Update verändert gespeicherte Werte. Eine Schema-Migration verändert dagegen die Struktur, in der diese Werte gespeichert werden.