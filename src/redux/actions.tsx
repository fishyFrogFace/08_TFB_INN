import { SubjectResult, ExamPage, Page } from 'Types';
import { Dispatch } from 'react';

export interface UpdateAppPageAction {
  type: 'updateAppPage';
  appPage: Page;
}

export const updateAppPage = (appPage: Page) => ({
  type: 'updateAppPage',
  appPage
});

export interface UpdateSubjectResultListAction {
  type: 'updateSubjectResultList';
  result: SubjectResult;
}

export const updateSubjectResultList = (result: SubjectResult) => ({
  type: 'updateSubjectResultList',
  result
});

export interface UpdateCurrentQuestionListAction {
  type: 'updateCurrentQuestionList';
  index: number;
  currentQuestion: number;
}

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
  dispatch(updateExamPage(ExamPage.WhatUnits));
  dispatch({
    type: 'setUsername',
    username
  });
};

export interface SetUnitsAction {
  type: 'setUnits';
  units: string[];
}

export const setUnits = (dispatch: Dispatch<any>, units: string[]) => {
  dispatch(updateExamPage(ExamPage.Overview));
  dispatch({
    type: 'setUnits',
    units
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

export interface ResetStateAction {
  type: 'resetApp';
}

export const resetState = () => ({
  type: 'resetApp'
});
