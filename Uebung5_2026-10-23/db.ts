import { DatabaseSync } from "node:sqlite";
import { drizzle } from "drizzle-orm/node-sqlite";

const DDL = [
    `CREATE TABLE IF NOT EXISTS serien (
        id TEXT PRIMARY KEY NOT NULL,
        titel TEXT NOT NULL,
        status TEXT NOT NULL)`
];

export function oeffneDb(pfad: string) {
  const client = new DatabaseSync(pfad);
  for (const anweisung of DDL) {
    client.exec(anweisung);
  }
  return drizzle({ client });
}