import type { PartialUserInput, UserInput } from '../domain/types';

export type CreateParams = {
  user: UserInput;
};

export type DeleteParams = {
  userId: string;
};

export type FindByIdParams = {
  userId: string;
};

export type UpdateParams = {
  userId: string;
  user: PartialUserInput;
};
