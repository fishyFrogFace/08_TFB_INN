import React from 'react';
import './NavBar.css';
import Button from './Button';
import exit from '../images/exit.svg';

interface Props {
  showChoice: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='nav-bar'>
      <div className='navbar-left'>
        <Button classNames='nav-btn exit' onClick={props.showChoice}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
