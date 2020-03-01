import React from 'react';
import './Modal.css';

interface Props {
  show: boolean;
  onClick: () => void;
}

const Modal: React.FC<Props> = props => {
  if (props.show) {
    return (
      <div className='modal fade' id='modal' role='dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Avslutte kartlegging</h4>
            <button
              type='button'
              className='close'
              onClick={() => props.onClick()}>
              &times;
            </button>
          </div>
          <div className='modal-body'>
            <p>Fremgang vil bli slettet. Fortsette?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='modal-btn close-btn'
              onClick={() => props.onClick()}>
              Lukk
            </button>
            <button
              type='button'
              className='modal-btn exit-btn'
              onClick={() => props.onClick()}>
              Avslutt
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
