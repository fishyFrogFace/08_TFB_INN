import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Start from '../questions/Start';
import ResultPage from '../result/ResultPage';
import UsernameInput from 'questions/UsernameInput';
import CopyText from 'questions/CopyText';
import { Result, QuestionResult } from '../App'

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components.
   also gave up using an int here, we will have to check that elsewhere, e.g. database */
interface Props {
  currentQuestion: number;
  questions: Question[];
  results: QuestionResult[];
  username: string;
}

/* TODO find a better way to do this, without marking everything as optional
    which is not great */
interface QuestionParams {
  avatar: string;
  measures: string;
  maxPoints: number;
  text: string;
}

interface Question {
  q: string;
  params: QuestionParams;
}

const Examination: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [questions] = useState(props.questions);
  const [result, setResult] = useState({
    username: props.username,
    results: props.results // new Array<QuestionResult>()
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

  /* the list of pages might be represented as an enum, for easy storage.
     by matching on values in the enum, we can render the correct question component
     and fill it with values (stored in local storage or database),
     not sure how simple converting from string to enum is */
  const chooseQuestion = (question: Question) => {
    switch (question.q) {
      case 'start':
        return <Start moveToNextQuestion={moveToNextQuestion} />;

      case 'username':
        return <UsernameInput {...question.params} getUsername={getUsername} />;

      case 'copytext':
        return <CopyText {...question.params} getResult={getResult} />;

      case 'end':
        // TODO let App know the examination is over
        // TODO will send props as {...result} when result accumulation works
        return <ResultPage {...result} />;
    }
  };

  return (
    <div className='main'>
      <NavBar />
      <div className='questionContainer'>
        {chooseQuestion(questions[currentQuestion])}
      </div>
    </div>
  );
};

export default Examination;
