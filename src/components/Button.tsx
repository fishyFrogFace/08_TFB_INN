import React from 'react';
import './Button.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  classNames: string;
  children: React.ReactNode;
}

const Button: React.FC<Props> = props => {
  if (props.disabled) {
    return (
      <button className={/*`btn*/` ${props.classNames}`} disabled>
        {props.children}
      </button>
    );
  } else {
    return (
      <button className={/*`btn*/` ${props.classNames}`} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
};

export default Button;
