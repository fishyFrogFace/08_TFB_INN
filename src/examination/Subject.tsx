import React from 'react';
import '../App.css';
import Start from '../questions/Start';
import CopyText from '../questions/CopyText';
import {
  QuestionResult,
  QuestionDefinition,
  QuestionTemplate,
  ExamState,
  ExamPage
} from '../Types';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { setQuestionResult, goToNextQuestion } from 'redux/actions';

interface Props extends ExamState {
  setExamPage: (page: ExamPage) => void;
  goToNextQuestion: () => void;
  setQuestionResult: (subject: string, question: number, result: QuestionResult) => void;
}

const Subject: React.FC<Props> = ({ examDefinition, currentSubject, currentQuestion, goToNextQuestion, setQuestionResult }) => {
  const currentSubjectDefinition = examDefinition.subjects.find(s => s.name === currentSubject);
  if (currentSubjectDefinition === undefined) return (
    <div>ERROR: SUBJECT DEFINITION UNDEFINED</div>
  );

  const updateResult = (qResult: QuestionResult) => {
    setQuestionResult(currentSubject, currentQuestion, qResult);
    goToNextQuestion();
  };

  const renderQuestion = (question: QuestionDefinition) => {
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
      
      default:
        return (
          <div>ERROR: UNRECOGNIZED TEMPLATE ID</div>
        );
    }
  };

  return (
    <div className='questionContainer'>
      {renderQuestion(currentSubjectDefinition.questions[currentQuestion])}
    </div>
  );
};

// Redux related:
const mapStateToProps = (store: RootState) => ({
  ...store.examState
});
const mapDispatchToProps = (dispatch) => {
  return {
    goToNextQuestion: () => dispatch(goToNextQuestion()),
    setQuestionResult: (subject: string, question: number, result: QuestionResult) => dispatch(setQuestionResult(subject, question, result))
  };
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Subject);
