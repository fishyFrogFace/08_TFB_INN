import React, { useState } from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { setUsername } from 'redux/actions';
import avatar from './big-pink.png';

interface Props extends PropsFromRedux {
  avatar: string;
  moveOn: () => void;
}

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

const EnterName: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState(randomName(adjectives, animals));

  return (
    <div className='questionContainer'>
      <div className='imageContainer'>
        <img src={avatar} alt='Avatar' />
      </div>
      <h1 className='h1'>Mitt navn er</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className='inputField'
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
        <Button
          classNames='next'
          onClick={() => {
            props.setUsername(input);
            props.moveOn();
          }}>
          Neste
        </Button>
      </form>
      <p className='username'>{input}</p>
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  username: store.username
});

const mapToDispatch = {
  setUsername
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(EnterName);
