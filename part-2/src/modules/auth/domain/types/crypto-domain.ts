type HashParams = {
  password: string;
};

type VerifyParams = {
  password: string;
  passwordHash: string;
};

export type TCryptoDomain = {
  hash: (params: HashParams) => Promise<string>;
  verify: (params: VerifyParams) => Promise<boolean>;
};
