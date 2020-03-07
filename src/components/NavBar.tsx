import React from 'react';
import './NavBar.css';
import Button from './Button';
import { ModalState } from '../examination/Examination';

interface Props {
  showModal: (modal: ModalState) => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='navBar'>
      <div className='navbar-left'>
        <Button
          classNames='pause'
          onClick={() => props.showModal(ModalState.Pause)}>
          &times;
        </Button>
        <Button
          classNames='exit'
          onClick={() => props.showModal(ModalState.Quit)}>
          &times;
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
