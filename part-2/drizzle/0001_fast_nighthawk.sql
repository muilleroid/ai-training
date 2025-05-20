CREATE TABLE "addresses" (
	"id" varchar PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"street" text NOT NULL,
	"suite" text NOT NULL,
	"zipcode" text NOT NULL,
	"geo_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"bs" text NOT NULL,
	"catch_phrase" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "geos" (
	"id" varchar PRIMARY KEY NOT NULL,
	"lat" text NOT NULL,
	"lng" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "website" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_geo_id_geos_id_fk" FOREIGN KEY ("geo_id") REFERENCES "public"."geos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");