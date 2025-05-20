import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const companySchema = pgTable('companies', {
  id: varchar('id').$defaultFn(createId).primaryKey(),
  bs: text('bs').notNull(),
  catchPhrase: text('catch_phrase').notNull(),
  name: text('name').notNull(),
});

export type CompanySchema = typeof companySchema.$inferSelect;
