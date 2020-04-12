import React from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import ResultPage from '../result/ResultPage';
import EnterName from '../exampages/EnterName';
import {
  Page,
  ExamState,
  ExamPage
} from '../Types';
import Subject from './Subject';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import {
  resetExamination, setAppPage, setExamPage
} from 'redux/actions';
import Overview from 'exampages/Overview';
import Choice from 'exampages/Choice';
import CompletedSubject from 'exampages/CompletedSubject';

interface Props extends ExamState {
  setExamPage: (page: ExamPage) => void,
  setAppPage: (page: Page) => void,
  resetExamination: () => void;
}

const Examination: React.FC<Props> = ({ currentPage, previousPage, username, subjectResults, setExamPage, setAppPage, resetExamination }) => { 
  // Function that determines if we are rendering a subject,
  // the overview of subjects, entering username etc.
  const renderPage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.QUESTION:
        return (
          <Subject/>
        );

      case ExamPage.ENTER_NAME:
        return (
          <EnterName
            avatar={'thing'} //TODO send real avatar here when we have that story ready
          />
        );

      case ExamPage.OVERVIEW:
        return (
          <Overview/>
        );

      case ExamPage.QUIT_TO_OVERVIEW:
          return (
            <Choice
              confirmChoice={() => setExamPage(ExamPage.OVERVIEW)}
              closeChoice={() => setExamPage(previousPage)}
              title='Tilbake til oversikt'
              body='Du vil bli tatt tilbake til emnevisningen. Du kan fortsette fra der du slapp. Fortsette?'
              btnClass='exit-btn'
              btnText='Til oversikt'
            />
          );

      case ExamPage.EXIT_EXAM:
        return (
          <Choice
            confirmChoice={() => {
              resetExamination();
              setAppPage(Page.FRONTPAGE);
            }}
            closeChoice={() => setExamPage(ExamPage.OVERVIEW)}
            title='Avslutte kartlegging'
            body='Fremgang vil bli slettet. Fortsette?'
            btnClass='exit-btn'
            btnText='Avslutt'
          />
        );

      case ExamPage.RESULTS:
        return <ResultPage username={username} subjectResults={subjectResults} />;

      case ExamPage.COMPLETED_SUBJECT:
        return <CompletedSubject/>
    }
  };

  return (
    <div className='main'>
      <NavBar/>
      {renderPage(currentPage)}
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const mapDispatchToProps = (dispatch) => {
  return {
    setExamPage: (page: ExamPage) => dispatch(setExamPage(page)),
    setAppPage: (page: Page) => dispatch(setAppPage(page)),
    resetExamination: () => dispatch(resetExamination())
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Examination);