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
            resultTitle: 'Forstår bruk av knapper'
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
          name: 'Questions for supervisor',
          templateID: QuestionTemplate.BigText,
          questionContent: {
            text: 'Har du noen spørsmål til veileder?',
            placeholder: 'Jeg lurer på...'
          },
          resultTitle: 'Spørsmål til veileder'
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject
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
            text: 'Logg inn med informasjonen under',
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
          templateID: QuestionTemplate.CompletedSubject
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
            resultTitle: 'Kan kjenne igjen en e-postadresse',
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
              min: { x: 400, y: 336 },
              max: { x: 450, y: 360 }
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
              min: { x: 374, y: 122 },
              max: { x: 398, y: 146 }
            },
            resultTitle: 'Kan svare på e-post',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject
        }
      ]
    },
    {
      name: 'Innstillinger og tilpasning av mobil',
      questions: [
        {
          name: 'Can adjust volume',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å skru opp og ned lyden på mobilen din?',
            illustration: require('./images/sound.svg'),
            resultTitle: 'Kan endre volum',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Can adjust brightness',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å skru opp og ned lysstyrken på mobilen din?',
            illustration: require('./images/brightness.svg'),
            resultTitle: 'Kan endre lysstyrke',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Can toggle flight mode',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å slå på flymodus på mobilen din?',
            illustration: require('./images/plane.svg'),
            resultTitle: 'Kan skru på flymodus',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'True about flight mode',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Hva er sant om flymodus?',
            resultTitle: 'Forstår hvordan flymodus fungerer',
            answerValues: [
              'Det er mulig å koble til WiFi, men ikke til mobilnett',
              'Det kan ikke komme lyd fra telefonen, men den kan vibrere',
              'Jeg kan motta SMS',
              'Ingen kan ringe meg når flymodus er på'
            ],
            isImage: false,
            correctAlternativeList: [
              'Det er mulig å koble til WiFi, men ikke til mobilnett',
              'Ingen kan ringe meg når flymodus er på'
            ]
          }
        },
        {
          name: 'Can toggle soundless',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å sette mobilen din på lydløs?',
            illustration: require('./images/soundless.svg'),
            resultTitle: 'Kan skru på lydløs modus',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Recognizes settings icon',
          templateID: QuestionTemplate.ChooseOneMastery,
          questionContent: {
            text: 'Hva betyr symbolet nedenfor?',
            illustration: require('./images/settings.svg'),
            resultTitle: 'Kjenner igjen ikon for innstillinger',
            answerValues: ['Bluetooth', 'Passord', 'Innstillinger', 'Bilder'],
            isImage: false,
            correctAlternative: 'Innstillinger'
          }
        },
        {
          name: 'Recognizes WiFi icon',
          templateID: QuestionTemplate.ChooseOneMastery,
          questionContent: {
            text: 'Hva betyr symbolet nedenfor?',
            illustration: require('./images/wifi.svg'),
            resultTitle: 'Kjenner igjen WiFi-ikon',
            answerValues: ['Bluetooth', 'Mobilnett', 'Innstillinger', 'WiFi'],
            isImage: false,
            correctAlternative: 'WiFi'
          }
        },
        {
          name: 'Can toggle wifi',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å skru av og på WiFi?',
            illustration: require('./images/wifi.svg'),
            resultTitle: 'Kan skru av og på WiFi',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Can connect to wifi',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å koble seg på et nytt WiFi-nettverk?',
            illustration: require('./images/wifi.svg'),
            resultTitle: 'Kan koble på trådløst nettverk',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'True about WiFi and mobile data',
          templateID: QuestionTemplate.MultipleButtons,
          questionContent: {
            text: 'Hvilke påstander stemmer?',
            resultTitle: 'Forstår forskjeller mellom WiFi og mobilnett',
            answerValues: [
              'Der det er mulig å ringe, er det også mobilnett tilgjengelig',
              'Mobilnett er ikke knyttet til mitt mobilabonnement',
              'Jeg kan ofte koble meg på gratis internett på offentlige plasser, som for eksempel kaféer, bibliotek og kjøpesenter',
              'Det er en fordel å bruke mobilnett når man skal se på film'
            ],
            isImage: false,
            correctAlternativeList: [
              'Der det er mulig å ringe, er det også mobilnett tilgjengelig',
              'Jeg kan ofte koble meg på gratis internett på offentlige plasser, som for eksempel kaféer, bibliotek og kjøpesenter'
            ]
          }
        },
        {
          name: 'Recognizes bluetooth icon',
          templateID: QuestionTemplate.ChooseOneMastery,
          questionContent: {
            text: 'Hva betyr symbolet nedenfor?',
            illustration: require('./images/bluetooth.svg'),
            resultTitle: 'Kjenner igjen bluetooth-ikon',
            answerValues: ['Bluetooth', 'Mobilnett', 'Innstillinger', 'WiFi'],
            isImage: false,
            correctAlternative: 'Bluetooth'
          }
        },
        {
          name: 'Can toggle mobile data',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text: 'Får du til å slå av og på mobildata?',
            resultTitle: 'Kan slå av og på mobildata',
            answerValues: ['Ja', 'Nei'],
            isImage: false
          }
        },
        {
          name: 'Settings I want to learn',
          templateID: QuestionTemplate.BigText,
          questionContent: {
            text: 'Hvilke andre innstillinger har du lyst til å lære deg?',
            placeholder: 'Jeg vil lære meg å...',
            resultTitle: 'Jeg ønsker å lære dette'
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.CompletedSubject
        }
      ]
    },
    {
      name: 'Å ringe og sende SMS',
      questions: [
        {
          name: 'Send and Receive',
          templateID: QuestionTemplate.ChooseOne,
          questionContent: {
            text:
              'Har du sendt og mottatt SMS før (tekstmelding til telefonnummer)?',
            resultTitle: 'Har sendt eller mottatt SMS',
            answerValues: ['Ja', 'Nei', 'Vet ikke']
          }
        },
        {
          name: 'Open SMS-app',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Finn og trykk på SMS-appen',
            imageInformation: {
              image: require('./images/find-app.jpeg'),
              imageWithIndicator: require('./images/find-messages-correct.png'),
              min: { x: 108, y: 139 },
              max: { x: 140, y: 180 }
            },
            resultTitle: 'Kan finne SMS-app',
            maxPoints: 6
          }
        },
        {
          name: 'Open Sara message',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å åpne meldingen fra Sara?',
            imageInformation: {
              image: require('./images/sms-inbox.jpg'),
              imageWithIndicator: require('./images/open-message-correct.png'),
              min: { x: 0, y: 35 },
              max: { x: 215, y: 82 }
            },
            resultTitle: 'Kan klikke på SMS',
            maxPoints: 6
          }
        },
        {
          name: 'Respond message',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å skrive et svar til Sara?',
            imageInformation: {
              image: require('./images/sms.png'),
              imageWithIndicator: require('./images/sms-respond-correct.png'),
              min: { x: 0, y: 344 },
              max: { x: 170, y: 365 }
            },
            resultTitle: 'Vet hvor man svarer på SMS',
            maxPoints: 6
          }
        },
        {
          name: 'Send message',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å sende meldingen til Sara?',
            imageInformation: {
              image: require('./images/sms.png'),
              imageWithIndicator: require('./images/sms-send-correct.png'),
              min: { x: 189, y: 346 },
              max: { x: 213, y: 365 }
            },
            resultTitle: 'Kan sende SMS',
            maxPoints: 6
          }
        },
        {
          name: 'Create new message',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor klikker du for å opprette en ny melding?',
            imageInformation: {
              image: require('./images/sms-inbox.jpg'),
              imageWithIndicator: require('./images/new-message-correct.png'),
              min: { x: 167, y: 321 },
              max: { x: 204, y: 351 }
            },
            resultTitle: 'Kan opprette ny melding',
            maxPoints: 6
          }
        },
        {
          name: 'Open contactlist',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Åpne kontaktliste',
            imageInformation: {
              image: require('./images/find-app.jpeg'),
              imageWithIndicator: require('./images/find-contacts-correct.png'),
              min: { x: 74, y: 87 },
              max: { x: 108, y: 129 }
            },
            resultTitle: 'Kan åpne kontaktliste',
            maxPoints: 6
          }
        },
        {
          name: 'Open contact',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor trykker du for å se Janis sitt telefonnummer?',
            imageInformation: {
              image: require('./images/contact-list.png'),
              imageWithIndicator: require('./images/contact-list-correct.png'),
              min: { x: 11, y: 279 },
              max: { x: 182, y: 307 }
            },
            resultTitle: 'Kan åpne kontakt',
            maxPoints: 6
          }
        },
        {
          name: 'Call contact',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor trykker du for å ringe Janis?',
            imageInformation: {
              image: require('./images/profile.jpeg'),
              imageWithIndicator: require('./images/profile-call-correct.png'),
              min: { x: 78, y: 179 },
              max: { x: 135, y: 222 }
            },
            resultTitle: 'Kan ringe kontakt',
            maxPoints: 6
          }
        },
        {
          name: 'SMS to contact',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor trykker du for å sende melding til Janis?',
            imageInformation: {
              image: require('./images/profile.jpeg'),
              imageWithIndicator: require('./images/profile-sms-correct.png'),
              min: { x: 0, y: 179 },
              max: { x: 71, y: 222 }
            },
            resultTitle: 'Kan melde kontakt',
            maxPoints: 6
          }
        },
        {
          name: 'Add new contact',
          templateID: QuestionTemplate.WhereInPicture,
          questionContent: {
            text: 'Hvor trykker du for å legge til en person i kontaktlisten?',
            imageInformation: {
              image: require('./images/contact-list.png'),
              imageWithIndicator: require('./images/new-contact-correct.png'),
              min: { x: 171, y: 309 },
              max: { x: 202, y: 339 }
            },
            resultTitle: 'Kan legge til ny kontakt',
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
