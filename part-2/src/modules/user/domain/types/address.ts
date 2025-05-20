import type { Geo } from './geo';

export type Address = {
  city: string;
  geo?: Geo | null;
  street: string;
  suite: string;
  zipcode: string;
};
