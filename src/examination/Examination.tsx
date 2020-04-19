import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import ResultPage from '../result/ResultPage';
import EnterName from '../exampages/EnterName';
import {
  ExamState,
  ExamDefinition,
  ExamPage,
  QuestionTemplate
} from '../Types';
import Subject from './Subject';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import {
  updateSubjectResultList,
  updateCurrentQuestionList,
  updateExamPage,
  updateCurrentSubject,
  resetState
} from 'redux/actions';
import Overview from 'exampages/Overview';
import Choice from 'exampages/Choice';

interface Props extends PropsFromRedux {
  examState: ExamState;
  examDefinition: ExamDefinition;
}

const Examination: React.FC<Props> = props => {
  const [lastPage, setLastPage] = useState(ExamPage.EnterName);

  /* TODO find a better way to find currentQuestion, e.g. string,
    since localStorage will return shifted results if the subject changes */
  const subjectIndex = (subject: string) =>
    props.examDefinition.subjects.findIndex(s => {
      return s.name === subject;
    });

  const updateCurrentQuestionsFunc = (currentQuestion: number) => {
    props.updateCurrentQuestionList(
      subjectIndex(props.currentSubject),
      currentQuestion
    );
  };

  const changeExamPage = (page: ExamPage) => props.updateExamPage(page);

  const quitExam = () => {
    if ([ExamPage.Overview, ExamPage.EnterName].includes(lastPage)) {
      props.resetState();
    } else {
      props.updateExamPage(ExamPage.Overview);
    }
  };

  const subjectOver = () => {
    const nextSubjectIdx = subjectIndex(props.currentSubject) + 1;
    if (nextSubjectIdx >= props.examDefinition.subjects.length) {
      props.updateExamPage(ExamPage.Overview);
    } else {
      const newCurrentSubject =
        props.examDefinition.subjects[nextSubjectIdx].name;
      props.updateCurrentSubject(newCurrentSubject);
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
            subjects={props.examDefinition.subjects.map(subject => ({
              title: subject.name,
              completed: props.subjectResultList.find(
                s => s.subjectTitle === subject.name
              )!.results.length,
              total: subject.questions.filter(
                q => q.templateID !== QuestionTemplate.CompletedSubject
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

      case ExamPage.Pause:
        return (
          <Choice
            confirmAction={quitExam}
            closeChoice={() => props.updateExamPage(lastPage)}
            title='Pause kartlegging'
            body='Tilbake til din oversikt?'
            btnClass='pause-btn'
            btnText='Til oversikt'
          />
        );

      case ExamPage.Results:
        // TODO let App know the examination is over
        return <ResultPage result={props.subjectResultList} />;
    }
  };

  return (
    <div className='main'>
      <NavBar
        showChoice={() => {
          if (![ExamPage.Exit, ExamPage.Pause].includes(props.examPage)) {
            setLastPage(props.examPage);
          }
          if ([ExamPage.Overview, ExamPage.EnterName].includes(props.examPage)) {
            changeExamPage(ExamPage.Exit);
          } else {
            changeExamPage(ExamPage.Pause);
          }
        }}
      />
      {choosePage(props.examPage)}
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  subjectResultList: store.subjectResultList,
  currentQuestionList: store.currentQuestionList,
  examPage: store.examPage,
  currentSubject: store.currentSubject
});

const mapToDispatch = {
  updateSubjectResultList,
  updateCurrentQuestionList,
  updateExamPage,
  updateCurrentSubject,
  resetState
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(Examination);
