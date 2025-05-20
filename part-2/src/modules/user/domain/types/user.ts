import type { Address } from './address';
import type { Company } from './company';

export type User = {
  address?: Address | null;
  company?: Company | null;
  email: string;
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
};
