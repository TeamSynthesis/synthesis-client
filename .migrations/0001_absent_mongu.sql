ALTER TABLE "user" ALTER COLUMN "expires_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password_hash" varchar(1024);