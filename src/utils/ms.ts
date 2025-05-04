import ms from 'ms';
import { type StringValue } from 'ms';

/**
 * Convert milliseconds to a date
 * @param ms - The milliseconds
 * @returns The date
 */
export const msToDate = (ms: string) => {
  return new Date(ms);
};

/**
 * Convert a string to milliseconds
 * @param value - The string to convert
 * @returns The milliseconds
 */
export const toMs = (value: StringValue) => {
  return ms(value);
};
