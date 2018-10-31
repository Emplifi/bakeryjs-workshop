// http://raganwald.com/2018/09/12/auto-vivifying-hash.html
export default class Hash {
  constructor (defaultValue = undefined) {
    return new Proxy(this, {
      get:
        defaultValue instanceof Function
          ? (target, key) =>
            Reflect.has(target, key)
              ? Reflect.get(target, key)
              : defaultValue(target, key)
          : (target, key) =>
            Reflect.has(target, key)
              ? Reflect.get(target, key)
              : defaultValue,
    })
  }
}
