import { combineReducers } from 'redux';
import {
  SubjectResultAction,
  CurrentQuestionAction,
  SetUsernameAction,
  UpdateExamPageAction,
  UpdateCurrentSubjectAction
} from './actions';
import { SubjectResult, QuestionTemplate, ExamPage } from 'Types';
import { standardExamDefinition } from 'examDefinition';

const standardExamState = {
  instanceID: 0,
  results: standardExamDefinition.subjects.map((subj) => {
    return { subjectTitle: subj.name, results: [] };
  })
};

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

const initialCurrentQuestionList = standardExamDefinition.subjects.map(
  (subj) => 0
);

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

export const reducers = combineReducers({
  subjectResult: subjectResultReducer,
  currentQuestionList: currentQuestionListReducer,
  username: usernameReducer,
  examPage: examPageReducer,
  currentSubject: currentSubjectReducer
});

export type RootState = ReturnType<typeof reducers>;
