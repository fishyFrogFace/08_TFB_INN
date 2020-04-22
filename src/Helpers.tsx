export type int = number & { __int__: void };

export const roundToInt = (num: number): int => Math.round(num) as int;

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
