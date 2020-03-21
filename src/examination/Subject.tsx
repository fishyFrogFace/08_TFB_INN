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
  SubjectResult
} from '../Types';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducers';

interface Props extends SubjectResult {
  currentQuestion: number;
  result: QuestionResult[];
  subject: SubjectDefinition;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
  alertExamination: (currentQuestion: number, result: SubjectResult) => void;
  subjectOver: (result: SubjectResult) => void;
}

const Subject: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);

  const [questions] = useState(props.subject.questions);
  const [result, setResult] = useState(props.result);

  /* makes us move to the next question without storing result */
  const moveToNextQuestion = (qResults: QuestionResult[]) => {
    const subjectResult = { subjectTitle: props.subject.name, results: qResults };
    const incremented = currentQuestion + 1;
    if (incremented >= questions.length) {
      props.subjectOver(subjectResult);
    } else {
      setCurrentQuestion(incremented);
      props.alertExamination(incremented, subjectResult);
    }
  };

  const getResult = (qResult: QuestionResult) => {
    const newResult = result.concat(qResult);
    setResult(newResult);
    // tell the ouside world e.g. App about this change in state
    moveToNextQuestion(newResult);
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    //TODO change to question type

    console.log(props.subject.name);

    switch (question.templateID) {
      case 'start':
        return (
          <Start
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            getResult={getResult}
          />
        );

      case 'copytext':
        return (
          <CopyText
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            text={question.questionContent.text!}
            getResult={getResult}
          />
        );
    }
  };

  return (
    <div className='questionContainer'>
      <h1>{props.subjectTitle}</h1>
      {chooseQuestion(questions[currentQuestion])}
    </div>
  );
};

const mapStateToProps = (store: RootState): SubjectResult => ({
  subjectTitle: store.subjectResult.subjectTitle,
  results: store.subjectResult.results
})

const connector = connect(mapStateToProps)

// Kvifor blir typen til connect any? Må vi sende mapToDispatch
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Subject);
