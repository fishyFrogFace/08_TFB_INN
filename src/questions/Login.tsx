import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType, UserInformation } from '../Types';

interface Props {
  maxPoints: number;
  resultTitle: string;
  userInformation: UserInformation;
  updateResult: (result: QuestionResult) => void;
}

const TextInput: React.FC<Props> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkInput = () => {
    return props.maxPoints;
  };

  return (
    <div>
      <h1 className='h1'>Logg inn med informasjonen under</h1>
      <h2>Brukernavn: {props.userInformation.username}</h2>
      <h2>Passord: {props.userInformation.password}</h2>
      <form
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='username'
          className={'input-field username-field'}
          type='text'
          onChange={e => setUsername(e.currentTarget.value)}
          placeholder='Username'
        />
        <input
          id='password'
          className={'input-field password-field'}
          type='text'
          onChange={e => setPassword(e.currentTarget.value)}
          placeholder='Password'
        />
        <Button
          classNames='next'
          onClick={() =>
            props.updateResult({
              mastered: true,
              type: QuestionResultType.Mastery,
              answerValues: [],
              maxPoints: props.maxPoints,
              resultTitle: props.resultTitle,
              pointsAchieved: checkInput()
            })
          }>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default TextInput;
