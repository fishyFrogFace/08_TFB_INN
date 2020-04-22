import React, { useState } from 'react';
import '../App.css';
import phone from '../images/phone.svg'
import tablet from '../images/tablet.svg'
import laptop from '../images/laptop.svg'
import Button from '../components/Button';

const units = [
  {image: phone, description: 'Phone'},
  {image: laptop, description: 'Laptop'},
  {image: tablet, description: 'Tablet'}
]

const WhatUnits: React.FC<{}> = () => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
  };

  const returnResult = () => {
    
  };

  return (
    <div>
      <h1 className='h1'>Hvilke enheter har du?</h1>
      <div className='buttoncontainer'>
        {units.map((item, i) => (
          <Button
            key={i}
            classNames={selectedButtons.includes(i) ? 'selected' : ''}
            onClick={() => updateAnswer(i)}>
            <img src={item.image} alt='' />
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
