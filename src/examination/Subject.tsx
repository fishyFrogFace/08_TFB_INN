import React from 'react';
import '../App.css';
import Start from '../questions/Start';
import CopyText from '../questions/CopyText';
import {
  QuestionResult,
  Page,
  QuestionDefinition,
  SubjectDefinition,
  QuestionTemplate
} from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateResults } from 'redux/actions';
import CompletedSubject from 'exampages/CompletedSubject';

interface Props extends PropsFromRedux {
  subject: SubjectDefinition;
  currentQuestion: number;
  changePage: (page: Page) => void;
  subjectOver: () => void;
  updateCurrentQuestion: (currentQuestion: number) => void;
}

const Subject: React.FC<Props> = props => {
  const nextSubject = () => {
    props.subjectOver();
  };

  const updateResult = (qResult: QuestionResult) => {
    const newResult = props.results.concat(qResult);
    props.updateResults(newResult);
    const incremented = props.currentQuestion + 1;
    props.updateCurrentQuestion(incremented);
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    switch (question.templateID) {
      case QuestionTemplate.START:
        return (
          <Start
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.COPYTEXT:
        return (
          <CopyText
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            updateResult={updateResult}
          />
        );

      case QuestionTemplate.COMPLETEDSUBJECT:
        return (
          <CompletedSubject
            subject={props.subject.name}
            nextSubject={nextSubject}
          />
        );
    }
  };

  return (
    <div className='questionContainer'>
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
