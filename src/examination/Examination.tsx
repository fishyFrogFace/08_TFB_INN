import React, { useState } from 'react';
import '../App.css';
import { int } from '../Helpers';
import NavBar from '../components/NavBar';
import Start from '../questions/Start';
import ResultPage from '../result/ResultPage';
import UsernameInput from 'questions/UsernameInput';

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components */
interface Props {
  currentQuestion: int;
  questions: string[];
}

export interface QuestionResult {
  measures: string;
  maxPoints: number;
  pointsAchieved: number;
}

export interface Result {
  username: string;
  results: QuestionResult[];
}

const Examination: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions] = useState(props.questions);
  const [result, setResult] = useState({
    username: '',
    results: new Array<QuestionResult>()
  });

  const resultExample = [
    { measures: 'Kan spise pizza', maxPoints: 3, pointsAchieved: 2 },
    { measures: 'Kan klikke på ting', maxPoints: 2, pointsAchieved: 1 },
    { measures: 'Kan se på TV', maxPoints: 3, pointsAchieved: 0 }
  ];

  /* makes us move to the next question and will contain
     code that stores the result from the question that called it,
     passed to the function as parameters */
  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const getResult = (result: Result) => {
    // TODO send result from question back to app here
    moveToNextQuestion();
  };

  const getUserData = (username: string) => {
    setResult((res: Result) => ({ ...res, username: username }));
    moveToNextQuestion();
  };

  /* the list of pages might be represented as an enum, for easy storage.
     by matching on values in the enum, we can render the correct question component
     and fill it with values (stored in local storage or database),
     not sure how simple converting from string to enum is */
  const chooseQuestion = (question: string) => {
    switch (question) {
      case 'start':
        return <Start moveToNextQuestion={moveToNextQuestion} />;

      case 'username':
        return <UsernameInput avatar='TODO' getUserData={getUserData} />;

      case 'end':
        // TODO let app know the examination is over
        // TODO will send props as {...result} when result accumulation works
        return (
          <ResultPage results={resultExample} username={result.username} />
        );
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
