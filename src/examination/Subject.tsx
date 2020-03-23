import React, { useState } from 'react';
import '../App.css';
import Start from '../questions/Start';
import CopyText from '../questions/CopyText';
import {
  QuestionResult,
  Page,
  ExamState,
  QuestionDefinition,
  SubjectDefinition,
  SubjectResult,
  QuestionTemplate
} from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateResults } from 'redux/actions';

interface Props extends PropsFromRedux {
  subject: SubjectDefinition;
  currentQuestion: number;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
  subjectOver: (result: SubjectResult) => void;
  updateCurrentQuestion: (currentQuestion: number) => void;
}

const Subject: React.FC<Props> = props => {
  const moveToNextQuestion = (qResults: QuestionResult[]) => {
    const subjectResult = {
      subjectTitle: props.subject.name,
      results: qResults
    };
    const incremented = props.currentQuestion + 1;
    if (incremented >= props.subject.questions.length) {
      props.subjectOver(subjectResult);
    } else {
      props.updateCurrentQuestion(incremented);
    }
  };

  const updateResult = (qResult: QuestionResult) => {
    const newResult = props.results.concat(qResult);
    props.updateResults(newResult);
    moveToNextQuestion(newResult);
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    switch (question.templateID) {
      case QuestionTemplate.Start:
        return (
          <Start
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.CopyText:
        return (
          <CopyText
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
          />
        );
    }
  };

  return (
    <div className='questionContainer'>
      <h1>{props.subjectTitle}</h1>
      {chooseQuestion(props.subject.questions[props.currentQuestion])}
    </div>
  );
};

const mapStateToProps = (store: RootState) => ({
  subjectTitle: store.subjectResult.subjectTitle,
  results: store.subjectResult.results
});

const mapToDispatch = {
  updateResults
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

// Kvifor blir typen til connect any? Må vi sende mapToDispatch?
// type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Subject);
