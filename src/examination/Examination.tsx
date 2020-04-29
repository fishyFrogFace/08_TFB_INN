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
import WhatUnits from 'exampages/WhatUnits';

interface Props extends PropsFromRedux {
  examState: ExamState;
  examDefinition: ExamDefinition;
}

const Examination: React.FC<Props> = props => {
  const [lastPage, setLastPage] = useState(ExamPage.EnterName);

  const currentSubjectIndex = () =>
    props.examDefinition.subjects.findIndex(s => {
      return s.name === props.currentSubject;
    });

  const currentQuestion = () =>
    props.currentQuestionList[currentSubjectIndex()];

  const currentSubject = () =>
    props.examDefinition.subjects[currentSubjectIndex()];

  const updateCurrentQuestionsFunc = (currentQuestion: number) => {
    props.updateCurrentQuestionList(currentSubjectIndex(), currentQuestion);
  };

  const changeExamPage = (page: ExamPage) => props.updateExamPage(page);

  const quitExam = () => {
    if (
      [ExamPage.Overview, ExamPage.EnterName, ExamPage.WhatUnits].includes(
        lastPage
      )
    ) {
      props.resetState();
    } else if (
      currentSubject().questions[currentQuestion()].templateID ===
      QuestionTemplate.CompletedSubject
    ) {
      subjectOver();
    } else {
      props.updateExamPage(ExamPage.Overview);
    }
  };

  const subjectOver = () => {
    const nextSubjectIdx = currentSubjectIndex() + 1;
    if (nextSubjectIdx < props.examDefinition.subjects.length) {
      const newCurrentSubject =
        props.examDefinition.subjects[nextSubjectIdx].name;
      props.updateCurrentSubject(newCurrentSubject);
    }
    props.updateExamPage(ExamPage.Overview);
  };

  // Function that determines if we are rendering a subject,
  // the overview of subjects, entering username etc.

  const choosePage = (page: ExamPage) => {
    switch (page) {
      case ExamPage.Subject:
        return (
          <Subject
            subject={currentSubject()}
            subjectOver={subjectOver}
            currentQuestion={currentQuestion()}
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
            subjects={props.examDefinition.subjects.map((subject, i) => ({
              title: subject.name,
              subjectColor: subject.subjectColor,
              completed: props.currentQuestionList[i],
              total: subject.questions.filter(
                q => q.templateID !== QuestionTemplate.CompletedSubject
              ).length
            }))}
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

      case ExamPage.WhatUnits:
        return <WhatUnits />;

      case ExamPage.Results:
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
          if (
            [
              ExamPage.Overview,
              ExamPage.EnterName,
              ExamPage.WhatUnits
            ].includes(props.examPage)
          ) {
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
