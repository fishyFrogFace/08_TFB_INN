import React from 'react';
import './FlowButtons.css';
import Button from './Button';

interface Props {
  update: () => void;
  skip: () => void;
}

const FlowButtons: React.FC<Props> = props => {
  return (
    <div id='flow-buttons'>
      <Button classNames={'btn  skip bluegrey-background white'} onClick={props.skip}>
        Hopp over
      </Button>
      <Button classNames='btn next next-button' onClick={props.update}>
        Neste
      </Button>
    </div>
  );
};

export default FlowButtons;
