export enum Page {
  Examination,
  FrontPage
}

export enum ExamPage {
  Subject,
  EnterName,
  ChooseSubjects,
  QuestionDefinition,
  Overview,
  Exit,
  Pause,
  Results,
  WhatUnits
}

export enum QuestionTemplate {
  Start,
  CopyText,
  WhereInPicture,
  CompletedSubject,
  TextInput,
  LogIn,
  MultipleButtons,
  BigText,
  ChooseOne,
  ChooseOneMastery
}

export interface SubjectResult {
  subjectColor: string;
  subjectTitle: string;
  results: QuestionResult[];
}

export interface CommonResult {
  resultTitle: string;
  questionTitle: string;
  answerValues: string[];
}

export interface Mastery {
  common: CommonResult;
  mastered: boolean;
  type: 'mastery';
}

export interface Points {
  common: CommonResult;
  maxPoints: number;
  pointsAchieved: number;
  type: 'points';
}

export interface Other {
  common: CommonResult;
  type: 'other';
}

export type QuestionResult = Mastery | Points | Other;

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components.
   also gave up using an int here, we will have to check that elsewhere, e.g. database */
export interface ExamState {
  instanceID: number;
  currentQuestions: number[];
  currentSubject: string;
  results: SubjectResult[];
  username: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Position {
  min: Coordinates;
  max: Coordinates;
}

export interface ImageInformation {
  smallScreen: Position[];
  largeScreen: Position[];
  image: string;
  imageWithIndicator: string;
}

export interface UserInformation {
  username: string;
  password: string;
}

export interface QuestionContent {
  resultTitle?: string;
  maxPoints?: number;
  text?: string;
  imageInformation?: ImageInformation;
  correctAlternativeList?: string[];
  correctAlternative?: string;
  answerValues?: string[];
  isImage?: boolean;
  processString?: (input: string, maxPoints: number) => number;
  placeholder?: string;
  userInformation?: UserInformation;
  illustration?: string;
}

export interface QuestionDefinition {
  name: string;
  templateID: QuestionTemplate;
  questionContent: QuestionContent;
}

export interface SubjectDefinition {
  name: string;
  subjectColor: string;
  questions: QuestionDefinition[];
}

export interface ExamDefinition {
  subjects: SubjectDefinition[];
}
