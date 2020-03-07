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
        <Button classNames='exit' onClick={() => props.quitModal()}>
          &times;
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
