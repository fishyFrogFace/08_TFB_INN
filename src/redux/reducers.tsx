import { combineReducers } from 'redux';
import {
  ExamStateAction,
  GO_TO_NEXT_QUESTION,
  RESET_EXAMINATION,
  START_SUBJECT,
  SET_CHOSEN_SUBJECTS,
  SET_EXAM_PAGE,
  SET_QUESTION_RESULT,
  SET_USERNAME,
  AppStateAction,
  SET_APP_PAGE,
} from './actions';
import { ExamState, ExamPage, SubjectResult, AppState, Page } from 'Types';
import { standardExamDefinition, availableExaminations } from '../App';

const initialExamState : ExamState = {
  examDefinition: standardExamDefinition,
  username: null,
  chosenSubjects: new Set(),
  currentPage: ExamPage.ENTERNAME,
  currentSubject: null,
  currentQuestion: 0,
  subjectResults: new Map()
};

const initialAppState : AppState = {
  currentPage: Page.FRONTPAGE,
  availableExaminations: availableExaminations
}

export const examStateReducer = (
  examState: ExamState = initialExamState,
  action: ExamStateAction
): ExamState => {
  switch (action.type) {
    case GO_TO_NEXT_QUESTION:
      const subjectDefinition = examState.examDefinition.subjects.find(s => s.name === examState.currentSubject);
      if (subjectDefinition === undefined) return examState; // If not taking a valid subject: do nothing
      if (examState.currentQuestion + 1 < subjectDefinition.questions.length) {
        // If there are questions remaining in the subject: go to next question
        return {...examState,
          currentQuestion: examState.currentQuestion + 1
        }
      } else {
        // If there are no more questions remaining: return to subject list
        return {...examState,
          currentQuestion: 0,
          currentPage: ExamPage.OVERVIEW
        };
      }
    case RESET_EXAMINATION:
      return {...initialExamState};
    case START_SUBJECT:
      return {...examState,
        currentSubject: action.subject,
        currentQuestion: 0
      };
    case SET_CHOSEN_SUBJECTS:
      return {...examState,
        chosenSubjects: new Set(action.subjects)
      };
    case SET_EXAM_PAGE:
      return {...examState,
        currentPage: action.page
      };
    case SET_QUESTION_RESULT:
      // All of these confusing lines are to make sure we copy everything safely
      let subjectResult = examState.subjectResults.get(action.subject);
      if (subjectResult === undefined) {
        subjectResult = { results: [] };
      } else {
        subjectResult = {...subjectResult};
      }
      subjectResult.results[action.question] = {...action.result};
      const subjectResults = new Map(examState.subjectResults);
      subjectResults.set(action.subject, subjectResult);
      return {...examState,
        subjectResults: subjectResults
      };
    case SET_USERNAME:
      return {...examState,
        username: action.username
      };
    default:
      return examState;
  }
};

export const appStateReducer = (
  appState: AppState = initialAppState,
  action: AppStateAction
): AppState => {
  switch(action.type) {
    case SET_APP_PAGE:
      return {...appState,
        currentPage: action.page
      };
    default:
      return appState;
  }
}

export const reducers = combineReducers({
  appState: appStateReducer,
  examState: examStateReducer
});

export type RootState = ReturnType<typeof reducers>;
