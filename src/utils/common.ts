export const extractAttributes = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key as K))) as Partial<
    T
  >;
};

export const omitAttributes = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};
