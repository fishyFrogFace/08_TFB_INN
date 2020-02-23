export type int = number & { __int__: void };

export const roundToInt = (num: number): int => Math.round(num) as int;
