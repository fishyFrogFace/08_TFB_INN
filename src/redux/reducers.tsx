import { combineReducers } from 'redux';
import { ActionType, SubjectResultAction } from './actions';
import { SubjectResult } from 'Types';

const initialSubjectResult: SubjectResult = { subjectTitle: 'tiss', results: []};

export const subjectResultReducer = (
  state = initialSubjectResult,
  action: SubjectResultAction
): SubjectResult => {
  switch (action.type) {
    case "startSubject":
      return action.subjectResult;
    case "updateSubject":
      return {...state, results: action.results}
    default:
      return state;
  }
};

export const reducers = combineReducers({
  subjectResult: subjectResultReducer
});


export type RootState = ReturnType<typeof reducers>
