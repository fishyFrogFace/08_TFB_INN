import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Start from '../questions/Start';
import ResultPage from '../result/ResultPage';
import UsernameInput from '../questions/UsernameInput';
import CopyText from '../questions/CopyText';
import { Result, QuestionResult } from '../App';
import { Page } from '../App';

/* the list of pages will get passed to the examination by App.tsx
   as will the props needed to build questions from question components.
   also gave up using an int here, we will have to check that elsewhere, e.g. database */
interface Props {
  currentQuestion: number;
  questions: Question[];
  results: QuestionResult[];
  username: string;
  changePage: (page: Page) => void;
}

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
    results: props.results
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

  const chooseQuestion = (question: Question) => {
    switch (question.q) {
      case 'start':
        return <Start {...question.params} getResult={getResult} />;

      case 'username':
        return <UsernameInput {...question.params} getUsername={getUsername} />;

      case 'copytext':
        return <CopyText {...question.params} getResult={getResult} />;

      case 'end':
        // TODO let App know the examination is over
        return <ResultPage {...result} />;
    }
  };

  const quitExam = () => {
    // when storage is in place, this might need to delete the paused examination
    props.changePage(Page.FrontPage);
  };

  const pauseExam = () => {
    // when storage is in place, this might need to delete the paused examination
    console.log('This is pause modal');
  };

  return (
    <div className='main'>
      <NavBar quitExam={quitExam} pauseExam={pauseExam}/>
      <div className='questionContainer'>
        {chooseQuestion(questions[currentQuestion])}
      </div>
    </div>
  );
};

export default Examination;
