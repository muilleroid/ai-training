import type { Geo } from './geo';

export type Address = {
  city: string;
  geo: Geo | null | undefined;
  street: string;
  suite: string;
  zipcode: string;
};
