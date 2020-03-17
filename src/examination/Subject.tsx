import React, { useState } from 'react';
import '../App.css';
import Start from '../questions/Start';
import CopyText from '../questions/CopyText';
import {
  QuestionResult,
  Page,
  ExamState,
  ExamDefinition,
  QuestionDefinition
} from '../Types';

interface Props {
  examState: ExamState;
  examDefinition: ExamDefinition;
  storeExam: (data: ExamState) => void;
  changePage: (page: Page) => void;
  alertExamination: (currentQuestion: number, result: QuestionResult[]) => void;
  examOver: (result: QuestionResult[]) => void;
}

const Subject: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(
    props.examState.currentQuestion
  );
  const [currentSubject, setCurrentSubject] = useState(
    props.examState.currentSubject
  );
  const [questions] = useState(
    props.examDefinition.subjects[currentSubject].questions
  );
  const [result, setResult] = useState(props.examState.results);

  /* makes us move to the next question without storing result */
  const moveToNextQuestion = () => {
    const incremented = currentQuestion + 1;
    if (incremented >= questions.length) {
      props.examOver(result);
    } else {
      setCurrentQuestion(incremented);
      props.alertExamination(incremented, result);
    }
  };

  const getResult = (qResult: QuestionResult) => {
    const newArray = result.concat(qResult);
    setResult(newArray);
    // tell the ouside world e.g. App about this change in state
    moveToNextQuestion();
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    //TODO change to question type

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
      {chooseQuestion(questions[currentQuestion])}
    </div>
  );
};

export default Subject;
