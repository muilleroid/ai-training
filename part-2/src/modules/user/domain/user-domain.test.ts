import { describe, expect, it, mock } from 'bun:test';
import { createId } from '@paralleldrive/cuid2';

import type { TUserRepository, UserInput } from './types';
import { userDomainFactory } from './user.domain';

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
  describe('UserDomain', () => {
    const userRepository = {
      create: mock(),
      delete: mock(),
      exists: mock(),
      find: mock(),
      findById: mock(),
      update: mock(),
    } satisfies TUserRepository;

    const userDomain = userDomainFactory({ userRepository });

    describe('create', () => {
      it('returns a user', async () => {
        userRepository.create.mockResolvedValueOnce({
          ...userInputMock,
          id: createId(),
        });

        const result = await userDomain.create({ user: userInputMock });

        expect(userRepository.create).toHaveBeenCalledWith({ user: userInputMock });

        expect(result).toEqual({
          ...userInputMock,
          id: expect.any(String),
        });
      });
    });

    describe('delete', () => {
      it('returns a user', async () => {
        const userId = createId();

        userRepository.delete.mockResolvedValueOnce({
          ...userInputMock,
          id: userId,
        });

        const result = await userDomain.delete({ userId });

        expect(userRepository.delete).toHaveBeenCalledWith({ userId });

        expect(result).toEqual({
          ...userInputMock,
          id: userId,
        });
      });
    });

    describe('exists', () => {
      it('returns true if user exists', async () => {
        const userId = createId();

        userRepository.exists.mockResolvedValueOnce(true);

        const result = await userDomain.exists({ userId });

        expect(userRepository.exists).toHaveBeenCalledWith({ userId });

        expect(result).toBe(true);
      });

      it('returns false if user does not exist', async () => {
        const userId = createId();

        userRepository.exists.mockResolvedValueOnce(false);

        const result = await userDomain.exists({ userId });

        expect(userRepository.exists).toHaveBeenCalledWith({ userId });

        expect(result).toBe(false);
      });
    });

    describe('find', () => {
      it('returns an array of users', async () => {
        const users = [
          { ...userInputMock, id: createId() },
          { ...userInputMock, id: createId() },
        ];

        userRepository.find.mockResolvedValueOnce(users);

        const result = await userDomain.find();

        expect(userRepository.find).toHaveBeenCalled();

        expect(Array.isArray(result)).toEqual(true);
        expect(result).toEqual(users);
      });
    });

    describe('findById', () => {
      it('returns a user by id', async () => {
        const userId = createId();

        userRepository.findById.mockResolvedValueOnce({
          ...userInputMock,
          id: userId,
        });

        const result = await userDomain.findById({ userId });

        expect(userRepository.findById).toHaveBeenCalledWith({ userId });

        expect(result).toEqual({
          ...userInputMock,
          id: userId,
        });
      });
    });

    describe('update', () => {
      it('returns an updated user', async () => {
        const userId = createId();
        const updatedUser = {
          ...userInputMock,
          name: 'updated',
        };

        userRepository.update.mockResolvedValueOnce({
          ...updatedUser,
          id: userId,
        });

        const result = await userDomain.update({
          user: updatedUser,
          userId,
        });

        expect(userRepository.update).toHaveBeenCalledWith({
          user: updatedUser,
          userId,
        });

        expect(result).toEqual({
          ...updatedUser,
          id: userId,
        });
      });
    });
  });
});
