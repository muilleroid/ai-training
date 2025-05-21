import type { Auth } from './auth';

export type AuthInput = Omit<Auth, 'id'>;
