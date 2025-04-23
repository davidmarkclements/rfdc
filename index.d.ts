declare namespace rfdc {
  interface Options {
    proto?: boolean;
    circles?: boolean;
    constructorHandlers?: ConstructorHandlerConfig[];
  }
}
type Constructor<T> = {new(...args: any[]): T};
type ConstructorHandlerConfig<T = any> = [Constructor<T>, (o: T) => T];

declare type DeepReadwrite<T> = T extends {} | []
  ? { -readonly [P in keyof T]: DeepReadwrite<T[P]> }
  : T;
declare function rfdc(
  options?: rfdc.Options
): <T>(input: T) => DeepReadwrite<T>;

export = rfdc;
