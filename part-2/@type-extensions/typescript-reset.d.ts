type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T;

declare global {
  interface Array<T> {
    filter(predicate: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown): NonFalsy<T>[];
  }

  interface ReadonlyArray<T> {
    filter(predicate: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown): NonFalsy<T>[];
  }
}

export {};
