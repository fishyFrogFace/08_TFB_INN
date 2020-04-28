export const capitalize = (str: string) =>
  str.length === 0 ? str : str[0].toUpperCase() + str.slice(1);

export const joinAndCapitalize = (str: string[]) => capitalize(str.join(', '));

export const inspect = str => {
  console.log(str);
  return str;
};
