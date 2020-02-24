import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';

export enum Page {
  Examination,
  FrontPage
}

interface State {
  currentPage: Page;
}

const fpExample = [
  { name: 'Lvl 1', username: '', avatar: 'TODO', status: 'new', id: 1 },
  { name: 'Lvl 2', username: '', avatar: 'TODO', status: 'new', id: 1 },
  { name: 'Lvl 2', username: 'Gerd', avatar: 'TODO', status: 'paused', id: 2 },
  { name: 'Lvl 2', username: 'Peder', avatar: 'TODO', status: 'paused', id: 2 },
  { name: 'Lvl 2', username: 'Ali', avatar: 'TODO', status: 'paused', id: 2 },
  { name: 'Lvl 2', username: 'Ole', avatar: 'TODO', status: 'paused', id: 2 }
];

const examExamples = {
  1: {
    currentQuestion: 0,
    questions: [
      { q: 'start', params: {} },
      { q: 'username', params: { avatar: 'Hello from app' } },
      { q: 'end', params: {} }
    ]
  },
  2: {
    currentQuestion: 1,
    questions: [
      { q: 'start', params: {} },
      { q: 'username', params: { avatar: 'Hello from app' } },
      { q: 'end', params: {} }
    ]
  }
};

const App: React.FC<{}> = props => {
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
      return <Examination {...examExamples[chosenExamination]} />;
  }
};

export default App;
