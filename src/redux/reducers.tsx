import { combineReducers } from 'redux';
import {
  ExamStateAction,
  CONTINUE_SUBJECT,
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
import { ExamState, ExamPage, AppState, Page, SubjectResult } from 'Types';
import { standardExamDefinition, availableExaminations } from '../App';

const initialExamState: ExamState = {
  examDefinition: standardExamDefinition,
  username: "NO USERNAME SET",
  chosenSubjects: new Set(),
  currentPage: ExamPage.ENTER_NAME,
  previousPage: ExamPage.ENTER_NAME,
  currentSubject: "NO SUBJECT SET",
  currentQuestion: 0,
  subjectResults: new Map<string, SubjectResult>()
};

const initialAppState: AppState = {
  currentPage: Page.FRONTPAGE,
  availableExaminations: availableExaminations
}

export const examStateReducer = (
  examState: ExamState = initialExamState,
  action: ExamStateAction
): ExamState => {
  switch (action.type) {
    case CONTINUE_SUBJECT: {
      // Continues the subject where it was last left off, preserving any existing results for it
      const subjectDefinition = examState.examDefinition.subjects.find(s => s.name === action.subject);
      const subjectResult = examState.subjectResults.get(action.subject);
      if (subjectDefinition === undefined || subjectResult === undefined)
        return examState; // Error
      const questionsAnswered = subjectResult.results.length;
      const numberOfQuestions = subjectDefinition.questions.length;
      if (questionsAnswered >= numberOfQuestions)
        return examState; // Subject is complete and cannot be continued
      else
        return {
          ...examState,
          currentSubject: action.subject,
          currentQuestion: questionsAnswered,
          previousPage: examState.currentPage,
          currentPage: ExamPage.QUESTION
        };
    }
    case GO_TO_NEXT_QUESTION: {
      const subjectDefinition = examState.examDefinition.subjects.find(s => s.name === examState.currentSubject);
      if (subjectDefinition === undefined) return examState; // Error
      if (examState.currentQuestion + 1 < subjectDefinition.questions.length) {
        // If there are questions remaining in the subject: go to next question
        return {
          ...examState,
          currentQuestion: examState.currentQuestion + 1
        }
      } else {
        // If there are no more questions remaining: go to completed subject page
        return {
          ...examState,
          currentQuestion: -1,
          currentPage: ExamPage.COMPLETED_SUBJECT,
          previousPage: ExamPage.QUESTION
        };
      }
    }
    case RESET_EXAMINATION:
      return { ...initialExamState };
    case START_SUBJECT:
      // Starts the subject completely over, erasing any existing results for it
      return {
        ...examState,
        currentSubject: action.subject,
        currentQuestion: 0,
        previousPage: examState.currentPage,
        currentPage: ExamPage.QUESTION
      };
    case SET_CHOSEN_SUBJECTS:
      return {
        ...examState,
        chosenSubjects: new Set(action.subjects)
      };
    case SET_EXAM_PAGE:
      return {
        ...examState,
        previousPage: examState.currentPage,
        currentPage: action.page,
      };
    case SET_QUESTION_RESULT:
      // All of these confusing lines are to make sure we copy everything safely
      let subjectResult = examState.subjectResults.get(action.subject);
      if (subjectResult === undefined) {
        subjectResult = { results: [] };
      } else {
        subjectResult = { ...subjectResult };
      }
      subjectResult.results[action.question] = { ...action.result };
      const subjectResults = new Map(examState.subjectResults);
      subjectResults.set(action.subject, subjectResult);
      return {
        ...examState,
        subjectResults: subjectResults
      };
    case SET_USERNAME:
      return {
        ...examState,
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
  switch (action.type) {
    case SET_APP_PAGE:
      return {
        ...appState,
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
