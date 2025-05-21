import type { Auth } from './auth';

type CreateParams = {
  auth: Omit<Auth, 'id'>;
};

type FindById = {
  userId: string;
};

type FindByEmailParams = {
  email: string;
};

export type TAuthRepository = {
  create: (params: CreateParams) => Promise<Auth | null>;
  findByEmail: (params: FindByEmailParams) => Promise<Auth | null>;
  findById: (params: FindById) => Promise<Auth | null>;
};
