export enum Page {
  Examination,
  FrontPage
}

export interface Result {
  username: string;
  results: QuestionResult[];
}

export interface QuestionResult {
  measures: string;
  maxPoints: number;
  pointsAchieved: number;
}

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components.
   also gave up using an int here, we will have to check that elsewhere, e.g. database */
export interface ExamState {
  examID: number;
  currentQuestion: number;
  questions: Question[];
  results: QuestionResult[];
  username: string;
}

export interface QuestionParams {
  avatar: string;
  measures: string;
  maxPoints: number;
  text: string;
}

export interface Question {
  q: string;
  params: QuestionParams;
}
