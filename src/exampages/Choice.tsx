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
    <div className='questionContainer'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>{props.title}</h4>
          <div className='close' onClick={() => props.closeChoice()}>
            &times;
          </div>
        </div>
        <div className='modal-body'>
          <p>{props.body}</p>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='modal-btn close-btn'
            onClick={() => props.closeChoice()}>
            Lukk
          </button>
          <button
            type='button'
            className={`modal-btn ${props.btnClass}`}
            onClick={() => props.confirmAction()}>
            {props.btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedSubject;
