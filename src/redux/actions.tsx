import { QuestionResult, SubjectResult, ExamPage, Page } from 'Types';

// We export both the type interface and the type string, to prevent typos

// Action types
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

export type ExamStateAction = StartSubjectAction | SetUsernameAction | ResetExaminationAction
  | SetChosenSubjectsAction | SetExamPageAction | GoToNextQuestionAction | SetQuestionResultAction;
export type AppStateAction = SetAppPageAction;

// Action generators
export const startSubject = (subject: string) => ({
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