import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';

interface Props {
  subjectColor: string;
  subject: string;
  nextSubject: () => void;
}

const CompletedSubject: React.FC<Props> = props => {
  return (
    <div className='content'>
      <div className={`choiceContent white ${props.subjectColor}`}>
        <p className={`choice-title  light-font`}>
          Du har fullført {props.subject}
        </p>
      </div>

      <div className='nextButtonContainer'>
        <Button
          classNames='next-button btn'
          onClick={() => props.nextSubject()}>
          Tilbake til temaoversikt
        </Button>
      </div>
    </div>
  );
};

export default CompletedSubject;
