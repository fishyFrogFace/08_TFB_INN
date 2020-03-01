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
            <button
              type='button'
              className='close'
              onClick={() => props.onClick()}>
              &times;
            </button>
            <h4 className='modal-title'>Modal Header</h4>
          </div>
          <div className='modal-body'>
            <p>This is a small modal.</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='modal-btn'
              onClick={() => props.onClick()}>
              Close
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
