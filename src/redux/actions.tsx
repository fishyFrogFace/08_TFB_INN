import { QuestionResult, SubjectResult, ExamPage } from 'Types';
import { Dispatch } from 'react';

export interface StartSubjectAction {
  type: 'startSubject';
  subjectResult: SubjectResult;
}

export interface UpdateResultsAction {
  type: 'updateSubject';
  results: QuestionResult[];
}

export type SubjectResultAction = StartSubjectAction | UpdateResultsAction;

export const startSubject = (subjectResult: SubjectResult) => {
  return {
    type: 'startSubject',
    subjectResult
  };
};

export const updateResults = (results: QuestionResult[]) => ({
  type: 'updateSubject',
  results
});

export interface InitCurrentQuestionListAction {
  type: 'initCurrentQuestionList';
  currentQuestionList: number[];
}

export interface UpdateCurrentQuestionListAction {
  type: 'updateCurrentQuestionList';
  index: number;
  currentQuestion: number;
}

export type CurrentQuestionAction =
  | InitCurrentQuestionListAction
  | UpdateCurrentQuestionListAction;

export const initCurrentQuestionList = (currentQuestionList: number[]) => ({
  type: 'initCurrentQuestionList',
  currentQuestionList
});

export const updateCurrentQuestionList = (
  index: number,
  currentQuestion: number
) => ({
  type: 'updateCurrentQuestionList',
  index,
  currentQuestion
});

export interface SetUsernameAction {
  type: 'setUsername';
  username: string;
}

export const setUsername = (dispatch: Dispatch<any>, username: string) => {
  dispatch(updateExamPage(ExamPage.Overview));
  dispatch({
    type: 'setUsername',
    username
  });
};

export interface UpdateExamPageAction {
  type: 'updateExamPage';
  examPage: ExamPage;
}

export const updateExamPage = (examPage: ExamPage) => ({
  type: 'updateExamPage',
  examPage
});

export interface UpdateCurrentSubjectAction {
  type: 'updateCurrentSubject';
  currentSubject: string;
}

export const updateCurrentSubject = (currentSubject: String) => ({
  type: 'updateCurrentSubject',
  currentSubject
});
