import React from 'react';
import './NavBar.css';
import Button from './Button';
import exit from './exit-black.svg';

interface Props {
  showChoice: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <header className='navBar'>
      <div className="nav-content">
        <Button classNames='nav-btn exit' onClick={props.showChoice}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
        
        <div className="subject-name-container">
          <p className="subject-name">Temanavn her</p> 
        </div>
       </div> 
      
    </header>
    
  );
};

export default NavBar;
