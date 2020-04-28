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
    <div className='content'>
      <div className="completedContainer ">
        <p className='h1 white normal-font'>Du har fullført {props.subject}!</p>
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
