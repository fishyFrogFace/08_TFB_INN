import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import { QuestionResult, QuestionResultType, UserInformation } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  maxPoints: number;
  resultTitle: string;
  userInformation: UserInformation;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const TextInput: React.FC<Props> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [feedback, setFeedback] = useState('');
  const [color, setColor] = useState('black');
  const [clickedWhileCorrect, setClickedWhileCorrect] = useState(false);

  const resetLocalState = () => {
    setUsername('');
    setPassword('');
    setPoints(props.maxPoints);
    setFeedback('');
    setColor('black');
    setClickedWhileCorrect(false);
  };

  const checkInput = () => {
    if (clickedWhileCorrect) {
      resetLocalState();
      props.updateResult({
        mastered: true,
        type: QuestionResultType.Mastery,
        answerValues: [],
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        questionTitle: "Logg inn med informasjonen under",
        pointsAchieved: points
      });
    } else {
      if (
        password === props.userInformation.password &&
        username === props.userInformation.username
      ) {
        setColor('green');
        setFeedback('Gratulerer, du er nå logget inn!');
        setClickedWhileCorrect(true);
      } else {
        const newPoints = points - 1;
        setPoints(newPoints >= 0 ? newPoints : 0);
        setColor('red');
        setFeedback('Feil passord eller brukernavn');
      }
    }
  };

  return (
    <div>
      <h1 className='h1'>Logg inn med informasjonen under</h1>
      <h2 className='h2'>Brukernavn: "{props.userInformation.username}"</h2>
      <h2 className='h2'>Passord: "{props.userInformation.password}"</h2>
      <form
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='username'
          className={`input-field ${color}`}
          type='text'
          onChange={e => setUsername(e.currentTarget.value)}
          placeholder='Username'
        />
        <input
          id='password'
          className={`input-field ${color}`}
          type='password'
          onChange={e => setPassword(e.currentTarget.value)}
          placeholder='Password'
        />
        <h2 className={`feedback ${color}`}>{feedback}</h2>
        <FlowButtons
          skip={() => {
            resetLocalState();
            props.skipQuestion();
          }}
          update={checkInput}
        />
      </form>
    </div>
  );
};

export default TextInput;
