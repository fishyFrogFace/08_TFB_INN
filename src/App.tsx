import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { Page, ExamState, QuestionTemplate } from './Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';

interface State {
  currentPage: Page;
}

// Example data for examination blurbs
export const availableExaminations = [{
  instanceID: 0,
  title: 'Tittel',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.' +
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, porta nec venenatis ut, convallis convallis eros.',
  imageFilename: 'big-pink.png'
}];

export const standardExamDefinition = {
  subjects: [
    {
      name: 'Tema 1',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.START,
          questionContent: {
            resultTitle: 'Forstår bruk av knapper',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.COPYTEXT,
          questionContent: {
            text: 'A, b: C.',
            resultTitle: 'Kan skrive av tekst',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.COMPLETEDSUBJECT,
          questionContent: {}
        }
      ]
    },
    {
      name: 'Tema 2',
      questions: [
        {
          name: 'Start button',
          templateID: QuestionTemplate.START,
          questionContent: {
            resultTitle: 'Resultat 2.1',
            maxPoints: 1
          }
        },
        {
          name: 'Copy symbols by writing in an input field',
          templateID: QuestionTemplate.COPYTEXT,
          questionContent: {
            text: 'This is totally another subject',
            resultTitle: 'Resultat 2.2',
            maxPoints: 6
          }
        },
        {
          name: 'Completed subject',
          templateID: QuestionTemplate.COMPLETEDSUBJECT,
          questionContent: {}
        }
      ]
    }
  ]
};

const App: React.FC<{currentPage: Page}> = ({currentPage}) => {
  switch (currentPage) {
    case Page.FRONTPAGE:
      return (
        <FrontPage />
      );
    case Page.EXAMINATION:
      return (
        <Examination/>
      );
  }
};

const mapStateToProps = (store: RootState) => ({
  currentPage: store.appState.currentPage
});
const connector = connect(mapStateToProps);
export default connector(App);
