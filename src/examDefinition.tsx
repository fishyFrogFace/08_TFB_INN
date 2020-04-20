import { QuestionTemplate } from 'Types';

export const standardExamDefinition = {
  subjects: [
    {
      name: 'Tema 1',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.Start,
          questionContent: {
            resultTitle: 'Forstår bruk av knapper',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.CopyText,
          questionContent: {
            text: 'A, b: C.',
            resultTitle: 'Kan skrive av tekst',
            maxPoints: 6
          }
        },
        {
          name: 'Find charger input',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Klikk på laderinngangen',
            imageInformation: {image: require('./images/phone-charger.jpeg'), min: {x: 950, y: 593}, max: {x: 1035, y: 627}},
            resultTitle: 'Kan finne ladeinngang på mobiltelefon',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject,
          questionContent: {}
        }
      ]
    },
    {
      name: 'Tema 2',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.Start,
          questionContent: {
            resultTitle: 'Resultat 2.1',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.CopyText,
          questionContent: {
            text: 'This is totally another subject',
            resultTitle: 'Resultat 2.2',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject,
          questionContent: {}
        }
      ]
    }
  ]
};
