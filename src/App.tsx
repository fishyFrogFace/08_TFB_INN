import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamState } from './Types'

interface State {
  currentPage: Page;
}

// Example data for examination blurbs
const fpExample = [
  {
    id: 1,
    title: 'Level 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.',
    imageFilename: ''
  },
  {
    id: 2,
    title: 'Level 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.',
    imageFilename: 'big-pink.png'
  }
];

const examExamples = {
  1: {
    username: '',
    results: [],
    currentQuestion: 0,
    questions: [
      {
        q: 'start',
        params: {
          measures: 'Forstår bruk av knapper',
          maxPoints: 1
        }
      },
      { q: 'username', params: { avatar: 'Hello from app' } },
      {
        q: 'copytext',
        params: {
          text: 'A, b: C.',
          measures: 'Kan skrive av tekst',
          maxPoints: 6
        }
      },
      { q: 'end', params: {} }
    ]
  },
  2: {
    username: 'Gerd',
    results: [
      { measures: 'Forstår bruk av knapper', maxPoints: 1, pointsAchieved: 1 },
      {
        measures: 'Kan gjenkjenne vanlige ikoner',
        maxPoints: 10,
        pointsAchieved: 7
      },
      {
        measures: 'Kan finne innboksen sin og sende en email',
        maxPoints: 10,
        pointsAchieved: 1
      }
    ],
    currentQuestion: 2,
    questions: [
      { q: 'start', params: {} },
      { q: 'username', params: { avatar: 'Hello from app' } },
      {
        q: 'copytext',
        params: {
          text: 'A, b: C.',
          measures: 'Kan skrive av tekst',
          maxPoints: 6
        }
      },
      { q: 'end', params: {} }
    ]
  }
};

const storeExam = (data: ExamState) => {
  localStorage.setItem('pausedData', JSON.stringify(data));
}

const App: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);
  const [chosenExamination, setChosenExamination] = useState(0);

  // might need this when navbar comes into play
  const changePage = (page: Page) => {
    setCurrentPage(page);
  };

  const chooseExamination = (id: number) => {
    setChosenExamination(id);
    setCurrentPage(Page.Examination);
  };

  switch (currentPage) {
    /* fetch available examinations from local storage (or backend API) and pass
       them to FrontPage */
    case Page.FrontPage:
      return (
        <FrontPage
          availableExaminations={fpExample}
          chooseExamination={chooseExamination}
        />
      );

    /* fetch questions and question props from local storage (or backend API)
       and pass them to Examination */
    case Page.Examination:
      return (
        <Examination
<<<<<<< HEAD
          state={examExamples[chosenExamination]}
          changePage={changePage}
          storeExam={storeExam}
=======
          {...examExamples[chosenExamination]}
          changePage={changePage}
>>>>>>> 59f234df958c7ef2d85f7ed0cb9c0557220733a4
        />
      );
  }
};

export default App;
