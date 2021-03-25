export const toLocaleString = (val: number | string) => {
  const number = Number(val);
  return number
    .toFixed(2)
    .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
    .split('.')[0];
};

/**
 *
 * @param val string
 * @param length number default 50
 * @returns Reduced Text
 *
 * ### Example
 * ```
 * reduceText('123456', 3) -> gives '123...'
 * ```
 */
export const reduceText = (val: string, length?: number) => {
  if (val.length > (length || 50)) {
    return val.substr(0, (length || 50) - 3) + '...';
  }
  return val;
};
