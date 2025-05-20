ALTER TABLE "addresses" DROP CONSTRAINT "addresses_geo_id_geos_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_address_id_addresses_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_geo_id_geos_id_fk" FOREIGN KEY ("geo_id") REFERENCES "public"."geos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;