type UnaryFunction<T, R> = (arg: T) => R

export const pipe =
  <T>(...fns: UnaryFunction<any, any>[]): UnaryFunction<T, any> =>
  (input: T) =>
    fns.reduce((prev, fn) => fn(prev), input)
