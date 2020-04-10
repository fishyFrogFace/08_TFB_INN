import { combineReducers } from 'redux';
import {
  SubjectResultAction,
  CurrentQuestionAction,
  SetUsernameAction,
  UpdateExamPageAction
} from './actions';
import { SubjectResult, QuestionTemplate, ExamPage } from 'Types';

const standardExamDefinition = {
  subjects: [
    {
      name: 'Tema 1',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.Start,
          questionContent: {
            resultTitle: 'Forstår bruk av knapper',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.CopyText,
          questionContent: {
            text: 'A, b: C.',
            resultTitle: 'Kan skrive av tekst',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject,
          questionContent: {}
        }
      ]
    },
    {
      name: 'Tema 2',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.Start,
          questionContent: {
            resultTitle: 'Resultat 2.1',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.CopyText,
          questionContent: {
            text: 'This is totally another subject',
            resultTitle: 'Resultat 2.2',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject,
          questionContent: {}
        }
      ]
    }
  ]
};

const standardExamState = {
  instanceID: 0,
  username: '',
  results: standardExamDefinition.subjects.map(subj => {
    return { subjectTitle: subj.name, results: [] };
  }),
  currentQuestions: standardExamDefinition.subjects.map(subj => 0),
  currentSubject: 'Tema 1'
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
  subj => 0
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

export const reducers = combineReducers({
  subjectResult: subjectResultReducer,
  currentQuestionList: currentQuestionListReducer,
  username: usernameReducer,
  examPage: examPageReducer
});

export type RootState = ReturnType<typeof reducers>;
