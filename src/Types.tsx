export enum Page {
  EXAMINATION,
  FRONTPAGE
}

export enum ExamPage {
  QUESTION,
  ENTER_NAME,
  CHOOSE_SUBJECTS,
  OVERVIEW,
  COMPLETED_SUBJECT,
  QUIT_TO_OVERVIEW,
  EXIT_EXAM,
  RESULTS
}

export enum QuestionTemplate {
  START,
  COPYTEXT
}

export interface AppState {
  currentPage: Page;
  availableExaminations: ExamInfo[];
}

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components.
   also gave up using an int here, we will have to check that elsewhere, e.g. database */
export interface ExamState {
  examDefinition: ExamDefinition;
  username: string;
  chosenSubjects: Set<string>; // Empty: hasn't chosen subjects
  currentPage: ExamPage;
  previousPage: ExamPage;
  currentSubject: string;
  currentQuestion: number;
  subjectResults: Map<string, SubjectResult>;
}

export interface SubjectResult {
  results: QuestionResult[];
}

export interface QuestionResult {
  resultTitle: string;
  maxPoints: number;
  pointsAchieved: number;
}

export interface QuestionContent {
  avatar?: string;
  resultTitle?: string;
  maxPoints?: number;
  text?: string;
}

export interface QuestionDefinition {
  name: string;
  templateID: QuestionTemplate;
  questionContent: QuestionContent;
}

export interface SubjectDefinition {
  name: string;
  questions: QuestionDefinition[];
}

export interface ExamDefinition {
  subjects: SubjectDefinition[];
}

export interface ExamInfo {
  instanceID: number;
  title: string;
  description: string;
  imageFilename: string;
}
