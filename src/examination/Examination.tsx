import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Start from '../questions/Start';
import ResultPage from '../result/ResultPage';
import UsernameInput from '../questions/UsernameInput';
import CopyText from '../questions/CopyText';
import { Result, QuestionResult, Page, ExamState, Question } from '../Types';

interface Props {
  state: ExamState;
  storeExam: (data: ExamState) => void
  changePage: (page: Page) => void;
}

const Examination: React.FC<Props> = props => {
  const [currentQuestion, setCurrentQuestion] = useState(props.state.currentQuestion);
  const [questions] = useState(props.state.questions);
  const [result, setResult] = useState({
    username: props.state.username,
    results: props.state.results
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
    const data = {currentQuestion: currentQuestion, questions: questions, results: result.results, username: result.username}
    props.storeExam(data)
    console.log('This is pause modal');
    props.changePage(Page.FrontPage);
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
