import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import ResultPage from '../result/ResultPage';
import EnterName from '../exampages/EnterName';
import {
  Page,
  ExamState,
  ExamDefinition,
  ExamPage,
  QuestionResult
} from '../Types';
import Subject from './Subject';

interface Props {
  examState: ExamState;
  examDefinition: ExamDefinition;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(
    props.examState.currentQuestion
  );
  const [currentSubject, setCurrentSubject] = useState(
    props.examState.currentSubject
  );
  const [result, setResult] = useState(props.examState.results);
  const [examPage, setExamPage] = useState(
    props.examState.instanceID === 0 ? ExamPage.EnterName : ExamPage.Subject
  );
  const [username, setUsername] = useState(props.examState.username);

  const getUsername = (username: string) => {
    setUsername(username);
    // tell the ouside world e.g. App about this change in state
    setExamPage(ExamPage.Subject);
  };

  const getSubjectInfo = (
    currentQuestion: number,
    result: QuestionResult[]
  ) => {
    setCurrentQuestion(currentQuestion);
    setResult(result);
  };

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
        console.log('Subject: ' + props.examState.instanceID);
        return (
          <Subject
            examState={props.examState}
            examDefinition={props.examDefinition}
            changePage={props.changePage}
            storeExam={props.storeExam}
            alertExamination={getSubjectInfo}
            examOver={examOver}
          />
        );

      case ExamPage.EnterName:
        console.log('EnterName: ' + props.examState.instanceID);
        return (
          <EnterName
            avatar={'thing'} //TODO send real avatar here when we have that story ready
            getUsername={getUsername}
          />
        );

      case ExamPage.Results:
        // TODO let App know the examination is over
        return <ResultPage username={username} result={result} />;
    }
  };

  const quitExam = () => {
    // when storage is in place, this might need to delete the paused examination
    // page does then not need to be imported and this line can be moved to app
    props.changePage(Page.FrontPage);
  };

  const pauseExam = () => {
    const data = {
      instanceID: props.examState.instanceID,
      currentQuestion: currentQuestion,
      currentSubject: currentSubject,
      results: result,
      username: username
    };
    props.storeExam(data);
  };

  const examOver = (result: QuestionResult[]) => {
    setResult(result);
    setExamPage(ExamPage.Results);
  };

  return (
    <div className='main'>
      <NavBar quitExam={quitExam} pauseExam={pauseExam} />
      {choosePage(examPage)}
    </div>
  );
};

export default Examination;
