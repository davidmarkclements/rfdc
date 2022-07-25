declare namespace rfdc {
  interface Options {
    proto?: boolean;
    circles?: boolean;
  }
}

declare type DeepReadwrite<T> = T extends {} | []
  ? { -readonly [P in keyof T]: DeepReadwrite<T[P]> }
  : T;
declare function rfdc(
  options?: rfdc.Options
): <T>(input: T) => DeepReadwrite<T>;

export = rfdc;
