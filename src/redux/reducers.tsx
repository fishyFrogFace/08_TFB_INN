import { combineReducers } from 'redux';
import {
  UpdateSubjectResultListAction,
  SetUsernameAction,
  UpdateExamPageAction,
  UpdateCurrentSubjectAction,
  UpdateCurrentQuestionListAction,
  UpdateAppPageAction,
  SetUnitsAction
} from './actions';
import { SubjectResult, ExamPage, Page } from 'Types';
import { standardExamDefinition } from 'examDefinition';

const initialAppPage = Page.FrontPage;

export const appPageReducer = (
  state: Page = initialAppPage,
  action: UpdateAppPageAction
) => {
  switch (action.type) {
    case 'updateAppPage':
      return action.appPage;
    default:
      return state;
  }
};

const initialSubjectResultList: SubjectResult[] = standardExamDefinition.subjects.map(
  subj => {
    return { subjectTitle: subj.name, results: [] };
  }
);

export const subjectResultListReducer = (
  state = initialSubjectResultList,
  action: UpdateSubjectResultListAction
): SubjectResult[] => {
  switch (action.type) {
    case 'updateSubjectResultList':
      const newList = state
        .filter(res => res.subjectTitle !== action.result.subjectTitle)
        .concat(action.result);
      return newList;
    default:
      return state;
  }
};

const initialCurrentQuestionList = standardExamDefinition.subjects.map(
  subj => 0
);

export const currentQuestionListReducer = (
  state: number[] = initialCurrentQuestionList,
  action: UpdateCurrentQuestionListAction
): number[] => {
  switch (action.type) {
    case 'updateCurrentQuestionList':
      const newList = [...state];
      newList[action.index] = action.currentQuestion;
      return newList;
    default:
      return state;
  }
};

const initialUsername = '';

export const usernameReducer = (
  state: string = initialUsername,
  action: SetUsernameAction
) => {
  switch (action.type) {
    case 'setUsername':
      return action.username;
    default:
      return state;
  }
};

const initialUnits = [];

export const unitsReducer = (
  state: string[] = initialUnits,
  action: SetUnitsAction
) => {
  switch (action.type) {
    case 'setUnits':
      return action.units;
    default:
      return state;
  }
};

const initialExamPage = ExamPage.EnterName;

export const examPageReducer = (
  state: ExamPage = initialExamPage,
  action: UpdateExamPageAction
) => {
  switch (action.type) {
    case 'updateExamPage':
      return action.examPage;
    default:
      return state;
  }
};

const initialSubject = standardExamDefinition.subjects[0].name;

export const currentSubjectReducer = (
  state: string = initialSubject,
  action: UpdateCurrentSubjectAction
) => {
  switch (action.type) {
    case 'updateCurrentSubject':
      return action.currentSubject;
    default:
      return state;
  }
};

const reducers = combineReducers({
  subjectResultList: subjectResultListReducer,
  currentQuestionList: currentQuestionListReducer,
  username: usernameReducer,
  examPage: examPageReducer,
  currentSubject: currentSubjectReducer,
  appPage: appPageReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'resetApp') {
    state = undefined;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof reducers>;
