import { serien } from "./schema.ts";
import { oeffneDb } from "./db.ts";
import { eq } from "drizzle-orm";

const db = oeffneDb("./serien.db");

Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);

if (request.method === "GET" && url.pathname === "/") {
  const html = await Deno.readTextFile("./index.html");

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

if (request.method === "GET" && url.pathname === "/app.js") {
  const javascript = await Deno.readTextFile("./app.js");

  return new Response(javascript, {
    headers: { "Content-Type": "application/javascript" },
  });
}



  if (request.method === "GET" && url.pathname === "/serien") {
    const alleSerien = await db.select().from(serien);
    return Response.json(alleSerien);
  }

  if (request.method === "POST" && url.pathname === "/serien") {
    const daten = await request.json();

    await db.insert(serien).values({
      titel: daten.titel,
      status: daten.status,
    });

    return Response.json({ nachricht: "Serie gespeichert" }, { status: 201 });
  }

  if (request.method === "PATCH" && url.pathname.startsWith("/serien/")) {
    const id = url.pathname.split("/")[2];
    const daten = await request.json();

    await db
      .update(serien)
      .set({ status: daten.status })
      .where(eq(serien.id, id));

    return Response.json({ nachricht: "Status geändert" });
  }

  if (request.method === "DELETE" && url.pathname.startsWith("/serien/")) {
    const id = url.pathname.split("/")[2];

    await db
      .delete(serien)
      .where(eq(serien.id, id));

    return Response.json({ nachricht: "Serie gelöscht" });
  }

  return new Response("Route nicht gefunden", { status: 404 });
});