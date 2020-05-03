import { Points, Mastery, Other } from 'Types';

export const makeMasteryResult = (
  props,
  answers: string[],
  mastered: boolean
): Mastery => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers
  },
  mastered: mastered,
  type: 'mastery'
});

export const makePointResult = (
  props,
  answers: string[],
  points: number
): Points => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers
  },
  maxPoints:
    props.maxPoints === undefined
      ? props.correctAlternativeList.length
      : props.maxPoints,
  pointsAchieved: points,
  type: 'points'
});

export const failPointResult = props =>
  makePointResult(props, ['Jeg får ikke dette til'], 0);

export const makeOtherResult = (props, answers: string[]): Other => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers
  },
  type: 'other'
});

export const imageAnswer = (imagePath: string) => {
  // eslint-disable-next-line
  const [filename, _hash, ending] = imagePath.split('/')[3].split('.');
  return `"${filename}.${ending}"`;
};
