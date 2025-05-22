import type { Account } from './account';

export type AccountInput = Omit<Account, 'id'>;
