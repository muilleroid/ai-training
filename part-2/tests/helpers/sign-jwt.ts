import { SignJWT } from 'jose';

export const signJwt = async (payload: object) => {
  const key = new TextEncoder().encode(Bun.env.JWT_SECRET);

  const jwt = new SignJWT({
    ...payload,
    exp: undefined,
    nbf: undefined,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Bun.env.JWT_EXPIRATION!);

  return jwt.sign(key);
};
