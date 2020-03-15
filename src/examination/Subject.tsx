import React, { useState } from 'react';
import '../App.css';
import Start from '../questions/Start';
import ResultPage from '../result/ResultPage';
import EnterName from '../exampages/EnterName';
import CopyText from '../questions/CopyText';
import {
  Result,
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
  const [result, setResult] = useState({
    username: props.examState.username,
    results: props.examState.results
  });

  /* makes us move to the next question without storing result */
  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const getResult = (qResult: QuestionResult) => {
    const newArray = result.results.concat(qResult);
    setResult((res: Result) => ({ ...res, results: newArray }));
    // tell the ouside world e.g. App about this change in state
    moveToNextQuestion();
  };

  const getUsername = (username: string) => {
    setResult((res: Result) => ({ ...res, username: username }));
    // tell the ouside world e.g. App about this change in state
    moveToNextQuestion();
  };

  const chooseQuestion = (question: QuestionDefinition) => {
    switch (question.templateID) {
      case 'start':
        return (
          <Start
            resultTitle={question.questionContent.resultTitle!}
            maxPoints={question.questionContent.maxPoints!}
            getResult={getResult}
          />
        );

      case 'username':
        return (
          <EnterName
            avatar={question.questionContent.avatar!}
            getUsername={getUsername}
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

      case 'end':
        // TODO let App know the examination is over
        return <ResultPage {...result} />;
    }
  };

  return (
    <div className='questionContainer'>
      {chooseQuestion(questions[currentQuestion])}
    </div>
  );
};

export default Subject;
