import { QuestionResult, ExamPage, Page } from 'Types';

// We export both the type interface and the type string, to prevent typos

// Action types
export const CONTINUE_SUBJECT = "continueSubject";
export interface ContinueSubjectAction {
  type: 'continueSubject';
  subject: string;
}


export const START_SUBJECT = "startSubject";
export interface StartSubjectAction {
  type: 'startSubject';
  subject: string;
}

export const SET_USERNAME = "setUsername";
export interface SetUsernameAction {
  type: 'setUsername';
  username: string;
}

export const RESET_EXAMINATION = "resetExamination";
export interface ResetExaminationAction {
  type: 'resetExamination';
}

export const SET_CHOSEN_SUBJECTS = "setChosenSubjects";
export interface SetChosenSubjectsAction {
  type: 'setChosenSubjects';
  subjects: Set<string>;
}

export const SET_EXAM_PAGE = "setExamPage";
export interface SetExamPageAction {
  type: 'setExamPage';
  page: ExamPage;
}

export const GO_TO_NEXT_QUESTION = "goToNextQuestion";
export interface GoToNextQuestionAction {
  type: 'goToNextQuestion';
}

export const SET_QUESTION_RESULT = "setQuestionResult";
export interface SetQuestionResultAction {
  type: 'setQuestionResult';
  subject: string;
  question: number;
  result: QuestionResult;
}

export const SET_APP_PAGE = "setAppPage";
export interface SetAppPageAction {
  type: 'setAppPage';
  page: Page;
}

export type ExamStateAction = ContinueSubjectAction | StartSubjectAction | SetUsernameAction | ResetExaminationAction
  | SetChosenSubjectsAction | SetExamPageAction | GoToNextQuestionAction | SetQuestionResultAction;
export type AppStateAction = SetAppPageAction;

// Action generators
export const continueSubject = (subject: string) => ({
  // Continues the subject where it was last left off, preserving any existing results for it
  type: CONTINUE_SUBJECT,
  subject: subject
});

export const startSubject = (subject: string) => ({
  // Starts the subject completely over, erasing any existing results for it
  type: START_SUBJECT,
  subject: subject
});

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  username: username
});

export const resetExamination = () => ({
  type: RESET_EXAMINATION
})

export const setChosenSubjects = (subjects: Set<string>) => ({
  type: SET_CHOSEN_SUBJECTS,
  subjects: subjects
})

export const setExamPage = (page: ExamPage) => ({
  type: SET_EXAM_PAGE,
  page: page
})

export const goToNextQuestion = () => ({
  // Goes to the next question in the current subject. If all questions are complete, goes to the "Completed Subject" page.
  type: GO_TO_NEXT_QUESTION
})

export const setQuestionResult = (subject: string, question: number, result: QuestionResult) => ({
  type: SET_QUESTION_RESULT,
  subject: subject,
  question: question,
  result: result
})

export const setAppPage = (page: Page) => ({
  type: SET_APP_PAGE,
  page: page
})