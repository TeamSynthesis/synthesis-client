ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "id" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "user_id" SET DATA TYPE varchar(64);