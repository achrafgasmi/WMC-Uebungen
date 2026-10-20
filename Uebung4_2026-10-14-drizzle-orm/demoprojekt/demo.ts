// demo.ts — Drizzle ORM am Musik-Katalog: Lesen, Schreiben, Auswerten.
// Zeigt zu jeder Query das erzeugte SQL (toSQL()) — ein ORM ersetzt SQL
// nicht, es erzeugt es. Laufen mit:  deno task demo
import { and, count, desc, eq, like } from "drizzle-orm";
import { oeffneDb } from "./db.ts";
import { album, artist, track, playlist, playlistTrack } from "./schema.ts";

// Datei-DB im Projektordner — bei jedem Lauf neu anlegen.
await Deno.remove("musik.db").catch(() => {/* Datei fehlt: egal */});
const db = oeffneDb("musik.db");

// --- Schreiben: insert mit .returning() ------------------------------
const aera = await db.insert(artist)
  .values({ name: "Aera", gruendungsjahr: 1999 })
  .returning();
const nova = await db.insert(artist)
  .values({ name: "Nova", gruendungsjahr: 2012 })
  .returning();
const stille = await db.insert(album)
  .values({ titel: "Silent Lines", jahr: 2015, artistId: aera[0].id })
  .returning();
await db.insert(album)
  .values({ titel: "Night Ferry", jahr: 2012, artistId: nova[0].id });
await db.insert(track)
  .values({ titel: "Silent Lines", dauerSek: 215, albumId: stille[0].id });
await db.insert(track)
  .values({ titel: "Echo Room", dauerSek: 187, albumId: stille[0].id });

// --- Lesen: select .from() .where() ----------------------------------
const fragen = db.select().from(album).where(eq(album.artistId, aera[0].id));
console.log("Lesen, erzeugtes SQL:", fragen.toSQL().sql);
console.log("Lesen, Parameter:", fragen.toSQL().params);
console.log("Lesen, Ergebnis:", await fragen);

// --- Auswerten: orderBy, limit, count --------------------------------
const neueste = await db.select().from(album).orderBy(desc(album.jahr)).limit(
  1,
);
console.log("Neuestes Album:", neueste[0].titel, "(", neueste[0].jahr, ")");

const viele = await db.select({ titel: album.titel, tracks: count() })
  .from(track)
  .innerJoin(album, eq(track.albumId, album.id))
  .groupBy(album.id);
console.log("Tracks pro Album:", viele);

// --- Ändern: update .set() .where() ----------------------------------
await db.update(track)
  .set({ dauerSek: 220 })
  .where(and(eq(track.albumId, stille[0].id), like(track.titel, "Silent%")));
const korrigiert = await db.select().from(track)
  .where(eq(track.titel, "Silent Lines"));
console.log("Nach update:", korrigiert[0].dauerSek, "Sekunden");

// --- Löschen: delete .where() ----------------------------------------
await db.delete(track).where(eq(track.titel, "Echo Room"));
const rest = await db.select({ anzahl: count() }).from(track);
console.log("Tracks nach delete:", rest[0].anzahl);




//Uebung4
//ubdate name und gruendungsjahr
await db.update(artist)
  .set({name: "Aera band"})
  .where(eq(artist.name, "Aera"));
const aeraBand = await db.select().from(artist).where(eq(artist.name, "Aera band"));
console.log("Name von Aera nach update:", aeraBand[0].name);

await db.update(artist)
  .set({gruendungsjahr: 2010})
  .where(eq(artist.id, nova[0].id));
const novaUpdated = await db.select().from(artist).where(eq(artist.id, nova[0].id));
console.log("Gründungsjahr von Nova nach update:", novaUpdated[0].gruendungsjahr);



//Uebung4: ubdate herkunftsland nach erstellung von neue spalte herkunftsland
await db.update(artist)
  .set({herkunftsland: "Deutschland"})
  .where(eq(artist.id, aera[0].id));
const aeraUpdated = await db.select().from(artist).where(eq(artist.id, aera[0].id));
console.log("Herkunftsland von Aera nach update:", aeraUpdated[0].herkunftsland);

await db.update(artist)
  .set({herkunftsland: "USA"})
  .where(eq(artist.id, nova[0].id));
const novaUpdated2 = await db.select().from(artist).where(eq(artist.id, nova[0].id));
console.log("Herkunftsland von Nova nach update:", novaUpdated2[0].herkunftsland);

//Uebung4: hinzufügen von playlist und playlist_track
const lieblingslieder = await db.insert(playlist)
  .values({ name: "Lieblingslieder" })
  .returning();
await db.insert(playlistTrack)
  .values({ playlistid: lieblingslieder[0].id, trackid: korrigiert[0].id });

const lieblingsliederTracks = await db.select()
                                      .from(playlistTrack)
                                      .where(eq(playlistTrack.playlistid, lieblingslieder[0].id)); 
console.log("Tracks in Lieblingslieder:", lieblingsliederTracks); 

db.$client.close();
