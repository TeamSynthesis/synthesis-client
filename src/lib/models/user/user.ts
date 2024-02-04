import {
  index,
  pgTable,
  varchar,
  timestamp,
  char,
  pgEnum,
} from "drizzle-orm/pg-core";

const UserOnboardingProgressEnum = pgEnum("onboarding_progress", [
  "create-account",
  "add-account-details",
  "create-or-join-team",
  "complete",
]);

const User = pgTable(
  "user",
  {
    id: char("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at", {
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
    emailVerifiedAt: timestamp("email_verified_at", {
      withTimezone: true,
      mode: "date",
    }),
    onboardingProgress: UserOnboardingProgressEnum(
      "onboarding_progress"
    ).default("create-account"),
  },
  (t) => ({
    githubIdIdx: index("google_id_idx").on(t.githubId),
  })
);

type TUser = typeof User.$inferSelect;

export { type TUser, User, UserOnboardingProgressEnum };
