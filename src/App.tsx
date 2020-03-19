import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamState } from './Types';

interface State {
  currentPage: Page;
}

// Example data for examination blurbs
const standardExams = [
  {
    examID: 0,
    templateID: 1,
    title: 'Tittel',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.',
    imageFilename: 'big-pink.png'
  }
];

const examExamples = {
  1: {
    examID: 0,
    templateID: 1,
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
      { 
        q: 'username', 
        params: { 
          avatar: 'Hello from app' 
        } 
      },
      {
        q: 'copytext',
        params: {
          text: 'A, b: C.',
          measures: 'Kan skrive av tekst',
          maxPoints: 6
        }
      },
      
      {
        q:'severalbuttons',
        params: {
          text: 'hvilken farge liker du best?',
          measures: 'velg et alternativ',
          maxPoints: 1,
          answerValues: ["grønn", "gul", "blå", "rød"],
          correctAlt: "blå"
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

const getPausedByID = (id: number) => {
  return pausedExams().filter((x: ExamState) => x.examID === id)[0];
};

const nextID = () => { //current examid
  const next = localStorage.getItem('nextID');
  return next == null ? 1 : JSON.parse(next);
};

const getTitle = (templateID: number) => {
  return standardExams.find(exam => exam.templateID === templateID)?.title;
};

// Create ExamInfo's from paused exams
const pausedToExamInfo = () => {
  const paused = pausedExams();
  return paused.map((info: ExamState) => {
    console.log(getTitle(info.templateID));
    return {
      examID: info.examID,
      templateID: info.templateID,
      title: info.username,
      description: getTitle(info.templateID),
      imageFilename: ''
    };
  });
};

/* Concat the list of standard exams and paused exams
  so it can be passed to examblurb */
const pausedAndCoded = () => {
  return standardExams.concat(pausedToExamInfo());
};

const App: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);
  const [currentExam, setCurrentExam] = useState(examExamples[1]);
  const [availableExaminations, setAvailableExaminations] = useState(pausedAndCoded());

  const storeExam = (data: ExamState) => {
    /* if the current examination does not have an id, give it one
      and add it to the local state and store it in localStorage,
      nextID is incremented by one */
    const pausedData = pausedExams();
    if (data.examID === 0) {
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
    setAvailableExaminations(pausedAndCoded());
  };

  const changePage = (page: Page) => {
    setCurrentPage(page);
  };

  const chooseExamination = (examID: number, templateID: number) => {
    if (examID === 0) {
      setCurrentExam(examExamples[templateID]);
    } else {
      setCurrentExam(getPausedByID(examID));
    }
    setCurrentPage(Page.Examination);
  };

  const deletePausedExam = (examID: number) => {
    const newExams = pausedExams().filter(exam => exam.examID !== examID);
    localStorage.setItem('pausedData', JSON.stringify(newExams));
    setAvailableExaminations(pausedAndCoded());
  }

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
          state={currentExam}
          changePage={changePage}
          storeExam={storeExam}
        />
      );
  }
};

export default App;
