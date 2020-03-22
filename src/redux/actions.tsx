import { QuestionResult, SubjectResult } from 'Types';

export enum ActionType {
  StartSubject,
  UpdateResults
}

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
