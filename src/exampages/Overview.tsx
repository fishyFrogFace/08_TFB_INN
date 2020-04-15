import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';
import { ExamState, ExamPage } from 'Types';
import { startSubject, setExamPage, continueSubject } from 'redux/actions';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';

interface Props extends ExamState {
  startSubject: (subject: string) => void;
  continueSubject: (subject: string) => void;
  setExamPage: (page: ExamPage) => void;
}

const Overview: React.FC<Props> = ({ examDefinition, subjectResults, startSubject, continueSubject, setExamPage }) => {
  const startOrContinueSubject = (subjectName: string, questionsCompleted: number) => {
    if (questionsCompleted === 0)
      startSubject(subjectName);
    else
      continueSubject(subjectName);
  }

  return (
    <div className='questionContainer'>
      <h1 className='h1 overview-header'>Mine temaer</h1>
      <div className='subjectContainer'>
        {examDefinition.subjects.map((subject, i) => {
          const subjectResult = subjectResults.get(subject.name);
          const questionsCompleted = (subjectResult !== undefined) ? subjectResult.results.length : 0;
          const numberOfQuestions = subject.questions.length;
          return (
            <Button
              key={i}
              classNames='subject-btn'
              onClick={() => startOrContinueSubject(subject.name, questionsCompleted)}
              disabled={questionsCompleted >= numberOfQuestions}>
              <h2 className='subjectTitle'>{subject.name}</h2>
              <CircularProgressBar
                completed={questionsCompleted}
                total={numberOfQuestions}
              />
            </Button>
          );
        })}
      </div>
      <Button onClick={() => setExamPage(ExamPage.RESULTS)} classNames="next see-results">
        Se resultater
      </Button>
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const mapDispatchToProps = (dispatch) => {
  return {
    startSubject: (subject: string) => dispatch(startSubject(subject)),
    continueSubject: (subject: string) => dispatch(continueSubject(subject)),
    setExamPage: (page: ExamPage) => dispatch(setExamPage(page))
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Overview);
