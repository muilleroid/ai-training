ALTER TABLE "users" DISABLE TRIGGER ALL;
ALTER TABLE "addresses" DISABLE TRIGGER ALL;

ALTER TABLE "addresses" ADD COLUMN "user_id" varchar;

UPDATE "addresses" a
SET "user_id" = u.id
FROM "users" u
WHERE u.address_id = a.id;

ALTER TABLE "users" DROP CONSTRAINT "users_address_id_addresses_id_fk";
ALTER TABLE "users" DROP COLUMN "address_id";

ALTER TABLE "addresses" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "users" ENABLE TRIGGER ALL;
ALTER TABLE "addresses" ENABLE TRIGGER ALL;
