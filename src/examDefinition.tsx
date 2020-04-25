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
      name: 'Introduksjon',
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
          name: 'Choose the safest passwords',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Hvilke(t) passord er mest sikkert?',
            resultTitle: 'Kan kjenne igjen sikre passord',
            isImage: false,
            answerValues: [
              'passord',
              '%&¤#',
              'zi3A47gvq8nFVkv',
              'qwerty',
              '34BananerVokserPåTrær!',
              '1qaz2wsx3edc4rfv'
            ],
            correctAlt: ['zi3A47gvq8nFVkv', '34BananerVokserPåTrær!']
          }
        },
        {
          name: 'Use your username and password to log into a service',
          templateID: QuestionTemplate.LogIn,
          questionContent: {
            resultTitle: 'Kan bruke brukerinformasjon til å logge inn',
            userInformation: {
              username: '"vaffelkjeks"',
              password: '"JegEr1LitenFrosk:)"'
            },
            maxPoints: 5
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
