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
  SubjectResult,
  QuestionTemplate
} from '../Types';
import Subject from './Subject';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import {
  startSubject,
  initCurrentQuestionList,
  updateCurrentQuestionList
} from 'redux/actions';
import Overview from 'exampages/Overview';
import Choice from 'exampages/Choice';

interface Props extends PropsFromRedux {
  examState: ExamState;
  examDefinition: ExamDefinition;
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = props => {
  const [currentSubject, setCurrentSubject] = useState(
    props.examState.currentSubject
  );
  const [results, setResults] = useState(props.examState.results);
  const [examPage, setExamPage] = useState(() => {
    // setting the initial shared state in Redux
    props.initCurrentQuestionList(props.examState.currentQuestions);
    props.startSubject(
      props.examState.results.filter(r => r.subjectTitle === currentSubject)[0]
    );
    // setting the intial page
    return ExamPage.EnterName
  });
  const [lastPage, setLastPage] = useState(ExamPage.EnterName);
  const [username, setUsername] = useState(props.examState.username);

  /* TODO find a better way to find currentQuestion, e.g. string,
    since localStorage will return shifted results if the subject changes */
  const subjectIndex = (subject: string) =>
    props.examDefinition.subjects.findIndex(s => {
      return s.name === subject;
    });

  const updateCurrentQuestionsFunc = (currentQuestion: number) => {
    props.updateCurrentQuestionList(
      subjectIndex(currentSubject),
      currentQuestion
    );
  };

  const replaceSubjectResult = (subjectResult: SubjectResult) => {
    const newResult = results
      .filter(res => res.subjectTitle !== subjectResult.subjectTitle)
      .concat(subjectResult);
    setResults(newResult);
    return newResult;
  };

  const updateUsername = (username: string) => {
    setUsername(username);
    // tell the ouside world e.g. App about this change in state
    setExamPage(ExamPage.Overview);
  };

  const changeExamPage = (page: ExamPage) => setExamPage(page);

  const quitExam = () => {
    if (examPage === ExamPage.Overview) {
      props.changePage(Page.FrontPage);
    } else {
      setExamPage(ExamPage.Overview);
    }
  };

  const subjectOver = () => {
    replaceSubjectResult({
      subjectTitle: currentSubject,
      results: props.results
    });
    const nextSubjectIdx = subjectIndex(currentSubject) + 1;
    if (nextSubjectIdx >= props.examDefinition.subjects.length) {
      setExamPage(ExamPage.Results);
    } else {
      const newCurrentSubject =
        props.examDefinition.subjects[nextSubjectIdx].name;
      setCurrentSubject(newCurrentSubject);
      props.startSubject(props.examState.results[nextSubjectIdx]);
      setExamPage(ExamPage.Overview);
    }
  };

  // Function that determines if we are rendering a subject,
  // the overview of subjects, entering username etc.

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
        return (
          <Subject
            subject={
              props.examDefinition.subjects[subjectIndex(currentSubject)]
            }
            changePage={props.changePage}
            subjectOver={subjectOver}
            currentQuestion={
              props.currentQuestionList[subjectIndex(currentSubject)]
            }
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

      case ExamPage.Overview:
        return (
          <Overview
            subjects={props.examDefinition.subjects.map(subject => ({
              title: subject.name,
              completed: results.find(s => s.subjectTitle === subject.name)!
                .results.length,
              total: subject.questions.filter(
                q => q.templateID !== QuestionTemplate.CompletedSubject
              ).length
            }))}
            currentSubject={currentSubject}
            startExam={() => changeExamPage(ExamPage.Subject)}
          />
        );

      case ExamPage.Exit:
        return (
          <Choice
            confirmAction={quitExam}
            closeChoice={() => setExamPage(lastPage)}
            title='Avslutte kartlegging'
            body='Fremgang vil bli slettet. Fortsette?'
            btnClass='exit-btn'
            btnText='Avslutt'
          />
        );

      case ExamPage.Results:
        // TODO let App know the examination is over
        return <ResultPage username={username} result={results} />;
    }
  };

  return (
    <div className='main'>
      <NavBar showChoice={() => {
        setLastPage(examPage)
        changeExamPage(ExamPage.Exit);
        }} />
      {choosePage(examPage)}
    </div>
  );
};

// Redux related:

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

export default connector(Examination);
