import React from 'react';
import './FlowButtons.css';
import Button from './Button';

interface Props {
  update: () => void;
  skip?: () => void;
}

const FlowButtons: React.FC<Props> = props => {
  return (
    <div id='flow-buttons'>
      {props.update !== undefined ? (
        <Button
          classNames={'btn  skip bluegrey-background white'}
          onClick={props.skip!}>
          Jeg får ikke dette til
        </Button>
      ) : (
        ''
      )}
      <Button classNames='btn next' onClick={props.update}>
        Neste
      </Button>
    </div>
  );
};

export default FlowButtons;
