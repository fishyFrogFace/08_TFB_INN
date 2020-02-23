import React from 'react';
import '../App.css';
import Button from '../components/Button';

interface Props {
  moveToNextQuestion: () => void;
}

const Start: React.FC<Props> = props => {
  return (
    <Button classNames='start' onClick={() => props.moveToNextQuestion()}>
      Start
    </Button>
  );
};

export default Start;
