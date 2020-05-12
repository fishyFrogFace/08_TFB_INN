import React from 'react';
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
      <div className={`choice-content white ${props.subjectColor}`}>
        <p className={`choice-title  light-font`}>
          Du har fullført {props.subject}
        </p>
      </div>
      <Button
        classNames='next-button regular-btn'
        onClick={() => props.nextSubject()}>
        Tilbake til temaoversikt
      </Button>
    </div>
  );
};

export default CompletedSubject;
