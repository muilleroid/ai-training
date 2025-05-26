import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import { NotFoundError } from 'core/errors';

import type { TUserDomain, UserInput } from '../domain/types';

import { userServiceFactory } from './user.service';

const userInputMock: UserInput = {
  address: {
    city: 'city',
    geo: {
      lat: '40.7128',
      lng: '-74.0060',
    },
    street: 'street',
    suite: 'suite',
    zipcode: '92998-3874',
  },
  company: {
    bs: 'bs',
    catchPhrase: 'catchPhrase',
    name: 'name',
  },
  email: 'user@mail.com',
  name: 'name',
  phone: '1-770-736-8031',
  username: 'username1',
  website: 'https://website.com',
};

describe('user', () => {
  describe('UserService', () => {
    const userDomain = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TUserDomain;

    const userService = userServiceFactory({ userDomain });

    describe('create', () => {
      it('returns a user', async () => {
        userDomain.create.mockResolvedValueOnce({
          ...userInputMock,
          id: createId(),
        });

        const result = await userService.create({ user: userInputMock });

        expect(userDomain.create).toHaveBeenCalledWith({ user: userInputMock });

        expect(result).toEqual({
          ...userInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('throws an error if user does not exist', () => {
        const userId = createId();

        userDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await userService.delete({ userId });

          expect(userDomain.exists).toHaveBeenCalledWith({ userId });
          expect(userDomain.delete).not.toHaveBeenCalledWith({ userId });
        }).toThrowError(NotFoundError);
      });

      it('returns a user if user exists', async () => {
        const userId = createId();

        userDomain.exists.mockResolvedValueOnce(true);
        userDomain.delete.mockResolvedValueOnce({
          ...userInputMock,
          id: userId,
        });

        const result = await userService.delete({ userId });

        expect(userDomain.exists).toHaveBeenCalledWith({ userId });
        expect(userDomain.delete).toHaveBeenCalledWith({ userId });

        expect(result).toEqual({
          ...userInputMock,
          id: userId,
        });
      });
    });

    describe('find', () => {
      it('returns an array of users', async () => {
        const users = [
          { ...userInputMock, id: createId() },
          { ...userInputMock, id: createId() },
        ];

        userDomain.find.mockResolvedValueOnce(users);

        const result = await userService.find();

        expect(userDomain.find).toHaveBeenCalled();

        expect(result).toEqual(users);
      });
    });

    describe('findById', () => {
      it('throws an error if user does not exist', () => {
        const userId = createId();

        userDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await userService.findById({ userId });

          expect(userDomain.exists).toHaveBeenCalledWith({ userId });
          expect(userDomain.findById).not.toHaveBeenCalledWith({ userId });
        }).toThrowError(NotFoundError);
      });

      it('returns a user if user exists', async () => {
        const userId = createId();

        userDomain.exists.mockResolvedValueOnce(true);
        userDomain.findById.mockResolvedValueOnce({
          ...userInputMock,
          id: userId,
        });

        const result = await userService.findById({ userId });

        expect(userDomain.exists).toHaveBeenCalledWith({ userId });
        expect(userDomain.findById).toHaveBeenCalledWith({ userId });

        expect(result).toEqual({
          ...userInputMock,
          id: userId,
        });
      });
    });

    describe('update', () => {
      it('throws an error if user does not exist', () => {
        const userId = createId();
        const user = {
          ...userInputMock,
          name: 'updated',
        };

        userDomain.exists.mockResolvedValueOnce(false);

        expect(async () => {
          await userService.update({ user, userId });

          expect(userDomain.exists).toHaveBeenCalledWith({ userId });
          expect(userDomain.update).not.toHaveBeenCalledWith({ user, userId });
        }).toThrowError(NotFoundError);
      });

      it('returns an updated user if user exists', async () => {
        const userId = createId();
        const user = {
          ...userInputMock,
          name: 'updated',
        };

        userDomain.exists.mockResolvedValueOnce(true);
        userDomain.update.mockResolvedValueOnce({
          ...userInputMock,
          ...user,
          id: userId,
        });

        const result = await userService.update({ user, userId });

        expect(userDomain.exists).toHaveBeenCalledWith({ userId });
        expect(userDomain.update).toHaveBeenCalledWith({ user, userId });

        expect(result).toEqual({
          ...userInputMock,
          ...user,
          id: userId,
        });
      });
    });
  });
});
