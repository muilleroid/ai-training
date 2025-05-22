CREATE TABLE "accounts" (
	"email" varchar(255) NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"body" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"post_id" varchar NOT NULL,
	"user_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"body" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"user_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"city" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"lat" text NOT NULL,
	"lng" text NOT NULL,
	"street" text NOT NULL,
	"suite" text NOT NULL,
	"user_id" varchar NOT NULL,
	"zipcode" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"bs" text NOT NULL,
	"catch_phrase" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"company_id" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"username" varchar(50) NOT NULL,
	"website" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;