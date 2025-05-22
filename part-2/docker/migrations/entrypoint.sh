#! /bin/ash
bun install drizzle-orm@0.43.1 drizzle-kit@0.31.1 pg@8.16.0
bun drizzle-kit migrate

exit 0
