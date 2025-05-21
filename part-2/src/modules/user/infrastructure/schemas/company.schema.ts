import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const companySchema = pgTable('companies', {
  bs: text('bs').notNull(),
  catchPhrase: text('catch_phrase').notNull(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
});

export type CompanySchema = typeof companySchema.$inferSelect;
