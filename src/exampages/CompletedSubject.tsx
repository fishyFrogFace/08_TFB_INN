import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';

interface Props {
  subject: String;
  nextSubject: () => void;
}

const CompletedSubject: React.FC<Props> = props => {
  return (
    <div className='questionContainer'>
      <h1 className='h1 success-header'>Du har fullført '{props.subject}'!</h1>
      <Button classNames='next' onClick={() => props.nextSubject()}>
        Neste
      </Button>
    </div>
  );
};

export default CompletedSubject;
