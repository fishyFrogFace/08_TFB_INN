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
    <div className='pause_exit-container'>
      <div className='exit-btn-container'>
        <Button
          classNames='choice-nav-exit-btn'
          onClick={() => props.closeChoice()}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
      <div className='choiceContent whiteBackground'>
        <p className='choice-title light-font'>{props.title}</p>
        <div className='choice-details-container'>
          <p>{props.body}</p>
        </div>
        <div className='choice-buttoncontainer'>
          <Button
            classNames={`${props.btnClass} choicebtn`}
            onClick={() => props.confirmAction()}>
            {props.btnText}
          </Button>
          <Button
            classNames=' grey-background choicebtn'
            onClick={() => props.closeChoice()}>
            Lukk vinduet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletedSubject;
