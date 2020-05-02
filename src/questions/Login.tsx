import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import { QuestionResult, QuestionResultType, UserInformation } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  subjectColor: string;
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
        answerValues: ['Logget inn'],
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        questionTitle: 'Logg inn med informasjonen under',
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

  const failQuestion = () => {
    resetLocalState();
    props.updateResult({
      type: QuestionResultType.Mastery,
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      questionTitle: 'Logg inn med informasjonen under',
      pointsAchieved: 0,
      mastered: false,
      answerValues: ['Jeg får ikke dette til']
    });
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <h1 className='h2 white normal-font'>
          Logg inn med informasjonen under
        </h1>
      </div>
      <div className='inputContainer whiteBackground'>
        <div>
          <p className='black questionDetails'>
            Brukernavn: "{props.userInformation.username}" <br></br>
            Passord: "{props.userInformation.password}"
          </p>
        </div>
        <form
          className='text-and-btn login orange-background'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            e.preventDefault()
          }>
          <div>
            <p className='inputP black'>Username:</p>
            <input
              id='username'
              className={`inputField ${color}`}
              type='text'
              onChange={e => setUsername(e.currentTarget.value)}
              placeholder='Username'
            />
          </div>
          <div>
            <p className='inputP black'>Password:</p>
            <input
              id='password'
              className={`inputField ${color}`}
              type='password'
              onChange={e => setPassword(e.currentTarget.value)}
              placeholder='Password'
            />
          </div>
        </form>
        <h2 className={`feedback h2 normal-font ${color}`}>{feedback}</h2>
      </div>
      <FlowButtons skip={failQuestion} update={checkInput} />
    </div>
  );
};

export default TextInput;
