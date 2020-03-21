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
  SubjectResult
} from '../Types';
import Subject from './Subject';

interface Props {
  examState: ExamState;
  examDefinition: ExamDefinition;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = props => {
  const [currentQuestions] = useState(
    props.examState.currentQuestions
  );
  const [currentSubject, setCurrentSubject] = useState(
    props.examState.currentSubject
  );
  const [results, setResult] = useState(props.examState.results);
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
    subjectResult: SubjectResult
  ) => {
    currentQuestions[currentSubject] = currentQuestion
    console.log(currentQuestions)
    setResult(replaceSubjectResult(subjectResult));
  };

  const replaceSubjectResult = (subjectResult: SubjectResult) => {
    const newResult = results
      .filter(res => res.subjectTitle !== subjectResult.subjectTitle)
      .concat(subjectResult);
    setResult(newResult);
    return results;
  };

  const quitExam = () => {
    // this might need to delete the paused examination, or will be deleted in the future
    // to limit the possibility of user errors
    // page does then not need to be imported and this line can be moved to app
    props.changePage(Page.FrontPage);
  };

  const pauseExam = () => {
    const data = {
      instanceID: props.examState.instanceID,
      currentQuestions: currentQuestions,
      currentSubject: currentSubject,
      results: results,
      username: username
    };
    props.storeExam(data);
  };

  const subjectOver = (subjectResult: SubjectResult) => {
    setResult(replaceSubjectResult(subjectResult));
    if (currentSubject >= props.examDefinition.subjects.length) {
      setExamPage(ExamPage.Results);
    } else {
      setCurrentSubject(currentSubject + 1);
    }
  };

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
        console.log("currentQuestion: " + currentQuestions[currentSubject])
        console.log("currentSubject: " + currentSubject)
        return (
          <Subject
            currentQuestion={currentQuestions[currentSubject]}
            result={results[currentSubject].results} //undefined, halp
            subject={props.examDefinition.subjects[currentSubject]}
            changePage={props.changePage}
            storeExam={props.storeExam}
            alertExamination={getSubjectInfo}
            subjectOver={subjectOver}
          />
        );

      case ExamPage.EnterName:
        return (
          <EnterName
            avatar={'thing'} //TODO send real avatar here when we have that story ready
            getUsername={getUsername}
          />
        );

      case ExamPage.Results:
        // TODO let App know the examination is over
        return <ResultPage username={username} result={results} />;
    }
  };

  return (
    <div className='main'>
      <NavBar quitExam={quitExam} pauseExam={pauseExam} />
      {choosePage(examPage)}
    </div>
  );
};

export default Examination;
