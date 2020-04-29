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
  ChooseOne,
  ChooseOneMastery
}

export interface SubjectResult {
  subjectTitle: string;
  results: QuestionResult[];
}

export interface QuestionResult {
  resultTitle: string;
  type: QuestionResultType;
  maxPoints: number;
  pointsAchieved: number;
  mastered: boolean;
  answerValues: string[];
}

export enum QuestionResultType {
  Mastery,
  Other
}

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

export interface Position {
  x: number;
  y: number;
}

export interface ImageInformation {
  min: Position;
  max: Position;
  image: string;
  imageWithIndicator: string;
}

export interface UserInformation {
  username: string;
  password: string;
}

export interface QuestionContent {
  avatar?: string;
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
