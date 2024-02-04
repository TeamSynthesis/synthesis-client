CREATE TABLE IF NOT EXISTS "user" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"auth_provider" varchar(64) NOT NULL,
	"github_id" varchar(64),
	"username" varchar(64) NOT NULL,
	"fullname" varchar(255),
	"avatar_url" varchar(512),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"user_id" char(36) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"user_agent" text,
	"ip_address" text,
	"geo_location" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "google_id_idx" ON "user" ("github_id");