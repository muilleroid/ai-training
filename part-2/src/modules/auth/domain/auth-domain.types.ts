import type { AuthInput } from './types';

export type CreateParams = {
  auth: AuthInput;
};

export type FindByIdParams = {
  userId: string;
};

export type FindByEmailParams = {
  email: string;
};
