import React, { useState } from 'react';
import '../App.css';
import phone from '../images/phone.svg';
import tablet from '../images/tablet.svg';
import laptop from '../images/laptop.svg';
import Button from '../components/Button';
import { setUnits } from 'redux/actions';
import { connectDispatch } from 'redux/util';

const units = [
  { image: phone, description: 'smarttelefon' },
  { image: laptop, description: 'laptop' },
  { image: tablet, description: 'nettbrett' }
];

const WhatUnits: React.FC<PropsFromRedux> = props => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const updateAnswer = (value: number) => {
    if (selectedButtons.find(element => element === value) === undefined) {
      setSelectedButtons(selectedButtons.concat([value]));
    } else {
      setSelectedButtons(selectedButtons.filter(element => element !== value));
    }
  };

  return (
    <div className='questionContainer'>
      <h1 className='h1'>Hvilke enheter har du?</h1>
      <div className='button-container'>
        {units.map((item, i) => (
          <div className='image-with-description' key={i}>
            <Button
              classNames={`unit-btn ${
                selectedButtons.includes(i) ? 'selected' : ''
              }`}
              onClick={() => updateAnswer(i)}>
              <img className='unit-img' src={item.image} alt='' />
            </Button>
            <h2 className='h2'>{item.description}</h2>
          </div>
        ))}
      </div>
      <div>
        <Button
          classNames='next'
          onClick={() =>
            props.setUnits(selectedButtons.map(i => units[i].description))
          }>
          Neste
        </Button>
      </div>
    </div>
  );
};

// Redux related:

const mapToDispatch = dispatch => ({
  setUnits: units => setUnits(dispatch, units)
});

type PropsFromRedux = ReturnType<typeof mapToDispatch>;

const connector = connectDispatch(mapToDispatch);

export default connector(WhatUnits);
