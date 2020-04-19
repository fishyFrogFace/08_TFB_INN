import { QuestionResult, SubjectResult } from 'Types';

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
