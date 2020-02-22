export type int = number & { __int__: void };

export const roundToint = (num: number): int => Math.round(num) as int;