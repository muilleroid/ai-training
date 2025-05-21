import type { Address, Company, User } from 'modules/user/domain/types';

import type { AddressSchema, CompanySchema, UserSchema } from '../schemas';

type ToAddressParams = {
  addresses?: AddressSchema | null;
};

export const toAddress = ({ addresses: address }: ToAddressParams): Address | null => {
  if (!address) {
    return null;
  }

  return {
    city: address.city,
    geo: {
      lat: address.lat,
      lng: address.lng,
    },
    street: address.street,
    suite: address.suite,
    zipcode: address.zipcode,
  };
};

export const toCompany = (company?: CompanySchema | null): Company | null => {
  if (!company) {
    return null;
  }

  return {
    bs: company.bs,
    catchPhrase: company.catchPhrase,
    name: company.name,
  };
};

type ToUserParams = {
  addresses?: AddressSchema | null;
  companies?: CompanySchema | null;
  users?: UserSchema | null;
};

export const toUser = (params: ToUserParams | null): User | null => {
  const { addresses: address, companies: company, users: user } = params || {};

  if (!user) {
    return null;
  }

  return {
    address: toAddress({ addresses: address }),
    company: toCompany(company),
    email: user.email,
    id: user.id,
    name: user.name,
    phone: user.phone,
    username: user.username,
    website: user.website,
  };
};

export const toUserList = (results: ToUserParams[]): User[] => {
  return results.map(toUser).filter(Boolean);
};
