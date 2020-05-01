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
      <div className='completedContainer '>
        <h1 className={`h1 white normal-font${props.subjectColor}`}>
          Du har fullført {props.subject}
        </h1>
      </div>

      <div className='nextButtonContainer'>
        <Button classNames='next' onClick={() => props.nextSubject()}>
          Tilbake til temaoversikt
        </Button>
      </div>
    </div>
  );
};

export default CompletedSubject;
