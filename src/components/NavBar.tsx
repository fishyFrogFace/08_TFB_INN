import React, { useState } from 'react';
import './NavBar.css';
import Button from './Button';
import exit from './exit.svg';
import Modal from '../components/Modal';

enum ModalState {
  Quit,
  Hide
}

interface Props {
  quitExam: () => void;
}

const NavBar: React.FC<Props> = props => {
  const [modal, setModal] = useState(ModalState.Hide);

  const closeModal = () => {
    setModal(ModalState.Hide);
  };

  const showModal = (modal: ModalState) => {
    setModal(modal);
  };

  return (
    <div className='navBar'>
      <div className='navbar-left'>
        <Button
          classNames='nav-btn exit'
          onClick={() => showModal(ModalState.Quit)}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
        <div className='navbar-modals'>
          <Modal
            show={modal === ModalState.Quit}
            closeModal={closeModal}
            confirmAction={props.quitExam}
            title='Avslutte kartlegging'
            body='Fremgang vil bli slettet. Fortsette?'
            btnClass='exit-btn'
            btnText='Avslutt'
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
