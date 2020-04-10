import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page } from './Types';
import { standardExamDefinition } from './examDefinition';

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

const standardExamState = {
  instanceID: 0,
  results: standardExamDefinition.subjects.map((subj) => {
    return { subjectTitle: subj.name, results: [] };
  })
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
