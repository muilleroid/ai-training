import type { Address, Company, Geo, User } from 'modules/user/domain/types';

import type { AddressSchema, CompanySchema, GeoSchema, UserSchema } from '../schemas';

type ToAddressParams = {
  addresses?: AddressSchema | null;
  geos?: GeoSchema | null;
};

export const toAddress = ({ addresses: address, geos: geo }: ToAddressParams): Address | null => {
  if (!address) {
    return null;
  }

  return {
    city: address.city,
    geo: toGeo(geo),
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
    id: company.id,
    name: company.name,
  };
};

export const toGeo = (geo?: GeoSchema | null): Geo | null => {
  if (!geo) {
    return null;
  }

  return {
    lat: geo.lat,
    lng: geo.lng,
  };
};

type ToUserParams = {
  addresses?: AddressSchema | null;
  companies?: CompanySchema | null;
  geos?: GeoSchema | null;
  users?: UserSchema | null;
};

export const toUser = ({
  addresses: address,
  companies: company,
  geos: geo,
  users: user,
}: ToUserParams): User | null => {
  if (!user) {
    return null;
  }

  return {
    address: toAddress({ addresses: address, geos: geo }),
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
