import React from 'react';
import '../App.css';
import Button from '../components/Button'

interface Props {
  getResult: () => void
}

const Start: React.FC<Props> = props => {
  return (
    <Button onClick={() => props.getResult()}>
      Start
    </Button>
  );
};

export default Start;