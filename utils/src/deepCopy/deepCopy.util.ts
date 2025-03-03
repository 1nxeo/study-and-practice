/* eslint-disable @typescript-eslint/no-explicit-any */

const deepCopyFunctions = new Map<
  string,
  (input: any, cache: WeakMap<any, any>) => any
>([
  [
    'array',
    (input: Array<any>, cache: WeakMap<any, any>) => {
      const result: any[] = [];

      input.forEach((value, index) => {
        result[index] = deepCopy(value, cache);
      });

      return result;
    },
  ],
  [
    'map',
    (input: Map<any, any>, cache: WeakMap<any, any>) => {
      const result = new Map();
      cache.set(input, result);

      input.forEach((value, key) => {
        const copiedKey = deepCopy(key, cache);
        const copiedValue = deepCopy(value, cache);

        result.set(copiedKey, copiedValue);
      });

      return result;
    },
  ],
  [
    'set',
    (input: Set<any>, cache: WeakMap<any, any>) => {
      const result = new Set();

      input.forEach((value) => {
        const copiedValue = deepCopy(value, cache);

        result.add(copiedValue);
      });

      return result;
    },
  ],
  [
    'object',
    (
      input: { [key: string | number | symbol]: any },
      cache: WeakMap<any, any>
    ) => {
      const result: { [key: string | number | symbol]: any } = Array.isArray(
        input
      )
        ? []
        : {};
      cache.set(input, result);

      for (const prop in input) {
        if (Object.prototype.hasOwnProperty.call(input, prop)) {
          result[prop] = deepCopy(input[prop], cache);
        }
      }

      return result;
    },
  ],
  ['date', (input: Date) => new Date(input)],
  ['regexp', (input: RegExp) => new RegExp(input)],
]);

const deepCopy = (input: any, cache = new WeakMap<any, any>()) => {
  if (cache.has(input)) {
    return cache.get(input);
  }

  const type = typeof input;
  const isObject = type === 'object';

  if (isObject) {
    const prototype = Object.prototype.toString.call(input);
    const instance =
      prototype?.match(/\[object (.*?)\]/)?.[1].toLowerCase() || '';

    if (deepCopyFunctions.has(instance)) {
      const result = deepCopyFunctions.get(instance)?.(input, cache);
      return result;
    }
  }

  return input;
};

export default deepCopy;
