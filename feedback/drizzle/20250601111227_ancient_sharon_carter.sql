CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_name" text,
	"user_email" text,
	"message" text,
	"rating" integer
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"url" text,
	"user_id" varchar
);
