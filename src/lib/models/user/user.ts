import { index, pgTable, varchar, timestamp, char } from "drizzle-orm/pg-core";

const User = pgTable(
  "user",
  {
    id: char("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    authProvider: varchar("auth_provider", {
      length: 64,
      enum: ["github", "email"],
    }).notNull(),
    githubId: varchar("github_id", { length: 64 }),
    passwordHash: varchar("password_hash", {
      length: 1024,
    }),
    username: varchar("username", {
      length: 64,
    })
      .unique()
      .notNull(),
    fullname: varchar("fullname", {
      length: 255,
    }),
    avatarUrl: varchar("avatar_url", {
      length: 512,
    }),
    emailVerifiedAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (t) => ({
    githubIdIdx: index("google_id_idx").on(t.githubId),
  })
);

type TUser = typeof User.$inferSelect;

export { type TUser, User };
