import { mostCommonPasswords } from './mostCommonPwds';

// Password checking

const alpha = 'abcdefghijklmnopqrstuvwxyz';
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numerical = '1234567890';

const countChars = (passwordArray: string[], characters: string) =>
  passwordArray.filter(item => characters.includes(item)).length;

const charPoints = (passwordArray: string[], maxPoints: number) => {
  const amountAlpha = countChars(passwordArray, alpha);
  const amountCaps = countChars(passwordArray, caps);
  const amountNum = countChars(passwordArray, numerical);
  const special = passwordArray.length - amountAlpha - amountNum;

  if (
    amountAlpha === 0 ||
    amountCaps === 0 ||
    amountNum === 0 ||
    special === 0
  ) {
    return -0.2 * maxPoints;
  } else {
    return 0.15 * maxPoints;
  }
};

const uniqueChars = (nonUnique: string[]) =>
  nonUnique.filter((item, i, ar) => ar.indexOf(item) === i).length;

const uniquePoints = (passwordArray: string[], maxPoints: number) => {
  const unique = uniqueChars(passwordArray);
  const uniquePercentage = unique / passwordArray.length;

  if (uniquePercentage < 0.2) {
    return -0.2 * maxPoints;
  } else if (uniquePercentage < 0.4) {
    return 0;
  } else {
    return 0.15 * maxPoints;
  }
};

const lengthPoints = (password: string, maxPoints: number) => {
  if (password.length < 8) {
    return 0.1 * maxPoints;
  } else if (password.length < 13) {
    return 0.5 * maxPoints;
  } else {
    return 0.7 * maxPoints;
  }
};

export const checkPasswordSafety = (password: string, maxPoints: number) => {
  const passwordArray = Array.from(password);

  if (password.length < 5 || mostCommonPasswords.includes(password)) {
    return 0;
  } else {
    return (
      lengthPoints(password, maxPoints) +
      charPoints(passwordArray, maxPoints) +
      uniquePoints(passwordArray, maxPoints)
    );
  }
};
