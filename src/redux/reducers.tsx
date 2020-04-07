import { combineReducers } from 'redux';
import { SubjectResultAction, CurrentQuestionAction } from './actions';
import { SubjectResult } from 'Types';

const initialSubjectResult: SubjectResult = {
  subjectTitle: 'tiss',
  results: []
};

export const subjectResultReducer = (
  state = initialSubjectResult,
  action: SubjectResultAction
): SubjectResult => {
  switch (action.type) {
    case 'startSubject':
      return action.subjectResult;
    case 'updateSubject':
      return { ...state, results: action.results };
    default:
      return state;
  }
};

const initialCurrentQuestionList = [];

export const currentQuestionListReducer = (
  state: number[] = initialCurrentQuestionList,
  action: CurrentQuestionAction
): number[] => {
  switch (action.type) {
    case 'initCurrentQuestionList':
      return action.currentQuestionList;
    case 'updateCurrentQuestionList':
      const newList = [...state];
      newList[action.index] = action.currentQuestion;
      return newList;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  subjectResult: subjectResultReducer,
  currentQuestionList: currentQuestionListReducer
});

export type RootState = ReturnType<typeof reducers>;
