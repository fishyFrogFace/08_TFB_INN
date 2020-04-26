import React from 'react';
import './FlowButtons.css';
import Button from './Button';

interface Props {
  update: () => void;
  skip: () => void;
}

const FlowButtons: React.FC<Props> = props => {
  return (
    <div id='bottom-bar'>
      <Button classNames={'next'} onClick={props.skip}>
        Hopp over
      </Button>
      <Button classNames='next' onClick={props.update}>
        Neste
      </Button>
    </div>
  );
};

export default FlowButtons;
