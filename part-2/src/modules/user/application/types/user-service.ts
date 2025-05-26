import type { PartialUserInput, User, UserInput } from '../../domain/types';

type CreateParams = {
  user: UserInput;
};

type DeleteParams = {
  userId: string;
};

type FindByIdParams = {
  userId: string;
};

type UpdateParams = {
  user: PartialUserInput;
  userId: string;
};

export type TUserService = {
  create: (params: CreateParams) => Promise<User>;
  delete: (params: DeleteParams) => Promise<User>;
  find: () => Promise<User[]>;
  findById: (params: FindByIdParams) => Promise<User>;
  update: (params: UpdateParams) => Promise<User>;
};
