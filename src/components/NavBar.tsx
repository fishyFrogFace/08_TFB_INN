import React from 'react';
import './NavBar.css';
import Button from './Button';
import exit from './exit-black.svg';

interface Props {
  showChoice: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='navBar'>
        <div className="button-container">
          <Button classNames='nav-btn exit' onClick={props.showChoice}>
            <img className='nav-img' src={exit} alt='Exit' />
          </Button>
        </div>
        <div className="subject-name-container">
          <p className="subject-name h2 black">Temanavn her</p> 
        </div>
      
      
    </div>
    
  );
};

export default NavBar;
