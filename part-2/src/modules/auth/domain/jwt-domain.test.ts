import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { jwtDomainFactory } from './jwt.domain';
import type { JwtProvider } from './types';

describe('jwt', () => {
  describe('JwtDomain', () => {
    const jwt = {
      sign: mock(),
      verify: mock(),
    } satisfies JwtProvider;

    const jwtDomain = jwtDomainFactory({ jwt });

    describe('sign', () => {
      it('returns a token', async () => {
        const accountId = createId();

        jwt.sign.mockResolvedValueOnce('token');

        const result = await jwtDomain.sign({ id: accountId });

        expect(jwt.sign).toHaveBeenCalledWith({ id: accountId });

        expect(result).toBe('token');
      });
    });

    describe('verify', () => {
      it('returns a payload', async () => {
        const accountId = createId();

        const payload = { id: accountId };

        jwt.verify.mockResolvedValueOnce(payload);

        const result = await jwtDomain.verify({ token: 'token' });

        expect(jwt.verify).toHaveBeenCalledWith('token');

        expect(result).toEqual(payload);
      });
    });
  });
});
