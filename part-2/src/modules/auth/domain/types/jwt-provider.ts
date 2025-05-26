import type { JWTPayloadSpec } from '@elysiajs/jwt';

export type JwtProvider = {
  sign: (payload: Record<string, string | number> & JWTPayloadSpec) => Promise<string>;
  verify: (jwt?: string) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
};
