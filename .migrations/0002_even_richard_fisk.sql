DO $$ BEGIN
 CREATE TYPE "onboarding_progress" AS ENUM('create-account', 'add-account-details', 'create-or-join-team', 'complete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarding_progress" "onboarding_progress" DEFAULT 'create-account';--> statement-breakpoint
ALTER TABLE "user_session" ADD COLUMN "created_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "expires_at";--> statement-breakpoint
ALTER TABLE "user_session" DROP COLUMN IF EXISTS "geo_location";