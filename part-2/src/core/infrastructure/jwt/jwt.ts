import { jwt as jwtPlugin } from '@elysiajs/jwt';

import { config } from 'config';

export const jwt = jwtPlugin({
  exp: config.jwt.expiration,
  secret: config.jwt.secret,
});
