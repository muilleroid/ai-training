-- Add new columns to addresses table
ALTER TABLE "addresses" ADD COLUMN "lat" text;
--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "lng" text;
--> statement-breakpoint

-- Migrate data from geos to addresses
UPDATE "addresses" a
SET lat = g.lat,
    lng = g.lng
FROM "geos" g
WHERE a.geo_id = g.id;
--> statement-breakpoint

-- Make lat and lng columns not null
ALTER TABLE "addresses" ALTER COLUMN "lat" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "lng" SET NOT NULL;
--> statement-breakpoint

-- Drop foreign key and geo_id column
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_geo_id_geos_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "geo_id";
--> statement-breakpoint

-- Drop geos table since it's no longer needed
DROP TABLE "geos";
