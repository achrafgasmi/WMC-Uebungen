import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const serien = sqliteTable("serien", {
    id: text("id").primaryKey().$default(() => crypto.randomUUID()),
    titel: text("titel").notNull(),
    status: text("status").notNull(),
});
