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
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import {
  startSubject,
  initCurrentQuestionList,
  updateCurrentQuestionList
} from 'redux/actions';

interface Props extends PropsFromRedux {
  examState: ExamState;
  examDefinition: ExamDefinition;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = props => {
  const [currentSubject, setCurrentSubject] = useState(
    props.examState.currentSubject
  );
  const [results, setResults] = useState(props.examState.results);
  const [examPage, setExamPage] = useState(() => {
    props.initCurrentQuestionList(props.examState.currentQuestions);
    props.startSubject(
      props.examState.results.filter(r => r.subjectTitle === currentSubject)[0]
    );
    return props.examState.instanceID === 0
      ? ExamPage.EnterName
      : ExamPage.Subject;
  });
  const [username, setUsername] = useState(props.examState.username);

  /* TODO find a better way to find currentQuestion, e.g. string,
    since localStorage will return shifted results if the subject changes */
  const currentSubjectIndex = () =>
    props.examDefinition.subjects.findIndex(s => {
      return s.name === currentSubject;
    });

  const updateCurrentQuestionsFunc = (currentQuestion: number) => {
    props.updateCurrentQuestionList(currentSubjectIndex(), currentQuestion);
  };

  const updateUsername = (username: string) => {
    setUsername(username);
    // tell the ouside world e.g. App about this change in state
    setExamPage(ExamPage.Subject);
  };

  const replaceSubjectResult = (subjectResult: SubjectResult) => {
    const newResult = results
      .filter(res => res.subjectTitle !== subjectResult.subjectTitle)
      .concat(subjectResult);
    setResults(newResult);
  };

  const quitExam = () => {
    // this might need to delete the paused examination, or will be deleted in the future
    // to limit the possibility of user errors
    // page does then not need to be imported and this line can be moved to app
    props.changePage(Page.FrontPage);
  };

  const pauseExam = () => {
    replaceSubjectResult({subjectTitle: currentSubject, results: props.results})
    const data = {
      instanceID: props.examState.instanceID,
      currentQuestions: props.currentQuestionList,
      currentSubject: currentSubject,
      results: results,
      username: username
    };
    props.storeExam(data);
  };

  const subjectOver = (subjectResult: SubjectResult) => {
    replaceSubjectResult(subjectResult);
    const nextSubjectIdx = currentSubjectIndex() + 1;
    console.log(nextSubjectIdx);
    if (nextSubjectIdx >= props.examDefinition.subjects.length) {
      setExamPage(ExamPage.Results);
    } else {
      const newCurrentSubject =
        props.examDefinition.subjects[nextSubjectIdx].name;
      setCurrentSubject(newCurrentSubject);
      replaceSubjectResult(subjectResult);
      props.startSubject(props.examState.results[nextSubjectIdx]);
    }
  };

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
        return (
          <Subject
            subject={props.examDefinition.subjects[currentSubjectIndex()]}
            changePage={props.changePage}
            storeExam={props.storeExam}
            subjectOver={subjectOver}
            currentQuestion={props.currentQuestionList[currentSubjectIndex()]}
            updateCurrentQuestion={updateCurrentQuestionsFunc}
          />
        );

      case ExamPage.EnterName:
        return (
          <EnterName
            avatar={'thing'} //TODO send real avatar here when we have that story ready
            getUsername={updateUsername}
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

const mapStateToProps = (store: RootState) => ({
  subjectTitle: store.subjectResult.subjectTitle,
  results: store.subjectResult.results,
  currentQuestionList: store.currentQuestionList
});

const mapToDispatch = {
  startSubject,
  initCurrentQuestionList,
  updateCurrentQuestionList
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

// Kvifor blir typen til connect any? Må vi sende mapToDispatch?
// type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Examination);
