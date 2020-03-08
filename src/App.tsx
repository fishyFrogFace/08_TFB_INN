import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamState } from './Types';
import { ExamInfo } from 'frontpage/ExaminationBlurb';

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
    examID: null,
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
    examID: 2,
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

const pausedExams = () => {
  const currentData = localStorage.getItem('pausedData');
  return currentData == null ? [] : JSON.parse(currentData);
};

const nextID = () => {
  const next = localStorage.getItem('nextID');
  return next == null ? 1 : JSON.parse(next);
};

const pausedToExamInfo = () => {
  const paused = pausedExams();
  return paused.map((info: ExamState) => {
    return {
      id: info.examID,
      title: 'TODO',
      description: info.username,
      imageFilename: ''
    };
  });
};

const pausedAndCoded = () => {
  return fpExample.concat(pausedToExamInfo());
};

const App: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);
  const [chosenExamination, setChosenExamination] = useState(0);

  const storeExam = (data: ExamState) => {
    /* if the current examination does not have an id, give it one
      and add it to the local state and store it in localStorage,
      nextID is incremented by one */
    const pausedData = pausedExams();
    if (data.examID == null) {
      data.examID = nextID();
      const incrementedID = data.examID + 1;
      localStorage.setItem('nextID', JSON.stringify(incrementedID));
      localStorage.setItem(
        'pausedData',
        JSON.stringify(pausedData.concat(data))
      );
    } else {
      const withoutCurrent = pausedData.filter(
        (x: ExamState) => x.examID !== data.examID
      );
      localStorage.setItem(
        'pausedData',
        JSON.stringify(withoutCurrent.concat(data))
      );
    }
    changePage(Page.FrontPage);
  };

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
          availableExaminations={pausedAndCoded()}
          chooseExamination={chooseExamination}
        />
      );

    /* fetch questions and question props from local storage (or backend API)
       and pass them to Examination */
    case Page.Examination:
      return (
        <Examination
          state={examExamples[chosenExamination]}
          changePage={changePage}
          storeExam={storeExam}
        />
      );
  }
};

export default App;
