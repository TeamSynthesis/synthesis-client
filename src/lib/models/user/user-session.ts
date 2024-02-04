import { pgTable, text, char, timestamp } from "drizzle-orm/pg-core";

export const UserSession = pgTable("user_session", {
  id: char("id", { length: 36 }).notNull().primaryKey(),
  userId: char("user_id", { length: 36 }).notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  geoLocation: text("geo_location"),
});

export type TUserSession = typeof UserSession.$inferSelect;
