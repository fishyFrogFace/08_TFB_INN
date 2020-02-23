import React from 'react';
import './Button.css';

interface Props {
  onClick: () => void;
  classNames: string;
  children: React.ReactNode;
}

const Button: React.FC<Props> = props => {
  return (
    <button className={`btn ${props.classNames}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
