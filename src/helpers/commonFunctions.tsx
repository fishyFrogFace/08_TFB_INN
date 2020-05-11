import { QuestionDefinition, QuestionTemplate } from 'Types';

export const validQuestions = (questions: QuestionDefinition[]) =>
  questions.filter(q => q.templateID !== QuestionTemplate.CompletedSubject);
