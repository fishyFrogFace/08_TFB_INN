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

const pausedExams = () => {
  const currentData = localStorage.getItem('pausedData');
  return currentData == null ? [] : JSON.parse(currentData);
};

const getPausedByID = (id: number) => {
  return pausedExams().filter((x: ExamState) => x.instanceID === id)[0];
};

const nextID = () => {
  const next = localStorage.getItem('nextID');
  return next == null ? 1 : JSON.parse(next);
};

// Create ExamInfo's from paused exams
const pausedToExamInfo = () => {
  const paused = pausedExams();
  return paused.map((info: ExamState) => {
    return {
      instanceID: info.instanceID,
      title: info.username,
      description: frontpageRepresentation.title,
      imageFilename: ''
    };
  });
};

/* Concat the list of standard exams and paused exams
  so it can be passed to examblurb */
const pausedAndCoded = () => {
  return [frontpageRepresentation].concat(pausedToExamInfo());
};

const App: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);
  const [currentExamState, setCurrentExamState] = useState(standardExamState);
  const [availableExaminations, setAvailableExaminations] = useState(
    pausedAndCoded()
  );

  const storeExam = (data: ExamState) => {
    /* if the current examination does not have an id, give it one
      and add it to the local state and store it in localStorage,
      nextID is incremented by one */
    const pausedData = pausedExams();
    if (data.instanceID === 0) {
      data.instanceID = nextID();
      const incrementedID = data.instanceID + 1;
      localStorage.setItem('nextID', JSON.stringify(incrementedID));
      localStorage.setItem(
        'pausedData',
        JSON.stringify(pausedData.concat(data))
      );
    } else {
      const withoutCurrent = pausedData.filter(
        (x: ExamState) => x.instanceID !== data.instanceID
      );
      localStorage.setItem(
        'pausedData',
        JSON.stringify(withoutCurrent.concat(data))
      );
    }
    setAvailableExaminations(pausedAndCoded());
    changePage(Page.FrontPage);
  };

  const changePage = (page: Page) => {
    setCurrentPage(page);
  };

  const chooseExamination = (instanceID: number) => {
    if (instanceID === 0) {
      setCurrentExamState(standardExamState);
    } else {
      setCurrentExamState(getPausedByID(instanceID));
    }
    setCurrentPage(Page.Examination);
  };

  const deletePausedExam = (instanceID: number) => {
    const newExams = pausedExams().filter(
      exam => exam.instanceID !== instanceID
    );
    localStorage.setItem('pausedData', JSON.stringify(newExams));
    setAvailableExaminations(pausedAndCoded());
  };

  switch (currentPage) {
    /* fetch available examinations from local storage (or backend API) and pass
       them to FrontPage */
    case Page.FrontPage:
      return (
        <FrontPage
          availableExaminations={availableExaminations}
          chooseExamination={chooseExamination}
          deletePausedExam={deletePausedExam}
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
          storeExam={storeExam}
        />
      );
  }
};

export default App;
