import React, { useState } from 'react';
import '../App.css';
import './UsernameInput.css';
import Button from '../components/Button';
import penguin from './penguin-books.svg';

interface Props {
  avatar: string | undefined;
  getUserData: (username: string) => void;
}

interface Return {
  input: string;
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

const UsernameInput: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState(randomName(adjectives, animals));

  return (
    <div>
      <div className='imageContainer'>
        <img src={penguin} alt='Avatar' />
      </div>
      <h1 className='h1'>Mitt navn er</h1>
      <form>
        <input
          id='name'
          className='inputField'
          type='text'
          onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
            setInput(e.currentTarget.value);
            console.log(props.avatar);
          }}
          placeholder='Navn'
        />
      </form>
      <Button classNames='paused' onClick={() => props.getUserData(input)}>
        Neste
      </Button>
    </div>
  );
};

export default UsernameInput;
