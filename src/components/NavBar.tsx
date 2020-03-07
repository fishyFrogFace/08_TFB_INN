import React from 'react';
import './NavBar.css';
import Button from './Button';
import { ModalState } from '../examination/Examination';
import pause from './pause.svg';
import exit from './exit.svg';

interface Props {
  showModal: (modal: ModalState) => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='navBar'>
      <div className='navbar-left'>
        <Button
          classNames='nav-btn pause'
          onClick={() => props.showModal(ModalState.Pause)}>
          <img className='nav-img' src={pause} alt='Pause' />
        </Button>
        <Button
          classNames='nav-btn exit'
          onClick={() => props.showModal(ModalState.Quit)}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
