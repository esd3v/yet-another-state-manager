export const isObject = value =>
  value instanceof Object && value.constructor === Object

export function mapObject<T extends {[key in keyof T]: any}>
  (obj: T, fn:(v: T[keyof T]) => any) {
    return Object.keys(obj).reduce((result, key): {[key in keyof T]: any} => {
      result[key] = fn(obj[key]);
      return result;
    }, {} as T)
}
