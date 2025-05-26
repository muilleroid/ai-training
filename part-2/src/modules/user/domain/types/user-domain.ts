import type { PartialUserInput } from './partial-user-input';
import type { User } from './user';
import type { UserInput } from './user-input';

type CreateParams = {
  user: UserInput;
};

type DeleteParams = {
  userId: string;
};

type ExistsParams = {
  userId: string;
};

type FindByIdParams = {
  userId: string;
};

type UpdateParams = {
  user: PartialUserInput;
  userId: string;
};

export type TUserDomain = {
  create: (params: CreateParams) => Promise<User | null>;
  delete: (params: DeleteParams) => Promise<User | null>;
  exists: (params: ExistsParams) => Promise<boolean>;
  find: () => Promise<User[]>;
  findById: (params: FindByIdParams) => Promise<User | null>;
  update: (params: UpdateParams) => Promise<User | null>;
};
