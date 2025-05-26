import { Elysia } from 'elysia';

import { UserRepository } from '../infrastructure/repositories';

import type { TUserDomain, TUserRepository } from './types';

type UserDomainFactoryParams = {
  userRepository: TUserRepository;
};

export const userDomainFactory = ({ userRepository }: UserDomainFactoryParams) => {
  const userDomain: TUserDomain = {
    create: ({ user }) => {
      return userRepository.create({ user });
    },
    delete: ({ userId }) => {
      return userRepository.delete({ userId });
    },
    exists: ({ userId }) => {
      return userRepository.exists({ userId });
    },
    find: () => {
      return userRepository.find();
    },
    findById: ({ userId }) => {
      return userRepository.findById({ userId });
    },
    update: ({ user, userId }) => {
      return userRepository.update({
        user,
        userId,
      });
    },
  };

  return userDomain;
};

export const UserDomain = new Elysia({ name: 'user/domain' })
  .use(UserRepository)
  .derive({ as: 'global' }, function deriveUserDomain({ userRepository }) {
    const userDomain = userDomainFactory({ userRepository });

    return { userDomain };
  });
