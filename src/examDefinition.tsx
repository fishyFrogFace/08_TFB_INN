import { QuestionTemplate } from 'Types';
import { checkPasswordSafety } from 'helpers/PasswordChecker';

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
          name: 'Spørsmål til veileder',
          templateID: QuestionTemplate.BigText,
          questionContent: {
            text: 'Har du noen spørsmål til veileder?'
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
            text: 'Hvilke to passord er mest sikre?',
            resultTitle: 'Kan kjenne igjen sikre passord',
            isImage: false,
            answerValues: [
              'passord',
              '%&¤#',
              'zi3A47gvq8nFVkv',
              '1q2w3e4r5t6y',
              '34BananerVokserPåTrær!'
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
              'Om du logger ut kan ingen andre gjøre endringer i din personlige informasjon på nettsiden',
              'Å krysse ut vinduet med nettsiden er det samme som å logge ut',
              '“Logg ut” betyr det samme som “logg av”, “log off” og “sign out”',
              'Det er viktig å logge ut når man er ferdig med å bruke en maskin som brukes av andre'
            ],
            correctAlternativeList: [
              'Om du logger ut kan ingen andre gjøre endringer i din personlige informasjon på nettsiden',
              '“Logg ut” betyr det samme som “logg av”, “log off” og “sign out”',
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
            illustration: require('./images/bankid-chip.svg'),
            resultTitle: 'Har BankID',
            answerValues: ['Ja', 'Nei', 'Vet ikke'],
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
            illustration: require('./images/bankid-logo.svg'),
            isImage: false,
            answerValues: [
              'BankID kan deles med andre',
              'Med BankID kan jeg få tilgang til helseopplysninger',
              'BankID har lav sikkerhet',
              'BankID er en personlig, elektronisk ID'
            ],
            correctAlternativeList: [
              'Med BankID kan jeg få tilgang til helseopplysninger',
              'BankID er en personlig, elektronisk ID'
            ]
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
      name: 'E-post',
      questions: [
        {
          name: 'Has e-mail',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Har du en e-postkonto?',
            resultTitle: 'Har e-postkonto',
            illustration: require('./images/email.svg'),
            answerValues: ['Ja', 'Nei', 'Vet ikke'],
            isImage: false
          }
        },
        {
          name: 'Recognize email inbox',
          templateID: QuestionTemplate.ChooseOneMastery,
          questionContent: {
            text: 'Hvilket av bildene nedenfor er en e-postinnboks?',
            resultTitle: 'Kan kjenne igjen en e-postinnboks',
            answerValues: [
              require('./images/whatsapp.svg'),
              require('./images/inbox.png'),
              require('./images/messages.svg'),
              require('./images/youtube.svg'),
              require('./images/website.svg')
            ],
            isImage: true,
            correctAlternative: require('./images/inbox.png')
          }
        },
        {
          name: 'Recognize email inbox',
          templateID: QuestionTemplate.ChooseOneMastery,
          questionContent: {
            text: 'Hvilket av alternativene nedenfor er en e-postadresse?',
            resultTitle: 'Kan kjenne igjen en e-postinnboks',
            answerValues: [
              'www.nrk.no',
              '“Oppskrift på lasagne”',
              'kari@gmail.com',
              '192.168.1.6'
            ],
            isImage: false,
            correctAlternative: 'kari@gmail.com'
          }
        },
        {
          name: 'Find new email button',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å opprette en ny e-post?',
            imageInformation: {
              image: require('./images/inbox.png'),
              imageWithIndicator: require('./images/new-email-correct.png'),
              min: { x: 14, y: 41 },
              max: { x: 129, y: 71 }
            },
            resultTitle: 'Kan opprette ny e-post',
            maxPoints: 6
          }
        },
        {
          name: 'Find topic field',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor skriver du emnet til e-posten?',
            imageInformation: {
              image: require('./images/email.jpeg'),
              imageWithIndicator: require('./images/subject-correct.png'),
              min: { x: 0, y: 76 },
              max: { x: 657, y: 102 }
            },
            resultTitle: 'Kan finne e-postemne',
            maxPoints: 6
          }
        },
        {
          name: 'Find recipient field',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor skriver du inn mottakerne av e-posten?',
            imageInformation: {
              image: require('./images/email.jpeg'),
              imageWithIndicator: require('./images/recipient-correct.png'),
              min: { x: 0, y: 53 },
              max: { x: 657, y: 76 }
            },
            resultTitle: 'Kan finne e-postmottakere',
            maxPoints: 6
          }
        },
        {
          name: 'Find body field',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å skrive innholdet i e-posten?',
            imageInformation: {
              image: require('./images/email.jpeg'),
              imageWithIndicator: require('./images/body-correct.png'),
              min: { x: 0, y: 128 },
              max: { x: 657, y: 329 }
            },
            resultTitle: 'Kan finne e-postinnhold',
            maxPoints: 6
          }
        },
        {
          name: 'Add attachment',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å legge til et vedlegg?',
            imageInformation: {
              image: require('./images/email.jpeg'),
              imageWithIndicator: require('./images/attachment-correct.png'),
              min: { x: 13, y: 336 },
              max: { x: 61, y: 360 }
            },
            resultTitle: 'Kan legge til vedlegg',
            maxPoints: 6
          }
        },
        {
          name: 'Send email',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å sende e-posten?',
            imageInformation: {
              image: require('./images/email.jpeg'),
              imageWithIndicator: require('./images/send-correct.png'),
              min: { x: 573, y: 337 },
              max: { x: 646, y: 360 }
            },
            resultTitle: 'Kan finne sendeknapp',
            maxPoints: 6
          }
        },
        {
          name: 'Open first email',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å åpne den øverste e-posten?',
            imageInformation: {
              image: require('./images/inbox.png'),
              imageWithIndicator: require('./images/first-email-correct.png'),
              min: { x: 146, y: 80 },
              max: { x: 648, y: 124 }
            },
            resultTitle: 'Kan åpne e-mail fra innboksen',
            maxPoints: 6
          }
        },
        {
          name: 'Reply to email',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å svare på e-posten?',
            imageInformation: {
              image: require('./images/reply.png'),
              imageWithIndicator: require('./images/reply-correct.png'),
              min: { x: 506, y: 123 },
              max: { x: 538, y: 145 }
            },
            resultTitle: 'Kan finne e-postinnhold',
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
