import type { PartialUserInput } from './partial-user-input';
import type { User } from './user';
import type { UserInput } from './user-input';

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

export type TUserRepository = {
  create: (params: CreateParams) => Promise<User | null>;
  delete: (params: DeleteParams) => Promise<User | null>;
  exists: (params: ExistsParams) => Promise<boolean>;
  find: () => Promise<User[]>;
  findById: (params: FindByIdParams) => Promise<User | null>;
  update: (params: UpdateParams) => Promise<User | null>;
};
