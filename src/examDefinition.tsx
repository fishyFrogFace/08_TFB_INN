import { QuestionTemplate } from 'Types';
import { checkPasswordSafety } from 'helpers/PasswordChecker';

/*
      {
        q:'severalbuttons',
        params: {
          text: 'hvilken farge liker du best?',
          measures: 'velg et alternativ',
          maxPoints: 1,
          answerValues: ["grønn", "gul", "blå", "rød"],
          correctAlt: "blå"
        }
      }
      */

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
            imageInformation: {
              image: require('./images/phone-charger.jpeg'),
              imageWithIndicator: require('./images/phone-charger-correct.jpg'),
              min: { x: 350, y: 237 },
              max: { x: 410, y: 264 }
            },
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
      name: 'Passord og innlogging',
      questions: [
        {
          name: 'Test password strength of user created password',
          templateID: QuestionTemplate.TextInput,
          questionContent: {
            text: 'Lag et sikkert passord',
            placeholder: 'Passord',
            resultTitle: 'Kan lage et sikkert passord',
            maxPoints: 40,
            processString: checkPasswordSafety
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
