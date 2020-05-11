import { QuestionDefinition, QuestionTemplate } from 'Types';

export const amountOfValidQuestions = (questions: QuestionDefinition[]) =>
  questions.filter(q => q.templateID !== QuestionTemplate.CompletedSubject)
    .length;
