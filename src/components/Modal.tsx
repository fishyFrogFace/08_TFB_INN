import React from 'react';
import './Modal.css';

interface Props {
  show: boolean;
  closeModal: () => void;
  confirmAction: () => void;
  title: string;
  body: string;
  btnClass: string;
  btnText: string;
}

const Modal: React.FC<Props> = props => {
  if (props.show) {
    return (
      <div className='modal fade' id='modal' role='dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>{props.title}</h4>
            <div
              className='close'
              onClick={() => props.closeModal()}>
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
              onClick={() => props.closeModal()}>
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
  } else {
    return null;
  }
};

export default Modal;
