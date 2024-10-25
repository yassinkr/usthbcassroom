CREATE TABLE IF NOT EXISTS "usthbclassroom_publication" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp with time zone,
	"user_id" varchar(256)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "usthbclassroom_publication" ("title");