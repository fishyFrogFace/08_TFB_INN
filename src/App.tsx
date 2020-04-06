import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamState, QuestionTemplate } from './Types';

interface State {
  currentPage: Page;
}

// Example data for examination blurbs
const frontpageRepresentation = {
  instanceID: 0,
  title: 'Tittel',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.',
  imageFilename: 'big-pink.png'
};

const standardExamDefinition = {
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

const standardExamState = {
  instanceID: 0,
  username: '',
  results: standardExamDefinition.subjects.map(subj => {
    return { subjectTitle: subj.name, results: [] };
  }),
  currentQuestions: standardExamDefinition.subjects.map(subj => 0),
  currentSubject: 'Tema 1'
};

const App: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);
  const [currentExamState, setCurrentExamState] = useState(standardExamState);

  const changePage = (page: Page) => {
    setCurrentPage(page);
  };

  const chooseExamination = (instanceID: number) => {
    setCurrentExamState(standardExamState);
    setCurrentPage(Page.Examination);
  };

  switch (currentPage) {
    /* fetch available examinations from local storage (or backend API) and pass
       them to FrontPage */
    case Page.FrontPage:
      return (
        <FrontPage
          availableExaminations={[frontpageRepresentation]}
          chooseExamination={chooseExamination}
        />
      );

    /* fetch questions and question props from local storage (or backend API)
       and pass them to Examination */
    case Page.Examination:
      return (
        <Examination
          examState={currentExamState}
          examDefinition={standardExamDefinition}
          changePage={changePage}
        />
      );
  }
};

export default App;
