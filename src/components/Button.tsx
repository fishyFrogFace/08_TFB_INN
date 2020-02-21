import React from 'react';
import './Button.css';

interface Props {
    onClick: () => void,
    children: React.ReactNode
}

const Button: React.FC<Props> = props => {
  return (
    <button className='btn' onClick={props.onClick}>
        {props.children}
    </button>
  );
}

export default Button;