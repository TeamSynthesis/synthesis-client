import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const UserSession = pgTable("user_session", {
  id: varchar("id", { length: 64 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 64 }).notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export type TUserSession = typeof UserSession.$inferSelect;
