import React from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';

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
    <div className='question-container'>
      <div className='close h1' onClick={() => props.closeChoice()}>
        &times;
      </div>
      <h4 className='choice-title h1'>{props.title}</h4>
      <div className='choice-body h1'>
        <p>{props.body}</p>
      </div>
      <div className='choice-footer'>
        <Button classNames='close-btn' onClick={() => props.closeChoice()}>
          Lukk
        </Button>
        <Button
          classNames={`${props.btnClass}`}
          onClick={() => props.confirmAction()}>
          {props.btnText}
        </Button>
      </div>
    </div>
  );
};

export default CompletedSubject;
