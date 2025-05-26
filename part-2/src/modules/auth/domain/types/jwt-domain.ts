import type { TokenPayload } from './token-payload';

type SignParams = {
  id: string;
};

type VerifyParams = {
  token: string;
};

export type TJwtDomain = {
  sign: (params: SignParams) => Promise<string>;
  verify: (params: VerifyParams) => Promise<TokenPayload>;
};
