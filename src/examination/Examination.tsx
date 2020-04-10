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
  updateCurrentQuestionList,
  updateExamPage,
  updateCurrentSubject
} from 'redux/actions';
import Overview from 'exampages/Overview';
import Choice from 'exampages/Choice';

interface Props extends PropsFromRedux {
  examState: ExamState;
  examDefinition: ExamDefinition;
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = (props) => {
  const [results, setResults] = useState(() => {
    // setting the initial shared state in Redux
    props.startSubject(
      props.examState.results.filter(
        (r) => r.subjectTitle === props.currentSubject
      )[0]
    );
    return props.examState.results;
  });

  const [lastPage, setLastPage] = useState(ExamPage.EnterName);

  /* TODO find a better way to find currentQuestion, e.g. string,
    since localStorage will return shifted results if the subject changes */
  const subjectIndex = (subject: string) =>
    props.examDefinition.subjects.findIndex((s) => {
      return s.name === subject;
    });

  const updateCurrentQuestionsFunc = (currentQuestion: number) => {
    props.updateCurrentQuestionList(
      subjectIndex(props.currentSubject),
      currentQuestion
    );
  };

  const replaceSubjectResult = (subjectResult: SubjectResult) => {
    const newResult = results
      .filter((res) => res.subjectTitle !== subjectResult.subjectTitle)
      .concat(subjectResult);
    setResults(newResult);
    return newResult;
  };

  const changeExamPage = (page: ExamPage) => props.updateExamPage(page);

  const quitExam = () => {
    if (lastPage === ExamPage.Overview) {
      props.changePage(Page.FrontPage);
    } else {
      props.updateExamPage(ExamPage.Overview);
    }
  };

  const subjectOver = () => {
    replaceSubjectResult({
      subjectTitle: props.currentSubject,
      results: props.results
    });
    const nextSubjectIdx = subjectIndex(props.currentSubject) + 1;
    if (nextSubjectIdx >= props.examDefinition.subjects.length) {
      props.updateExamPage(ExamPage.Results);
    } else {
      const newCurrentSubject =
        props.examDefinition.subjects[nextSubjectIdx].name;
      props.updateCurrentSubject(newCurrentSubject);
      props.startSubject(props.examState.results[nextSubjectIdx]);
      props.updateExamPage(ExamPage.Overview);
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
              props.examDefinition.subjects[subjectIndex(props.currentSubject)]
            }
            changePage={props.changePage}
            subjectOver={subjectOver}
            currentQuestion={
              props.currentQuestionList[subjectIndex(props.currentSubject)]
            }
            updateCurrentQuestion={updateCurrentQuestionsFunc}
          />
        );

      case ExamPage.EnterName:
        return (
          <EnterName
            avatar={'thing'} //TODO send real avatar here when we have that story ready
          />
        );

      case ExamPage.Overview:
        return (
          <Overview
            subjects={props.examDefinition.subjects.map((subject) => ({
              title: subject.name,
              completed: results.find((s) => s.subjectTitle === subject.name)!
                .results.length,
              total: subject.questions.filter(
                (q) => q.templateID !== QuestionTemplate.CompletedSubject
              ).length
            }))}
            currentSubject={props.currentSubject}
            startExam={() => changeExamPage(ExamPage.Subject)}
          />
        );

      case ExamPage.Exit:
        return (
          <Choice
            confirmAction={quitExam}
            closeChoice={() => props.updateExamPage(lastPage)}
            title='Avslutte kartlegging'
            body='Fremgang vil bli slettet. Fortsette?'
            btnClass='exit-btn'
            btnText='Avslutt'
          />
        );

      case ExamPage.Results:
        // TODO let App know the examination is over
        return <ResultPage result={results} />;
    }
  };

  return (
    <div className='main'>
      <NavBar
        showChoice={() => {
          if (props.examPage !== ExamPage.Exit) {
            setLastPage(props.examPage);
          }
          changeExamPage(ExamPage.Exit);
        }}
      />
      {choosePage(props.examPage)}
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  subjectTitle: store.subjectResult.subjectTitle,
  results: store.subjectResult.results,
  currentQuestionList: store.currentQuestionList,
  examPage: store.examPage,
  currentSubject: store.currentSubject
});

const mapToDispatch = {
  startSubject,
  initCurrentQuestionList,
  updateCurrentQuestionList,
  updateExamPage,
  updateCurrentSubject
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(Examination);
