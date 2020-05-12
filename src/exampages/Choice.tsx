import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import exit from '../components/exit-black.svg';

interface Props {
  closeChoice: () => void;
  confirmAction: () => void;
  title: string;
  body: string;
  btnClass: string;
  btnText: string;
}

const CompletedSubject: React.FC<Props> = props => {
  return (
    <div className='pause-exit-container'>
      <div className='exit-btn-container'>
        <Button
          classNames='choice-nav-exit-btn'
          onClick={() => props.closeChoice()}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
      <div className='choice-content white-background'>
        <p className='choice-title light-font'>{props.title}</p>
        <div className='choice-details-container'>
          <p>{props.body}</p>
        </div>
        <div className='choice-button-container'>
          <Button
            classNames={`${props.btnClass} choice-btn`}
            onClick={() => props.confirmAction()}>
            {props.btnText}
          </Button>
          <Button
            classNames=' grey-background choice-btn'
            onClick={() => props.closeChoice()}>
            Lukk vinduet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletedSubject;
