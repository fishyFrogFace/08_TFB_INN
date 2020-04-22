import React, { useState } from 'react';
import '../App.css';
import Button from '../components/Button';

interface Props {
  text: string;
  answerValues: string[];
}

const WhatUnits: React.FC<Props> = props => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
  };

  const returnResult = () => {};

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <div className='buttoncontainer'>
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={selectedButtons.includes(i) ? 'selected' : ''}
            onClick={() => updateAnswer(i)}>
            <img src={item} alt='' />
          </Button>
        ))}
      </div>
      <div>
        <Button classNames='next' onClick={returnResult}>
          Neste
        </Button>
      </div>
    </div>
  );
};

export default WhatUnits;
