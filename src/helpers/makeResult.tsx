import { Points, Mastery, Other } from 'Types';

export const makeMasteryResult = (
  props,
  answers: string[],
  mastered: boolean
): Mastery => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers,
    type: 'mastery'
  },
  mastered: mastered
});

export const makePointResult = (
  props,
  answers: string[],
  points: number
): Points => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers,
    type: 'points'
  },
  maxPoints:
    props.maxPoints === undefined
      ? props.correctAlternativeList.length
      : props.maxPoints,
  pointsAchieved: points
});

export const failPointResult = props => failPointResult(props);

export const makeOtherResult = (props, answers: string[]): Other => ({
  common: {
    resultTitle: props.resultTitle,
    questionTitle: props.text,
    answerValues: answers,
    type: 'other'
  }
});
