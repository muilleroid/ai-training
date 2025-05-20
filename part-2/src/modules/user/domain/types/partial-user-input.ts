import type { Address } from './address';
import type { Company } from './company';
import type { Geo } from './geo';
import type { User } from './user';

export type PartialUserInput = Partial<Omit<User, 'id' | 'address' | 'company'>> & {
  address?: Partial<Omit<Address, 'geo'>> & { geo?: Partial<Geo> };
  company?: Partial<Company>;
};
