import { QuestionTemplate } from 'Types';
import { checkPasswordSafety } from 'helpers/PasswordChecker';

export const standardExamDefinition = {
  subjects: [
    {
      name: 'Introduksjon',
      questions: [
        /*
        {
          name: 'Start button',
          templateID: QuestionTemplate.Start,
          questionContent: {
            resultTitle: 'Forstår bruk av knapper',
            maxPoints: 1
          }
        },*/
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
      name: 'Passord, innlogging og BankID',
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
            text: 'Hvilke passord er mest sikre?',
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
            correctAlternativeList: [
              'zi3A47gvq8nFVkv',
              '34BananerVokserPåTrær!'
            ]
          }
        },
        {
          name: 'Use your username and password to log into a service',
          templateID: QuestionTemplate.LogIn,
          questionContent: {
            resultTitle: 'Kan bruke brukerinformasjon til å logge inn',
            userInformation: {
              username: 'vaffelkjeks',
              password: 'JegEr1LitenFrosk:)'
            },
            maxPoints: 5
          }
        },
        {
          name: 'What is true about login',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Hva er sant når du har logget inn på en nettside?',
            resultTitle:
              'Forstår viktigheten av utlogging og hvordan utlogging fungerer',
            isImage: false,
            answerValues: [
              'Jeg må ikke logge ut igjen',
              'Om jeg logger ut, kan ingen se min personlige informasjon',
              'Å lukke fanen/nettleseren er det samme som å logge ut',
              'Det er viktig å logge ut når man er ferdig med å bruke en maskin som brukes av andre'
            ],
            correctAlternativeList: [
              'Om jeg logger ut, kan ingen se min personlige informasjon',
              'Det er viktig å logge ut når man er ferdig med å bruke en maskin som brukes av andre'
            ]
          }
        },
        {
          name: 'Choose all PIN-codes',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Klikk på PIN-koden(e)',
            resultTitle: 'Kan kjenne igjen PIN-koder',
            isImage: false,
            answerValues: [
              'passord',
              '757912',
              '%&¤#',
              'zi3A47gvq8nFVkv',
              '3487',
              'PIN1'
            ],
            correctAlternativeList: ['757912', '3487']
          }
        },
        {
          name: 'Has BankID',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Har du BankID (kodebrikke)?',
            resultTitle: 'Har BankID',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Uses BankID independently',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Har du brukt BankID (kodebrikke) alene før?',
            resultTitle: 'Bruker BankID alene',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Understands why they have BankID',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Jeg forstår hvorfor jeg trenger BankID',
            resultTitle: 'Forstår hva BankID brukes til',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'What is true about BankID',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Hva er sant om BankID?',
            resultTitle: 'Forstår hva BankID er og hvordan den fungerer',
            isImage: false,
            answerValues: [
              'BankID er personlig',
              'BankID kan deles med andre',
              'Med BankID kan jeg få tilgang til helseopplysninger',
              'BankID har lav sikkerhet',
              'BankID er en elektronisk ID/legitimasjon'
            ],
            correctAlternativeList: [
              'BankID er personlig',
              'Med BankID kan jeg få tilgang til helseopplysninger',
              'BankID er en elektronisk ID/legitimasjon'
            ]
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
