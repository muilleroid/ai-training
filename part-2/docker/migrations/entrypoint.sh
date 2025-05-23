#! /bin/ash
bun install drizzle-orm@0.43.1 drizzle-kit@0.31.1 pg@8.16.0
bun drizzle-kit migrate

if [[ ! -z "$SEED" ]]; then
  bun install @faker-js/faker@9.8.0 @paralleldrive/cuid2@2.2.2
  bun run ./drizzle/scripts/seed.ts
fi

exit 0
