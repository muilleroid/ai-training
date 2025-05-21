CREATE TABLE "auth" (
	"email" varchar(255) NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "auth_email_unique" UNIQUE("email")
);
