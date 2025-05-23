import type { Address } from './address';
import type { Company } from './company';

export type User = {
  address: Address | null | undefined;
  company: Company | null | undefined;
  email: string;
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
};
