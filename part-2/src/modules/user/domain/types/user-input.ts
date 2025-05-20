import type { Address } from './address';
import type { Company } from './company';
import type { Geo } from './geo';
import type { User } from './user';

export type UserInput = Omit<User, 'id' | 'address' | 'company'> & {
  address: Omit<Address, 'geo'> & { geo: Geo };
  company: Company;
};
