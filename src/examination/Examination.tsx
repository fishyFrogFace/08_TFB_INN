import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import ResultPage from '../result/ResultPage';
import EnterName from '../exampages/EnterName';
import {
  Result,
  Page,
  ExamState,
  ExamDefinition,
  ExamPage
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
  const [questions] = useState(
    props.examDefinition.subjects[currentSubject].questions
  );
  const [result, setResult] = useState({
    username: props.examState.username,
    results: props.examState.results
  });
  const [examPage, setExamPage] = useState(props.examState.instanceID === 0 ? ExamPage.EnterName : ExamPage.Subject);

  const getUsername = (username: string) => {
    setResult((res: Result) => ({ ...res, username: username }));
    // tell the ouside world e.g. App about this change in state
    setExamPage(ExamPage.Subject);
  };

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
          console.log("Subject: " + props.examState.instanceID)
        return (
            <Subject
            examState={props.examState}
            examDefinition={props.examDefinition}
            changePage={props.changePage}
            storeExam={props.storeExam}
          />
        );

      case ExamPage.EnterName:
          console.log("EnterName: " + props.examState.instanceID)
        return (
          <EnterName
            avatar={"thing"} //TODO send real avatar here when we have that story ready
            getUsername={getUsername}
          />
        );

      case ExamPage.Exit:
        // TODO let App know the examination is over
        return <ResultPage {...result} />;
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
      results: result.results,
      username: result.username
    };
    props.storeExam(data);
  };

  return (
    <div className='main'>
        <p>Waaaat</p>
      <NavBar quitExam={quitExam} pauseExam={pauseExam} />
      {console.log("why not here")}
      {choosePage(examPage)}
    </div>
  );
};

export default Examination;
