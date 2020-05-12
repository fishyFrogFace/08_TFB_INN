import React, { useState } from 'react';
import Button from '../components/Button';
import { setUsername } from 'redux/actions';
import { connectDispatch } from 'redux/util';

const adjectives = [
  'helpful',
  'fresh',
  'fussy',
  'elastic',
  'happy',
  'daring',
  'digital',
  'active',
  'amused',
  'brave',
  'cool',
  'cute'
];

const animals = [
  'crocodile',
  'panda',
  'bird',
  'spider',
  'tiger',
  'cat',
  'rabbit',
  'butterfly'
];

const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const randomName = (list1: any[], list2: any[]) => {
  const adjective = list1[randomInt(list1.length)];
  const animal = list2[randomInt(list2.length)];
  return `${adjective}-${animal}`;
};

const EnterName: React.FC<PropsFromRedux> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState(randomName(adjectives, animals));

  return (
    <div className='content'>
      <div className='question-text-container teal-background'>
        <h1 className='h2 white normal-font'>Mitt navn er...</h1>
      </div>
      <div className='input-container white-background'>
        <form
          className='text-input-form'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            e.preventDefault()
          }>
          <input
            id='name'
            className='input-field'
            type='text'
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const valueTyped = e.currentTarget.value;
              if (valueTyped.trim()) {
                setInput(e.currentTarget.value);
              } else {
                setInput(randomName(adjectives, animals));
              }
            }}
            placeholder='Navn'
          />
        </form>
        <p className='username'>{input}</p>
      </div>
      <Button
        classNames='regular-btn next-button'
        onClick={() => {
          props.setUsername(input);
        }}>
        Neste
      </Button>
    </div>
  );
};

// Redux related:

const mapToDispatch = dispatch => ({
  setUsername: username => setUsername(dispatch, username)
});

type PropsFromRedux = ReturnType<typeof mapToDispatch>;

const connector = connectDispatch(mapToDispatch);

export default connector(EnterName);
