import React from 'react';
import './NavBar.css';
import Button from './Button';

interface Props {
  quitModal: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='navBar'>
      <div className='navbar-left'>
        <Button classNames='start' onClick={() => props.quitModal()}>
          Start
        </Button>
      </div>
      <div className='navbar-right'>
        <Button classNames='start' onClick={() => props.quitModal()}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
