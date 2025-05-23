import type { PartialUserInput, UserInput } from './types';

export type CreateParams = {
  user: UserInput;
};

export type DeleteParams = {
  userId: string;
};

export type ExistsParams = {
  userId: string;
};

export type FindByIdParams = {
  userId: string;
};

export type UpdateParams = {
  user: PartialUserInput;
  userId: string;
};
